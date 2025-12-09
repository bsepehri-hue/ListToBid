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
export async function getReferralStats(stewardId: string) {
  // Placeholder: return dummy stats until Firestore logic is added
  return {
    totalReferrals: 5,
    activeReferrals: 3,
    pendingReferrals: 2,
  };
}

// ✅ Stub for referral activity
export async function getReferralActivity(stewardId: string) {
  // Placeholder: return dummy activity
  return [
    {
      id: "1",
      type: "referral_created",
      timestamp: new Date(),
      description: "Referral link generated",
    },
    {
      id: "2",
      type: "referral_used",
      timestamp: new Date(),
      description: "Referral completed a sale",
    },
  ];
}