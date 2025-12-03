import { NextResponse } from "next/server";

export async function POST() {
  // Temporary stub: Stripe logic removed for now
  return NextResponse.json({ received: true });
}
