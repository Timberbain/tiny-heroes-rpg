'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/src/i18n/navigation'
import { locales, type Locale } from '@/src/i18n/routing'

// Flag emojis for child-friendly display
const FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  sv: '🇸🇪',
}

export default function LanguageSelector() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('LanguageSelector')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Hide on play pages (adventure in progress)
  const isPlayPage = pathname.includes('/play/')
  if (isPlayPage) {
    return null
  }

  const handleChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Collapsed state - just current flag */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            flex items-center justify-center
            w-14 h-14 rounded-xl
            bg-cloud border-3 border-border-dark shadow-md
            hover:shadow-lg hover:-translate-y-0.5
            active:translate-y-0.5 active:shadow-sm
            transition-all duration-200
          "
          aria-label={t('label')}
          aria-expanded={false}
        >
          <span className="text-3xl">{FLAGS[locale]}</span>
        </button>
      )}

      {/* Expanded state - all language options */}
      {isOpen && (
        <div className="bg-cloud border-3 border-border-dark rounded-xl shadow-lg p-2 animate-fadeIn">
          <div className="flex gap-2">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleChange(loc)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg
                  font-heading text-lg font-bold
                  transition-all duration-200
                  min-h-[48px] min-w-[48px]
                  ${
                    locale === loc
                      ? 'bg-adventure-blue text-white border-2 border-border-dark'
                      : 'bg-white text-text-primary hover:bg-parchment border-2 border-transparent'
                  }
                `}
                aria-label={t(loc)}
                aria-current={locale === loc ? 'true' : undefined}
              >
                <span className="text-2xl">{FLAGS[loc]}</span>
                <span className="hidden sm:inline">{t(loc)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
