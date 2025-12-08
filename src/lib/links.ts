/**
 * Generates a shareable URL for an auction listing, optionally including a referral address.
 * @param auctionId The ID of the auction (string or bigint).
 * @param refAddress The optional Ethereum address of the referrer.
 * @returns The complete, shareable URL string.
 */
export function generateShareableAuctionLink(
  auctionId: string | bigint,
  refAddress?: string
): string {
  // Use a sensible base URL (window origin in browser, fallback domain in SSR)
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/auctions/${auctionId}`
      : `https://listtobid.com/auctions/${auctionId}`;

  const url = new URL(baseUrl);

  if (refAddress) {
    url.searchParams.set("ref", refAddress);
  }

  return url.toString();
}