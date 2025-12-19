"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";

// Minimal EIP-1193 style typing for window.ethereum
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
}

// Augment the global Window type
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

// Define the shape of the wallet context state
interface WalletContextType {
  address: string | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isConnected = !!address;

  const updateWalletState = useCallback(async (currentProvider: BrowserProvider) => {
    try {
      const accounts = (await currentProvider.send("eth_accounts", [])) as string[];

      if (accounts.length > 0) {
        const currentSigner = await currentProvider.getSigner();
        setAddress(accounts[0]);
        setSigner(currentSigner);
        setProvider(currentProvider);
      } else {
        setAddress(null);
        setSigner(null);
        setProvider(currentProvider);
      }
    } catch (error) {
      console.error("Error updating wallet state:", error);
      setAddress(null);
      setSigner(null);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask or other wallet extension is not installed.");
      return;
    }

    setIsLoading(true);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const browserProvider = new BrowserProvider(window.ethereum as any);
      await updateWalletState(browserProvider);
    } catch (error) {
      console.error("Connection failed:", error);
      setAddress(null);
      setSigner(null);
    } finally {
      setIsLoading(false);
    }
  }, [updateWalletState]);

  const disconnectWallet = () => {
    setAddress(null);
    setSigner(null);
    setProvider(null);
    console.log("Wallet disconnected.");
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }

    const browserProvider = new BrowserProvider(window.ethereum as any);

    updateWalletState(browserProvider);

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        updateWalletState(browserProvider);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on?.("accountsChanged", handleAccountsChanged);
    window.ethereum.on?.("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [updateWalletState]);

  const value: WalletContextType = {
    address,
    provider,
    signer,
    isConnected,
    connectWallet,
    disconnectWallet,
    isLoading,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};