"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StorefrontAuctionsPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [now, setNow] = useState(Date.now());

  // Live countdown ticker
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Load auctions for this storefront
  useEffect(() => {
    const ref = collection(db, "auctions");

    const q = query(
      ref,
      where("storeId", "==", storeId),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setAuctions(items);
      setLoading(false);
    });

    return () => unsub();
  }, [storeId]);

  const formatTimeLeft = (end: number) => {
    const diff = end - now;
    if (diff <= 0) return "Ended";

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);

    if (hr > 0) return `${hr}h ${min % 60}m`;
    if (min > 0) return `${min}m ${sec % 60}s`;
    return `${sec}s`;
  };

  if (loading) return <p className="text-gray-600">Loading auctions…</p>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Storefront Auctions</h1>
      <p className="text-gray-700">Live and ended auctions from this merchant.</p>

      {/* Auctions */}
      {auctions.length === 0 ? (
        <p className="text-gray-600">This merchant has no auctions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {auctions.map((a) => {
            const timeLeft = formatTimeLeft(a.endTime);

            return (
              <div
                key={a.id}
                className="bg-white border rounded-xl shadow p-4 space-y-4 cursor-pointer"
                onClick={() =>
                  router.push(`/auctions/${a.category}/${a.id}`)
                }
              >
                {/* Thumbnail */}
                {a.imageUrls?.length > 0 ? (
                  <img
                    src={a.imageUrls[0]}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {a.title}
                </h3>

                {/* Current Bid */}
                <p className="text-gray-800 font-medium">
                  Current Bid: ${a.currentBid}
                </p>

                {/* Bids */}
                <p className="text-gray-600 text-sm">{a.bidCount} bids</p>

                {/* Time Left */}
                <p
                  className={`text-sm font-semibold ${
                    timeLeft === "Ended"
                      ? "text-red-600"
                      : "text-teal-700"
                  }`}
                >
                  {timeLeft}
                </p>

                {/* Reserve */}
                <p
                  className={`text-xs font-medium ${
                    a.reserveMet ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {a.reserveMet ? "Reserve Met" : "Reserve Not Met"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}