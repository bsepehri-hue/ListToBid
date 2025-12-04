// components/auction/BidHistory.tsx
"use client";

export default function BidHistory() {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Bid History</h3>
      <ul className="list-disc pl-5 text-gray-700">
        <li>No bids yet</li>
      </ul>
    </div>
  );
}