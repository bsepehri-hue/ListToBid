export async function createReferralLink(userId: string) {
  return `https://example.com/referral/${userId}`;
}

export async function getReferralStats(userId: string) {
  return {
    clicks: 0,
    signups: 0,
    earnings: 0,
  };
}