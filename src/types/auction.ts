export interface AuctionData {
  auctionId: string;
  currentBid?: string;
  listingName: string;
  sellerAddress?: string;
  endsAt?: string;
  description: string;   // <-- make required
  imageUrl?: string;
  itemUri?: string;
  storefrontId?: string | number;
  highestBidder?: string;
  title: string;
  startingBid: string;
  createdAt: string;
}