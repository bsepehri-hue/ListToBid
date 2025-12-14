// lib/mockData/auction.ts

// A single mock auction item
export const mockAuction = {
  id: 1,
  title: "Sample Auction",
  description: "This is a placeholder auction item.",
  bids: [],
};

// ✅ Add missing export so imports resolve
export const mockBidHistory = [
  { id: 1, bidder: "Alice", amount: 100, date: "2025-12-01" },
  { id: 2, bidder: "Bob", amount: 150, date: "2025-12-02" },
];
