// app/lib/activity.ts
// Stub for activity utilities

export interface Activity {
  id: string;
  type: string;
  timestamp: Date;
  description?: string;
}

// Example placeholder function
export function getActivity(): Activity[] {
  return [
    { id: "1", type: "login", timestamp: new Date(), description: "User logged in" },
    { id: "2", type: "purchase", timestamp: new Date(), description: "User made a purchase" },
  ];
}