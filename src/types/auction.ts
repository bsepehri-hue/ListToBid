// src/types/auction.ts
export interface AuctionData {
  auctionId: string;
  currentBid?: string;
  listingName: string;
  sellerAddress?: string;
  endsAt?: string;
  description?: string;
  imageUrl?: string;
  itemUri?: string;
  storefrontId?: string | number;
  highestBidder?: string;
  title: string;          // <-- make required
  startingBid: string;    // <-- also required if BiddingForm expects it
  createdAt: string;      // <-- required too
}