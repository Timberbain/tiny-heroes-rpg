import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/src/i18n/routing'
import { Fredoka, Nunito, Baloo_2 } from 'next/font/google'
import LanguageSelector from '@/components/LanguageSelector'
import '../globals.css'

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

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages for this locale
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${fredoka.variable} ${nunito.variable} ${baloo.variable} font-body antialiased bg-parchment min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Language Selector - fixed position */}
          <div className="fixed top-4 right-4 z-50">
            <LanguageSelector />
          </div>

          <div className="flex-1">{children}</div>

          <footer className="py-4 text-center text-sm text-text-secondary">
            © 2025 Timberbain. All rights reserved.
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
