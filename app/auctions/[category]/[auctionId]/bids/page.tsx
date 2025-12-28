"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BidHistoryPage() {
  const { category, auctionId } = useParams();

  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, "auctions", auctionId as string, "bids");

    const q = query(ref, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setBids(items);
      setLoading(false);
    });

    return () => unsub();
  }, [auctionId]);

  if (loading) return <p className="text-gray-600">Loading bid history…</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Bid History</h1>

      {bids.length === 0 ? (
        <p className="text-gray-600">No bids yet.</p>
      ) : (
        <div className="space-y-4">
          {bids.map((b, i) => (
            <div
              key={b.id}
              className={`p-4 border rounded-xl shadow bg-white ${
                i === 0 ? "ring-2 ring-teal-600" : ""
              }`}
            >
              <p className="text-lg font-semibold text-gray-900">
                ${b.amount}
              </p>
              <p className="text-sm text-gray-600">
                {b.createdAt?.toDate
                  ? b.createdAt.toDate().toLocaleString()
                  : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}