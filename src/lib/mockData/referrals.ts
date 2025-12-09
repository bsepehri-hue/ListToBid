// src/lib/mockData/referrals.ts

export interface ReferralStats {
  totalReferrals: number;
  totalEarnings: bigint;
  pendingEarnings: bigint;
  paidEarnings: bigint;
}

export interface ReferralActivity {
  id: string;
  referrer: string;
  amount: number;
  timestamp: Date;
  description: string;
}

// Optional mock data
export const mockReferralStats: stats = {
  totalReferrals: 0,
  totalEarnings: BigInt(0),
  pendingEarnings: BigInt(0),
  paidEarnings: BigInt(0),
};

export const mockReferrals: ReferralActivity[] = [
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