// app/lib/activity.ts
export interface Activity {
  id: string;
  type: string;
  timestamp: Date;
  description?: string;
}

export function getActivity(): Activity[] {
  return [
    { id: "1", type: "login", timestamp: new Date(), description: "User logged in" },
    { id: "2", type: "purchase", timestamp: new Date(), description: "User made a purchase" },
  ];
}

// ✅ alias for compatibility with page.tsx
export function getRecentActivity(): Activity[] {
  return getActivity();
}