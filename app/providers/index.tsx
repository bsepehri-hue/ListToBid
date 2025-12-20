// app/providers/index.tsx

import QueryProvider from "./QueryProvider"
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