import { http, createConfig } from 'wagmi';
import { mainnet, avalanche, avalancheFuji } from 'wagmi/chains';
import { injected, walletConnect, metaMask } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set');
}

export const config = createConfig({
  chains: [mainnet, avalanche, avalancheFuji],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
  },
});
