// src/components/ui/AuctionCard.tsx
"use client";

import React from "react";
import { AuctionData } from "@/types/auction";

type AuctionCardProps = {
  auction: AuctionData;
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <div className="rounded-lg shadow-md bg-white p-4">
      <img
        src={auction.imageUrl}
        alt={auction.listingName}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{auction.listingName}</h2>
      <p className="text-gray-600 mb-2">{auction.description}</p>
      <p className="text-teal-600 font-semibold">
        Current Bid: {auction.currentBid ?? auction.startingBid}
      </p>
    </div>
  );
}