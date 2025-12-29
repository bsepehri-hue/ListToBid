"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [storefrontCount, setStorefrontCount] = useState<number | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number | null>(null);
  const [pendingPayoutTotal, setPendingPayoutTotal] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Storefronts
        const storefrontSnap = await getDocs(collection(db, "storefronts"));
        setStorefrontCount(storefrontSnap.size);

        // Listings
        const listingSnap = await getDocs(collection(db, "listings"));
        setListingCount(listingSnap.size);

        // Messages
        const messagesSnap = await getDocs(collection(db, "messages"));
        const unread = messagesSnap.docs.filter(
          (doc) => doc.data().read === false
        ).length;
        setUnreadMessages(unread);

        // Pending payouts
        const payoutsSnap = await getDocs(collection(db, "payouts"));
        const pendingTotal = payoutsSnap.docs
          .filter((doc) => doc.data().status === "pending")
          .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

        setPendingPayoutTotal(pendingTotal);

        // Recent Activity
        const activity: any[] = [];

        storefrontSnap.docs.forEach((doc) => {
          activity.push({
            type: "storefront",
            timestamp: doc.data().createdAt,
            message: `New storefront created: ${doc.data().name}`,
          });
        });

        listingSnap.docs.forEach((doc) => {
          activity.push({
            type: "listing",
            timestamp: doc.data().createdAt,
            message: `New listing: ${doc.data().title}`,
          });
        });

        messagesSnap.docs.forEach((doc) => {
          activity.push({
            type: "message",
            timestamp: doc.data().createdAt,
            message: `New message received`,
          });
        });

        payoutsSnap.docs.forEach((doc) => {
          activity.push({
            type: "payout",
            timestamp: doc.data().createdAt,
            message: `Payout ${doc.data().status}: $${doc.data().amount}`,
          });
        });

        // Sort newest → oldest
        activity.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        // Limit to 10
        setRecentActivity(activity.slice(0, 10));
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    }

    fetchData();
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
        <DashboardStat
          label="Active Storefronts"
          value={storefrontCount === null ? "…" : storefrontCount}
        />

        <DashboardStat
          label="Active Listings"
          value={listingCount === null ? "…" : listingCount}
        />

        <DashboardStat
          label="Unread Messages"
          value={unreadMessages === null ? "…" : unreadMessages}
        />

        <DashboardStat
          label="Pending Payouts"
          value={
            pendingPayoutTotal === null
              ? "…"
              : `$${pendingPayoutTotal.toFixed(2)}`
          }
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