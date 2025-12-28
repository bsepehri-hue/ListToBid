"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SellerPayoutRequestPage() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<any>(null);
  const [amount, setAmount] = useState("");

  // TEMP — replace with your auth user
  const sellerId = "TEMP_USER_ID";

  useEffect(() => {
    const loadBalance = async () => {
      const ref = doc(db, "balances", sellerId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setBalance(snap.data());
      }

      setLoading(false);
    };

    loadBalance();
  }, [sellerId]);

  async function handleRequestPayout() {
    if (!amount || Number(amount) <= 0) return;
    if (Number(amount) > balance.available) return;

    await addDoc(collection(db, "payoutRequests"), {
      sellerId,
      amount: Number(amount),
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    alert("Payout request submitted.");
  }

  if (loading) return <p className="text-gray-600">Loading balance…</p>;
  if (!balance) return <p className="text-gray-600">Balance not found.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Request Payout</h1>

      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <p className="text-lg text-gray-700">
          Available Balance:{" "}
          <span className="font-semibold text-gray-900">
            ${balance.available}
          </span>
        </p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter payout amount"
          className="border p-3 rounded w-full"
        />

        <button
          onClick={handleRequestPayout}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}