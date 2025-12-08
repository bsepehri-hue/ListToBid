// src/types/auction.ts
export interface AuctionData {
  auctionId: string;
  currentBid: string | undefined;
  listingName: string;
  sellerAddress?: string;
  endsAt?: string;
  description?: string;
  imageUrl?: string;
  itemUri?: string;
  storefrontId?: string | number;
  highestBidder?: string; // <-- add this line
}