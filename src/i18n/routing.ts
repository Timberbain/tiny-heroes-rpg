import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'sv'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show locale in URL: /en/play, /sv/play
  localePrefix: 'always',
})
