// src/marketplace/mockData.ts
import { MarketplaceItem } from "./types";

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: "mp-001",
    title: "Emily's Crafts Storefront",
    description: "Handmade crafts and decor.",
    ownerId: "0x1234...ABCD",
    ownerName: "Emily",
    type: "storefront",
    imageUrl: "https://placehold.co/400x200/2ecc71/white?text=Emily+Storefront",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "mp-002",
    title: "Rare Emerald Necklace Auction",
    description: "Limited edition jewelry auction.",
    ownerId: "0x5678...EFGH",
    ownerName: "Jumper",
    type: "auction",
    imageUrl: "https://placehold.co/400x200/00d164/white?text=Emerald+Auction",
    createdAt: new Date("2025-02-01"),
  },
];