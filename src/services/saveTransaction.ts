// src/services/saveTransaction.ts
import { getFirestore } from "firebase-admin/firestore";

const collections: Record<string, string> = {
  txn001: "transactions_001",
  txn002: "transactions_002",
  txn003: "transactions_003",
  txn004: "transactions_004",
};

export async function saveTransaction<T>(
  type: keyof typeof collections,
  transaction: T
): Promise<void> {
  const db = getFirestore();
  const collectionName = collections[type];

  const id =
    (transaction as any).transactionId ||
    db.collection(collectionName).doc().id;

  const now = new Date();

  await db
    .collection(collectionName)
    .doc(id)
    .set(
      {
        ...transaction,
        createdAt: now,
        updatedAt: now,
      },
      { merge: true }
    );

  console.log(`Saved ${type} with ID: ${id}`);
}