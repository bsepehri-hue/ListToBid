// src/marketplace/MarketplaceGrid.tsx
import React from "react";
import { MarketplaceItem } from "./types";
import { MarketplaceCard } from "./MarketplaceCard";

export const MarketplaceGrid: React.FC<{ items: MarketplaceItem[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item) => (
      <MarketplaceCard key={item.id} item={item} />
    ))}
  </div>
);