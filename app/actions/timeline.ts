// app/actions/timeline.ts

import { db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

const COLLECTIONS = [
  "sales",
  "payouts",
  "refunds",
  "messages",
  "storefrontEvents",
  "auctionEvents",
  "systemEvents",
];

export const getUnifiedTimeline = async () => {
  try {
    const promises = COLLECTIONS.map(async (col) => {
      const q = query(
        collection(db, col),
        orderBy("timestamp", "desc"),
        limit(20)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        source: col,
        ...doc.data(),
      }));
    });

    const results = await Promise.all(promises);

    const merged = results.flat();

    // Sort all events together
    merged.sort((a, b) => b.timestamp - a.timestamp);

    return merged;
  } catch (err) {
    console.error("Unified timeline error:", err);
    return [];
  }
};