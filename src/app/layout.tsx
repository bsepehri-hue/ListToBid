import Web3Provider from "@/components/providers/Web3Provider";
import { WalletProvider } from "@/context/WalletContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </Web3Provider>
      </body>
    </html>
  );
}