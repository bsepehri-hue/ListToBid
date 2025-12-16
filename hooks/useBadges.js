import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase"; // your Firestore init

/**
 * Hook: useBadges
 * Listens to Firestore for badge state changes for a given user.
 * Returns badge states and progress percentage.
 */
export default function useBadges(userId) {
  const [badges, setBadges] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const unsub = onSnapshot(doc(db, "users", userId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const badgeStates = data.badges || {};
        setBadges(badgeStates);

        // Calculate progress: % of badges marked emerald
        const total = Object.keys(badgeStates).length;
        const completed = Object.values(badgeStates).filter(
          (state) => state === "emerald"
        ).length;
        setProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
      }
    });

    return () => unsub(); // cleanup listener
  }, [userId]);

  return { badges, progress };
}