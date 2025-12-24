// SERVER COMPONENT
import { getUnifiedTimeline } from "../actions/timeline";
import { ActivityTimeline } from "../../components/timeline/ActivityTimeline";

export default async function TimelineFetcher() {
  const rawEvents = await getUnifiedTimeline();

  const events = rawEvents.map(e => ({
    id: e.id,
    title: e.label,
    date: new Date(e.timestamp).toISOString(),
    type: e.type
  }));

  return <ActivityTimeline timeline={events} />;
}