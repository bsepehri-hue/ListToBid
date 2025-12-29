"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Store,
  Package,
  Mail,
  Wallet,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const [storefrontCount, setStorefrontCount] = useState<number | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number | null>(null);
  const [pendingPayoutTotal, setPendingPayoutTotal] = useState<number | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // --- STOREFRONTS ---
    const unsubStorefronts = onSnapshot(collection(db, "storefronts"), (snap) => {
      setStorefrontCount(snap.size);

      const updates = snap.docChanges().map((change) => ({
        type: "storefront",
        timestamp: change.doc.data().createdAt || 0,
        message: `New storefront created: ${change.doc.data().name}`,
      }));

      if (updates.length > 0) {
        setRecentActivity((prev) => [...updates, ...prev].slice(0, 10));
      }
    });

    // --- LISTINGS ---
    const unsubListings = onSnapshot(collection(db, "listings"), (snap) => {
      setListingCount(snap.size);

      const updates = snap.docChanges().map((change) => ({
        type: "listing",
        timestamp: change.doc.data().createdAt || 0,
        message: `New listing: ${change.doc.data().title}`,
      }));

      if (updates.length > 0) {
        setRecentActivity((prev) => [...updates, ...prev].slice(0, 10));
      }
    });

    // --- MESSAGES ---
    const unsubMessages = onSnapshot(collection(db, "messages"), (snap) => {
      const unread = snap.docs.filter((doc) => doc.data().read === false).length;
      setUnreadMessages(unread);

      const updates = snap.docChanges().map((change) => ({
        type: "message",
        timestamp: change.doc.data().createdAt || 0,
        message: `New message received`,
      }));

      if (updates.length > 0) {
        setRecentActivity((prev) => [...updates, ...prev].slice(0, 10));
      }
    });

    // --- PAYOUTS ---
    const unsubPayouts = onSnapshot(collection(db, "payouts"), (snap) => {
      const pendingTotal = snap.docs
        .filter((doc) => doc.data().status === "pending")
        .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

      setPendingPayoutTotal(pendingTotal);

      const updates = snap.docChanges().map((change) => ({
        type: "payout",
        timestamp: change.doc.data().createdAt || 0,
        message: `Payout ${change.doc.data().status}: $${change.doc.data().amount}`,
      }));

      if (updates.length > 0) {
        setRecentActivity((prev) => [...updates, ...prev].slice(0, 10));
      }
    });

    // Cleanup listeners on unmount
    return () => {
      unsubStorefronts();
      unsubListings();
      unsubMessages();
      unsubPayouts();
    };
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Your marketplace command center.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <DashboardStat
    label="Active Storefronts"
    value={storefrontCount === null ? "…" : storefrontCount}
    icon={Store}
  />

  <DashboardStat
    label="Active Listings"
    value={listingCount === null ? "…" : listingCount}
    icon={Package}
  />

  <DashboardStat
    label="Unread Messages"
    value={unreadMessages === null ? "…" : unreadMessages}
    icon={Mail}
  />

  <DashboardStat
    label="Pending Payouts"
    value={
      pendingPayoutTotal === null
        ? "…"
        : `$${pendingPayoutTotal.toFixed(2)}`
    }
    icon={Wallet}
  />
</div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-3">Recent Activity</h2>

        <div className="space-y-2">
          {recentActivity.length === 0 && (
            <p className="text-gray-500 text-sm">No recent activity yet.</p>
          )}

          {recentActivity.map((item, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg bg-white shadow-sm text-sm"
            >
              {item.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}