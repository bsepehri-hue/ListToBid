export interface AuctionData {
  auctionId: string;
  currentBid?: string;
  listingName: string;
  sellerAddress: string;
  endsAt: Date;
  description: string;
  imageUrl?: string;
  itemUri?: string;
  storefrontId?: string | number;
  highestBidder?: string;
  title: string;
  startingBid: string;
  createdAt: Date;
}

export interface Bid {
  bidder: string;
  amount: bigint;   // Bid amount in Wei
  timestamp: Date;
}