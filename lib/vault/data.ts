import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase'; // your Firestore client

// 🔑 Fetch steward’s Stripe account ID from Firestore
export async function getStewardStripeAccountId(userId: string): Promise<string> {
  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) throw new Error('User not found');
  return doc.data().stripeAccountId;
}

// 🔑 Vault summary: balances + earnings
export async function getVaultSummary(userId: string) {
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
  };
}

// 🔑 Transaction ledger: recent sales/payouts
export async function getTransactionLedger(userId: string) {
  const snap = await db
    .collection('transactions')
    .where('stewardId', '==', userId)
    .orderBy('date', 'desc')
    .limit(10)
    .get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// --- Helper functions ---
async function getLifetimeEarnings(userId: string) {
  const snap = await db.collection('sales').where('stewardId', '==', userId).get();
  return snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
}

async function getReferralEarnings(userId: string) {
  const snap = await db.collection('referrals').where('referrerId', '==', userId).get();
  return snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
}

async function getPlatformFees(userId: string) {
  const snap = await db.collection('fees').where('stewardId', '==', userId).get();
  return snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
}