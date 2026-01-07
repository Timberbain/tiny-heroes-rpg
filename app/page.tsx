import Link from 'next/link'

export default function Home() {
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
            Tiny Heroes RPG
          </h1>

          <p className="font-body text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            Embark on an amazing adventure! Choose your hero, roll the dice, and create your own magical story! ✨
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
              Start Adventure! 🎮
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
              View Design System
            </Link>
          </div>
        </div>

        {/* Character preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: 'Sorceress', color: 'adventure-red', emoji: '🔮' },
            { name: 'Knight', color: 'adventure-blue', emoji: '⚔️' },
            { name: 'Ranger', color: 'adventure-green', emoji: '🏹' },
            { name: 'Bard', color: 'adventure-yellow', emoji: '🎵' },
          ].map((hero) => (
            <div
              key={hero.name}
              className={`
                bg-${hero.color} text-white
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
                {hero.name}
              </div>
            </div>
          ))}
        </div>

        {/* Features section */}
        <div className="mt-12 bg-cloud border-4 border-border-dark rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6 text-center">
            What Makes This Special?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎲</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                Roll Dice!
              </h3>
              <p className="font-body text-base text-text-secondary">
                Exciting dice rolls with exploding 6s make every action thrilling!
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                AI Guide
              </h3>
              <p className="font-body text-base text-text-secondary">
                A smart game master creates unique adventures just for you!
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                Always Fun
              </h3>
              <p className="font-body text-base text-text-secondary">
                Failures are funny, successes are celebrated - never scary!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
