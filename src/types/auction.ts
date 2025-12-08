// src/types/auction.ts

export interface AuctionData {
  auctionId: string;
  currentBid: string | undefined;
  listingName: string;        // <-- added to match your JSX usage
  sellerAddress?: string;     // optional, if you track seller
  endsAt?: string;            // ISO date string for auction end
  description?: string;       // optional description
  imageUrl?: string;          // optional image
}