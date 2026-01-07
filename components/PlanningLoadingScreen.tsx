'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CharacterId } from '@/lib/types'
import { getCharacter } from '@/lib/characters'

interface PlanningLoadingScreenProps {
  characterId: CharacterId
  characterName: string
}

const LOADING_MESSAGES = [
  'Painting magical lands...',
  'Waking up friendly creatures...',
  'Hiding treasures to find...',
  'Setting up exciting challenges...',
  'Preparing your adventure!',
  'Adding sparkles and wonder...',
  'Making everything cozy and fun...',
]

export default function PlanningLoadingScreen({
  characterId,
  characterName,
}: PlanningLoadingScreenProps) {
  const character = getCharacter(characterId)
  const [messageIndex, setMessageIndex] = useState(0)

  // Cycle through loading messages every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const currentMessage = LOADING_MESSAGES[messageIndex]

  return (
    <div className="fixed inset-0 z-50 bg-parchment flex items-center justify-center p-4">
      <div className="bg-cloud border-5 border-border-dark rounded-3xl shadow-xl p-8 sm:p-12 max-w-lg w-full text-center">
        {/* Character Image - animated bounce */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 animate-bounce-slow">
          <Image
            src={character.iconUrl}
            alt={character.displayName}
            width={160}
            height={160}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Title */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          Creating Your Adventure...
        </h2>

        {/* Character name */}
        <p className="font-heading text-lg sm:text-xl text-text-secondary mb-6">
          Get ready, {characterName}!
        </p>

        {/* Loading message that cycles */}
        <p className="font-body text-lg sm:text-xl text-text-primary mb-8 min-h-[60px] flex items-center justify-center transition-opacity duration-300">
          {currentMessage}
        </p>

        {/* Bouncing dots animation */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-bounce"
              style={{
                backgroundColor: character.color,
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
