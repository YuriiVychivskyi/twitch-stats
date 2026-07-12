import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Twitch Stats',
  description: 'Live Twitch chat analytics for creators.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-auto min-h-screen w-full max-w-[1280px] px-4 md:px-8 lg:px-10">
          {children}
        </main>
        <footer className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 border-t border-white/10 px-4 py-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <span>
            Developed by <span className="text-white">livay1337</span>
          </span>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <a
              href="mailto:yuravychivskii@gmail.com"
              className="transition hover:text-white"
            >
              Contact
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
