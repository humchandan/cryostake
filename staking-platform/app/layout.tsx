import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CryoStake - Crypto Staking Platform',
  description: 'EPOCH-based INRT staking with referrals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0d1117] text-[#c9d1d9] min-h-screen`}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
