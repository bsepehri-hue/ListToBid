// src/storefronts/mockData.ts

import { Storefront } from "./types";

/**
 * A placeholder mock storefront dataset.
 * Replace with real data or Firestore queries later.
 */
export const mockStorefronts: Storefront[] = [
  {
    id: "sf-001",
    name: "Sample Storefront Alpha",
    ownerId: "0x1234567890abcdef",
    ownerName: "Alice",
    description: "A demo storefront for testing UI components.",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "sf-002",
    name: "Sample Storefront Beta",
    ownerId: "0xabcdef1234567890",
    ownerName: "Bob",
    description: "Another demo storefront with placeholder data.",
    createdAt: new Date("2025-02-01"),
  },
];