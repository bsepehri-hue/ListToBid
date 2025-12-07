// lib/mockData/profile.ts

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

// ✅ Add missing export so imports resolve
export const mockActivity = [
  { id: 1, action: "Created storefront", date: "2025-12-01" },
  { id: 2, action: "Placed bid", date: "2025-12-02" },
  { id: 3, action: "Referred a friend", date: "2025-12-03" },
];
