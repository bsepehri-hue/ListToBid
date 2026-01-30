import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className="font-sans bg-slate-950 text-slate-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
