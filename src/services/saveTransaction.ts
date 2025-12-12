import { firestore } from 'firebase-admin';

// Map transaction types to Firestore collections
const collections: Record<string, string> = {
  txn001: 'transactions_001',
  txn002: 'transactions_002',
  txn003: 'transactions_003',
  txn004: 'transactions_004',
};

export async function saveTransaction(type: keyof typeof collections, data: any) {
  const collectionName = collections[type];
  const ref = firestore().collection(collectionName);

  // Add anchors automatically
  const now = new Date();
  const doc = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  // Save to Firestore
  await ref.add(doc);
  return doc;
}