'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getAllCharacters } from '@/lib/characters'
import { CharacterId } from '@/lib/types'
import { SKILL_ICONS, SKILL_NAMES, SKILL_RATING_LABELS } from '@/lib/characters'

export default function SelectCharacter() {
  const router = useRouter()
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId | null>(null)
  const characters = getAllCharacters()

  const handleSelectCharacter = (characterId: CharacterId) => {
    setSelectedCharacter(characterId)
    // Small delay for visual feedback before navigation
    setTimeout(() => {
      router.push(`/setup-adventure?character=${characterId}`)
    }, 300)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-parchment to-parchment-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 bg-cloud border-4 border-border-dark rounded-3xl shadow-xl p-6 md:p-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Choose Your Hero! 🌟
          </h1>
          <p className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Pick a brave hero to go on amazing adventures! Each hero is special and great at different things.
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {characters.map((character) => {
            const isSelected = selectedCharacter === character.id

            return (
              <div
                key={character.id}
                className={`
                  relative
                  bg-gradient-to-br from-parchment to-parchment-dark
                  border-5 border-border-dark rounded-3xl
                  shadow-lg hover:shadow-xl
                  p-6 md:p-8
                  transition-all duration-300
                  cursor-pointer
                  ${isSelected ? 'ring-4 ring-offset-4 ring-offset-parchment' : 'hover:-translate-y-2'}
                `}
                style={{
                  ringColor: isSelected ? character.color : 'transparent'
                }}
                onClick={() => handleSelectCharacter(character.id)}
              >
                {/* Character Header */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Character Image */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-border-dark overflow-hidden bg-cloud shadow-md"
                      style={{ borderColor: character.color }}
                    >
                      <Image
                        src={character.iconUrl}
                        alt={character.displayName}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-heading text-2xl md:text-3xl font-bold mb-2"
                      style={{ color: character.color }}
                    >
                      {character.displayName}
                    </h2>
                    <p className="font-body text-base md:text-lg text-text-secondary mb-3">
                      {character.archetype}
                    </p>
                    <p className="font-body text-sm md:text-base text-text-primary">
                      {character.description}
                    </p>
                  </div>
                </div>

                {/* Skills Display */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-text-primary mb-3">
                    Special Skills:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(character.skills) as Array<keyof typeof character.skills>).map((skillKey) => {
                      const skillValue = character.skills[skillKey]
                      const skillName = SKILL_NAMES[skillKey]
                      const skillIcon = SKILL_ICONS[skillKey]
                      const skillLabel = SKILL_RATING_LABELS[skillValue]

                      return (
                        <div
                          key={skillKey}
                          className="flex items-center gap-3 bg-cloud border-3 border-border-dark rounded-full px-4 py-3 shadow-sm"
                        >
                          <span className="text-3xl flex-shrink-0">{skillIcon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-heading text-sm font-semibold text-text-primary truncate">
                              {skillName}
                            </div>
                            <div className="font-body text-xs text-text-secondary">
                              {skillLabel}
                            </div>
                          </div>
                          <div
                            className={`
                              flex items-center justify-center
                              w-10 h-10 flex-shrink-0
                              border-3 border-border-dark rounded-full
                              font-heading text-xl font-extrabold text-white
                              ${skillValue === 0 && 'bg-castle'}
                              ${skillValue === 1 && 'bg-adventure-yellow'}
                              ${skillValue === 2 && 'bg-adventure-green'}
                              ${skillValue === 3 && 'bg-adventure-red'}
                            `}
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
                  className={`
                    w-full
                    font-heading text-xl md:text-2xl font-bold
                    px-8 py-4 min-h-[64px]
                    text-white
                    border-4 border-border-dark rounded-2xl
                    shadow-md hover:shadow-lg
                    hover:-translate-y-1 active:translate-y-1
                    active:shadow-pressed
                    transition-all duration-200
                    ${isSelected ? 'animate-celebrate' : ''}
                  `}
                  style={{ backgroundColor: character.color }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectCharacter(character.id)
                  }}
                >
                  {isSelected ? '✨ Selected!' : `Choose ${character.displayName}!`}
                </button>
              </div>
            )
          })}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="
              font-body text-lg font-semibold
              px-8 py-4
              bg-cloud text-text-primary
              border-3 border-border-medium rounded-xl
              shadow-sm hover:shadow-md
              hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </main>
  )
}
