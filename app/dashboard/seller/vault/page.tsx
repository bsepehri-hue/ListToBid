"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SellerVaultLedgerPage() {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<any[]>([]);

  // TEMP — replace with your auth user
  const sellerId = "TEMP_USER_ID";

  useEffect(() => {
    const loadEntries = async () => {
      const q = query(
        collection(db, "vault"),
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

      setEntries(items);
      setLoading(false);
    };

    loadEntries();
  }, [sellerId]);

  if (loading) return <p className="text-gray-600">Loading vault ledger…</p>;

  if (entries.length === 0)
    return <p className="text-gray-600">No vault entries yet.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Vault Ledger</h1>

      <div className="space-y-6">
        {entries.map((v) => (
          <div
            key={v.id}
            className="bg-white p-6 rounded-xl shadow border space-y-3"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Vault Entry #{v.id}
            </h2>

            <p className="text-gray-700">
              Amount:{" "}
              <span className="font-semibold">${v.amount}</span>
            </p>

            <p className="text-gray-700">
              Type:{" "}
              <span className="font-semibold capitalize">{v.type}</span>
            </p>

            <p className="text-gray-700">
              Status:{" "}
              <span className="font-semibold capitalize">{v.status}</span>
            </p>

            <p className="text-gray-700">
              PaymentIntent:{" "}
              <span className="font-semibold">{v.paymentIntentId || "—"}</span>
            </p>

            <p className="text-gray-700">
              Payout:{" "}
              <span className="font-semibold">{v.payoutId || "—"}</span>
            </p>

            <p className="text-gray-700">
              Created:{" "}
              <span className="font-semibold">
                {v.createdAt?.toDate?.().toLocaleString() || "—"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}