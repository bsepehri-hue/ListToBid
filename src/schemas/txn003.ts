import { BaseTransaction } from './baseTransaction';

export interface Txn003 extends BaseTransaction {
  auctionId: string;
  bidAmount: number;
  amount: number;
}