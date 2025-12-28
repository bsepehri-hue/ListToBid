"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function SellerEarningsDashboard() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<any>(null);
  const [vaultEntries, setVaultEntries] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [lifetime, setLifetime] = useState(0);
  const [last30, setLast30] = useState(0);

  // TEMP — replace with your auth user
  const sellerId = "TEMP_USER_ID";

  useEffect(() => {
    const loadData = async () => {
      // 1. Load balance
      const balRef = doc(db, "balances", sellerId);
      const balSnap = await getDoc(balRef);
      if (balSnap.exists()) setBalance(balSnap.data());

      // 2. Load vault entries
      const vq = query(
        collection(db, "vault"),
        where("sellerId", "==", sellerId)
      );
      const vSnap = await getDocs(vq);
      const vItems: any[] = [];
      vSnap.forEach((doc) => vItems.push({ id: doc.id, ...doc.data() }));
      setVaultEntries(vItems);

      // 3. Load payouts
      const pq = query(
        collection(db, "payouts"),
        where("sellerId", "==", sellerId)
      );
      const pSnap = await getDocs(pq);
      const pItems: any[] = [];
      pSnap.forEach((doc) => pItems.push({ id: doc.id, ...doc.data() }));
      setPayouts(pItems);

      // 4. Compute lifetime + last 30 days
      let lifetimeTotal = 0;
      let last30Total = 0;
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      vItems.forEach((v) => {
        lifetimeTotal += v.amount;

        const ts = v.createdAt?.toDate?.().getTime() || 0;
        if (now - ts <= thirtyDays) {
          last30Total += v.amount;
        }
      });

      setLifetime(lifetimeTotal);
      setLast30(last30Total);

      setLoading(false);
    };

    loadData();
  }, [sellerId]);

  if (loading) return <p className="text-gray-600">Loading earnings…</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>

      {/* Balance Card */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Balance</h2>

        <p className="text-gray-700">
          Available:{" "}
          <span className="font-semibold text-gray-900">
            ${balance?.available || 0}
          </span>
        </p>

        <p className="text-gray-700">
          Pending:{" "}
          <span className="font-semibold text-gray-900">
            ${balance?.pending || 0}
          </span>
        </p>

        <div className="flex gap-4 pt-4">
          <Link
            href="/dashboard/seller/payouts/request"
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Request Payout
          </Link>

          <Link
            href="/dashboard/seller/payouts"
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            View Payout History
          </Link>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Earnings Summary</h2>

        <p className="text-gray-700">
          Lifetime Earnings:{" "}
          <span className="font-semibold text-gray-900">${lifetime}</span>
        </p>

        <p className="text-gray-700">
          Last 30 Days:{" "}
          <span className="font-semibold text-gray-900">${last30}</span>
        </p>
      </div>

      {/* Vault Ledger Preview */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Vault Entries</h2>

        {vaultEntries.length === 0 ? (
          <p className="text-gray-600">No vault entries yet.</p>
        ) : (
          vaultEntries.slice(0, 5).map((v) => (
            <p key={v.id} className="text-gray-700">
              Vault #{v.id} — ${v.amount} — {v.status}
            </p>
          ))
        )}

        <Link
          href="/dashboard/seller/vault"
          className="inline-block text-teal-600 font-medium"
        >
          View Full Vault Ledger →
        </Link>
      </div>

      {/* Payout History Preview */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Payouts</h2>

        {payouts.length === 0 ? (
          <p className="text-gray-600">No payouts yet.</p>
        ) : (
          payouts.slice(0, 5).map((p) => (
            <p key={p.id} className="text-gray-700">
              Payout #{p.id} — ${p.amount} — {p.status}
            </p>
          ))
        )}

        <Link
          href="/dashboard/seller/payouts"
          className="inline-block text-teal-600 font-medium"
        >
          View Full Payout History →
        </Link>
      </div>
    </div>
  );
}