// src/actions/stripe.ts
"use server";

export async function createStripeOnboardingLink(userId: string): Promise<string> {
  // TODO: call your backend or Stripe API to generate onboarding link
  return `https://connect.stripe.com/onboarding/${userId}`;
}

export async function createStripeSettingsLink(userId: string): Promise<string> {
  // TODO: call your backend or Stripe API to generate account settings link
  return `https://connect.stripe.com/settings/${userId}`;
}