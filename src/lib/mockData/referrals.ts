// src/actions/referral.ts
import type { ReferralActivity } from "@/lib/mockData/referrals";

export async function getReferralActivity(stewardId: string): Promise<ReferralActivity[]> {
  // Placeholder: return dummy activity
  return [
    {
      id: "1",
      referrer: "Alice",
      amount: 50,
      timestamp: new Date(),
      description: "Referral created",
    },
    {
      id: "2",
      referrer: "Bob",
      amount: 75,
      timestamp: new Date(),
      description: "Referral used",
    },
  ];
}