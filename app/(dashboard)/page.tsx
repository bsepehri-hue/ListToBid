"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const [storefrontCount, setStorefrontCount] = useState<number | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Storefronts
        const storefrontSnap = await getDocs(collection(db, "storefronts"));
        setStorefrontCount(storefrontSnap.size);

        // Listings
        const listingSnap = await getDocs(collection(db, "listings"));
        setListingCount(listingSnap.size);

const [pendingPayoutTotal, setPendingPayoutTotal] = useState<number | null>(null);

        // Messages
        const messagesSnap = await getDocs(collection(db, "messages"));
        const unread = messagesSnap.docs.filter(
          (doc) => doc.data().read === false
        ).length;
        setUnreadMessages(unread);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    }

    fetchData();
  }, []);

const payoutsSnap = await getDocs(collection(db, "payouts"));
const pendingTotal = payoutsSnap.docs
  .filter((doc) => doc.data().status === "pending")
  .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

setPendingPayoutTotal(pendingTotal);

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
  label="Pending Payouts"
  value={
    pendingPayoutTotal === null
      ? "…"
      : `$${pendingPayoutTotal.toFixed(2)}`
  }
/>

        <DashboardStat label="Pending Payouts" value="$0.00" />
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