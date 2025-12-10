// src/lib/mockData/search.ts

// Define the entity types exactly as used in your UI switch
export type SearchEntityType = "Storefront" | "Auction" | "Category";

// A single search result item
export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  description?: string;
  link: string;   // ✅ add this
}

// Sectioned results for grouping by entity type
export interface SectionedResults {
  Storefront: SearchResult[];
  Auction: SearchResult[];
  Category: SearchResult[];
}

// ✅ Example mock data
export const mockSearchResults: SectionedResults = {
  Storefront: [
    { id: "s1", type: "Storefront", title: "Alice's Boutique", description: "Handmade fashion and accessories" },
    { id: "s2", type: "Storefront", title: "Bob's Electronics", description: "Latest gadgets and devices" },
  ],
  Auction: [
    { id: "a1", type: "Auction", title: "Vintage Guitar Auction", description: "Rare instruments up for bid" },
  ],
  Category: [
    { id: "c1", type: "Category", title: "Home & Garden", description: "Furniture, decor, and more" },
    { id: "c2", type: "Category", title: "Sports", description: "Gear and equipment for all levels" },
  ],
};