import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useNotifications(userId?: string) {
  const [hasUnread, setHasUnread] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Unread count listener
 // useEffect(() => {
 // if (!userId) return;

 // try {
     // const q = query(
      //  collection(db, 
// "notifications"),
     //   where("userId", "==", 
//userId),
       // where("read", "==", false)
      // );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setHasUnread(snapshot.size > 0);
        },
        (error) => {
          console.error("🔥 useNotifications unread listener error:", error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("🔥 useNotifications unread setup error:", err);
    }
  }, [userId]);

  // Notification items listener
  useEffect(() => {
    if (!userId) return;

    try {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(items);
        },
        (error) => {
          console.error("🔥 useNotifications items listener error:", error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("🔥 useNotifications items setup error:", err);
    }
  }, [userId]);

  return { hasUnread, notifications };
}