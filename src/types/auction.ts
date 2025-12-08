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
  highestBidder?: string; // <-- add this
}