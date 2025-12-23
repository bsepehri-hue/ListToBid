// src/lib/firestore/saveTransaction.ts
import { db } from "@/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const collections: Record<string, string> = {
  txn001: "transactions_001",
  txn002: "transactions_002",
  txn003: "transactions_003",
  txn004: "transactions_004",
};

export async function saveTransaction<T>(
  type: keyof typeof collections,
  transaction: T
) {
  const collectionName = collections[type];
  const colRef = collection(db, collectionName);

  const id =
    (transaction as any).transactionId ||
    doc(colRef).id;

  await setDoc(
    doc(colRef, id),
    {
      ...transaction,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return id;
}