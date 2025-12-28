"use client";

import { TIMELINE_META } from "@/lib/timelineMap";
import { formatDuration } from "@/lib/utils";
import { groupTimelineByDay } from "@/lib/groupTimeline";

type TimelineEvent = {
  id: string;
  type: string;
  label: string;
  timestamp: number;
};

export default function ActivityTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  const groups = groupTimelineByDay(timeline);

  return (
    <div className="space-y-10">
      {Object.entries(groups).map(([day, events]) => (
        <div key={day} className="space-y-4">
          {/* Day Header */}
          <h3 className="text-lg font-semibold text-gray-700">{day}</h3>

          {/* Events */}
          {events.map((event) => {
            const meta = TIMELINE_META[event.type] ?? TIMELINE_META.system;
            const Icon = meta.icon;

            return (
              <div
                key={event.id}
                className="flex items-start gap-3 border p-4 rounded-md shadow-sm bg-white"
              >
                {/* Icon */}
                <div className={`mt-1 ${meta.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div>
                  <div className="font-semibold text-gray-900">{event.label}</div>
                  <div className="text-sm text-gray-500">
                    {formatDuration(Math.floor((Date.now() - event.timestamp) / 1000))} ago
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}