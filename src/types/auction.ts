export interface AuctionData {
  auctionId: string;
  currentBid?: string;
  listingName: string;
  sellerAddress: string;   // <-- make required
  endsAt?: string;
  description: string;
  imageUrl?: string;
  itemUri?: string;
  storefrontId?: string | number;
  highestBidder?: string;
  title: string;
  startingBid: string;
  createdAt: string;
}