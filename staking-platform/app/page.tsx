import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Welcome to CryoStake
      </h1>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl">
        Secure EPOCH-based staking platform with referral rewards. Stake your INRT tokens and earn passive income.
      </p>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
        >
          Start Staking
        </Link>
        <Link
          href="/admin"
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
        >
          Buy INRT Tokens
        </Link>
      </div>
    </div>
  );
}
