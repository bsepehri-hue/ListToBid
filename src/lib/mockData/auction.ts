import type { AuctionData } from '@/types/auction';

export const mockBidHistory: AuctionData[] = [
  {
    id: '1',
    title: 'Sample Auction',
    bids: [
      { amount: '1000000000000000000', bidder: '0x123...', timestamp: Date.now() }
    ],
  },
];