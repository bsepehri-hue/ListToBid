"use client";

import ThemeProvider from "./ThemeProvider.client";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}
