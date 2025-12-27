// src/marketplace/MarketplaceFilters.tsx
import React from "react";

export const MarketplaceFilters: React.FC = () => (
  <div className="flex gap-4 mb-6">
    <input
      type="text"
      placeholder="Search listings..."
      className="border rounded-md px-3 py-2 w-full"
    />
    <select className="border rounded-md px-3 py-2">
      <option value="">All Categories</option>
      <option value="storefront">Storefronts</option>
      <option value="auction">Auctions</option>
    </select>
  </div>
);