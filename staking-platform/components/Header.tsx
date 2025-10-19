'use client';

import WalletButton from './WalletButton';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-[#161b22] shadow-md border-b border-gray-800">
      <div className="text-2xl font-bold text-blue-400">
        <Link href="/">CryoStake</Link>
      </div>
      <nav className="space-x-6 text-gray-300 hidden md:flex">
        <Link href="/dashboard" className="hover:text-blue-400 transition">
          Dashboard
        </Link>
        <Link href="/admin" className="hover:text-blue-400 transition">
          Admin
        </Link>
      </nav>
      <WalletButton />
    </header>
  );
}
