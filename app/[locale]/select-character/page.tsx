'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/src/i18n/navigation'
import { getAllCharacters } from '@/lib/characters'
import { CharacterId } from '@/lib/types'

export default function SelectCharacter() {
  const router = useRouter()
  const t = useTranslations('SelectCharacter')
  const tc = useTranslations('Characters')
  const ts = useTranslations('Skills')
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterId | null>(null)
  const characters = getAllCharacters()

  const SKILL_ICONS: Record<string, string> = {
    strong: '💪',
    smart: '📚',
    sneaky: '⚡',
    kind: '❤️',
  }

  const handleSelectCharacter = (characterId: CharacterId) => {
    setSelectedCharacter(characterId)
    // Small delay for visual feedback before navigation
    setTimeout(() => {
      router.push(`/setup-adventure?character=${characterId}`)
    }, 300)
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-parchment to-parchment-dark p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl border-4 border-border-dark bg-cloud p-6 text-center shadow-xl md:mb-12 md:p-8">
          <h1 className="mb-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {t('title')} 🌟
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-text-secondary md:text-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Character Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {characters.map((character) => {
            const isSelected = selectedCharacter === character.id

            return (
              <div
                key={character.id}
                className={`relative cursor-pointer rounded-3xl border-5 border-border-dark bg-linear-to-br from-parchment to-parchment-dark p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8 ${isSelected ? 'ring-4 ring-offset-4 ring-offset-parchment' : 'hover:-translate-y-2'} `}
                style={
                  {
                    '--tw-ring-color': isSelected
                      ? character.color
                      : 'transparent',
                  } as React.CSSProperties
                }
                onClick={() => handleSelectCharacter(character.id)}
              >
                {/* Character Header */}
                <div className="mb-6 flex items-start gap-4">
                  {/* Character Image */}
                  <div className="relative shrink-0">
                    <div
                      className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-border-dark bg-cloud shadow-md md:h-32 md:w-32"
                      style={{ borderColor: character.color }}
                    >
                      <Image
                        src={character.iconUrl}
                        alt={tc(`${character.id}.displayName`)}
                        width={128}
                        height={128}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="min-w-0 flex-1">
                    <h2
                      className="mb-2 font-heading text-2xl font-bold md:text-3xl"
                      style={{ color: character.color }}
                    >
                      {tc(`${character.id}.displayName`)}
                    </h2>
                    <p className="mb-3 font-body text-base text-text-secondary md:text-lg">
                      {tc(`${character.id}.archetype`)}
                    </p>
                    <p className="font-body text-sm text-text-primary md:text-base">
                      {tc(`${character.id}.description`)}
                    </p>
                  </div>
                </div>

                {/* Skills Display */}
                <div className="mb-6 space-y-3">
                  <h3 className="mb-3 font-heading text-lg font-bold text-text-primary md:text-xl">
                    {t('specialSkills')}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(
                      Object.keys(character.skills) as Array<
                        keyof typeof character.skills
                      >
                    ).map((skillKey) => {
                      const skillValue = character.skills[skillKey]
                      const skillName = ts(`${skillKey}.name`)
                      const skillIcon = SKILL_ICONS[skillKey]
                      const skillLabel = ts(`ratings.${skillValue}`)

                      return (
                        <div
                          key={skillKey}
                          className="flex items-center gap-3 rounded-full border-3 border-border-dark bg-cloud px-4 py-3 shadow-sm"
                        >
                          <span className="shrink-0 text-3xl">
                            {skillIcon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-heading text-sm font-semibold text-text-primary">
                              {skillName}
                            </div>
                            <div className="font-body text-xs text-text-secondary">
                              {skillLabel}
                            </div>
                          </div>
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-3 border-border-dark font-heading text-xl font-extrabold text-white ${skillValue === 0 && 'bg-castle'} ${skillValue === 1 && 'bg-adventure-yellow'} ${skillValue === 2 && 'bg-adventure-green'} ${skillValue === 3 && 'bg-adventure-red'} `}
                          >
                            {skillValue}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  className={`min-h-[64px] w-full rounded-2xl border-4 border-border-dark px-8 py-4 font-heading text-xl font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-1 active:shadow-pressed md:text-2xl ${isSelected ? 'animate-celebrate' : ''} `}
                  style={{ backgroundColor: character.color }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectCharacter(character.id)
                  }}
                >
                  {isSelected
                    ? `✨ ${t('selected')}`
                    : t('chooseButton', { characterName: tc(`${character.id}.displayName`) })}
                </button>
              </div>
            )
          })}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="rounded-xl border-3 border-border-medium bg-cloud px-8 py-4 font-body text-lg font-semibold text-text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            ← {t('backToHome')}
          </button>
        </div>
      </div>
    </main>
  )
}
