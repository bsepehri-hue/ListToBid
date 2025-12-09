// src/lib/mockData/referrals.ts

// Type for referral stats
export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  pendingReferrals: number;
}

// Type for referral activity
export interface ReferralActivity {
  id: string;
  referrer: string;
  amount: number;
  timestamp?: Date;
  description?: string;
}

// Example mock stats
export const mockReferralStats: ReferralStats = {
  totalReferrals: 2,
  activeReferrals: 1,
  pendingReferrals: 1,
};

// Example mock activity
export const mockReferrals: ReferralActivity[] = [
  { id: "1", referrer: "Alice", amount: 50, timestamp: new Date(), description: "Referral created" },
  { id: "2", referrer: "Bob", amount: 75, timestamp: new Date(), description: "Referral used" },
];