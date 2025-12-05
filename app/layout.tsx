import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import WagmiClientProvider from './providers/WagmiClientProvider'; // client-only wrapper
import TopNav from '../components/ui/TopNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ListToBid Storefront Dashboard',
  description: 'Manage your auctions and storefronts on ListToBid.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiClientProvider>
          <TopNav />
          <main>{children}</main>
        </WagmiClientProvider>
      </body>
    </html>
  );
}