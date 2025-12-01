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

