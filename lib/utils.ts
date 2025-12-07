/**
 * Shortens a wallet address for display (e.g., 0x1234...ABCD)
 * @param address The full wallet address
 * @returns Shortened string
 */
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  const prefix = address.substring(0, chars + 2); // Includes '0x'
  const suffix = address.substring(address.length - chars);
  return `${prefix}...${suffix}`;
};

import { formatEther as ethersFormatEther } from "ethers";

export const formatEther = (weiValue: bigint): string => {
  try {
    return ethersFormatEther(weiValue);
  } catch {
    return "0.00";
  }
};

/**
 * Formats a raw Ether/Wei BigInt value to a readable decimal string (e.g., 500000000000000000 -> 0.50 ETH).
 * This function should be safe when used with Ethers BigInt values.
 * @param weiValue The BigInt value in Wei.
 * @returns The formatted string with two decimal places.
 */
export const formatEther = (weiValue: bigint): string => {
  // Ensure the input is treated as BigInt.
  if (typeof weiValue !== 'bigint') {
      weiValue = BigInt(weiValue); 
  }
  
  // Format the BigInt to a string padded to 18 decimals for Wei precision.
  const etherString = weiValue.toString().padStart(18, '0');
  
  // Ensure at least 1 digit for the integer part by padding to 19 characters minimum
  const paddedString = etherString.padStart(19, '0'); 

  // Determine the split point (18 characters from the end)
  const integerPart = paddedString.slice(0, -18);
  // Get the first two decimals
  const decimalPart = paddedString.slice(-18, -16); 

  // Re-pad the integer part if it was just '0'
  const finalInteger = integerPart.replace(/^0+/, '') || '0'; 

  return `${finalInteger}.${decimalPart}`;
};


/**
 * Formats a duration in seconds into HH:MM:SS format.
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};
