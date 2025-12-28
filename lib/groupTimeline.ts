export function groupTimelineByDay(events) {
  const groups: Record<string, any[]> = {};

  for (const event of events) {
    const date = new Date(event.timestamp);
    const key = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
  }

  return groups;
}