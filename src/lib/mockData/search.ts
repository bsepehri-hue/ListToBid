// src/lib/mockData/search.ts

// Define the entity types exactly as used in your UI
export type SearchEntityType = "Storefront" | "Auction" | "Category";

// A single search result item
export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle?: string;   // ✅ added for secondary text
  description?: string;
  link: string;        // ✅ added for navigation
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
    {
      id: "s1",
      type: "Storefront",
      title: "Alice's Boutique",
      subtitle: "Handmade fashion and accessories",
      description: "Unique pieces crafted with care",
      link: "/store/alice",
    },
    {
      id: "s2",
      type: "Storefront",
      title: "Bob's Electronics",
      subtitle: "Latest gadgets and devices",
      description: "Affordable tech for everyday use",
      link: "/store/bob",
    },
  ],
  Auction: [
    {
      id: "a1",
      type: "Auction",
      title: "Vintage Guitar Auction",
      subtitle: "Rare instruments up for bid",
      description: "Classic guitars from the 60s and 70s",
      link: "/auction/guitars",
    },
  ],
  Category: [
    {
      id: "c1",
      type: "Category",
      title: "Home & Garden",
      subtitle: "Furniture, decor, and more",
      description: "Curated items for your living space",
      link: "/category/home-garden",
    },
    {
      id: "c2",
      type: "Category",
      title: "Sports",
      subtitle: "Gear and equipment for all levels",
      description: "From beginner to pro",
      link: "/category/sports",
    },
  ],
};