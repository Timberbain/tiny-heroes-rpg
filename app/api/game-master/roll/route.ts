import { NextRequest, NextResponse } from 'next/server'
import { openai, GAME_MASTER_MODEL } from '@/lib/openai'
import { getCharacter } from '@/lib/characters'
import connectDB from '@/lib/mongodb'
import SessionModel from '@/lib/models/Session'
import { buildSystemPrompt } from '../prompts/adventure'
import { NarrateSchema } from '../schemas'
import { RollResult, GameProgressState } from '@/lib/types'

interface RollSubmissionRequest {
  sessionId: string
  rollResult: RollResult
}

interface RollSubmissionResponse {
  narrative: string
  hearts: number
  isMonsterEncounter: boolean
  adventureComplete: boolean
  gameProgress: GameProgressState
}

export async function POST(request: NextRequest) {
  try {
    const body: RollSubmissionRequest = await request.json()
    const { sessionId, rollResult } = body

    if (!sessionId || !rollResult) {
      return NextResponse.json(
        { error: 'Session ID and roll result are required' },
        { status: 400 }
      )
    }

    // Connect to database and fetch session
    await connectDB()
    const session = await SessionModel.findOne({ sessionId })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Validate that there's a pending roll
    if (!session.pendingRoll) {
      return NextResponse.json(
        { error: 'No pending roll found for this session' },
        { status: 400 }
      )
    }

    // Validate roll matches pending roll (check skill)
    if (session.pendingRoll.skill !== rollResult.skill) {
      return NextResponse.json(
        {
          error: 'Roll result does not match pending roll',
          expected: { skill: session.pendingRoll.skill },
          received: { skill: rollResult.skill },
        },
        { status: 400 }
      )
    }

    // Validate adventure plan exists
    if (!session.adventurePlan) {
      return NextResponse.json(
        { error: 'Adventure plan not found. Cannot continue.' },
        { status: 400 }
      )
    }

    // Build payload for AI with roll info
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
      playerInput: `Continuing from ${session.pendingRoll.context}`,
      rollInfo: {
        skill: rollResult.skill,
        difficulty: session.pendingRoll.difficulty,
        roll: rollResult.total,
        success: rollResult.success,
        critical: rollResult.critical,
        fumble: rollResult.fumble,
        diceRoll: rollResult.diceRoll,
        explodingRolls: rollResult.explodingRolls,
      },
    }

    // Build system prompt with session context
    const systemPrompt = buildSystemPrompt(session)
    const userPayload = JSON.stringify(payload, null, 2)

    // Build input with conversation history as a formatted string
    let conversationContext = ''

    // Add recent message history (last 5 messages for context)
    const recentMessages = session.messages.slice(-5)
    for (const msg of recentMessages) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        conversationContext += `${msg.role === 'user' ? 'Player' : 'GM'}: ${msg.content}\n\n`
      }
    }

    // Add current roll result
    conversationContext += `Current turn:\n${userPayload}`

    // Call OpenAI Chat Completions API with JSON output
    // Roll submissions must result in narration only (not another roll request)
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
    const parsed = NarrateSchema.parse(jsonContent)

    // Process narration
    const heartChange = parsed.heartChange || 0
    const newHearts = Math.max(0, Math.min(3, session.hearts + heartChange))

    // Update game progress
    const gameProgress: GameProgressState = {
      currentScenarioId: session.gameProgress.currentScenarioId,
      monsterAppeared: parsed.isMonsterEncounter || session.gameProgress.monsterAppeared,
      adventureComplete: parsed.adventureComplete || session.gameProgress.adventureComplete,
    }

    // Clear pending roll and update session
    session.pendingRoll = undefined
    session.hearts = newHearts
    session.gameProgress = gameProgress
    await session.save()

    const response: RollSubmissionResponse = {
      narrative: parsed.narrative,
      hearts: newHearts,
      isMonsterEncounter: parsed.isMonsterEncounter,
      adventureComplete: parsed.adventureComplete,
      gameProgress,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in roll submission API:', error)

    return NextResponse.json(
      {
        narrative: 'Hmm, something went wrong processing your roll. Try again!',
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
