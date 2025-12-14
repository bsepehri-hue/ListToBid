// src/marketplace/types.ts

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  type: "storefront" | "auction";
  imageUrl: string;
  createdAt: Date;
}

export interface MarketplaceSummary {
  totalStorefronts: number;
  totalAuctions: number;
  latestItems: MarketplaceItem[];
}