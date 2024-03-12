import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { cn } from '@/lib/utils'

import './globals.css'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PFT System',
  description: 'PFT System',
}

const STORAGE_THEME_KEY = process.env.STORAGE_THEME_KEY

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(font.className, 'dark:bg-[#333]')}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          storageKey={STORAGE_THEME_KEY}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
