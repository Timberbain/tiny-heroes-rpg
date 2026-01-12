import { NextRequest, NextResponse } from 'next/server'
import { openai, GAME_MASTER_MODEL } from '@/lib/openai'
import { getCharacter } from '@/lib/characters'
import connectDB from '@/lib/mongodb'
import SessionModel from '@/lib/models/Session'
import { buildSystemPrompt } from './prompts/adventure'
import { GameMasterResponseSchema, GameMasterAIResponse } from './schemas'
import {
  AdventureSession,
  RollResult,
  PendingRollRequest,
  GameProgressState,
  Locale,
} from '@/lib/types'

// Server-side translations for roll context
const ROLL_CONTEXT_TRANSLATIONS: Record<Locale, {
  skills: Record<string, string>
  difficulties: Record<string, string>
  template: string
}> = {
  en: {
    skills: {
      strong: 'Strong Stuff',
      smart: 'Smart Stuff',
      sneaky: 'Sneaky Stuff',
      kind: 'Kind Stuff',
    },
    difficulties: {
      easy: 'easy',
      normal: 'normal',
      hard: 'hard',
      epic: 'epic',
    },
    template: 'Testing {skill} at {difficulty} difficulty',
  },
  sv: {
    skills: {
      strong: 'Starka grejer',
      smart: 'Smarta grejer',
      sneaky: 'Smygiga grejer',
      kind: 'Snälla grejer',
    },
    difficulties: {
      easy: 'lätt',
      normal: 'normal',
      hard: 'svår',
      epic: 'episk',
    },
    template: 'Testar {skill} på {difficulty} svårighetsgrad',
  },
}

function getRollContext(skill: string, difficulty: string, locale: Locale = 'en'): string {
  const t = ROLL_CONTEXT_TRANSLATIONS[locale] || ROLL_CONTEXT_TRANSLATIONS.en
  const skillName = t.skills[skill] || skill
  const difficultyName = t.difficulties[difficulty] || difficulty
  return t.template.replace('{skill}', skillName).replace('{difficulty}', difficultyName)
}

interface GameMasterRequest {
  sessionId: string
  userMessage: string
  session: AdventureSession
  rollResult?: RollResult // Present when user is submitting a roll result
}

// Response when AI requests a roll
interface RollRequestResponse {
  type: 'roll_request'
  pendingRoll: PendingRollRequest
}

// Response when AI narrates
interface NarrativeResponse {
  type: 'narrate'
  narrative: string
  hearts: number
  isMonsterEncounter: boolean
  adventureComplete: boolean
  gameProgress: GameProgressState
}

type GameMasterResponse = RollRequestResponse | NarrativeResponse

/**
 * Build the JSON payload sent to the AI
 */
function buildAIPayload(
  session: AdventureSession,
  userMessage: string,
  rollResult?: RollResult
): string {
  const character = getCharacter(session.characterId)

  const payload = {
    adventurePlan: session.adventurePlan,
    gameState: {
      hearts: session.hearts,
      currentScenarioId: session.gameProgress.currentScenarioId,
      monsterAppeared: session.gameProgress.monsterAppeared,
      adventureComplete: session.gameProgress.adventureComplete,
      interactionCount: session.interactionCount,
    },
    playerSkills: character.skills,
    playerInput: userMessage,
    ...(rollResult && {
      rollInfo: {
        skill: rollResult.skill,
        difficulty: rollResult.fumble ? 'fumble' : rollResult.success ? 'success' : 'failure',
        roll: rollResult.total,
        success: rollResult.success,
        critical: rollResult.critical,
      },
    }),
  }

  return JSON.stringify(payload, null, 2)
}

/**
 * Process parsed AI response and create appropriate response
 */
