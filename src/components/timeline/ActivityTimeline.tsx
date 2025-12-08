import React from 'react';
import { TimelineEvent } from '@/types/timeline';

export const ActivityTimeline: React.FC<{ timeline?: TimelineEvent[] }> = ({ timeline = [] }) => {
  return (
    <div className="space-y-4">
      {timeline.map((event) => (
        <div key={event.id} className="border p-3 rounded-md shadow-sm">
          <div className="font-semibold">{event.title}</div>
          <div className="text-sm text-gray-500">
            {new Date(event.date).toLocaleString()}
          </div>
          {event.description && (
            <div className="text-sm text-gray-700">{event.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};