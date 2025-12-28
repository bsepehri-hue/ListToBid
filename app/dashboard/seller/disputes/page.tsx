"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function SellerDisputeNotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState<any[]>([]);

  // TEMP — replace with your auth user
  const sellerId = "TEMP_USER_ID";

  useEffect(() => {
    const loadDisputes = async () => {
      const q = query(
        collection(db, "disputes"),
        where("sellerId", "==", sellerId)
      );

      const snap = await getDocs(q);
      const items: any[] = [];

      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));

      // Sort newest → oldest
      items.sort((a, b) => {
        const t1 = a.createdAt?.toDate?.().getTime() || 0;
        const t2 = b.createdAt?.toDate?.().getTime() || 0;
        return t2 - t1;
      });

      setDisputes(items);
      setLoading(false);
    };

    loadDisputes();
  }, [sellerId]);

  if (loading) return <p className="text-gray-600">Loading disputes…</p>;

  if (disputes.length === 0)
    return <p className="text-gray-600">You have no disputes at this time.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Dispute Notifications</h1>

      <div className="space-y-6">
        {disputes.map((d) => (
          <div
            key={d.id}
            className="bg-white p-6 rounded-xl shadow border space-y-3"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Dispute #{d.id}
            </h2>

            <p className="text-gray-700">
              Amount:{" "}
              <span className="font-semibold">${d.amount}</span>
            </p>

            <p className="text-gray-700">
              Payment:{" "}
              <span className="font-semibold">{d.paymentIntentId}</span>
            </p>

            <p className="text-gray-700">
              Reason:{" "}
              <span className="font-semibold">{d.reason}</span>
            </p>

            <p className="text-gray-700">
              Status:{" "}
              <span className="font-semibold capitalize">{d.status}</span>
            </p>

            <p className="text-gray-700">
              Created:{" "}
              <span className="font-semibold">
                {d.createdAt?.toDate?.().toLocaleString() || "—"}
              </span>
            </p>

            <Link
              href={`/dashboard/seller/disputes/${d.id}`}
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