'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import stakingAbi from '@/components/ABI/staking.json';
import { STAKING_ADDRESS, INRT_ADDRESS } from '@/lib/addresses';

const erc20Abi = [
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const;

export default function StakingForm() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [mounted, setMounted] = useState(false);

  // Just use 'data' - no renaming
  const tokenCfgResult = useReadContract({
    abi: stakingAbi,
    address: STAKING_ADDRESS,
    functionName: 'supportedTokens',
    args: [INRT_ADDRESS],
  });

  const allowanceResult = useReadContract({
    abi: erc20Abi,
    address: INRT_ADDRESS,
    functionName: 'allowance',
    args: [
      (address || '0x0000000000000000000000000000000000000000') as `0x${string}`,
      STAKING_ADDRESS,
    ],
    query: { enabled: !!address },
  });

  const approveWrite = useWriteContract();
  const stakeWrite = useWriteContract();

  const approveReceipt = useWaitForTransactionReceipt({
    hash: approveWrite.data,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (approveReceipt.isSuccess) {
      allowanceResult.refetch();
    }
  }, [approveReceipt.isSuccess, allowanceResult]);

  const tokenCfg = tokenCfgResult.data;
  const allowance = allowanceResult.data;

  const decimals = tokenCfg ? Number((tokenCfg as any).decimals) : 18;
  const minStake = (tokenCfg ? (tokenCfg as any).minStakeAmount : 0n) as bigint;
  const amountWei = amount ? parseUnits(amount, decimals) : 0n;
  const needsApprove = (allowance ?? 0n) < amountWei;

  if (!mounted) return null;

  const onApprove = () => {
    if (!amountWei) return;
    approveWrite.writeContract({
      abi: erc20Abi,
      address: INRT_ADDRESS,
      functionName: 'approve',
      args: [STAKING_ADDRESS, amountWei],
    });
  };

  const onStake = () => {
    if (minStake && amountWei < minStake) {
      alert('Amount below minimum stake');
      return;
    }
    stakeWrite.writeContract({
      abi: stakingAbi,
      address: STAKING_ADDRESS,
      functionName: 'stake',
      args: [INRT_ADDRESS, amountWei],
    });
  };

  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Stake INRT</h2>

      <input
        type="number"
        min="0"
        step="0.0001"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-lg text-white mb-4"
      />

      <div className="flex gap-3">
        <button
          disabled={!address || !amountWei || !needsApprove || approveWrite.isPending || approveReceipt.isLoading}
          onClick={onApprove}
          className="px-5 py-3 rounded bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {approveWrite.isPending || approveReceipt.isLoading ? 'Approving…' : 'Approve'}
        </button>

        <button
          disabled={!address || !amountWei || needsApprove || stakeWrite.isPending}
          onClick={onStake}
          className="px-5 py-3 rounded bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition"
        >
          {stakeWrite.isPending ? 'Staking…' : 'Stake'}
        </button>
      </div>

      {approveReceipt.isLoading && (
        <p className="text-sm text-yellow-400 mt-2">Waiting for approval confirmation...</p>
      )}
      {approveReceipt.isSuccess && (
        <p className="text-sm text-green-400 mt-2">Approval confirmed! You can now stake.</p>
      )}
    </div>
  );
}
