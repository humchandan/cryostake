'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';

export default function WalletConnectButton() {
  const { connectors, connect, error, status } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const isPending = status === 'pending';

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-blue-600/20 rounded border border-blue-500/30">
          <p className="text-sm text-blue-300">Connected: {address}</p>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready || isPending}
            key={connector.id}
            onClick={() => connect({ connector })}
            className="px-4 py-2 border rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connector.name}
            {isPending && ' (connecting...)'}
          </button>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
    </div>
  );
}
