import { formatEther as ethersFormatEther } from "ethers";

/**
 * Shortens a wallet address for display (e.g., 0x1234...ABCD)
 */
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return "";
  const prefix = address.substring(0, chars + 2); // Includes '0x'
  const suffix = address.substring(address.length - chars);
  return `${prefix}...${suffix}`;
};

/**
 * Formats a Wei BigInt value into Ether string using ethers.js
 */
export const formatEther = (weiValue: bigint): string => {
  try {
    return ethersFormatEther(weiValue);
  } catch {
    return "0.00";
  }
};

/**
 * Formats a Wei BigInt value into Ether string with 2 decimal places.
 * Example: 500000000000000000 -> "0.50"
 */
export const formatEtherShort = (weiValue: bigint): string => {
  try {
    const ether = Number(ethersFormatEther(weiValue));
    return ether.toFixed(2);
  } catch {
    return "0.00";
  }
};

/**
 * Formats a duration in milliseconds into a human-readable string.
 * Example: 3661000 -> "1h 1m 1s"
 */
export const formatDuration = (ms: number): string => {
  if (ms <= 0) return "0s";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
};

/**
 * Generates a shareable URL for an auction listing, optionally including a referral address.
 * @param auctionId The ID of the auction.
 * @param refAddress The optional Ethereum address of the referrer.
 * @returns The complete, shareable URL string.
 */
export function generateShareableAuctionLink(
  auctionId: string | bigint,
  refAddress?: string
): string {
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