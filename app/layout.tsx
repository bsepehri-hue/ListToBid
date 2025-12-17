"use client"

import './globals.css'
import type { Metadata } from 'next'

import WagmiClientProvider from './providers/WagmiClientProvider'
import TopNav from '@/components/ui/TopNav'
import { useState, useEffect } from 'react'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setIsDark(storedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <html lang="en">
      <body className={isDark ? 'dark font-sans' : 'font-sans'}>
        <WagmiClientProvider>
          <TopNav />
          <button
            onClick={() => setIsDark(!isDark)}
            className="absolute top-4 right-4 px-3 py-1 rounded bg-teal-600 text-white hover:bg-teal-700"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500 ease-in-out">
            <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400 transition-colors duration-500 ease-in-out">
              Merchant Net Value
            </h3>
            {/* Chart here */}
          </div>

          <main>{children}</main>
        </WagmiClientProvider>
      </body>
    </html>
  )
}