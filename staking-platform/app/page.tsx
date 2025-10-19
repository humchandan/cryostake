import WalletConnectButton from '@/components/WalletConnectButton';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Connect Your Wallet</h1>
      <WalletConnectButton />
    </main>
  );
}
