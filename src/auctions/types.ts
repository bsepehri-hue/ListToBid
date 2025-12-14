import { shortenAddress } from "@/lib/utils";

/** Represents a single bid in the history. */
export interface Bid {
  bidder: string;
  amount: bigint; // Bid amount in Wei
  timestamp: Date;
}

/**
 * Mocks the bid history for a single auction.
 */
export const mockBidHistory: Bid[] = [
  {
    bidder: '0x1fA2bE5F6B9d1d4d8c7D72A9C0f3C9E4b5A6D7E8',
    amount: BigInt('500000000000000000'), // 0.5 ETH
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
  },
  {
    bidder: '0x2bE4b5A6D7E81fA2bE5F6B9d1d4d8c7D72A9C0f3C',
    amount: BigInt('450000000000000000'), // 0.45 ETH
    timestamp: new Date(Date.now() - 3600000 * 4), // 4 hours ago
  },
  {
    bidder: '0x3C9E4b5A6D7E81fA2bE5F6B9d1d4d8c7D72A9C0f3',
    amount: BigInt('300000000000000000'), // 0.3 ETH
    timestamp: new Date(Date.now() - 3600000 * 6), // 6 hours ago
  },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
