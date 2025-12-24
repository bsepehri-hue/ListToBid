// app/(dashboard-group)/TimelineFetcher.tsx
"use client";

import React, { useEffect, useState } from "react";
import ActivityTimeline from "../../components/timeline/ActivityTimeline";
import { TimelineEvent } from "@/types/timeline";
import { Loader2 } from "lucide-react";

export default function TimelineFetcher() {
  const [events, setEvents] = useState<TimelineEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/timeline");
        if (!res.ok) {
          throw new Error("Failed to fetch timeline");
        }
        const data = await res.json();
        if (!cancelled) {
          setEvents(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message ?? "Unknown error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Failed to load timeline: {error}
      </div>
    );
  }

  if (!events) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading timeline...
      </div>
    );
  }

  return <ActivityTimeline timeline={events} />;
}