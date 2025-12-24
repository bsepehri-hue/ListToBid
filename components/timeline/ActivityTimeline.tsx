"use client";

// components/timeline/ActivityTimeline.tsx
"use client";

import React from "react";
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
      {timeline.map((event) => (
        <div key={event.id} className="border p-3 rounded-md shadow-sm">
          <div className="font-semibold">{event.label}</div>
          <div className="text-sm text-gray-500">
            {formatDuration(Math.floor((Date.now() - event.timestamp) / 1000))} ago
          </div>
        </div>
      ))}
    </div>
  );
}