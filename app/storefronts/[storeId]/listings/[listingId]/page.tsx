"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createPaymentIntent } from "@/lib/payments/createPaymentIntent";
import { loadStripe } from "@stripe/stripe-js";
import MessageButton from "@/components/MessageButton";

export default function StorefrontListingDetailPage() {
  const { storeId, listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);

  const userId = "TEMP_USER_ID";
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  async function handleBuyNow() {
    const paymentId = await createPaymentIntent({
      buyerId: userId,
      sellerId: listing.sellerId,
      amount: listing.price,
      platformFee: listing.price * 0.05,
      processingFee: listing.price * 0.03,
      referralFee: 0,
      shippingFee: 0,
      type: "listing",
      contextId: listingId,
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
    const loadListing = async () => {
      const ref = doc(
        db,
        "storefrontListings",
        listingId as string // or your actual collection
      );
      const snap = await getDoc(ref);

      if (snap.exists()) setListing(snap.data());
      setLoading(false);
    };

    loadListing();
  }, [storeId, listingId]);

  if (loading) return <p className="text-gray-600">Loading listing…</p>;
  if (!listing) return <p className="text-gray-600">Listing not found.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>

      <p className="text-3xl font-semibold text-gray-900">${listing.price}</p>

      <button
        onClick={handleBuyNow}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        Buy Now
      </button>

      <MessageButton
        sellerId={listing.sellerId}
        buyerId={userId}
        contextType="listing"
        contextId={listingId}
        label="Message Seller"
      />
    </div>
  );
}