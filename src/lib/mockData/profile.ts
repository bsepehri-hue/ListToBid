// lib/mockData/profile.ts

import { Zap, Clock } from "lucide-react";

export interface Profile {
  id: string;
  name: string;
  email: string;
}

// A single mock profile
export const mockProfile: Profile = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
};

// ✅ Define RecentActivity type with fields used in RecentActivityList.tsx
export interface RecentActivity {
  id: number;
  type: "purchase" | "sale" | "login" | "logout" | "referral"; // adjust categories as needed
  description: string;
  timestamp: Date;
}

// ✅ Provide mockRecentActivity array
export const mockRecentActivity: RecentActivity[] = [
  {
    id: 1,
    type: "purchase",
    description: "Created storefront",
    timestamp: new Date("2025-12-01"),
  },
  {
    id: 2,
    type: "sale",
    description: "Placed bid",
    timestamp: new Date("2025-12-02"),
  },
  {
    id: 3,
    type: "referral",
    description: "Referred a friend",
    timestamp: new Date("2025-12-03"),
  },
];

// ✅ Provide getActivityIcon helper
export function getActivityIcon(type: RecentActivity["type"]) {
  switch (type) {
    case "purchase":
    case "sale":
      return Zap;
    case "login":
    case "logout":
    case "referral":
    default:
      return Clock;
  }
}