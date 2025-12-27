import { BaseTransaction } from './baseTransaction';

export interface Txn002 extends BaseTransaction {
  merchantId: string;          // anchor to merchant profile
  stewardId?: string;          // optional, links to steward for payout tracking
  referrerId?: string;         // optional, for referral discounts
  netValue: number;            // merchant net after fees/discounts
  amount: number;              // gross transaction amount
  discountApplied?: number;    // optional, discount amount (absolute or % depending on logic)
}