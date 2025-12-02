import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase'; // or your Firestore client

export async function getVaultSummary(userId: string) {
  if (!userId) throw new Error('Missing userId');

  // 1. Stripe balances (connected account)
  const stewardAccountId = await getStewardStripeAccountId(userId); // look up in Firestore
  const stripeBalance = await stripe.balance.retrieve({
    stripeAccount: stewardAccountId,
  });

  // 2. Firestore earnings
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

// Example Firestore helpers
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