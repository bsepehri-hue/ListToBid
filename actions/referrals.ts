// actions/referral.ts

// Create a referral link (placeholder)
export async function createReferralLink(userId: string) {
  return `https://example.com/referral/${userId}`;
}

// Get referral stats (placeholder)
export async function getReferralStats(userId: string) {
  return {
    clicks: 0,
    signups: 0,
    earnings: 0,
  };
}

// ✅ Add missing export so imports resolve
export async function getReferralActivity(userId: string) {
  // Replace with Firestore query later
  return [
    { id: 1, type: "click", date: "2025-12-01" },
    { id: 2, type: "signup", date: "2025-12-02" },
  ];
}