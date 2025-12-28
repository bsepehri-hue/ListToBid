"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BuyerReceiptDetailPage() {
  const { receiptId } = useParams();
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<any>(null);

  // TEMP — replace with your auth user
  const userId = "TEMP_USER_ID";

  useEffect(() => {
    const loadReceipt = async () => {
      const ref = doc(db, "paymentIntents", receiptId as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        // basic safety: ensure this belongs to the logged-in buyer
        if (data.buyerId === userId) {
          setReceipt(data);
        } else {
          setReceipt(null);
        }
      }

      setLoading(false);
    };

    loadReceipt();
  }, [receiptId, userId]);

  if (loading) return <p className="text-gray-600">Loading receipt…</p>;
  if (!receipt) return <p className="text-gray-600">Receipt not found.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Receipt #{receiptId}
      </h1>

      {/* Overview */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>

        <p className="text-gray-700">
          Buyer: <span className="font-semibold">{receipt.buyerId}</span>
        </p>

        <p className="text-gray-700">
          Seller: <span className="font-semibold">{receipt.sellerId}</span>
        </p>

        <p className="text-gray-700">
          Type:{" "}
          <span className="font-semibold capitalize">{receipt.type}</span>
        </p>

        <p className="text-gray-700">
          Context ID:{" "}
          <span className="font-semibold">{receipt.contextId}</span>
        </p>

        <p className="text-gray-700">
          Status:{" "}
          <span className="font-semibold capitalize">{receipt.status}</span>
        </p>
      </div>

      {/* Amounts */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Amounts</h2>

        <p className="text-gray-700">
          Item Amount:{" "}
          <span className="font-semibold">${receipt.amount}</span>
        </p>

        <p className="text-gray-700">
          Platform Fee:{" "}
          <span className="font-semibold">${receipt.platformFee}</span>
        </p>

        <p className="text-gray-700">
          Processing Fee:{" "}
          <span className="font-semibold">${receipt.processingFee}</span>
        </p>

        <p className="text-gray-700">
          Referral Fee:{" "}
          <span className="font-semibold">${receipt.referralFee}</span>
        </p>

        <p className="text-gray-700">
          Shipping Fee:{" "}
          <span className="font-semibold">${receipt.shippingFee}</span>
        </p>

        <p className="text-gray-700">
          Total Charged:{" "}
          <span className="font-semibold">${receipt.total}</span>
        </p>
      </div>

      {/* Stripe section */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment Processor</h2>

        <p className="text-gray-700">
          PaymentIntent ID:{" "}
          <span className="font-semibold">
            {receipt.paymentIntentId || "—"}
          </span>
        </p>

        <p className="text-gray-700">
          Charge ID:{" "}
          <span className="font-semibold">
            {receipt.chargeId || "—"}
          </span>
        </p>
      </div>

      {/* Vault link (read-only for buyer) */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Settlement</h2>

        <p className="text-gray-700">
          Vault Entry:{" "}
          <span className="font-semibold">
            {receipt.vaultEntryId || "—"}
          </span>
        </p>
      </div>

      {/* Timestamps */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Timestamps</h2>

        <p className="text-gray-700">
          Created:{" "}
          <span className="font-semibold">
            {receipt.createdAt?.toDate?.().toLocaleString() || "—"}
          </span>
        </p>

        <p className="text-gray-700">
          Updated:{" "}
          <span className="font-semibold">
            {receipt.updatedAt?.toDate?.().toLocaleString() || "—"}
          </span>
        </p>
      </div>
    </div>
  );
}