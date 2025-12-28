"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SellerAuctionPayoutsPage() {
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState<any[]>([]);

  // TEMP — replace with your auth user
  const sellerId = "TEMP_USER_ID";

  useEffect(() => {
    const loadAuctions = async () => {
      const q = query(
        collection(db, "auctions"),
        where("sellerId", "==", sellerId)
      );

      const snap = await getDocs(q);
      const items: any[] = [];

      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setAuctions(items);
      setLoading(false);
    };

    loadAuctions();
  }, [sellerId]);

  if (loading) return <p className="text-gray-600">Loading your auctions…</p>;

  if (auctions.length === 0)
    return <p className="text-gray-600">You haven’t created any auctions yet.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Auction Earnings</h1>

      <div className="space-y-6">
        {auctions.map((auction) => (
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

            <p className="text-gray-700">
              Payment Status:{" "}
              <span className="font-semibold text-gray-900">
                {auction.paymentStatus || "Pending"}
              </span>
            </p>

            <p className="text-gray-700">
              Payout Status:{" "}
              <span className="font-semibold text-gray-900">
                {auction.payoutStatus || "Not Paid Out"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}