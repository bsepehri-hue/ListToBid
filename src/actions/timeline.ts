// actions/timeline.ts


export async function getTimeline() {
  return [
    { id: "1", type: "LOGIN", label: "User logged in", timestamp: Date.now() },
    { id: "2", type: "BID", label: "Placed a bid", timestamp: Date.now() - 60000 },
  ];
}
export async function getUnifiedTimeline() {
  // For now, just reuse getTimeline
  return getTimeline();
}
