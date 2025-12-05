import { createConfig, http } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: http(),
  chains: [polygonAmoy],
});