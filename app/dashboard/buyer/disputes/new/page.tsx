"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BuyerNewDisputePage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [paymentId, setPaymentId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const userId = "TEMP_USER_ID";

  useEffect(() => {
    const loadPayments = async () => {
      const q = query(
        collection(db, "paymentIntents"),
        where("buyerId", "==", userId)
      );

      const snap = await getDocs(q);
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));

      setPayments(items);
      setLoading(false);
    };

    loadPayments();
  }, [userId]);

  async function submitDispute() {
    if (!paymentId || !reason) return;

    const payment = payments.find((p) => p.id === paymentId);

    await addDoc(collection(db, "disputes"), {
      buyerId: userId,
      sellerId: payment.sellerId,
      paymentIntentId: paymentId,
      vaultEntryId: payment.vaultEntryId || null,
      amount: payment.amount,
      reason,
      description,
      status: "open",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    alert("Dispute submitted.");
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Open a Dispute</h1>

      <select
        className="border p-3 rounded w-full"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      >
        <option value="">Select a payment</option>
        {payments.map((p) => (
          <option key={p.id} value={p.id}>
            {p.type} — ${p.amount} — {p.id}
          </option>
        ))}
      </select>

      <input
        className="border p-3 rounded w-full"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <textarea
        className="border p-3 rounded w-full"
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submitDispute}
        className="bg-red-600 text-white px-6 py-3 rounded"
      >
        Submit Dispute
      </button>
    </div>
  );
}