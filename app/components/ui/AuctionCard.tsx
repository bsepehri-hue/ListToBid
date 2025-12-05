// app/components/ui/AuctionCard.tsx
import React from "react";

export function AuctionCard({ title }: { title: string }) {
  return (
    <div className="auction-card">
      <h3>{title}</h3>
    </div>
  );
}