import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WalletProvider } from '@/context/WalletContext'; // Import the WalletProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ListToBid Storefront Dashboard',
  description: 'Manage your auctions and storefronts on ListToBid.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire application with the WalletProvider */}
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
