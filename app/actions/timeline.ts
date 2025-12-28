import { db } from "@/app/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

export const getUnifiedTimeline = async () => {
  try {
    const q = query(
      collection(db, "timeline"),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Timeline Firestore error:", err);
    return [];
  }
};