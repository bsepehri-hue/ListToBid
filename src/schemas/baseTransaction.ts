// Base anchors shared by all transaction types
export interface BaseTransaction {
  transactionId: string;   // unique ID for the transaction
  status: string;          // e.g. "pending", "complete", "failed"
  createdAt: Date;         // when the transaction was created
  updatedAt: Date;         // when the transaction was last updated
  externalCosts?: number;  // optional audit field for fees/extra costs
}