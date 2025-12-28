"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AuctionDetailPage() {
  const { category, auctionId } = useParams();

  const [loading, setLoading] = useState(true);
  const [auction, setAuction] = useState<any>(null);
  const [now, setNow] = useState(Date.now());
  const [bidAmount, setBidAmount] = useState("");

  // Live countdown ticker
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Live auction listener
  useEffect(() => {
    const ref = doc(db, "auctions", auctionId as string);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setAuction(snap.data());
      }
      setLoading(false);
    });

    return () => unsub();
  }, [auctionId]);

  if (loading) return <p className="text-gray-600">Loading auction…</p>;
  if (!auction) return <p className="text-gray-600">Auction not found.</p>;

  const timeLeft = auction.endTime - now;
  const ended = timeLeft <= 0;

  const formatTimeLeft = () => {
    if (ended) return "Ended";

    const sec = Math.floor(timeLeft / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);

    if (hr > 0) return `${hr}h ${min % 60}m`;
    if (min > 0) return `${min}m ${sec % 60}s`;
    return `${sec}s`;
  };

  const placeBid = async () => {
    const bid = Number(bidAmount);

    if (isNaN(bid) || bid <= auction.currentBid) {
      alert("Bid must be higher than current bid.");
      return;
    }

    const ref = doc(db, "auctions", auctionId as string);

    await updateDoc(ref, {
      currentBid: bid,
      bidCount: increment(1),
      reserveMet:
        auction.reservePrice != null ? bid >= auction.reservePrice : true,
      lastBidAt: serverTimestamp(),
    });

    // Save bid history
    await addDoc(collection(db, "auctions", auctionId as string, "bids"), {
      amount: bid,
      createdAt: serverTimestamp(),
    });

    setBidAmount("");
  };

  const buyNow = async () => {
    if (!auction.buyNowPrice) return;

    const ref = doc(db, "auctions", auctionId as string);

    await updateDoc(ref, {
      currentBid: auction.buyNowPrice,
      bidCount: increment(1),
      reserveMet: true,
      status: "ended",
      endedAt: serverTimestamp(),
    });

    alert("You bought this item instantly.");
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">{auction.title}</h1>

      {/* Main Image */}
      {auction.imageUrls?.length > 0 && (
        <img
          src={auction.imageUrls[0]}
          className="w-full max-w-3xl rounded-xl border object-cover"
        />
      )}

      {/* Price + Time */}
      <div className="space-y-2">
        <p className="text-3xl font-semibold text-gray-900">
          Current Bid: ${auction.currentBid}
        </p>

        <p
          className={`text-xl font-semibold ${
            ended ? "text-red-600" : "text-teal-700"
          }`}
        >
          {formatTimeLeft()}
        </p>

        <p className="text-gray-600">{auction.bidCount} bids</p>

        <p
          className={`text-sm font-medium ${
            auction.reserveMet ? "text-green-600" : "text-red-600"
          }`}
        >
          {auction.reserveMet ? "Reserve Met" : "Reserve Not Met"}
        </p>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 max-w-2xl">{auction.description}</p>

      {/* Bid Input */}
      {!ended && (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64"
          />

          <button
            onClick={placeBid}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Place Bid
          </button>

          {auction.buyNowPrice && (
            <button
              onClick={buyNow}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition ml-4"
            >
              Buy It Now for ${auction.buyNowPrice}
            </button>
          )}
        </div>
      )}

      {/* Ended State */}
      {ended && (
        <p className="text-xl font-semibold text-red-600">
          This auction has ended.
        </p>
      )}
    </div>
  );
}