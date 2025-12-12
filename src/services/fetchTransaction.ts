import { firestore } from 'firebase-admin';
import { Txn001 } from '../schemas/txn001';
import { Txn002 } from '../schemas/txn002';
import { Txn003 } from '../schemas/txn003';
import { Txn004 } from '../schemas/txn004';

const collections: Record<string, string> = {
  txn001: 'transactions_001',
  txn002: 'transactions_002',
  txn003: 'transactions_003',
  txn004: 'transactions_004',
};

export async function fetchTransaction<T>(
  type: keyof typeof collections,
  transactionId: string
): Promise<T | null> {
  const collectionName = collections[type];
  const ref = firestore().collection(collectionName);

  // Query by transactionId field
  const snapshot = await ref.where('transactionId', '==', transactionId).get();

  if (snapshot.empty) {
    console.log(`No ${type} found with transactionId: ${transactionId}`);
    return null;
  }

  return snapshot.docs[0].data() as T;
}