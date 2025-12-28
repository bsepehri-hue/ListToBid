import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeTimelineEvent } from "@/app/actions/writeTimelineEvent";

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
    case "payment_intent.succeeded": {
      const pi = event.data.object;

      await writeTimelineEvent("sales", {
        type: "sale",
        label: `Payment completed: $${pi.amount_received / 100}`,
        amount: pi.amount_received / 100,
        buyerId: pi.metadata.buyerId,
        sellerId: pi.metadata.sellerId,
        contextId: pi.metadata.contextId,
      });

      break;
    }

    case "charge.refunded": {
      const charge = event.data.object;

      await writeTimelineEvent("refunds", {
        type: "refund",
        label: `Refund completed: $${charge.amount_refunded / 100}`,
        amount: charge.amount_refunded / 100,
        buyerId: charge.metadata.buyerId,
        sellerId: charge.metadata.sellerId,
      });

      break;
    }

    case "payout.paid": {
      const payout = event.data.object;

      await writeTimelineEvent("payouts", {
        type: "payout",
        label: `Payout sent: $${payout.amount / 100}`,
        amount: payout.amount / 100,
        sellerId: payout.metadata.sellerId,
      });

      break;
    }

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