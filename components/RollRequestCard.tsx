'use client'

import { useTranslations } from 'next-intl'
import { CharacterId, PendingRollRequest } from '@/lib/types'
import { getCharacter } from '@/lib/characters'
import { getTargetNumber } from '@/lib/game-logic'

interface RollRequestCardProps {
  pendingRoll: PendingRollRequest
  characterId: CharacterId
  skillBonus: number
  onRoll: () => void
  isRolling: boolean
}

// Difficulty color mapping using design system classes
const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'text-adventure-green',
  normal: 'text-adventure-blue',
  hard: 'text-adventure-yellow',
  epic: 'text-adventure-red',
}

const SKILL_ICONS: Record<string, string> = {
  strong: '💪',
  smart: '📚',
  sneaky: '⚡',
  kind: '❤️',
}

export default function RollRequestCard({
  pendingRoll,
  characterId,
  skillBonus,
  onRoll,
  isRolling,
}: RollRequestCardProps) {
  const character = getCharacter(characterId)
  const t = useTranslations('RollRequest')
  const ts = useTranslations('Skills')
  const skillIcon = SKILL_ICONS[pendingRoll.skill]
  const skillName = ts(`${pendingRoll.skill}.name`)
  const targetNumber = getTargetNumber(pendingRoll.difficulty)
  const difficultyStyle = DIFFICULTY_STYLES[pendingRoll.difficulty] || DIFFICULTY_STYLES.normal
  const difficultyLabel = t(`difficulty.${pendingRoll.difficulty}`)

  return (
    <div className="bg-cloud border-4 border-border-dark rounded-2xl shadow-lg p-6 animate-fadeIn">
      {/* What you're attempting */}
      <div className="font-heading text-base text-text-secondary mb-4 text-center">
        {pendingRoll.context}
      </div>

      {/* Skill + Difficulty Display */}
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 flex-wrap">
        {/* Skill Badge */}
        <div className="flex items-center gap-3 bg-white border-3 border-border-dark rounded-full px-5 py-3 shadow-sm">
          <span className="text-3xl md:text-4xl">{skillIcon}</span>
          <span className="font-heading text-lg md:text-xl font-bold text-text-primary">
            {skillName}
          </span>
          <span
            className="text-white rounded-full w-10 h-10 flex items-center justify-center font-heading text-xl font-bold border-2 border-border-dark"
            style={{ backgroundColor: character.color }}
          >
            +{skillBonus}
          </span>
        </div>

        {/* Difficulty Indicator */}
        <div className="text-center">
          <div className="font-body text-sm text-text-secondary">{t('need')}</div>
          <div className={`font-heading text-3xl md:text-4xl font-bold ${difficultyStyle}`}>
            {targetNumber}+
          </div>
          <div className="font-body text-sm text-text-secondary capitalize">
            ({difficultyLabel})
          </div>
        </div>
      </div>

      {/* Roll Button */}
      <button
        onClick={onRoll}
        disabled={isRolling}
        className="w-full min-h-[80px] font-heading text-2xl md:text-3xl font-bold text-white border-4 border-border-dark rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          backgroundColor: character.color,
          animation: isRolling ? 'pulse 1.5s ease-in-out infinite' : 'wiggle 1s ease-in-out infinite',
        }}
      >
        {isRolling ? (
          <span className="flex items-center justify-center gap-3">
            <span className="animate-spin text-4xl">🎲</span>
            {t('rolling')}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <span className="text-4xl">🎲</span>
            {t('rollButton')}
          </span>
        )}
      </button>
    </div>
  )
}
