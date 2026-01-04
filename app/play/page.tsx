'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getCharacter } from '@/lib/characters'
import { getSessionId, clearSessionId } from '@/lib/session-storage'
import { AdventureSession, Message } from '@/lib/types'

export default function PlayAdventure() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [session, setSession] = useState<AdventureSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [userInput, setUserInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  // Load session on mount
  useEffect(() => {
    async function loadSession() {
      const sessionId = getSessionId()

      if (!sessionId) {
        // No session found, redirect to character selection
        router.push('/select-character')
        return
      }

      try {
        const response = await fetch(`/api/sessions/${sessionId}`)

        if (!response.ok) {
          throw new Error('Session not found')
        }

        const data = await response.json()
        setSession(data.session)

        // If no messages yet, send initial greeting from AI
        if (data.session.messages.length === 0) {
          await startAdventure(sessionId)
        }
      } catch (error) {
        console.error('Error loading session:', error)
        // Clear invalid session and redirect
        clearSessionId()
        router.push('/select-character')
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [router])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session?.messages])

  async function startAdventure(sessionId: string) {
    // TODO: Call game master API to get initial greeting
    // For now, add a placeholder message
    const initialMessage: Message = {
      id: 'initial',
      role: 'assistant',
      content: '🎮 Welcome brave hero! Your adventure is about to begin...',
      timestamp: new Date(),
    }

    // Update session with initial message
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [initialMessage],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSession(data.session)
      }
    } catch (error) {
      console.error('Error starting adventure:', error)
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()

    if (!userInput.trim() || !session || isSending) {
      return
    }

    setIsSending(true)

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    }

    // Optimistically add user message to UI
    setSession({
      ...session,
      messages: [...session.messages, userMessage],
    })

    setUserInput('')

    try {
      // TODO: Call game master API to get AI response
      // For now, add a placeholder response
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: '✨ That sounds exciting! Let me think about what happens next...',
        timestamp: new Date(),
      }

      // Update session
      const response = await fetch(`/api/sessions/${session.sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...session.messages, userMessage, aiMessage],
          interactionCount: session.interactionCount + 1,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSession(data.session)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center">
          <div className="font-heading text-3xl text-text-primary mb-4 animate-bounce">
            Loading your adventure...
          </div>
          <div className="font-body text-xl text-text-secondary">
            ✨ Getting everything ready! ✨
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const character = getCharacter(session.characterId)

  return (
    <main className="min-h-screen bg-gradient-to-br from-parchment to-parchment-dark flex flex-col">

      {/* Header */}
      <div className="bg-cloud border-b-4 border-border-dark shadow-lg p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* Character Info */}
          <div className="flex items-center gap-3 md:gap-4">
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-xl border-3 overflow-hidden flex-shrink-0"
              style={{ borderColor: character.color }}
            >
              <Image
                src={character.iconUrl}
                alt={session.characterName}
                width={64}
                height={64}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <h1 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                {session.characterName}
              </h1>
              <p className="font-body text-sm md:text-base text-text-secondary">
                {character.displayName}
              </p>
            </div>
          </div>

          {/* Hearts Display */}
          <div className="flex items-center gap-2 bg-white border-3 border-border-dark rounded-full px-3 md:px-4 py-2 shadow-sm">
            {[1, 2, 3].map((heart) => (
              <span
                key={heart}
                className={`text-2xl md:text-3xl ${
                  heart > session.hearts ? 'opacity-30 grayscale' : 'animate-heartbeat'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {session.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] md:max-w-[75%]
                  font-body text-base md:text-lg
                  px-5 md:px-6 py-4 md:py-5
                  border-4 border-border-dark rounded-2xl
                  shadow-md
                  ${message.role === 'user'
                    ? 'bg-adventure-blue text-white'
                    : 'bg-cloud text-text-primary'
                  }
                `}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎮</span>
                    <span className="font-heading text-sm font-bold text-text-secondary">
                      Game Master
                    </span>
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>

                {/* Show roll result if present */}
                {message.gameState?.rollResult && (
                  <div className="mt-4 bg-white/20 border-2 border-border-dark rounded-xl p-3">
                    <div className="font-heading text-sm font-bold mb-2">
                      🎲 Dice Roll
                    </div>
                    <div className="font-body text-sm">
                      Rolled: {message.gameState.rollResult.diceRoll}
                      {message.gameState.rollResult.explodingRolls.length > 0 && (
                        <> + {message.gameState.rollResult.explodingRolls.join(' + ')}</>
                      )}
                      {message.gameState.rollResult.skillBonus > 0 && (
                        <> + {message.gameState.rollResult.skillBonus} (skill)</>
                      )}
                      {' = '}{message.gameState.rollResult.total}
                      <br />
                      {message.gameState.rollResult.success ? '✅ Success!' : '❌ Not quite...'}
                      {message.gameState.rollResult.critical && ' 🌟 Critical!'}
                      {message.gameState.rollResult.fumble && ' 😅 Fumble!'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-cloud border-t-4 border-border-dark shadow-lg p-4 md:p-6">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-3 md:gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What do you want to do?"
              disabled={isSending}
              className="
                flex-1
                font-body text-base md:text-lg
                px-5 py-4 min-h-[56px]
                bg-white
                border-3 border-border-dark rounded-xl
                shadow-inner
                focus:outline-none focus:border-adventure-blue
                focus:ring-4 focus:ring-adventure-blue/20
                transition-all duration-200
                disabled:opacity-50
                placeholder:text-text-light
              "
            />
            <button
              type="submit"
              disabled={!userInput.trim() || isSending}
              className="
                font-heading text-lg md:text-xl font-bold
                px-6 md:px-8 py-4 min-h-[56px]
                bg-adventure-green text-white
                border-3 border-border-dark rounded-xl
                shadow-md hover:shadow-lg
                hover:-translate-y-1 active:translate-y-1
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              "
            >
              {isSending ? '...' : 'Send 🚀'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                clearSessionId()
                router.push('/')
              }}
              className="
                font-body text-sm font-semibold
                px-4 py-2
                bg-white text-text-secondary
                border-2 border-border-light rounded-lg
                shadow-sm hover:shadow
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              End Adventure
            </button>
          </div>
        </form>
      </div>

    </main>
  )
}
