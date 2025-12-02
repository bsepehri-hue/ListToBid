import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { buffer } from 'micro';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'account.updated': {
      const account = event.data.object;
      const userId = account.metadata?.userId;

      if (userId && account.charges_enabled && account.payouts_enabled) {
        await updateDoc(doc(db, 'users', userId), {
          stripeOnboardingComplete: true,
        });

        // TODO: Push activity event: Stripe onboarding completed
      }

      break;
    }

    case 'payout.paid': {
      const payout = event.data.object;
      const userId = payout.metadata?.userId;

      if (userId) {
        // TODO: Push activity event: Payout sent
        // TODO: Update Vault balance
      }

      break;
    }

    case 'payout.failed': {
      const payout = event.data.object;
      const userId = payout.metadata?.userId;

      if (userId) {
        // TODO: Push activity event: Payout failed
        // TODO: Alert steward
      }

      break;
    }

    case 'charge.succeeded': {
      const charge = event.data.object;
      const auctionId = charge.metadata?.auctionId;

      if (auctionId) {
        // TODO: Log sale, update auction status
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}