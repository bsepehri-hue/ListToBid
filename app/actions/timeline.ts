"use client";

import { TIMELINE_META } from "@/lib/timelineMap";
import { formatDuration } from "@/lib/utils";

type TimelineEvent = {
  id: string;
  type: string;
  label: string;
  timestamp: number;
};

export default function ActivityTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className="space-y-4">
      {timeline.map((event) => {
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
  );
}