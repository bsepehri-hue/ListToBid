
import TopNav from "@/components/ui/TopNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  );
}


import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WalletProvider } from './context/WalletContext'; // switched to relative import

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
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
