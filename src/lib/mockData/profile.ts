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

// ✅ Define RecentActivity type
export interface RecentActivity {
  id: number;
  action: string;
  date: string; // ISO string for simplicity
}

// ✅ Provide mockRecentActivity array
export const mockRecentActivity: RecentActivity[] = [
  { id: 1, action: "Created storefront", date: "2025-12-01" },
  { id: 2, action: "Placed bid", date: "2025-12-02" },
  { id: 3, action: "Referred a friend", date: "2025-12-03" },
];

// ✅ Provide getActivityIcon helper
import { Zap, Clock } from "lucide-react";

export function getActivityIcon(action: string) {
  switch (action) {
    case "Created storefront":
    case "Placed bid":
      return Zap;
    case "Referred a friend":
    default:
      return Clock;
  }
}