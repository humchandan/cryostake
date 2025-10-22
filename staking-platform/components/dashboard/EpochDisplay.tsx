'use client';

import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function EpochDisplay() {
  const [epochData, setEpochData] = useState({
  currentEpoch: 1,
  totalStaked: '0',
  totalUsers: 0,
  epochEndTime: null as Date | null,
  epochRewardRate: '12',
});


  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
  setEpochData(prev => ({
    ...prev,
    epochEndTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }));
}, []);

useEffect(() => {
  if (!epochData.epochEndTime) return;

  const calculateTimeRemaining = () => {
    const now = new Date();
    const diff = epochData.epochEndTime!.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeRemaining('EPOCH Ended');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
  };

  calculateTimeRemaining();
  const interval = setInterval(calculateTimeRemaining, 60000);

  return () => clearInterval(interval);
}, [epochData.epochEndTime]);


  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Current EPOCH #{epochData.currentEpoch}</h2>
        <div className="flex items-center gap-2 text-blue-400">
          <Clock size={20} />
          <span className="font-mono font-semibold">{timeRemaining || 'Loading...'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161b22] rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <DollarSign size={18} />
            <span className="text-sm">Total Staked</span>
          </div>
          <p className="text-2xl font-bold text-white">{parseFloat(epochData.totalStaked).toLocaleString()} INRT</p>
        </div>

        <div className="bg-[#161b22] rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Users size={18} />
            <span className="text-sm">Total Stakers</span>
          </div>
          <p className="text-2xl font-bold text-white">{epochData.totalUsers.toLocaleString()}</p>
        </div>

        <div className="bg-[#161b22] rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <TrendingUp size={18} />
            <span className="text-sm">Reward Rate</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{epochData.epochRewardRate}% APY</p>
        </div>
      </div>
    </div>
  );
}
