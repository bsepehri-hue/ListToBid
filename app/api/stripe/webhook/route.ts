import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeTimelineEvent } from "@/app/actions/writeTimelineEvent";
import { db } from "@/app/lib/firebase";
import { doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { ensureVault, applyVaultDelta } from "@/app/lib/vault";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    // ---------------------------------------------------------
    // PAYMENT COMPLETED
    // ---------------------------------------------------------
    case "payment_intent.succeeded": {
      const pi = event.data.object;

      const amount = pi.amount_received / 100;
      const sellerId = pi.metadata.sellerId;

      const vaultRef = doc(db, "vault", sellerId);
      const snap = await getDoc(vaultRef);

      if (!snap.exists()) {
        await setDoc(vaultRef, {
          available: 0,
          totalEarned: 0,
          totalRefunded: 0,
          totalPayouts: 0,
          locked: 0,
          updatedAt: Date.now(),
        });
      }

      await updateDoc(vaultRef, {
        available: increment(amount),
        totalEarned: increment(amount),
        updatedAt: Date.now(),
      });

      await writeTimelineEvent("sales", {
        type: "sale",
        label: `Payment completed: $${amount}`,
        amount,
        buyerId: pi.metadata.buyerId,
        sellerId,
        contextId: pi.metadata.contextId,
      });

      break;
    }

    // ---------------------------------------------------------
    // REFUND COMPLETED
    // ---------------------------------------------------------
    case "charge.refunded": {
      const charge = event.data.object;

      const amount = charge.amount_refunded / 100;
      const sellerId = charge.metadata.sellerId;

      const vaultRef = doc(db, "vault", sellerId);
      const snap = await getDoc(vaultRef);

      if (!snap.exists()) {
        await setDoc(vaultRef, {
          available: 0,
          totalEarned: 0,
          totalRefunded: 0,
          totalPayouts: 0,
          locked: 0,
          updatedAt: Date.now(),
        });
      }

      await updateDoc(vaultRef, {
        available: increment(-amount),
        totalRefunded: increment(amount),
        updatedAt: Date.now(),
      });

      await writeTimelineEvent("refunds", {
        type: "refund",
        label: `Refund completed: $${amount}`,
        amount,
        buyerId: charge.metadata.buyerId,
        sellerId,
      });

      break;
    }

    // ---------------------------------------------------------
    // PAYOUT COMPLETED
    // ---------------------------------------------------------
    case "payout.paid": {
      const payout = event.data.object;

      const amount = payout.amount / 100;
      const sellerId = payout.metadata.sellerId;

      const vaultRef = doc(db, "vault", sellerId);
      const snap = await getDoc(vaultRef);

      if (!snap.exists()) {
        await setDoc(vaultRef, {
          available: 0,
          totalEarned: 0,
          totalRefunded: 0,
          totalPayouts: 0,
          locked: 0,
          updatedAt: Date.now(),
        });
      }

      await updateDoc(vaultRef, {
        available: increment(-amount),
        totalPayouts: increment(amount),
        updatedAt: Date.now(),
      });

      await writeTimelineEvent("payouts", {
        type: "payout",
        label: `Payout sent: $${amount}`,
        amount,
        sellerId,
      });

      break;
    }

    // ---------------------------------------------------------
    // ACCOUNT UPDATED
    // ---------------------------------------------------------
    case "account.updated": {
      const acct = event.data.object;

      await writeTimelineEvent("systemEvents", {
        type: "system",
        label: `Stripe account updated`,
        merchantId: acct.id,
      });

      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}