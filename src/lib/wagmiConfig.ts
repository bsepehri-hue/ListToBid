import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygonAmoy } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [polygonAmoy, mainnet],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  chains,
});