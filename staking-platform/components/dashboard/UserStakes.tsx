'use client';

import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Calendar } from 'lucide-react';
import { useAccount } from 'wagmi';

interface Stake {
  id: string;
  amount: string;
  token: string;
  startDate: string;
  endDate: string;
  rewards: string;
  status: 'active' | 'completed' | 'pending';
}

export default function UserStakes() {
  const { address } = useAccount();
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStakes = async () => {
      if (!address) return;

      try {
        // TODO: Fetch real stakes from API
        // const response = await fetch(`/api/stakes/${address}`);
        // const data = await response.json();
        // setStakes(data);

        // Mock data for now
        setStakes([
          {
            id: '1',
            amount: '1000',
            token: 'INRT',
            startDate: '2025-10-01',
            endDate: '2025-11-01',
            rewards: '12.5',
            status: 'active',
          },
          {
            id: '2',
            amount: '500',
            token: 'INRT',
            startDate: '2025-09-15',
            endDate: '2025-10-15',
            rewards: '6.25',
            status: 'completed',
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch stakes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStakes();
  }, [address]);

  if (loading) {
    return (
      <div className="bg-[#161b22] rounded-xl p-6 border border-gray-700">
        <p className="text-gray-400">Loading your stakes...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Your Active Stakes</h2>

      {stakes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">You don't have any active stakes yet.</p>
          <p className="text-sm text-gray-500 mt-2">Start staking to earn rewards!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Token</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Start Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">End Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Rewards</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {stakes.map((stake) => (
                <tr key={stake.id} className="border-b border-gray-800 hover:bg-[#0d1117] transition">
                  <td className="py-4 px-4 text-white font-semibold">{stake.amount}</td>
                  <td className="py-4 px-4 text-gray-300">{stake.token}</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{stake.startDate}</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{stake.endDate}</td>
                  <td className="py-4 px-4 text-green-400 font-semibold">+{stake.rewards}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        stake.status === 'active'
                          ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                          : stake.status === 'completed'
                          ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
                          : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {stake.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
