"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function BuyerReceiptsPage() {
  const [loading, setLoading] = useState(true);
  const [receipts, setReceipts] = useState<any[]>([]);

  // TEMP — replace with your auth user
  const userId = "TEMP_USER_ID";

  useEffect(() => {
    const loadReceipts = async () => {
      const q = query(
        collection(db, "paymentIntents"),
        where("buyerId", "==", userId)
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

      setReceipts(items);
      setLoading(false);
    };

    loadReceipts();
  }, [userId]);

  if (loading) return <p className="text-gray-600">Loading receipts…</p>;

  if (receipts.length === 0)
    return <p className="text-gray-600">You have no receipts yet.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Your Receipts</h1>

      <div className="space-y-6">
        {receipts.map((r) => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-xl shadow border space-y-3"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Receipt #{r.id}
            </h2>

            <p className="text-gray-700">
              Amount:{" "}
              <span className="font-semibold">${r.amount}</span>
            </p>

            <p className="text-gray-700">
              Total Charged:{" "}
              <span className="font-semibold">${r.total}</span>
            </p>

            <p className="text-gray-700">
              Type:{" "}
              <span className="font-semibold capitalize">{r.type}</span>
            </p>

            <p className="text-gray-700">
              Status:{" "}
              <span className="font-semibold capitalize">{r.status}</span>
            </p>

            <p className="text-gray-700">
              Context ID:{" "}
              <span className="font-semibold">{r.contextId}</span>
            </p>

            <p className="text-gray-700">
              Created:{" "}
              <span className="font-semibold">
                {r.createdAt?.toDate?.().toLocaleString() || "—"}
              </span>
            </p>

            <Link
              href={`/dashboard/buyer/receipts/${r.id}`}
              className="inline-block bg-gray-900 text-white px-4 py-2 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}