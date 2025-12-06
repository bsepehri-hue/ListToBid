'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitBidAction, BidFormState } from '@/actions/auction';
import { useWallet } from '@/context/WalletContext';
import { Contract, parseEther } from 'ethers';
import { LIST_TO_BID_ABI, CONTRACT_ADDRESS } from '@/contracts/abis/ListToBid';
import { AuctionData } from '@/lib/web3/dataFetcher';
import { formatEther, shortenAddress } from '@/lib/utils';
import { Gavel, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button'; // NEW IMPORT
import { Card } from '@/components/ui/Card'; // NEW IMPORT

interface BiddingFormProps {
  auction: AuctionData;
}

// Utility component for showing form submission status
const SubmitButton: React.FC<{ loading: boolean; isAuctionOver: boolean }> = ({ loading, isAuctionOver }) => {
  const { pending } = useFormStatus();

  return (
    // Replaced raw button with Button primitive
    <Button
      type="submit"
      isLoading={pending || loading}
      disabled={isAuctionOver}
      variant={isAuctionOver ? 'secondary' : 'danger'} // Use danger for high-impact bid
      className="w-full py-3 mt-4 text-lg"
    >
      {isAuctionOver 
        ? 'Auction Ended'
        : pending || loading
        ? 'Processing...'
        : <><Gavel className="w-5 h-5 mr-2" /> Place Bid</>
      }
    </Button>
  );
};

export const BiddingForm: React.FC<BiddingFormProps> = ({ auction }) => {
  const { signer, isConnected, connectWallet, address } = useWallet();
  const formRef = useRef<HTMLFormElement>(null);
  
  // States for blockchain interaction
  const [txLoading, setTxLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  
  // Time logic for UI disable state (client-side)
  const isAuctionOver = useMemo(() => {
    return Number(auction.endTime) * 1000 < Date.now();
  }, [auction.endTime]);


  // Server action state
  const initialState: BidFormState = {
    success: false,
    message: 'Enter your bid amount in ETH/WETH.',
  };
  const [state, formAction] = useFormState(submitBidAction, initialState);

  // Minimum required bid calculated based on contract logic (current + 0.01 ETH)
  const minBidWei = auction.currentBid + parseEther('0.01');
  const minBidEther = formatEther(minBidWei);
  
  // Effect to trigger the blockchain transaction after successful server validation
  useEffect(() => {
    if (state.success && formRef.current) {
      const formData = new FormData(formRef.current);
      const bidAmountEther = formData.get('bidAmountEther') as string;
      const bidAmountWei = parseEther(bidAmountEther);
      
      handleBlockchainTransaction(auction.auctionId, bidAmountWei);
    }
  }, [state.success, state.message]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBlockchainTransaction = async (auctionId: bigint, bidAmountWei: bigint) => {
    if (!signer) {
      setTxStatus('error');
      alert('Wallet is not connected or signer is unavailable.');
      return;
    }

    setTxLoading(true);
    setTxStatus('pending');
    setTxHash(null);

    try {
      // 1. Initialize Contract
      const contract = new Contract(CONTRACT_ADDRESS, LIST_TO_BID_ABI, signer);
      
      // 2. Execute Transaction
      // Assumed function signature: placeBid(uint256 auctionId) payable
      const tx = await contract.placeBid(
        auctionId,
        {
          value: bidAmountWei, // The bid amount is sent as ETH value
        }
      );

      setTxHash(tx.hash);
      console.log('Transaction sent:', tx.hash);

      // 3. Wait for Transaction Confirmation (Mining)
      await tx.wait();

      setTxStatus('success');
      formRef.current?.reset(); 
      alert('Bid successfully placed! Your bid is now live.');

    } catch (error) {
      console.error('Blockchain Transaction Error:', error);
      setTxStatus('error');
      alert('Bid failed. Check console for details or ensure your bid is high enough.');
    } finally {
      setTxLoading(false);
    }
  };

  if (!isConnected || !address) {
    return (
      // Replaced raw div with Card component
      <Card borderColor="red" className="text-center"> 
        <p className="text-gray-600 mb-4">Connect your wallet to place a bid.</p>
        {/* Replaced raw button with Button primitive */}
        <Button
          onClick={connectWallet}
          variant="primary"
          className="w-full"
        >
          Connect Wallet
        </Button>
      </Card>
    );
  }

  // Display status message
  const StatusMessage = () => {
    if (txStatus === 'pending') {
        return (
            <div className="flex items-center p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Transaction sent. Awaiting confirmation...
                {txHash && (
                    <a href={`https://amoy.polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm underline">View Tx</a>
                )}
            </div>
        );
    }
    if (txStatus === 'success') {
        return (
            <div className="flex items-center p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Bid placed successfully!
            </div>
        );
    }
    if (txStatus === 'error') {
        return (
            <div className="flex items-center p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Transaction Error. See console.
            </div>
        );
    }
    if (state.message !== initialState.message && !state.success) {
        return (
            <div className="flex items-center p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                {state.message}
            </div>
        );
    }
    return null;
  };


  return (
    // Replaced raw div with Card component
    <Card borderColor="teal" className="shadow-2xl space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
        <Gavel className="w-6 h-6 mr-2 text-red-600" /> Place Your Bid
      </h3>
      
      <StatusMessage />

      <p className="text-sm text-gray-600">
        You are currently bidding as: <span className="font-mono text-teal-600">{shortenAddress(address!)}</span>
      </p>

      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="auctionId" value={auction.auctionId.toString()} />
        
        {/* Bid Input */}
        <div>
          <label htmlFor="bidAmountEther" className="block text-sm font-medium text-gray-700 mb-2">
            Your Bid (WETH/ETH)
          </label>
          <div className="relative">
            <input
              id="bidAmountEther"
              name="bidAmountEther"
              type="number"
              step="0.000001"
              min={minBidEther}
              required
              placeholder={minBidEther}
              className="w-full p-4 border-2 border-gray-300 rounded-lg pr-16 text-lg focus:ring-teal-500 focus:border-teal-500 transition"
              disabled={isAuctionOver}
            />
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 font-semibold">
              ETH
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Minimum required bid: <span className="font-bold text-teal-600">{minBidEther} ETH</span>
          </p>
          {state.errors?.bidAmountEther && (
            <p className="mt-1 text-xs text-red-500">{state.errors.bidAmountEther.join(', ')}</p>
          )}
        </div>

        <SubmitButton loading={txLoading} isAuctionOver={isAuctionOver} />
      </form>
    </Card>
  );
};
