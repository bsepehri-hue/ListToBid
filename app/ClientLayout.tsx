import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ListToBid Storefront Dashboard",
  description: "Manage your auctions and storefronts on ListToBid.",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}