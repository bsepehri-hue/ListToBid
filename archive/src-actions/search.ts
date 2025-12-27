// src/actions/search.ts

import { SectionedResults } from "@/lib/mockData/search";

// Placeholder global search action
export async function globalSearch(query: string): Promise<SectionedResults> {
  // Replace with Firestore/Algolia/etc. later
  return {
    Storefront: [
      { id: "1", type: "Storefront", title: "Demo Store", subtitle: "Sample storefront", link: `/storefronts/1` },
    ],
    Auction: [
      { id: "2", type: "Auction", title: "Demo Auction", subtitle: "Sample auction", link: `/auctions/2` },
    ],
    Category: [
      { id: "3", type: "Category", title: "Demo Category", subtitle: "Sample category", link: `/categories/3` },
    ],
  };
}