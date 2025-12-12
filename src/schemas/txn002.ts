import { BaseTransaction } from './baseTransaction';

export interface Txn002 extends BaseTransaction {
  merchantId: string;
  netValue: number;
  amount: number;
  discountApplied?: number; // optional if discounts are applied
}