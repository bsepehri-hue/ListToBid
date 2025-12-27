// src/lib/mockData/auction.ts
import type { AuctionData } from "@/types/auction";

export const mockBidHistory: AuctionData[] = [
  {
    auctionId: "1",
    title: "Sample Auction",
    listingName: "Vintage Camera",
    sellerAddress: "0xSeller123...",
    description: "A classic vintage camera in great condition.",
    startingBid: "1000000000000000000", // 1 ETH
    currentBid: "1000000000000000000",
    highestBidder: "0x123...",
    imageUrl: "https://placehold.co/300x300",
    itemUri: "https://placehold.co/300x300",
    storefrontId: "1",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    endsAt: new Date(Date.now() + 86400000 * 3), // ends in 3 days

    bids: [
      {
        bidAmount: "1000000000000000000",
        bidderAddress: "0x123...",
        timestamp: new Date(),
      },
    ],
  },
];