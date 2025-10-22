'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EpochDisplay from '@/components/dashboard/EpochDisplay';
import StakingForm from '@/components/dashboard/StakingForm';
import UserStakes from '@/components/dashboard/UserStakes';
import ReferralStats from '@/components/dashboard/ReferralStats';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/');
    }
  }, [mounted, isConnected, router]);

  // Render loading state until client mounts
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );
  }

  // After mount, check connection
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-xl text-gray-400">Please connect your wallet to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Staking Dashboard</h1>
        <div className="text-sm text-gray-400">
          Wallet: <span className="text-blue-400">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
      </div>

      <EpochDisplay />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StakingForm />
        </div>
        <div>
          <ReferralStats />
        </div>
      </div>

      <UserStakes />
    </div>
  );
}
