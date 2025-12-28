"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth"; // your auth hook
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function SellerFinancialDashboard() {
  const { user } = useAuth(); // must return sellerId
  const sellerId = user?.uid;

  const [vault, setVault] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sellerId) return;

    const load = async () => {
      setLoading(true);

      // Vault
      const vaultSnap = await getDocs(
        query(collection(db, "vault"), where("__name__", "==", sellerId))
      );
      const vaultDoc = vaultSnap.docs[0]?.data() ?? null;

      // Sales (timeline events)
      const salesQuery = query(
        collection(db, "timeline"),
        where("sellerId", "==", sellerId),
        where("type", "==", "sale"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const salesSnap = await getDocs(salesQuery);
      const salesRows = salesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Payouts
      const payoutsQuery = query(
        collection(db, "payouts"),
        where("sellerId", "==", sellerId),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const payoutsSnap = await getDocs(payoutsQuery);
      const payoutRows = payoutsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Refunds
      const refundsQuery = query(
        collection(db, "refunds"),
        where("sellerId", "==", sellerId),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const refundsSnap = await getDocs(refundsQuery);
      const refundRows = refundsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Timeline (all seller events)
      const timelineQuery = query(
        collection(db, "timeline"),
        where("sellerId", "==", sellerId),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const timelineSnap = await getDocs(timelineQuery);
      const timelineRows = timelineSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setVault(vaultDoc);
      setSales(salesRows);
      setPayouts(payoutRows);
      setRefunds(refundRows);
      setTimeline(timelineRows);
      setLoading(false);
    };

    void load();
  }, [sellerId]);

  if (!sellerId) {
    return <p className="p-6 text-gray-500">You must be logged in as a seller.</p>;
  }

  if (loading) {
    return <p className="p-6 text-gray-500">Loading your financial data…</p>;
  }

  return (
    <div className="space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Your Financial Dashboard</h1>
        <p className="text-sm text-gray-500">
          Your balance, payouts, refunds, and sales activity.
        </p>
      </header>

      {/* Balance summary */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Available Balance" value={vault?.available ?? 0} />
        <SummaryCard label="Total Earned" value={vault?.totalEarned ?? 0} />
        <SummaryCard label="Total Payouts" value={vault?.totalPayouts ?? 0} />
      </section>

      {/* Sales */}
      <SectionTable
        title="Recent Sales"
        columns={["Time", "Amount", "Buyer", "Context"]}
        rows={sales.map((s) => [
          s.createdAt ? new Date(s.createdAt).toLocaleString() : "-",
          `$${s.amount}`,
          s.buyerId,
          s.contextId ?? "-",
        ])}
      />

      {/* Payouts */}
      <SectionTable
        title="Payouts"
        columns={["Time", "Amount", "Status"]}
        rows={payouts.map((p) => [
          p.createdAt ? new Date(p.createdAt).toLocaleString() : "-",
          `$${p.amount}`,
          p.status,
        ])}
      />

      {/* Refunds */}
      <SectionTable
        title="Refunds"
        columns={["Time", "Amount", "Buyer", "Status"]}
        rows={refunds.map((r) => [
          r.createdAt ? new Date(r.createdAt).toLocaleString() : "-",
          `$${r.amount}`,
          r.buyerId,
          r.status,
        ])}
      />

      {/* Timeline */}
      <SectionTable
        title="Activity Timeline"
        columns={["Time", "Type", "Label", "Amount"]}
        rows={timeline.map((e) => [
          e.createdAt ? new Date(e.createdAt).toLocaleString() : "-",
          e.type,
          e.label,
          e.amount ? `$${e.amount}` : "-",
        ])}
      />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="text-xs uppercase text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-semibold">${value.toFixed(2)}</div>
    </div>
  );
}

function SectionTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: any[][];
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="overflow-auto rounded border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, i) => (
                <tr key={i} className="border-t">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-xs text-gray-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-2 text-center text-xs text-gray-500"
                >
                  No records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}