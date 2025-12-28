"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth"; // your existing auth hook

export default function SellerFinancePage() {
  const { user } = useAuth();
  const sellerId = user?.uid;

  const [loading, setLoading] = useState(true);
  const [vault, setVault] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    if (sellerId) loadData();
  }, [sellerId]);

  async function loadData() {
    setLoading(true);

    const vaultSnap = await getDocs(collection(db, "vault"));
    const vaultDoc = vaultSnap.docs.find((d) => d.id === sellerId);
    setVault(vaultDoc?.data() || null);

    const timelineSnap = await getDocs(collection(db, "timeline"));
    const allEvents = timelineSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const sellerEvents = allEvents
      .filter((e) => e.sellerId === sellerId)
      .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

    setEvents(sellerEvents);
    setLoading(false);
  }

  if (loading) return <div className="p-6">Loading your financial profile…</div>;

  // Filter events
  const filtered = events.filter((e) => {
    if (!filterType) return true;
    if (filterType === "dispute") return e.label?.toLowerCase().includes("dispute");
    return e.type === filterType;
  });

  // Compute running balance
  let running = vault?.available || 0;
  const ledger = [...filtered].reverse().map((e) => {
    let delta = 0;

    if (e.type === "sale") delta = e.amount || 0;
    if (e.type === "refund") delta = -(e.amount || 0);
    if (e.type === "payout") delta = -(e.amount || 0);

    if (e.label?.startsWith("Dispute lost")) delta = -(e.amount || 0);
    if (e.label?.startsWith("Dispute won")) delta = +(e.amount || 0);

    const row = {
      ...e,
      delta,
      balance: running,
    };

    running -= delta;
    return row;
  });

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold">Financial Profile</h1>

      {/* Vault Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Available" value={vault.available} color="emerald" />
        <Stat label="Locked" value={vault.locked} color="amber" />
        <Stat label="Total Earned" value={vault.totalEarned} color="emerald" />
        <Stat label="Total Refunded" value={vault.totalRefunded} color="red" />
        <Stat label="Total Payouts" value={vault.totalPayouts} color="blue" />
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Events</option>
          <option value="sale">Sales</option>
          <option value="refund">Refunds</option>
          <option value="payout">Payouts</option>
          <option value="dispute">Disputes</option>
        </select>
      </div>

      {/* Ledger Table */}
      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Timestamp</th>
              <th className="p-2 text-left">Event</th>
              <th className="p-2 text-left">Delta</th>
              <th className="p-2 text-left">Balance</th>
            </tr>
          </thead>

          <tbody>
            {ledger.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-2">
                  {new Date(row.timestamp).toLocaleString()}
                </td>
                <td className="p-2">{row.label}</td>

                <td
                  className={`p-2 font-medium ${
                    row.delta > 0
                      ? "text-emerald-600"
                      : row.delta < 0
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {row.delta > 0 ? "+" : ""}
                  {row.delta}
                </td>

                <td className="p-2 font-semibold">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: any) {
  const colors: any = {
    emerald: "text-emerald-600",
    red: "text-red-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
  };

  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-xl font-semibold ${colors[color]}`}>{value}</div>
    </div>
  );
}