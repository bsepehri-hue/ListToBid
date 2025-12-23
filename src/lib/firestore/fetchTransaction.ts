// src/lib/firestore/fetchTransaction.ts
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
  txn003: "transactions_003