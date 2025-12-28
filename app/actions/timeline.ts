// app/actions/timeline.ts

import { db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore";

export const getUnifiedTimeline = async (cursor?: string) => {
  try {
    const baseQuery = [
      collection(db, "timeline"),
      orderBy("timestamp", "desc"),
      limit(20),
    ];

    let q;

    if (cursor) {
      const cursorDoc = await getDoc(doc(db, "timeline", cursor));
      if (!cursorDoc.exists()) return [];
      q = query(...baseQuery, startAfter(cursorDoc));
    } else {
      q = query(...baseQuery);
    }

    const snapshot = await getDocs(q);

    const events = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return events;
  } catch (err) {
    console.error("Timeline Firestore error:", err);
    return [];
  }
};