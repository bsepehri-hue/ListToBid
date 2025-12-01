'use client';

import { useWallet } from '@/context/WalletContext';
import { shortenAddress } from '@/lib/utils'; // Utility for address shortening

export const WalletButton: React.FC = () => {
  const { isConnected, address, connectWallet, disconnectWallet, isLoading } = useWallet();

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const buttonText = isConnected 
    ? shortenAddress(address!) // If connected, show shortened address
    : isLoading 
    ? 'Connecting...' 
    : 'Connect Wallet';

  const buttonClass = isConnected
    ? 'bg-emerald-600 hover:bg-emerald-700' // Different color when connected
    : 'bg-teal-600 hover:bg-teal-700'; // Initial color

  return (
    <button
      onClick={handleWalletAction}
      disabled={isLoading}
      className={`wallet-btn text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out whitespace-nowrap ${buttonClass} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {buttonText}
    </button>
  );
};
