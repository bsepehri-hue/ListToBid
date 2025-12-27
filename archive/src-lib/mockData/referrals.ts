// src/lib/mockData/referrals.ts

export enum ReferralActivityType {
  CREATED = "CREATED",
  USED = "USED",
  EARNING = "EARNING",
  PAYOUT = "PAYOUT",
}

export interface ReferralStats {
  totalReferrals: number;
  totalEarnings: bigint;
  pendingEarnings: bigint;
  paidEarnings: bigint;
}

export interface ReferralActivity {
  id: string;
  referralId: string;
  type: ReferralActivityType;
  amountEarned: number;
  timestamp: Date;
  description: string;
}

// Icon helper used by ReferralActivityTable
export function getReferralActivityIcon(type: ReferralActivityType) {
  switch (type) {
    case ReferralActivityType.CREATED:
      return "UserPlus";
    case ReferralActivityType.USED:
      return "CheckCircle";
    case ReferralActivityType.EARNING:
      return "Coins";
    case ReferralActivityType.PAYOUT:
      return "ArrowDownCircle";
    default:
      return "Circle";
  }
}

// Correct mock stats
export const mockReferralStats: ReferralStats = {
  totalReferrals: 2,
  totalEarnings: BigInt(125),
  pendingEarnings: BigInt(0),
  paidEarnings: BigInt(0),
};

// Correct mock activity list
export const mockReferrals: ReferralActivity[] = [
  {
    id: "1",
    referralId: "REF-001",
    type: ReferralActivityType.CREATED,
    amountEarned: 0,
    timestamp: new Date(),
    description: "Referral created by Alice",
  },
  {
    id: "2",
    referralId: "REF-001",
    type: ReferralActivityType.EARNING,
    amountEarned: 50,
    timestamp: new Date(),
    description: "Alice earned 50 credits",
  },
];