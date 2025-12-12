import { BaseTransaction } from './baseTransaction';

export interface Txn001 extends BaseTransaction {
  merchantId: string;
  netValue: number;
  amount: number;
}