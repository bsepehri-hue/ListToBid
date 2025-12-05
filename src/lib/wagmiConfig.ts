import { createConfig, http } from "wagmi";
import { mainnet, polygonAmoy } from "wagmi/chains";

// Wagmi v2+ uses http() instead of publicProvider/configureChains
export const wagmiConfig = createConfig({
  autoConnect: true,
  chains: [mainnet, polygonAmoy],
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
});