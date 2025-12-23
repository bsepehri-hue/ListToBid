// app/layout.tsx
import "./globals.css"
import { Providers } from "./providers"
import TopNav from "@/components/ui/TopNav"

export const metadata = {
  title: "ListToBid",
  description: "Marketplace",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <Navbar />                      {/* ⭐ Add this */}
          {children}
        </Providers>
      </body>
    </html>
  )
}