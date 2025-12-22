"use client";

import React from "react";
import AuctionCard from "@/auctions/AuctionCard";
import { fetchAllActiveAuctions } from "@/lib/web3/dataFetcher";
import { AuctionData } from "@/types/auction";
import { Gavel, AlertTriangle } from "lucide-react";

export default function AuctionsPage() {
  return (
    <div className="l2b-page l2b-py-8">
      {/* Header */}
      <div className="l2b-container l2b-flex-between l2b-items-center l2b-border-b l2b-pb-4 l2b-mb-8">
        <h1 className="l2b-text-3xl l2b-text-bold l2b-flex l2b-items-center">
          <Gavel className="w-8 h-8 l2b-mr-3 l2b-text-primary" />
          Live ListToBid Auctions
        </h1>

        <p className="l2b-text-muted l2b-hidden md:l2b-block">
          Bid on the hottest listings before the clock runs out!
        </p>
      </div>

      {/* Fetcher */}
      <AuctionsFetcher />
    </div>
  );
}

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

  // Error state
  if (error) {
    return (
      <div className="l2b-p-4 l2b-bg-critical/10 l2b-border l2b-border-critical l2b-text-critical l2b-rounded l2b-flex l2b-items-center l2b-gap-3 l2b-mb-8">
        <AlertTriangle className="w-5 h-5" />
        <p className="l2b-text-sm l2b-text-bold">
          {error} Showing mock data for demonstration.
        </p>
      </div>
    );
  }

  // Empty state
  if (auctions.length === 0) {
    return (
      <div className="l2b-text-center l2b-py-20 l2b-bg-white l2b-rounded l2b-shadow">
        <p className="l2b-text-muted l2b-text-lg l2b-text-bold">
          No active auctions found. Check back later!
        </p>
      </div>
    );
  }

  // Grid of auctions
  return (
    <div className="l2b-grid l2b-gap-8 sm:l2b-grid-cols-2 lg:l2b-grid-cols-3 xl:l2b-grid-cols-4">
      {auctions.map((auction) => (
        <AuctionCard key={auction.auctionId} auction={auction} />
      ))}
    </div>
  );
}