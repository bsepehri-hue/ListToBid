"use client";

// components/profile/ActivityList.tsx

import { RecentActivity, getActivityIcon } from "@/lib/mockData/profile";

interface ActivityListProps {
  activities: RecentActivity[]; // ✅ unified type
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {activities.slice(0, 5).map((activity) => {
        const Icon = getActivityIcon(activity.type);
        const timeAgo = Math.floor(
          (Date.now() - activity.timestamp.getTime()) / (1000 * 60 * 60)
        ); // Hours ago

        return (
          <div key={activity.id} className="flex items-center py-4">
            <Icon className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500">{timeAgo} hours ago</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}