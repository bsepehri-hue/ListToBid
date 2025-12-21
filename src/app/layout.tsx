import Web3Provider from "@/components/providers/Web3Provider";
import { WalletProvider } from "@/context/WalletContext";
import Navbar from "@/components/Navbar";   // ⭐ Add this

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <WalletProvider>
            <Navbar />                     {/* ⭐ Add this */}
            {children}
          </WalletProvider>
        </Web3Provider>
      </body>
    </html>
  );
}