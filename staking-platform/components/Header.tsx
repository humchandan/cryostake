'use client';

import { useAccount } from 'wagmi';
import Link from 'next/link';
import WalletButton from './WalletButton';  // Add this import (adjust path if needed)

const ADMIN_LIST = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || '')
  .split(',')
  .map(a => a.trim().toLowerCase())
  .filter(Boolean);

export default function Header() {
  const { address } = useAccount();
  const isAdmin = !!address && ADMIN_LIST.includes(address.toLowerCase());

  return (
    <header className="flex justify-between items-center p-6">
      <Link href="/">CryoStake</Link>
      <nav className="space-x-6 flex items-center ">
        <Link href="/dashboard">Dashboard</Link>
        {isAdmin && <Link href="/admin">Admin</Link>}
        <WalletButton />           {/* Add WalletButton here */}
      </nav>
    </header>
  );
}
