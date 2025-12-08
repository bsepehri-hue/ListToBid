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
 * Formats a Wei BigInt value into Ether string
 */
export const formatEther = (weiValue: bigint): string => {
  try {
    return ethersFormatEther(weiValue);
  } catch {
    return "0.00";
  }
};

/**
 * Formats a duration in ms into human-readable string
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