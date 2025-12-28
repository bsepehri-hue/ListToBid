"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createPaymentIntent } from "@/lib/payments/createPaymentIntent";
import { loadStripe } from "@stripe/stripe-js";

export default function AuctionPaymentPage() {
  const { id } = useParams(); // auctionId
  const [loading, setLoading] = useState(true);
  const [auction, setAuction] = useState<any>(null);

  // TEMP — replace with your auth user
  const userId = "TEMP_USER_ID";

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  async function handlePayForWin() {
    const paymentId = await createPaymentIntent({
      buyerId: userId,
      sellerId: auction.sellerId,
      amount: auction.winningBidAmount,
      platformFee: auction.winningBidAmount * 0.14, // your sealed auction fee
      processingFee: auction.winningBidAmount * 0.03,
      referralFee: 0,
      shippingFee: 0,
      type: "auction",
      contextId: id,
    });

    const res = await fetch("/api/payments/create", {
      method: "POST",
      body: JSON.stringify({ paymentId }),
    });

    const { clientSecret } = await res.json();

    const stripe = await stripePromise;
    await stripe.confirmCardPayment(clientSecret);
  }

  useEffect(() => {
    const loadAuction = async () => {
      const ref = doc(db, "auctions", id as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAuction(snap.data());
      }

      setLoading(false);
    };

    loadAuction();
  }, [id]);

  if (loading) return <p className="text-gray-600">Loading auction…</p>;
  if (!auction) return <p className="text-gray-600">Auction not found.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Pay for Auction Win
      </h1>

      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {auction.title}
        </h2>

        <p className="text-lg text-gray-700">
          Winning Bid:{" "}
          <span className="font-semibold text-gray-900">
            ${auction.winningBidAmount}
          </span>
        </p>

        <p className="text-gray-600">
          Platform Fee (14%): ${auction.winningBidAmount * 0.14}
        </p>

        <p className="text-gray-600">
          Processing Fee (3%): ${auction.winningBidAmount * 0.03}
        </p>

        <button
          onClick={handlePayForWin}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}