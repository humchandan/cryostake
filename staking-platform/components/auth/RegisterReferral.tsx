'use client';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import stakingAbi from '@/components/ABI/staking.json';
import { STAKING_ADDRESS } from '@/lib/addresses';

export default function RegisterReferral({ referrer }: { referrer?: `0x${string}` }) {
  const { address } = useAccount();

  const { data: already } = useReadContract({
    abi: stakingAbi,
    address: STAKING_ADDRESS,
    functionName: 'referrerSet',
    args: [(address || '0x0000000000000000000000000000000000000000') as `0x${string}`],
    query: { enabled: !!address },
  });

  const { writeContract, isPending } = useWriteContract();

  const onSet = () => {
    if (!referrer || !address || Boolean(already)) return;
    if (referrer.toLowerCase() === address.toLowerCase()) return;
    writeContract({
      abi: stakingAbi,
      address: STAKING_ADDRESS,
      functionName: 'setReferrer',
      args: [referrer],
    });
  };

  if (!referrer || Boolean(already)) return null;

  return (
    <button onClick={onSet} disabled={isPending} className="px-4 py-2 rounded bg-purple-600 text-white">
      {isPending ? 'Linking…' : 'Link Referrer'}
    </button>
  );
}
