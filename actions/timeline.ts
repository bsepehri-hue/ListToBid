// actions/timeline.ts

/**
 * Returns a stubbed unified timeline for dashboard rendering.
 */
export const getUnifiedTimeline = async () => {
  return [
    {
      id: 'evt1',
      type: 'sale',
      label: 'Sold item: Handmade Mug',
      timestamp: Date.now() - 3600 * 1000,
    },
    {
      id: 'evt2',
      type: 'referral',
      label: 'New referral: @craftlover',
      timestamp: Date.now() - 7200 * 1000,
    },
    {
      id: 'evt3',
      type: 'payout',
      label: 'Payout processed: $42.00',
      timestamp: Date.now() - 10800 * 1000,
    },
  ];
};
