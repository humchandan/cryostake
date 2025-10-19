import Providers from './providers'; // or '@/components/Providers' if you placed it there

export const metadata = {
  title: 'CryoStake Platform',
  description: 'EPOCH staking with WalletConnect',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap your entire app with Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
