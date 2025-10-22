'use client';

import React, { useState, useEffect } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';

export default function WalletButton() {
  const { connectors, connect, error, status } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Hydration guard
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button disabled className="px-6 py-3 border rounded opacity-50">
        Connect Wallet
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-3 py-2 rounded bg-blue-600/20 border border-blue-500/30">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button onClick={() => disconnect()} className="px-4 py-2 bg-red-600 text-white rounded">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={status === 'pending'}
          className="px-6 py-3 border rounded disabled:opacity-50"
        >
          {connector.name} {status === 'pending' && ' (connecting...)'}
        </button>
      ))}
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
    </div>
  );
}
