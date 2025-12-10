// src/lib/mockData/search.ts
export type SearchEntityType = "store" | "auction" | "tag";

export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  description?: string;
}

export interface SectionedResults {
  stores: SearchResult[];
  auctions: SearchResult[];
  tags: SearchResult[];
}