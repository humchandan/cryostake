'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';

export default function WalletButton() {
  const { connectors, connect, error, status } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const isPending = status === 'pending';

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-blue-600/20 rounded-lg border border-blue-500/30 hidden sm:block">
          <p className="text-sm text-blue-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-500/30 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready || isPending}
            key={connector.id}
            onClick={() => connect({ connector })}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connector.name}
            {isPending && ' (connecting...)'}
          </button>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
    </div>
  );
}
