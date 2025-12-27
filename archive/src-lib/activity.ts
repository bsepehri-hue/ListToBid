// app/lib/activity.ts
// Stub for activity utilities

export interface Activity {
  id: string;
  type: string;
  timestamp: Date;
  description?: string;
}

// Accept stewardId and limit
export async function getRecentActivity(
  stewardId: string,
  limit: number
): Promise<Activity[]> {
  // For now, just return dummy data
  const sample: Activity[] = [
    {
      id: "1",
      type: "login",
      timestamp: new Date(),
      description: `User ${stewardId} logged in`,
    },
    {
      id: "2",
      type: "purchase",
      timestamp: new Date(),
      description: `User ${stewardId} made a purchase`,
    },
  ];

  // Slice to respect the limit
  return sample.slice(0, limit);
}