'use client'

import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getCharacter } from '@/lib/characters'
import { saveSessionId, clearSessionId } from '@/lib/session-storage'
import { simulateSkillRoll, getTargetNumber } from '@/lib/game-logic'
import { AdventureSession, Message, RollResult } from '@/lib/types'
import PlanningLoadingScreen from '@/components/PlanningLoadingScreen'
import PlanningError from '@/components/PlanningError'
import RollRequestCard from '@/components/RollRequestCard'
import DiceRollAnimation from '@/components/DiceRollAnimation'

type GameUIState =
  | 'loading'
  | 'planning'
  | 'planning_failed'
  | 'awaiting_input'
  | 'awaiting_roll'
  | 'rolling'
  | 'sending'
  | 'complete'

export default function PlayAdventure({ params }: { params: Promise<{ sessionId: string }> }) {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sessionId } = use(params)

  const [session, setSession] = useState<AdventureSession | null>(null)
  const [uiState, setUIState] = useState<GameUIState>('loading')
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [rollResult, setRollResult] = useState<RollResult | null>(null)
  const hasStartedAdventure = useRef(false)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session?.messages])

  const loadSession = useCallback(async () => {
    if (!sessionId) {
      router.push('/select-character')
      return
    }

    try {
      const response = await fetch(`/api/sessions/${sessionId}`)

      if (!response.ok) {
        throw new Error('Session not found')
      }

      const data = await response.json()
      const loadedSession = data.session

      // Save to localStorage for consistency
      saveSessionId(sessionId)

      setSession(loadedSession)

      // Determine initial UI state based on session
      if (loadedSession.planningStatus === 'pending' || !loadedSession.adventurePlan) {
        // Need to generate plan
        setUIState('planning')
        await generateAdventurePlan(sessionId)
      } else if (loadedSession.planningStatus === 'generating') {
        // Plan is being generated, poll for completion
        setUIState('planning')
        await pollForPlan(sessionId)
      } else if (loadedSession.planningStatus === 'failed') {
        // Planning failed
        setUIState('planning_failed')
        setError(loadedSession.planningError || 'Planning failed')
      } else if (loadedSession.planningStatus === 'ready') {
        // Plan is ready
        if (loadedSession.pendingRoll) {
          setUIState('awaiting_roll')
        } else if (loadedSession.isComplete) {
          setUIState('complete')
        } else {
          // Check if we need to start the adventure
          if (loadedSession.messages.length === 0) {
            await startAdventure(sessionId, loadedSession)
          } else {
            setUIState('awaiting_input')
          }
        }
      }
    } catch (error) {
      console.error('Error loading session:', error)
      clearSessionId()
      router.push('/select-character')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, router])

  // Load session on mount
  useEffect(() => {
    loadSession()
  }, [loadSession])

  async function generateAdventurePlan(sessionId: string) {
    try {
      const response = await fetch('/api/game-master/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate plan')
      }

      // Wait for response to complete
      await response.json()

      // Reload session
      const sessionResponse = await fetch(`/api/sessions/${sessionId}`)
      const sessionData = await sessionResponse.json()
      setSession(sessionData.session)

      // Start the adventure
      await startAdventure(sessionId, sessionData.session)
    } catch (error) {
      console.error('Error generating plan:', error)
      setUIState('planning_failed')
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  async function pollForPlan(sessionId: string) {
    // Poll every 2 seconds for up to 30 seconds
    const maxAttempts = 15
    let attempts = 0

    const interval = setInterval(async () => {
      attempts++

      const response = await fetch(`/api/sessions/${sessionId}`)
      const data = await response.json()

      if (data.session.planningStatus === 'ready') {
        clearInterval(interval)
        setSession(data.session)
        await startAdventure(sessionId, data.session)
      } else if (data.session.planningStatus === 'failed' || attempts >= maxAttempts) {
        clearInterval(interval)
        setUIState('planning_failed')
        setError(data.session.planningError || 'Planning timeout')
      }
    }, 2000)
  }

  async function startAdventure(sessionId: string, sessionData: AdventureSession) {
    // Prevent duplicate starts
    if (hasStartedAdventure.current) {
      console.log('startAdventure already called, skipping duplicate')
      return
    }
    hasStartedAdventure.current = true

    try {
      setUIState('sending')

      const gmResponse = await fetch('/api/game-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userMessage: '[ADVENTURE START] The hero is ready to begin!',
          session: sessionData,
        }),
      })

      if (!gmResponse.ok) {
        throw new Error('Failed to start adventure')
      }

      const gameState = await gmResponse.json()

      // Handle response type
      if (gameState.type === 'roll_request') {
        // AI immediately requests a roll (unlikely at start)
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: gameState.pendingRoll.narrative,
          timestamp: new Date(),
        }

        await updateSession({
          messages: [...sessionData.messages, aiMessage],
        }, sessionId)

        setUIState('awaiting_roll')
      } else {
        // Regular narration
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: gameState.narrative,
          timestamp: new Date(),
          gameState: {
            hearts: gameState.hearts,
          },
        }

        await updateSession({
          messages: [...sessionData.messages, aiMessage],
          hearts: gameState.hearts,
        }, sessionId)

        setUIState('awaiting_input')
      }
    } catch (error) {
      // Reset flag on error so retry is possible
      hasStartedAdventure.current = false
      console.error('Error starting adventure:', error)
      setUIState('planning_failed')
      setError('Failed to start adventure')
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()

    if (!userInput.trim() || !session || uiState !== 'awaiting_input') {
      return
    }

    setUIState('sending')

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    }

    const messageText = userInput.trim()
    setUserInput('')

    // Optimistically add user message
    setSession({
      ...session,
      messages: [...session.messages, userMessage],
    })

    try {
      const gmResponse = await fetch('/api/game-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          userMessage: messageText,
          session,
        }),
      })

      if (!gmResponse.ok) {
        throw new Error('Failed to get game master response')
      }

      const gameState = await gmResponse.json()

      if (gameState.type === 'roll_request') {
        // AI requests a roll
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: gameState.pendingRoll.narrative,
          timestamp: new Date(),
        }

        await updateSession({
          messages: [...session.messages, userMessage, aiMessage],
          interactionCount: session.interactionCount + 1,
        })

        setUIState('awaiting_roll')
      } else {
        // Regular narration
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: gameState.narrative,
          timestamp: new Date(),
          gameState: {
            hearts: gameState.hearts,
          },
        }

        await updateSession({
          messages: [...session.messages, userMessage, aiMessage],
          interactionCount: session.interactionCount + 1,
          hearts: gameState.hearts,
          isComplete: gameState.adventureComplete,
        })

        if (gameState.adventureComplete) {
          setUIState('complete')
        } else {
          setUIState('awaiting_input')
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setUIState('awaiting_input')
    }
  }

  async function handleContinue() {
    if (!session || uiState !== 'awaiting_input') {
      return
    }

    setUIState('sending')

    try {
      const gmResponse = await fetch('/api/game-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          userMessage: '[CONTINUE]',
          session,
        }),
      })

      if (!gmResponse.ok) {
        throw new Error('Failed to get game master response')
      }

      const gameState = await gmResponse.json()

      if (gameState.type === 'roll_request') {
        // AI requests a roll
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: gameState.pendingRoll.narrative,
          timestamp: new Date(),
        }

        await updateSession({
          messages: [...session.messages, aiMessage],
          interactionCount: session.interactionCount + 1,
        })

        setUIState('awaiting_roll')
      } else {
        // Regular narration
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: gameState.narrative,
          timestamp: new Date(),
          gameState: {
            hearts: gameState.hearts,
          },
        }

        await updateSession({
          messages: [...session.messages, aiMessage],
          interactionCount: session.interactionCount + 1,
          hearts: gameState.hearts,
          isComplete: gameState.adventureComplete,
        })

        if (gameState.adventureComplete) {
          setUIState('complete')
        } else {
          setUIState('awaiting_input')
        }
      }
    } catch (error) {
      console.error('Error continuing:', error)
      setUIState('awaiting_input')
    }
  }

  async function handleRoll() {
    if (!session || !session.pendingRoll || uiState !== 'awaiting_roll') {
      return
    }

    setUIState('rolling')

    const character = getCharacter(session.characterId)
    const skillBonus = character.skills[session.pendingRoll.skill] || 0
    const targetNumber = getTargetNumber(session.pendingRoll.difficulty)

    // Execute roll client-side
    const roll = simulateSkillRoll(session.pendingRoll.skill, skillBonus, targetNumber)
    setRollResult(roll)
  }

  async function handleRollComplete() {
    if (!session || !rollResult) {
      return
    }

    setUIState('sending')

    try {
      // Submit roll to API
      const response = await fetch('/api/game-master/roll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          rollResult,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit roll')
      }

      const gameState = await response.json()

      // Create AI message with roll result and narrative
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: gameState.narrative,
        timestamp: new Date(),
        gameState: {
          hearts: gameState.hearts,
          rollResult,
        },
      }

      await updateSession({
        messages: [...session.messages, aiMessage],
        hearts: gameState.hearts,
        isComplete: gameState.adventureComplete,
      })

      setRollResult(null)

      if (gameState.adventureComplete) {
        setUIState('complete')
      } else {
        setUIState('awaiting_input')
      }
    } catch (error) {
      console.error('Error submitting roll:', error)
      setRollResult(null)
      setUIState('awaiting_roll')
    }
  }

  async function updateSession(updates: Partial<AdventureSession>, targetSessionId?: string) {
    const id = targetSessionId || session?.sessionId
    if (!id) return

    const response = await fetch(`/api/sessions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })

    if (response.ok) {
      const data = await response.json()
      setSession(data.session)
    } else {
      console.error('Failed to update session:', response.status, await response.text())
    }
  }

  async function handleRetryPlanning() {
    if (!session) return

    setUIState('planning')
    setError(null)
    await generateAdventurePlan(session.sessionId)
  }

  function handleCancelPlanning() {
    clearSessionId()
    router.push('/')
  }

  // Render different screens based on UI state
  if (uiState === 'loading') {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center">
          <div className="font-heading text-3xl text-text-primary mb-4 animate-bounce">
            Loading your adventure...
          </div>
        </div>
      </div>
    )
  }

  if (uiState === 'planning' && session) {
    return (
      <PlanningLoadingScreen characterId={session.characterId} characterName={session.characterName} />
    )
  }

  if (uiState === 'planning_failed') {
    return <PlanningError error={error || 'Unknown error'} onRetry={handleRetryPlanning} onCancel={handleCancelPlanning} />
  }

  if (!session) {
    return null
  }

  const character = getCharacter(session.characterId)
  const showTextInput = uiState === 'awaiting_input' || uiState === 'sending'
  const showRollButton = uiState === 'awaiting_roll' || uiState === 'rolling'

  return (
    <>
      <main className="min-h-screen bg-parchment flex flex-col">
        {/* Header */}
        <div className="bg-cloud border-b-4 border-border-dark shadow-lg p-4 md:p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Character Info */}
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl border-3 overflow-hidden shrink-0"
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
                    ${
                      message.role === 'user'
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
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>

                  {/* Show roll result if present */}
                  {message.gameState?.rollResult &&
                   message.gameState.rollResult.diceRoll !== undefined &&
                   message.gameState.rollResult.total !== undefined && (
                    <div className="mt-4 bg-white/20 border-2 border-border-dark rounded-xl p-3">
                      <div className="font-heading text-sm font-bold mb-2">🎲 Dice Roll</div>
                      <div className="font-body text-sm">
                        Rolled: {message.gameState.rollResult.diceRoll}
                        {message.gameState.rollResult.explodingRolls && message.gameState.rollResult.explodingRolls.length > 0 && (
                          <> + {message.gameState.rollResult.explodingRolls.join(' + ')}</>
                        )}
                        {message.gameState.rollResult.skillBonus !== undefined && message.gameState.rollResult.skillBonus > 0 && (
                          <> + {message.gameState.rollResult.skillBonus} (skill)</>
                        )}
                        {' = '}
                        {message.gameState.rollResult.total}
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
          <div className="max-w-4xl mx-auto">
            {showTextInput && (
              <>
                <form onSubmit={handleSendMessage}>
                  <div className="flex gap-3 md:gap-4">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="What do you want to do?"
                      disabled={uiState === 'sending'}
                      className="flex-1 font-body text-base md:text-lg px-5 py-4 min-h-[56px] bg-white border-3 border-border-dark rounded-xl shadow-inner focus:outline-none focus:border-adventure-blue focus:ring-4 focus:ring-adventure-blue/20 transition-all duration-200 disabled:opacity-50 placeholder:text-text-light"
                    />
                    <button
                      type="submit"
                      disabled={!userInput.trim() || uiState === 'sending'}
                      className="font-heading text-lg md:text-xl font-bold px-6 md:px-8 py-4 min-h-[56px] bg-adventure-green text-white border-3 border-border-dark rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {uiState === 'sending' ? '...' : 'Send 🚀'}
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-border-light"></div>
                  <span className="font-body text-sm text-text-secondary">or</span>
                  <div className="flex-1 h-px bg-border-light"></div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={uiState === 'sending'}
                  className="w-full font-heading text-xl font-bold px-6 py-4 min-h-[64px] bg-adventure-blue text-white border-4 border-border-dark rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {uiState === 'sending' ? 'Continuing...' : 'Continue the story →'}
                </button>
              </>
            )}

            {showRollButton && session.pendingRoll && (
              <RollRequestCard
                pendingRoll={session.pendingRoll}
                characterId={session.characterId}
                skillBonus={character.skills[session.pendingRoll.skill] || 0}
                onRoll={handleRoll}
                isRolling={uiState === 'rolling'}
              />
            )}

            <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  clearSessionId()
                  router.push('/')
                }}
                className="font-body text-sm font-semibold px-4 py-2 bg-white text-text-secondary border-2 border-border-light rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200"
              >
                End Adventure
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Dice Roll Animation Modal */}
      {uiState === 'rolling' && rollResult && (
        <DiceRollAnimation rollResult={rollResult} onComplete={handleRollComplete} />
      )}
    </>
  )
}
