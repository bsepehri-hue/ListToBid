import "./globals.css";
import { Providers } from "./providers";
import ClientTopNav from "@/components/ui/ClientTopNav";

export const metadata = {
  title: "ListToBid",
  description: "Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <ClientTopNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}