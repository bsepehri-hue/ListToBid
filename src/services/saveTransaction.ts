import { firestore } from 'firebase-admin';

// Map transaction types to Firestore collections
const collections: Record<string, string> = {
  txn001: 'transactions_001',
  txn002: 'transactions_002',
  txn003: 'transactions_003',
  txn004: 'transactions_004',
};

export async function saveTransaction<T>(
  type: keyof typeof collections,
  transaction: T
): Promise<void> {
  const collectionName = collections[type];
  const ref = firestore().collection(collectionName);

  // Use transactionId as the document key if available
  const id = (transaction as any).transactionId || ref.doc().id;

  const now = new Date();
  const doc = {
    ...transaction,
    createdAt: now,
    updatedAt: now,
  };

  await ref.doc(id).set(doc, { merge: true });
  console.log(`Saved ${type} with ID: ${id}`);
}