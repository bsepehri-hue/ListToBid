import React from 'react';
import { TimelineEvent } from '@/types/timeline';
import { formatDuration, intervalToDuration } from 'date-fns';

export const ActivityTimeline: React.FC<{ timeline?: TimelineEvent[] }> = ({ timeline = [] }) => {
  return (
    <div className="space-y-4">
      {timeline.map((event) => (
        <div key={event.id} className="border p-3 rounded-md shadow-sm">
          <div className="font-semibold">{event.label}</div>
          <div className="text-sm text-gray-500">
            {formatDuration(intervalToDuration({ start: event.timestamp, end: Date.now() }))} ago
          </div>
        </div>
      ))}
    </div>
  );
};