export interface AuctionData {
  auctionId: string;
  currentBid?: string;
  listingName: string;
  sellerAddress: string;
  endsAt: Date;           // <-- make required Date
  description: string;
  imageUrl?: string;
  itemUri?: string;
  storefrontId?: string | number;
  highestBidder?: string;
  title: string;
  startingBid: string;
  createdAt: string;
}