export interface Txn001 extends BaseTransaction {
  merchantId: string;        // anchor to merchant profile
  storefrontId?: string;     // optional, links to storefront
  referrerId?: string;       // optional, for referral payouts
  netValue: number;          // merchant net after fees
  amount: number;            // gross transaction amount
  externalCosts?: number;    // shipping, handling, etc.
}