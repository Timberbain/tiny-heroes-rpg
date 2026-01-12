import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeContent />
}

function HomeContent() {
  const t = useTranslations('Home')
  const tc = useTranslations('Characters')

  const heroes = [
    { id: 'sorceress', colorClass: 'bg-adventure-red', emoji: '🔮' },
    { id: 'knight', colorClass: 'bg-adventure-blue', emoji: '⚔️' },
    { id: 'ranger', colorClass: 'bg-adventure-green', emoji: '🏹' },
    { id: 'bard', colorClass: 'bg-adventure-yellow', emoji: '🎵' },
  ] as const

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-linear-to-br from-parchment to-parchment-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl">🏰</div>
        <div className="absolute top-20 right-20 text-6xl">🐉</div>
        <div className="absolute bottom-20 left-20 text-6xl">⚔️</div>
        <div className="absolute bottom-10 right-10 text-6xl">✨</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main hero section */}
        <div className="text-center mb-12 bg-cloud border-5 border-border-dark rounded-3xl shadow-xl p-8 md:p-12">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
            {t('title')}
          </h1>

          <p className="font-body text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            {t('subtitle')} ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/select-character"
              className="
                inline-block
                font-heading text-xl md:text-2xl font-bold
                px-10 py-5 min-h-[64px]
                bg-adventure-blue text-white
                border-4 border-border-dark rounded-2xl
                shadow-lg hover:shadow-xl
                hover:-translate-y-1 active:translate-y-1
                active:shadow-pressed
                transition-all duration-200
                w-full sm:w-auto
              "
            >
              {t('startButton')} 🎮
            </Link>

            <Link
              href="/design-system"
              className="
                inline-block
                font-body text-lg font-semibold
                px-8 py-4
                bg-cloud text-text-primary
                border-3 border-border-medium rounded-xl
                shadow-sm hover:shadow-md
                hover:-translate-y-0.5
                transition-all duration-200
                w-full sm:w-auto
              "
            >
              {t('designSystem')}
            </Link>
          </div>
        </div>

        {/* Character preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className={`
                ${hero.colorClass} text-white
                border-4 border-border-dark rounded-xl
                shadow-md hover:shadow-lg
                p-4 md:p-6
                text-center
                hover:-translate-y-1 hover:scale-105
                transition-all duration-200
                cursor-pointer
              `}
            >
              <div className="text-4xl md:text-5xl mb-2">{hero.emoji}</div>
              <div className="font-heading text-lg md:text-xl font-bold">
                {tc(`${hero.id}.displayName`)}
              </div>
            </div>
          ))}
        </div>

        {/* Features section */}
        <div className="mt-12 bg-cloud border-4 border-border-dark rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6 text-center">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎲</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                {t('features.dice.title')}
              </h3>
              <p className="font-body text-base text-text-secondary">
                {t('features.dice.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                {t('features.ai.title')}
              </h3>
              <p className="font-body text-base text-text-secondary">
                {t('features.ai.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                {t('features.fun.title')}
              </h3>
              <p className="font-body text-base text-text-secondary">
                {t('features.fun.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
