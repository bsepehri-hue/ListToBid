import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import WagmiClientProvider from './providers/WagmiClientProvider';
import TopNav from "@/components/ui/TopNav";
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ListToBid Storefront Dashboard',
  description: 'Manage your auctions and storefronts on ListToBid.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  return (
    <html lang="en" className={isDark ? 'dark' : ''}>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <WagmiClientProvider>
          <TopNav />
          <button
            onClick={() => setIsDark(!isDark)}
            className="absolute top-4 right-4 px-3 py-1 rounded bg-teal-600 text-white hover:bg-teal-700"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <main>{children}</main>
        </WagmiClientProvider>
      </body>
    </html>
  );
}