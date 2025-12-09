// src/actions/referral.ts

/**
 * Referral actions: placeholder for referral logic.
 * Expand these to handle referral codes, tracking, stats, etc.
 */

export const createReferral = (referrerId: string, referredId: string) => {
  return {
    referrerId,
    referredId,
    createdAt: new Date().toISOString(),
  };
};

// ✅ Stub for referral stats
export async function getReferralStats(stewardId: string): Promise<ReferralStats> {
  // Placeholder: return dummy stats until Firestore logic is added
  return {
    totalReferrals: 5,
    totalEarnings: BigInt(500),
    pendingEarnings: BigInt(200),
    paidEarnings: BigInt(300),
  };
}

// ✅ Stub for referral activity
import type { ReferralActivity } from "@/lib/mockData/referrals";

export async function getReferralActivity(stewardId: string): Promise<ReferralActivity[]> {
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