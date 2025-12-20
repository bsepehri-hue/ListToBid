// app/layout.tsx
import "./globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "ListToBid",
  description: "Marketplace",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}