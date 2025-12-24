// SERVER COMPONENT — no "use client"

import { getUnifiedTimeline } from "../actions/timeline";
import ActivityTimelineClient from "../../components/timeline/ActivityTimelineClient";

export default async function TimelineFetcher() {
  const rawEvents = await getUnifiedTimeline();

  const events = rawEvents.map((e) => ({
    id: e.id,
    type: e.type,
    label: e.label,
    timestamp: e.timestamp,
  }));

  return <ActivityTimelineClient timeline={events} />;
}