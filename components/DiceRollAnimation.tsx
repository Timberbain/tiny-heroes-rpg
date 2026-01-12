'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { RollResult } from '@/lib/types'

interface DiceRollAnimationProps {
  rollResult: RollResult
  onComplete: () => void
}

type Phase = 'rolling' | 'result' | 'breakdown'

export default function DiceRollAnimation({ rollResult, onComplete }: DiceRollAnimationProps) {
  const t = useTranslations('DiceRoll')
  const [phase, setPhase] = useState<Phase>('rolling')
  const [displayedNumber, setDisplayedNumber] = useState(1)

  // Rolling animation: rapidly cycle through 1-6
  useEffect(() => {
    if (phase === 'rolling') {
      const interval = setInterval(() => {
        setDisplayedNumber(Math.floor(Math.random() * 6) + 1)
      }, 80)

      // Stop after 1.8 seconds, show result
      const timeout = setTimeout(() => {
        clearInterval(interval)
        setDisplayedNumber(rollResult.diceRoll)
        setPhase('result')
      }, 1800)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [phase, rollResult.diceRoll])

  // After result shown, move to breakdown
  useEffect(() => {
    if (phase === 'result') {
      const timeout = setTimeout(() => setPhase('breakdown'), 1200)
      return () => clearTimeout(timeout)
    }
  }, [phase])

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-cloud border-5 border-border-dark rounded-3xl shadow-float p-8 sm:p-12 text-center max-w-lg w-full">
        {phase === 'rolling' || phase === 'result' ? (
          <>
            {/* Large Dice Face */}
            <div
              className={`
                w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6
                bg-white border-4 border-border-dark rounded-2xl
                flex items-center justify-center
                font-heading text-6xl sm:text-7xl font-extrabold text-text-primary
                ${phase === 'rolling' ? 'animate-dice-roll' : 'animate-celebrate scale-110'}
              `}
              style={{ textShadow: '0 3px 0 #3D2E1F' }}
            >
              {displayedNumber}
            </div>

            {/* Rolling text */}
            {phase === 'rolling' && (
              <div className="font-heading text-2xl sm:text-3xl text-text-primary animate-pulse">
                {t('rolling')}
              </div>
            )}

            {/* Exploding dice indicator */}
            {phase === 'result' && rollResult.diceRoll === 6 && (
              <div className="font-heading text-xl sm:text-2xl text-adventure-yellow animate-bounce">
                {t('exploding')}
              </div>
            )}

            {/* Fumble indicator */}
            {phase === 'result' && rollResult.diceRoll === 1 && (
              <div className="font-heading text-xl sm:text-2xl text-adventure-red animate-wiggle">
                {t('fumble')}
              </div>
            )}
          </>
        ) : (
          /* Breakdown Phase */
          <>
            {/* Success/Failure Announcement */}
            <div
              className={`
                font-heading text-3xl sm:text-4xl font-bold mb-6
                ${
                  rollResult.success
                    ? 'bg-gradient-to-br from-adventure-green to-forest'
                    : 'bg-gradient-to-br from-adventure-red to-dragon'
                }
                text-white px-6 py-3 rounded-xl
                border-3 border-border-dark shadow-md
                animate-celebrate
              `}
            >
              {rollResult.success ? t('success') : t('notQuite')}
            </div>

            {/* Roll Breakdown */}
            <div className="bg-cloud border-3 border-border-dark rounded-xl p-6 mb-6">
              <div className="font-body text-xl sm:text-2xl text-text-primary mb-4">
                <span className="font-bold">🎲 {rollResult.diceRoll}</span>
                {rollResult.explodingRolls.length > 0 &&
                  rollResult.explodingRolls.map((r, i) => (
                    <span key={i} className="text-adventure-yellow font-bold">
                      {' '}
                      + ⚡{r}
                    </span>
                  ))}
                {rollResult.skillBonus > 0 && (
                  <span className="text-adventure-blue font-bold"> + {rollResult.skillBonus}</span>
                )}
                <span className="font-bold text-2xl sm:text-3xl"> = {rollResult.total}</span>
              </div>

              <div className="font-body text-lg text-text-secondary">
                {t('vsTarget', { target: rollResult.targetNumber })}
              </div>
            </div>

            {/* Special Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {rollResult.critical && (
                <div className="inline-block bg-adventure-yellow text-white px-4 py-2 rounded-full font-heading text-base sm:text-lg border-3 border-border-dark">
                  {t('criticalBadge')}
                </div>
              )}
              {rollResult.fumble && (
                <div className="inline-block bg-adventure-red text-white px-4 py-2 rounded-full font-heading text-base sm:text-lg border-3 border-border-dark">
                  {t('fumbleBadge')}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={onComplete}
              className="w-full font-heading text-xl sm:text-2xl font-bold px-8 py-4 bg-adventure-blue text-white border-4 border-border-dark rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all duration-200"
            >
              {t('continueButton')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
