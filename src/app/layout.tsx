import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConvexClientProvider from '@/components/ConvexClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export const metadata: Metadata = {
  title: 'Tap & Drill Chart — Machinist Reference',
  description: 'Quick-reference tap drill, clearance hole, and roll form sizes for machinists',
  openGraph: {
    title: 'Tap & Drill Chart — Machinist Reference',
    description: 'Quick-reference tap drill, clearance hole, and roll form sizes for machinists',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#0d0d0d', minHeight: '100vh' }}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  )
}
