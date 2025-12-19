import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase'; // your Firestore client

// --- Canonical Vault Types ---
export interface VaultDataPoint {
  vaultId: string;   // required for BarChart XAxis
  balance: number;   // plotted on Y axis
}

export interface VaultSummary {
  available: number;
  pending: number;
  lifetime: number;
  referrals: number;
  fees: number;
  vaultData: VaultDataPoint[]; // chart expects this
}

export interface Transaction {
  id: string;
  stewardId: string;
  amount: number;
  type: 'sale' | 'payout' | 'fee' | 'referral';
  date: Date;
}

// 🔑 Fetch steward’s Stripe account ID from Firestore
export async function getStewardStripeAccountId(userId: string): Promise<string> {
  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) throw new Error('User not found');
  return doc.data().stripeAccountId;
}

// 🔑 Vault summary: balances + earnings
export async function getVaultSummary(userId: string): Promise<VaultSummary> {
  const stewardAccountId = await getStewardStripeAccountId(userId);

  // Stripe balances
  const stripeBalance = await stripe.balance.retrieve({
    stripeAccount: stewardAccountId,
  });

  // Firestore earnings
  const lifetime = await getLifetimeEarnings(userId);
  const referrals = await getReferralEarnings(userId);
  const fees = await getPlatformFees(userId);

  return {
    available: stripeBalance.available[0]?.amount ?? 0,
    pending: stripeBalance.pending[0]?.amount ?? 0,
    lifetime,
    referrals,
    fees,
    vaultData: [
      { vaultId: 'main', balance: stripeBalance.available[0]?.amount ?? 0 },
      { vaultId: 'pending', balance: stripeBalance.pending[0]?.amount ?? 0 },
    ],
  };
}

// 🔑 Transaction ledger: recent sales/payouts
export async function getTransactionLedger(userId: string): Promise<Transaction[]> {
  const snap = await db
    .collection('transactions')
    .where('stewardId', '==', userId)
    .orderBy('date', 'desc')
    .limit(10)
    .get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    stewardId: doc.data().stewardId,
    amount: doc.data().amount,
    type: doc.data().type,
    date: doc.data().date.toDate(), // Firestore Timestamp → Date
  }));
}

// --- Helper functions ---
async function getLifetimeEarnings(userId: string): Promise<number> {
  const snap = await db.collection('sales').where('stewardId', '==', userId).get();
  return snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
}

async function getReferralEarnings(userId: string): Promise<number> {
  const snap = await db.collection('referrals').where('referrerId', '==', userId).get();
  return snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
}

async function getPlatformFees(userId: string): Promise<number> {
  const snap = await db.collection('fees').where('stewardId', '==', userId).get();
  return snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
}