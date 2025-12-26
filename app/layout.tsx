import "./globals.css";
import { Providers } from "./providers";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = {
  title: "ListToBid",
  description: "Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}