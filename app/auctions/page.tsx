"use client";

import React from "react";
import { AuctionCard } from "@/components/ui/AuctionCard";
import { fetchAllActiveAuctions, AuctionData } from "@/lib/web3/dataFetcher";
import { Gavel, AlertTriangle } from "lucide-react";

// Page wrapper
export default function AuctionsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Header and Title Block */}
      <div className="mb-10 flex items-center justify-between border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <Gavel className="w-8 h-8 mr-3 text-red-600" />
          Live ListToBid Auctions
        </h1>
        <p className="text-gray-500 hidden md:block">
          Bid on the hottest listings before the clock runs out!
        </p>
      </div>

      {/* Fetcher handles async logic */}
      <AuctionsFetcher />
    </div>
  );
}

// Component to handle fetching and rendering
function AuctionsFetcher() {
  const [auctions, setAuctions] = React.useState<AuctionData[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchAllActiveAuctions()
      .then(setAuctions)
      .catch(() =>
        setError("Failed to load active auction data from the blockchain.")
      );
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-3 mb-8">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium">{error} Showing mock data for demonstration.</p>
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div className="text-center p-20 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500 text-xl font-medium">
          No active auctions found. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
}
