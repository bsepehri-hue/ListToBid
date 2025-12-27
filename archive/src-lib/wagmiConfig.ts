import { createConfig, http } from "wagmi";
import { mainnet, polygonAmoy } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// Wagmi v2 canonical config
export const wagmiConfig = createConfig({
  ssr: true,
  autoConnect: true,

  chains: [mainnet, polygonAmoy],

  connectors: [
    injected({
      target: "metaMask", // ensures MetaMask is preferred
    }),
  ],

  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
});

// Export type for components
export type WagmiConfig = typeof wagmiConfig;