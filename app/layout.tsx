"use client";

import "./globals.css";
import { Providers } from "./providers";
import ClientTopNavWrapper from "@/components/ui/ClientTopNavWrapper";

export const metadata = {
  title: "ListToBid",
  description: "Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <ClientTopNavWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}