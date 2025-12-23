// src/services/fetchTransaction.ts
import { getFirestore } from "firebase-admin/firestore";

const collections: Record<string, string> = {
  txn001: "transactions_001",
  txn002: "transactions_002",
  txn003: "transactions_003",
  txn004: "transactions_004",
};

export async function fetchTransaction<T>(
  type: keyof typeof collections,
  transactionId: string
): Promise<T | null> {
  const db = getFirestore();
  const collectionName = collections[type];

  const snapshot = await db
    .collection(collectionName)
    .where("transactionId", "==", transactionId)
    .get();

  if (snapshot.empty) {
    console.log(`No ${type} found with transactionId: ${transactionId}`);
    return null;
  }

  return snapshot.docs[0].data() as T;
}