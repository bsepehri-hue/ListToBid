// app/providers/index.tsx

import ClientQueryProvider from "./ClientQueryProvider"
import WagmiClientProvider from "./WagmiClientProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <WagmiClientProvider>
        {children}
      </WagmiClientProvider>
    </QueryProvider>
  )
}