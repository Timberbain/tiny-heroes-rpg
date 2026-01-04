import { NextRequest, NextResponse } from 'next/server'
import { openai, GAME_MASTER_MODEL } from '@/lib/openai'
import { getCharacter, SKILL_NAMES } from '@/lib/characters'
import { simulateSkillRoll, getTargetNumber } from '@/lib/game-logic'
import { AdventureSession, Message, RollResult, SkillType } from '@/lib/types'

interface GameMasterRequest {
  sessionId: string
  userMessage: string
  session: AdventureSession
}

interface GameMasterResponse {
  narrative: string
  hearts: number
  rollResult?: RollResult
  isMonsterEncounter: boolean
  adventureComplete: boolean
}

/**
 * Build the system prompt for the AI Game Master
 */
function buildSystemPrompt(session: AdventureSession): string {
  const character = getCharacter(session.characterId)

  return `You are an expert Game Guide for "Tiny Heroes RPG", a tabletop game for children aged 4-8.

CORE RULES:
- Four skills: Strong Stuff (💪), Smart Stuff (📚), Sneaky Stuff (⚡), Kind Stuff (❤️) - rated 0-3
- Dice: Roll 1d6 + skill rating vs target number
- If you roll a 6, roll again and add it (exploding dice, can chain infinitely)
- Target numbers: Easy (4), Normal (6), Hard (8), Epic (10+)
- Hearts: Players have 3 hearts ❤️❤️❤️ - losing all = tired/scared (NEVER dead)

CURRENT PLAYER:
- Character: ${session.characterName} the ${character.displayName}
- Skills: Strong ${character.skills.strong}, Smart ${character.skills.smart}, Sneaky ${character.skills.sneaky}, Kind ${character.skills.kind}
- Hearts: ${session.hearts}/3
- Interaction: ${session.interactionCount}/5 (end at interaction 5 with monster encounter)

ADVENTURE SETUP:
- Setting: ${session.adventureSetting}
${session.adventureInspiration ? `- Player's idea: ${session.adventureInspiration}` : ''}
- Length: ${session.adventureLength === 'short' ? '5-10 minutes' : '15-20 minutes'}

YOUR ROLE:
1. Create an exciting, age-appropriate story that matches the setting
2. When the player attempts something challenging, ASK FOR A SKILL ROLL
3. Respond with JSON indicating which skill to roll and the difficulty
4. After I simulate the roll, describe outcomes enthusiastically
5. Make failures funny and silly, NEVER scary or harsh
6. Celebrate high rolls and critical successes with excitement
7. Build toward a monster encounter at interaction ${5 - session.interactionCount} more turns
8. Keep language simple and friendly for ages 4-8

TONE: Bright, cheerful, encouraging, funny, adventurous
SAFETY: No death, no scary content, no harsh failures - make everything fun!

IMPORTANT: When you need a dice roll, respond with this JSON structure:
{
  "action": "request_roll",
  "skill": "strong" | "smart" | "sneaky" | "kind",
  "difficulty": "easy" | "normal" | "hard" | "epic",
  "narrative": "What the hero is attempting, described excitedly"
}

For regular narrative (no roll needed), respond with:
{
  "action": "narrate",
  "narrative": "Your story response here",
  "heartChange": 0 or -1 or +1,
  "isMonsterEncounter": false,
  "adventureComplete": false
}

For the FINAL monster encounter (at interaction 5), make it exciting but appropriate for young kids!`
}

/**
 * Parse AI response and handle different action types
 */
async function processAIResponse(
  aiResponse: string,
  session: AdventureSession
): Promise<GameMasterResponse> {
  try {
    const parsed = JSON.parse(aiResponse)

    // Handle roll request
    if (parsed.action === 'request_roll') {
      const character = getCharacter(session.characterId)
      const skillBonus = character.skills[parsed.skill as SkillType] || 0
      const targetNumber = getTargetNumber(parsed.difficulty)

      // Simulate the roll
      const rollResult = simulateSkillRoll(
        parsed.skill as SkillType,
        skillBonus,
        targetNumber
      )

      // Determine narrative based on success/failure
      let narrative = parsed.narrative || ''
      if (rollResult.success) {
        narrative += `\n\n✨ You rolled a ${rollResult.total}! SUCCESS!`
        if (rollResult.critical) {
          narrative += ` 🌟 AMAZING! You got a 6!`
        }
      } else {
        narrative += `\n\n😅 You rolled a ${rollResult.total}... Not quite! Something silly happens!`
      }

      // Determine heart change based on fumble
      const heartChange = rollResult.fumble && !rollResult.success ? -1 : 0

      return {
        narrative,
        hearts: Math.max(0, session.hearts + heartChange),
        rollResult,
        isMonsterEncounter: session.interactionCount >= 4,
        adventureComplete: session.interactionCount >= 4,
      }
    }

    // Handle regular narration
    return {
      narrative: parsed.narrative || aiResponse,
      hearts: Math.max(0, Math.min(3, session.hearts + (parsed.heartChange || 0))),
      isMonsterEncounter: parsed.isMonsterEncounter || false,
      adventureComplete: parsed.adventureComplete || false,
    }
  } catch (error) {
    // If JSON parsing fails, treat as plain narrative
    return {
      narrative: aiResponse,
      hearts: session.hearts,
      isMonsterEncounter: false,
      adventureComplete: false,
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GameMasterRequest = await request.json()
    const { userMessage, session } = body

    // Build conversation history for OpenAI
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: buildSystemPrompt(session),
      },
    ]

    // Add recent message history (last 5 messages for context)
    const recentMessages = session.messages.slice(-5)
    for (const msg of recentMessages) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({
          role: msg.role,
          content: msg.content,
        })
      }
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    })

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: GAME_MASTER_MODEL,
      messages,
      temperature: 0.8, // Creative but consistent
      max_tokens: 500,
    })

    const aiResponse = completion.choices[0]?.message?.content || 'The adventure continues...'

    // Process the AI response
    const gameState = await processAIResponse(aiResponse, session)

    return NextResponse.json(gameState)
  } catch (error) {
    console.error('Error in game master API:', error)

    // Return a friendly fallback response
    return NextResponse.json(
      {
        narrative: "Hmm, the Game Master needs a moment to think... Try again!",
        hearts: (await request.json()).session.hearts,
        isMonsterEncounter: false,
        adventureComplete: false,
      },
      { status: 500 }
    )
  }
}
