"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  const userId = "TEMP_USER_ID";

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", userId)
      );

      const snap = await getDocs(q);
      const arr: any[] = [];

      snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));

      arr.sort((a, b) => {
        const t1 = a.createdAt?.toDate?.().getTime() || 0;
        const t2 = b.createdAt?.toDate?.().getTime() || 0;
        return t2 - t1;
      });

      setItems(arr);
      setLoading(false);
    };

    load();
  }, [userId]);

  if (loading) return <p>Loading notifications…</p>;

  if (items.length === 0)
    return <p className="text-gray-600">No notifications yet.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Notifications</h1>

      {items.map((n) => (
        <div
          key={n.id}
          className="bg-white p-5 rounded-xl shadow border space-y-2"
        >
          <p className="text-gray-900 font-semibold">{n.message}</p>

          <p className="text-gray-600 text-sm">
            {n.createdAt?.toDate?.().toLocaleString() || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}