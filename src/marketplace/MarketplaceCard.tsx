// src/marketplace/MarketplaceCard.tsx
import React from "react";
import { MarketplaceItem } from "./types";

export const MarketplaceCard: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer">
    <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-md" />
    <h3 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h3>
    <p className="text-sm text-gray-600">{item.description}</p>
    <p className="mt-1 text-teal-600 font-medium text-sm">Owner: {item.ownerName}</p>
  </div>
);