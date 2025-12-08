// src/types/auction.ts
export interface AuctionData {
  auctionId: string;
  currentBid: string | undefined;
  listingName: string;
  sellerAddress?: string;
  endsAt?: string;
  description?: string;
  imageUrl?: string;
  itemUri?: string;   // <-- add this to match your JSX usage
}