import { useEffect, useState } from 'react';
import { getRecentActivity } from '@/lib/activity';

export default function ActivityPage({ stewardId }: { stewardId: string }) {
  const [events, setEvents] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchActivity() {
      const recent = await getRecentActivity(stewardId, 50); // fetch more for full page
      setEvents(recent);
    }
    fetchActivity();
  }, [stewardId]);

  const filteredEvents =
    filter === 'all'
      ? events
      : events.filter((e) => e.type.startsWith(filter));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Activity Timeline</h1>

      {/* Filter buttons */}
      <div className="flex gap-4">
        {['all', 'storefront', 'sale', 'payout'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === f
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <ul className="space-y-4">
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            className="border-b pb-2 text-sm text-gray-700 flex justify-between"
          >
            <span>{event.message}</span>
            <span className="text-gray-500">
              {new Date(event.timestamp.seconds * 1000).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}