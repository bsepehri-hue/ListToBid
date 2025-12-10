"use client";

type Activity = {
  id: number;
  action: string;
  date: string;
};

type ActivityListProps = {
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-sm text-gray-500">No activity yet.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id} className="text-sm text-gray-700">
              <span className="font-medium">{activity.action}</span>{" "}
              <span className="text-gray-500">{activity.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}