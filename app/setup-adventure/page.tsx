'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { getCharacter } from '@/lib/characters'
import { CharacterId, AdventureSetting, AdventureLength } from '@/lib/types'

function SetupAdventureContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const characterId = searchParams.get('character') as CharacterId | null

  const [characterName, setCharacterName] = useState('')
  const [adventureSetting, setAdventureSetting] = useState<AdventureSetting>('fantasy')
  const [adventureLength, setAdventureLength] = useState<AdventureLength>('short')
  const [adventureInspiration, setAdventureInspiration] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if no character selected
  useEffect(() => {
    if (!characterId) {
      router.push('/select-character')
    }
  }, [characterId, router])

  if (!characterId) {
    return null
  }

  const character = getCharacter(characterId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!characterName.trim()) {
      alert('Please give your hero a name!')
      return
    }

    setIsSubmitting(true)

    try {
      // Create session via API
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId,
          characterName: characterName.trim(),
          adventureSetting,
          adventureLength,
          adventureInspiration: adventureInspiration.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create session')
      }

      const data = await response.json()

      // Save session ID to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tiny-heroes-session-id', data.sessionId)
      }

      // Navigate to play page
      router.push('/play')
    } catch (error) {
      console.error('Error creating session:', error)
      alert('Oops! Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-parchment to-parchment-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 bg-cloud border-4 border-border-dark rounded-3xl shadow-xl p-6 md:p-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Setup Your Adventure! 🎮
          </h1>
          <p className="font-body text-lg md:text-xl text-text-secondary">
            Tell us about your hero and the kind of adventure you want to go on!
          </p>
        </div>

        {/* Selected Character Display */}
        <div className="mb-8 bg-gradient-to-br from-parchment to-parchment-dark border-5 border-border-dark rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-4 text-center">
            Your Hero
          </h2>
          <div className="flex items-center gap-4 md:gap-6 bg-cloud border-4 border-border-dark rounded-2xl p-4 md:p-6">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 overflow-hidden bg-cloud flex-shrink-0"
              style={{ borderColor: character.color }}
            >
              <Image
                src={character.iconUrl}
                alt={character.displayName}
                width={96}
                height={96}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <h3
                className="font-heading text-2xl md:text-3xl font-bold mb-1"
                style={{ color: character.color }}
              >
                {character.displayName}
              </h3>
              <p className="font-body text-base md:text-lg text-text-secondary">
                {character.archetype}
              </p>
            </div>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Character Name */}
          <div className="bg-cloud border-4 border-border-dark rounded-2xl shadow-md p-6 md:p-8">
            <label className="block mb-3">
              <span className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 block">
                What's your hero's name? ✨
              </span>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter a brave name..."
                maxLength={30}
                className="
                  w-full
                  font-body text-lg md:text-xl
                  px-5 py-4 min-h-[64px]
                  bg-white
                  border-3 border-border-dark rounded-xl
                  shadow-inner
                  focus:outline-none focus:border-adventure-blue
                  focus:ring-4 focus:ring-adventure-blue/20
                  transition-all duration-200
                  placeholder:text-text-light
                "
                required
              />
            </label>
          </div>

          {/* Adventure Setting */}
          <div className="bg-cloud border-4 border-border-dark rounded-2xl shadow-md p-6 md:p-8">
            <label className="block mb-3">
              <span className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 block">
                What kind of adventure? 🌍
              </span>
              <select
                value={adventureSetting}
                onChange={(e) => setAdventureSetting(e.target.value as AdventureSetting)}
                className="
                  w-full
                  font-body text-lg md:text-xl
                  px-5 py-4 pr-12 min-h-[64px]
                  bg-white
                  border-3 border-border-dark rounded-xl
                  shadow-inner
                  appearance-none cursor-pointer
                  focus:outline-none focus:border-adventure-blue
                  focus:ring-4 focus:ring-adventure-blue/20
                  transition-all duration-200
                  bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjM0QyRTFGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')]
                  bg-[length:12px_8px]
                  bg-[position:right_1.25rem_center]
                  bg-no-repeat
                "
              >
                <option value="fantasy">Fantasy (castles, dragons, magic!)</option>
                <option value="sci-fi">Space Adventure (rockets, aliens, planets!)</option>
                <option value="horror">Silly Spooky (friendly monsters, not scary!)</option>
                <option value="custom">Surprise Me!</option>
              </select>
            </label>
          </div>

          {/* Adventure Length */}
          <div className="bg-cloud border-4 border-border-dark rounded-2xl shadow-md p-6 md:p-8">
            <span className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-4 block">
              How long should the adventure be? ⏰
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAdventureLength('short')}
                className={`
                  font-heading text-lg md:text-xl font-bold
                  px-6 py-4 min-h-[64px]
                  border-4 border-border-dark rounded-xl
                  shadow-md hover:shadow-lg
                  hover:-translate-y-1 active:translate-y-1
                  transition-all duration-200
                  ${adventureLength === 'short'
                    ? 'bg-adventure-blue text-white ring-4 ring-adventure-blue/30'
                    : 'bg-white text-text-primary'
                  }
                `}
              >
                Short (5-10 minutes)
              </button>
              <button
                type="button"
                onClick={() => setAdventureLength('long')}
                className={`
                  font-heading text-lg md:text-xl font-bold
                  px-6 py-4 min-h-[64px]
                  border-4 border-border-dark rounded-xl
                  shadow-md hover:shadow-lg
                  hover:-translate-y-1 active:translate-y-1
                  transition-all duration-200
                  ${adventureLength === 'long'
                    ? 'bg-adventure-blue text-white ring-4 ring-adventure-blue/30'
                    : 'bg-white text-text-primary'
                  }
                `}
              >
                Long (15-20 minutes)
              </button>
            </div>
          </div>

          {/* Adventure Inspiration (Optional) */}
          <div className="bg-cloud border-4 border-border-dark rounded-2xl shadow-md p-6 md:p-8">
            <label className="block mb-3">
              <span className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 block">
                Any ideas for the story? (Optional) 💭
              </span>
              <textarea
                value={adventureInspiration}
                onChange={(e) => setAdventureInspiration(e.target.value)}
                placeholder="Tell us what you'd like to happen... (a lost kitten, a hidden treasure, etc.)"
                rows={4}
                maxLength={200}
                className="
                  w-full
                  font-body text-base md:text-lg
                  px-5 py-4
                  bg-white
                  border-3 border-border-dark rounded-xl
                  shadow-inner resize-none
                  focus:outline-none focus:border-adventure-blue
                  focus:ring-4 focus:ring-adventure-blue/20
                  transition-all duration-200
                  placeholder:text-text-light
                "
              />
              <span className="font-body text-sm text-text-secondary mt-1 block">
                {adventureInspiration.length}/200 characters
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full sm:w-auto
                font-heading text-xl md:text-2xl font-bold
                px-12 py-5 min-h-[64px]
                bg-adventure-green text-white
                border-4 border-border-dark rounded-2xl
                shadow-lg hover:shadow-xl
                hover:-translate-y-1 active:translate-y-1
                active:shadow-pressed
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? 'Starting Adventure...' : 'Start Adventure! 🚀'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/select-character')}
              className="
                w-full sm:w-auto
                font-body text-lg font-semibold
                px-8 py-4
                bg-cloud text-text-primary
                border-3 border-border-medium rounded-xl
                shadow-sm hover:shadow-md
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              ← Change Hero
            </button>
          </div>

        </form>

      </div>
    </main>
  )
}

export default function SetupAdventure() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="font-heading text-2xl text-text-primary">Loading...</div>
      </div>
    }>
      <SetupAdventureContent />
    </Suspense>
  )
}
