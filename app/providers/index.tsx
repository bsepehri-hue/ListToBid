

import ClientQueryProvider from "./ClientQueryProvider";
import WagmiClientProvider from "./WagmiClientProvider";
import ThemeProvider from "./ThemeProvider"; // ← you need this

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ClientQueryProvider>
        <WagmiClientProvider>
          {children}
        </WagmiClientProvider>
      </ClientQueryProvider>
    </ThemeProvider>
  );
}