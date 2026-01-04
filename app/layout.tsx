import type { Metadata } from 'next'
import { Fredoka, Nunito, Baloo_2 } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-baloo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tiny Heroes RPG',
  description: 'An AI-powered RPG adventure for young heroes',
  manifest: '/site.webmanifest',
    icons: {
    icon: [
      { url: '/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      {
        url: '/icon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
    appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tiny Heroes RPG',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${nunito.variable} ${baloo.variable} font-body antialiased bg-parchment`}
      >
        {children}
      </body>
    </html>
  )
}
