// src/lib/vault/data.ts

import { stripe } from "@/lib/stripe";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// --- Canonical Vault Types ---
export interface VaultDataPoint {
  vaultId: string;
  balance: number;
}

export interface VaultSummary {
  available: number;
  pending: number;
  lifetime: number;
  referrals: number;
  fees: number;
  vaultData: VaultDataPoint[];
}

export interface Transaction {
  id: string;
  stewardId: string;
  amount: number;
  type: "sale" | "payout" | "fee" | "referral";
  date: Date;
}

// 🔑 Fetch steward’s Stripe account ID from Firestore
export async function getStewardStripeAccountId(
  userId: string
): Promise<string> {
  const ref = doc(collection(db, "users"), userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("User not found");

  return snap.data().stripeAccountId as string;
}

// 🔑 Vault summary: balances + earnings
export async function getVaultSummary(
  userId: string
): Promise<VaultSummary> {
  const stewardAccountId = await getStewardStripeAccountId(userId);

  // Stripe balances
  const stripeBalance = await stripe.balance.retrieve({
    stripeAccount: stewardAccountId,
  });

  const available = stripeBalance.available?.[0]?.amount ?? 0;
  const pending = stripeBalance.pending?.[0]?.amount ?? 0;

  // Firestore earnings
  const lifetime = await getLifetimeEarnings(userId);
  const referrals = await getReferralEarnings(userId);
  const fees = await getPlatformFees(userId);

  return {
    available,
    pending,
    lifetime,
    referrals,
    fees,
    vaultData: [
      { vaultId: "main", balance: available },
      { vaultId: "pending", balance: pending },
    ],
  };
}

// 🔑 Transaction ledger: recent sales/payouts
export async function getTransactionLedger(
  userId: string
): Promise<Transaction[]> {
  const q = query(
    collection(db, "transactions"),
    where("stewardId", "==", userId),
    orderBy("date", "desc"),
    limit(10)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      stewardId: data.stewardId,
      amount: data.amount,
      type: data.type,
      date: data.date.toDate(),
    };
  });
}

// --- Helper functions ---
async function getLifetimeEarnings(userId: string): Promise<number> {
  const q = query(
    collection(db, "sales"),
    where("stewardId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs.reduce((sum, d) => sum + (d.data().amount ?? 0), 0);
}

async function getReferralEarnings(userId: string): Promise<number> {
  const q = query(
    collection(db, "referrals"),
    where("referrerId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs.reduce((sum, d) => sum + (d.data().amount ?? 0), 0);
}

async function getPlatformFees(userId: string): Promise<number> {
  const q = query(
    collection(db, "fees"),
    where("stewardId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs.reduce((sum, d) => sum + (d.data().amount ?? 0), 0);
}