import { BaseTransaction } from './baseTransaction';

export interface Txn003 extends BaseTransaction {
  auctionId: string;        // anchor to auction event
  bidderId: string;         // anchor to user placing the bid
  merchantId?: string;      // optional, links to merchant/storefront
  bidAmount: number;        // amount offered in the bid
  amount: number;           // final transaction amount if bid wins
}