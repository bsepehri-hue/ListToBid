"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SellerPayoutHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState<any[]>([]);

  // TEMP — replace with your auth user
  const sellerId = "TEMP_USER_ID";

  useEffect(() => {
    const loadPayouts = async () => {
      const q = query(
        collection(db, "payouts"),
        where("sellerId", "==", sellerId)
      );

      const snap = await getDocs(q);
      const items: any[] = [];

      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      // Sort newest → oldest
      items.sort((a, b) => {
        const t1 = a.createdAt?.toDate?.().getTime() || 0;
        const t2 = b.createdAt?.toDate?.().getTime() || 0;
        return t2 - t1;
      });

      setPayouts(items);
      setLoading(false);
    };

    loadPayouts();
  }, [sellerId]);

  if (loading) return <p className="text-gray-600">Loading payout history…</p>;

  if (payouts.length === 0)
    return <p className="text-gray-600">You have no payout history yet.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Payout History</h1>

      <div className="space-y-6">
        {payouts.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-xl shadow border space-y-3"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Payout #{p.id}
            </h2>

            <p className="text-gray-700">
              Amount:{" "}
              <span className="font-semibold">${p.amount}</span>
            </p>

            <p className="text-gray-700">
              Status:{" "}
              <span className="font-semibold capitalize">{p.status}</span>
            </p>

            <p className="text-gray-700">
              Vault Entries:{" "}
              <span className="font-semibold">
                {p.vaultEntries?.length || 0}
              </span>
            </p>

            <p className="text-gray-700">
              Request ID:{" "}
              <span className="font-semibold">{p.requestId || "—"}</span>
            </p>

            <p className="text-gray-700">
              Processed:{" "}
              <span className="font-semibold">
                {p.processedAt?.toDate?.().toLocaleString() || "—"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}