'use client';

import { useState, useEffect } from 'react';
import { Users, Link2, Gift, Copy, Check } from 'lucide-react';
import { useAccount } from 'wagmi';

export default function ReferralStats() {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);
  const [referralData, setReferralData] = useState({
  referralCode: '',
  totalReferrals: 0,
  totalEarned: '0',
  referralLink: '',
});


  useEffect(() => {
  if (!address) return;

  const code = 'CRYO' + address.slice(2, 8).toUpperCase();
  const link = `${window.location.origin}?ref=${code}`;

  setReferralData({
    referralCode: code,
    totalReferrals: 0,
    totalEarned: '0',
    referralLink: link,
  });

  // TODO: Fetch real referral stats from API here
}, [address]);


  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-gray-700 shadow-lg h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Referral Program</h2>

      <div className="space-y-6">
        {/* Referral Code */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Your Referral Code</label>
          <div className="px-4 py-3 bg-[#0d1117] border border-blue-500/30 rounded-lg">
            <p className="text-xl font-mono font-bold text-blue-400">
  {referralData.referralCode || 'Loading...'}
</p>

          </div>
        </div>

        {/* Referral Link */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Referral Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralData.referralLink}
              readOnly
              className="flex-1 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm"
            />
            <button
              onClick={copyReferralLink}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400">
              <Users size={18} />
              <span className="text-sm">Total Referrals</span>
            </div>
            <span className="text-lg font-bold text-white">{referralData.totalReferrals}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400">
              <Gift size={18} />
              <span className="text-sm">Total Earned</span>
            </div>
            <span className="text-lg font-bold text-green-400">{referralData.totalEarned} INRT</span>
          </div>
        </div>

        {/* Reward Structure */}
        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
          <h3 className="text-sm font-semibold text-purple-300 mb-2">Referral Rewards</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Level 1: 2% of stake amount</li>
            <li>• Level 2: 1.5% of stake amount</li>
            <li>• Up to 15 levels deep</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
