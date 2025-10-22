import { createConfig, http } from 'wagmi';
import { mainnet, avalanche, avalancheFuji } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { createClient } from 'viem';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set');

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}


export const config = createConfig({
  chains: [mainnet, avalanche, avalancheFuji],
  connectors: [
    injected(),
    walletConnect({
      projectId,
      metadata: {
        name: 'CryoStake Platform',
        description: 'EPOCH-based staking platform',
        url: 'http://localhost:3000',
        icons: ['https://avatars.githubusercontent.com/u/179229932'],
      },
    }),
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
