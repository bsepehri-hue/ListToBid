"use client";

import { createContext, useContext } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
} from "wagmi";

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  balance: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: balanceData } = useBalance({
    address,
    query: { enabled: !!address },
  });

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        connect: () => connect({ connector: connectors[0] }),
        disconnect,
        balance: balanceData?.formatted ?? null,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export default function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};