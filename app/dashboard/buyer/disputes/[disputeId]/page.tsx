"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BuyerDisputeDetailPage() {
  const { disputeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [dispute, setDispute] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const [refund, setRefund] = useState<any>(null);

  // TEMP — replace with your auth user
  const userId = "TEMP_USER_ID";

  useEffect(() => {
    const load = async () => {
      // Load dispute
      const ref = doc(db, "disputes", disputeId as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const data = snap.data();

      // Ensure buyer owns this dispute
      if (data.buyerId !== userId) {
        setLoading(false);
        return;
      }

      setDispute(data);

      // Load linked payment
      if (data.paymentIntentId) {
        const pRef = doc(db, "paymentIntents", data.paymentIntentId);
        const pSnap = await getDoc(pRef);
        if (pSnap.exists()) setPayment(pSnap.data());
      }

      // Load refund if exists
      if (data.status === "resolved_refunded") {
        const refundQuery = await getDoc(
          doc(db, "refunds", data.paymentIntentId)
        ).catch(() => null);

        if (refundQuery?.exists()) {
          setRefund(refundQuery.data());
        }
      }

      setLoading(false);
    };

    load();
  }, [disputeId, userId]);

  if (loading) return <p className="text-gray-600">Loading dispute…</p>;
  if (!dispute) return <p className="text-gray-600">Dispute not found.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Dispute #{disputeId}
      </h1>

      {/* Overview */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>

        <p className="text-gray-700">
          Amount:{" "}
          <span className="font-semibold">${dispute.amount}</span>
        </p>

        <p className="text-gray-700">
          Status:{" "}
          <span className="font-semibold capitalize">{dispute.status}</span>
        </p>

        <p className="text-gray-700">
          Seller:{" "}
          <span className="font-semibold">{dispute.sellerId}</span>
        </p>

        <p className="text-gray-700">
          Payment:{" "}
          <span className="font-semibold">{dispute.paymentIntentId}</span>
        </p>
      </div>

      {/* Reason + Description */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Details</h2>

        <p className="text-gray-700">
          Reason:{" "}
          <span className="font-semibold">{dispute.reason}</span>
        </p>

        <p className="text-gray-700 whitespace-pre-line">
          Description:{" "}
          <span className="font-semibold">{dispute.description}</span>
        </p>
      </div>

      {/* Payment Info */}
      {payment && (
        <div className="bg-white p-6 rounded-xl shadow border space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Payment</h2>

          <p className="text-gray-700">
            Type:{" "}
            <span className="font-semibold capitalize">{payment.type}</span>
          </p>

          <p className="text-gray-700">
            Total Charged:{" "}
            <span className="font-semibold">${payment.total}</span>
          </p>

          <p className="text-gray-700">
            Created:{" "}
            <span className="font-semibold">
              {payment.createdAt?.toDate?.().toLocaleString() || "—"}
            </span>
          </p>
        </div>
      )}

      {/* Refund Info */}
      {dispute.status === "resolved_refunded" && (
        <div className="bg-white p-6 rounded-xl shadow border space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Refund</h2>

          <p className="text-gray-700">
            Amount Refunded:{" "}
            <span className="font-semibold">${dispute.amount}</span>
          </p>

          <p className="text-gray-700">
            Vault Entry:{" "}
            <span className="font-semibold">{dispute.vaultEntryId}</span>
          </p>

          <p className="text-gray-700">
            Processed:{" "}
            <span className="font-semibold">
              {refund?.createdAt?.toDate?.().toLocaleString() || "—"}
            </span>
          </p>
        </div>
      )}

      {/* Timestamps */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Timestamps</h2>

        <p className="text-gray-700">
          Created:{" "}
          <span className="font-semibold">
            {dispute.createdAt?.toDate?.().toLocaleString() || "—"}
          </span>
        </p>

        <p className="text-gray-700">
          Updated:{" "}
          <span className="font-semibold">
            {dispute.updatedAt?.toDate?.().toLocaleString() || "—"}
          </span>
        </p>
      </div>
    </div>
  );
}