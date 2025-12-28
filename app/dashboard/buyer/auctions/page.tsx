"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function BuyerAuctionWinsPage() {
  const [loading, setLoading] = useState(true);
  const [wins, setWins] = useState<any[]>([]);

  // TEMP — replace with your auth user
  const userId = "TEMP_USER_ID";

  useEffect(() => {
    const loadWins = async () => {
      const q = query(
        collection(db, "auctions"),
        where("winnerId", "==", userId)
      );

      const snap = await getDocs(q);
      const items: any[] = [];

      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setWins(items);
      setLoading(false);
    };

    loadWins();
  }, [userId]);

  if (loading) return <p className="text-gray-600">Loading your wins…</p>;

  if (wins.length === 0)
    return <p className="text-gray-600">You haven’t won any auctions yet.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Auction Wins</h1>

      <div className="space-y-6">
        {wins.map((auction) => (
          <div
            key={auction.id}
            className="bg-white p-6 rounded-xl shadow border space-y-3"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {auction.title}
            </h2>

            <p className="text-gray-700">
              Winning Bid:{" "}
              <span className="font-semibold text-gray-900">
                ${auction.winningBidAmount}
              </span>
            </p>

            <Link
              href={`/dashboard/buyer/auctions/${auction.id}/pay`}
              className="inline-block bg-emerald-600 text-white px-4 py-2 rounded"
            >
              Pay Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}