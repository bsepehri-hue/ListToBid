"use server";

import { z } from 'zod';
import { BigNumberish, parseEther } from 'ethers';
import { AuctionData, fetchAuctionById } from '@/lib/web3/dataFetcher';

// Minimum acceptable bid increase (e.g., 0.01 ETH)
const MIN_BID_INCREASE = parseEther('0.01');

// Define the schema for bid data validation
const BidSchema = z.object({
  auctionId: z.string().min(1, "Auction ID is required."),
  bidAmountEther: z.string().refine((val) => {
    try {
      // Must be a valid positive number
      return parseFloat(val) > 0;
    } catch {
      return false;
    }
  }, { message: "Bid amount must be a positive number." }),
});

export type BidFormState = {
  success: boolean;
  message: string;
  errors?: {
    bidAmountEther?: string[];
  };
};

/**
 * Server Action to validate the submitted bid amount against contract rules.
 * This runs securely on the server before the user signs the transaction.
 */
export async function submitBidAction(
  prevState: BidFormState,
  formData: FormData,
): Promise<BidFormState> {
  const validatedFields = BidSchema.safeParse({
    auctionId: formData.get('auctionId'),
    bidAmountEther: formData.get('bidAmountEther'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { auctionId, bidAmountEther } = validatedFields.data;
  let bidAmountWei: bigint;
  let currentAuction: AuctionData;
  
  try {
    // 1. Convert bid to Wei and check minimum value
    bidAmountWei = parseEther(bidAmountEther);

    if (bidAmountWei <= BigInt(0)) {
        throw new Error("Bid amount must be greater than zero.");
    }
    
    // 2. Fetch current auction details from blockchain (Server-side check)
    currentAuction = await fetchAuctionById(auctionId);
    
    const requiredMinBid = currentAuction.currentBid + MIN_BID_INCREASE;

    // 3. Check if the submitted bid meets the minimum required bid
    if (bidAmountWei < requiredMinBid) {
      const requiredEther = parseEther(requiredMinBid.toString());
      return {
        success: false,
        message: `Bid must be at least ${requiredMinBid.toString()} WETH/ETH.`,
        errors: {
            bidAmountEther: [`Bid must be higher than current bid + 0.01 ETH. Minimum bid is ${requiredMinBid.toString()} WETH/ETH.`],
        }
      };
    }
    
    // 4. Check if auction is still active
    const nowInSeconds = BigInt(Math.floor(Date.now() / 1000));
    if (currentAuction.endTime <= nowInSeconds) {
        return {
            success: false,
            message: 'This auction has already ended.',
        };
    }

    console.log(`[Server Action] Bid validation successful for Auction #${auctionId}. Amount: ${bidAmountEther} ETH`);
    
    // Return success to signal the client to proceed with the transaction
    return { 
      success: true, 
      message: 'Server validation successful. Please confirm transaction in your wallet.' 
    };

  } catch (error) {
    console.error('Server Action Error:', error);
    return {
      success: false,
      message: `A critical error occurred: ${(error as Error).message}`,
    };
  }
}
