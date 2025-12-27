import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

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
  const collectionName = collections[type];
  const colRef = collection(db, collectionName);

  const q = query(colRef, where("transactionId", "==", transactionId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data() as T;
}