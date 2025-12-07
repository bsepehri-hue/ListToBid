// src/actions/referral.ts

/**
 * Referral action: placeholder for referral logic.
 * You can expand this to handle referral codes, tracking, etc.
 */
export const createReferral = (referrerId: string, referredId: string) => {
  return {
    referrerId,
    referredId,
    createdAt: new Date().toISOString(),
  };
};