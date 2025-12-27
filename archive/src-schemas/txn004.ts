import { BaseTransaction } from './baseTransaction';

export interface Txn004 extends BaseTransaction {
  vaultId: string;        // anchor to vault record
  userId: string;         // anchor to user who locked funds
  amount: number;         // amount locked in the vault
  lockPeriod: number;     // lock duration in days
}