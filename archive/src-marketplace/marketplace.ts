// src/marketplace/marketplace.ts
import { MarketplaceItem } from "./types";
import { mockMarketplaceItems } from "./mockData";

/**
 * Fetch marketplace items by aggregating storefronts + auctions.
 * Replace with real Firestore/contract calls later.
 */
export async function fetchMarketplaceItems(): Promise<MarketplaceItem[]> {
  // TODO: integrate with lib/data/storefront + lib/data/auction
  return mockMarketplaceItems;
}