async function processAIResponseParsed(
  parsed: GameMasterAIResponse,
  session: AdventureSession
): Promise<GameMasterResponse> {
  try {
    // Handle roll request
    if (parsed.action === 'request_roll') {
      const pendingRoll: PendingRollRequest = {
        skill: parsed.skill,
        difficulty: parsed.difficulty,
        narrative: parsed.narrative,
        context: getRollContext(parsed.skill, parsed.difficulty, session.locale),
      }

      // Save pending roll to session
      await connectDB()
      const dbSession = await SessionModel.findOne({ sessionId: session.sessionId })
      if (dbSession) {
        dbSession.pendingRoll = pendingRoll
        await dbSession.save()
      }

      return {
        type: 'roll_request',
        pendingRoll,
      }
    }

    // Handle narration
    if (parsed.action === 'narrate') {
      const heartChange = parsed.heartChange || 0
      const newHearts = Math.max(0, Math.min(3, session.hearts + heartChange))

      // Update game progress
      const gameProgress: GameProgressState = {
        currentScenarioId: session.gameProgress.currentScenarioId,
        monsterAppeared: parsed.isMonsterEncounter || session.gameProgress.monsterAppeared,
        adventureComplete: parsed.adventureComplete || session.gameProgress.adventureComplete,
      }

      // Clear pending roll from session
      await connectDB()
      const dbSession = await SessionModel.findOne({ sessionId: session.sessionId })
      if (dbSession) {
        dbSession.pendingRoll = undefined
        dbSession.gameProgress = gameProgress
        await dbSession.save()
      }

      return {
        type: 'narrate',
        narrative: parsed.narrative,
        hearts: newHearts,
        isMonsterEncounter: parsed.isMonsterEncounter || false,
        adventureComplete: parsed.adventureComplete || false,
        gameProgress,
      }
    }

    // This should never be reached due to Zod validation ensuring parsed.action is either 'request_roll' or 'narrate'
    // TypeScript knows this is unreachable, so we use never type
    const _exhaustiveCheck: never = parsed
    throw new Error(`Unhandled action type: ${(_exhaustiveCheck as GameMasterAIResponse).action}`)
  } catch (error) {
    console.error('Error processing AI response:', error)

    // Fallback to plain narration
    return {
      type: 'narrate',
      narrative: 'Hmm, the Game Master needs a moment to think... Try again!',
      hearts: session.hearts,
      isMonsterEncounter: false,
      adventureComplete: false,
      gameProgress: session.gameProgress,
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GameMasterRequest = await request.json()
    const { userMessage, session, rollResult } = body

    // Validate session has adventure plan
    if (!session.adventurePlan) {
      return NextResponse.json(
        { error: 'Adventure plan not found. Please generate a plan first.' },
        { status: 400 }
      )
    }

    // Build system prompt with session context
    const systemPrompt = buildSystemPrompt(session)
    const userPayload = buildAIPayload(session, userMessage, rollResult)

    // Build input with conversation history as a formatted string
    let conversationContext = ''

    // Add recent message history (last 5 messages for context)
    const recentMessages = session.messages.slice(-5)
    for (const msg of recentMessages) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        conversationContext += `${msg.role === 'user' ? 'Player' : 'GM'}: ${msg.content}\n\n`
      }
    }

    // Add current user message with payload
    conversationContext += `Current turn:\n${userPayload}`
    
    // Call OpenAI Chat Completions API with JSON output
    const completion = await openai.chat.completions.create({
      model: GAME_MASTER_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: conversationContext },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    })

    const message = completion.choices[0]?.message

    if (!message?.content) {
      throw new Error('Failed to get AI response')
    }

    // Parse and validate the JSON response
    const jsonContent = JSON.parse(message.content)
    const parsed = GameMasterResponseSchema.parse(jsonContent)

    // Process the AI response
    const gameState = await processAIResponseParsed(parsed, session)

    return NextResponse.json(gameState)
  } catch (error) {
    console.error('Error in game master API:', error)

    return NextResponse.json(
      {
        type: 'narrate',
        narrative: 'Hmm, the Game Master needs a moment to think... Try again!',
        hearts: 3,
        isMonsterEncounter: false,
        adventureComplete: false,
        gameProgress: {
          currentScenarioId: 1,
          monsterAppeared: false,
          adventureComplete: false,
        },
      },
      { status: 500 }
    )
  }
}
