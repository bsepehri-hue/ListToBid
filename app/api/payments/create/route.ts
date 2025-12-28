import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json();

    // 1. Load Firestore PaymentIntent
    const ref = doc(db, "paymentIntents", paymentId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return NextResponse.json({ error: "PaymentIntent not found" }, { status: 404 });
    }

    const data = snap.data();

    // 2. Create Stripe PaymentIntent
    const stripePI = await stripe.paymentIntents.create({
      amount: Math.round(data.total * 100), // convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        paymentId,
        buyerId: data.buyerId,
        sellerId: data.sellerId,
        type: data.type,
        contextId: data.contextId,
      },
    });

    // 3. Update Firestore
    await updateDoc(ref, {
      paymentIntentId: stripePI.id,
      status: stripePI.status, // requires_action | processing
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      clientSecret: stripePI.client_secret,
      status: stripePI.status,
    });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}