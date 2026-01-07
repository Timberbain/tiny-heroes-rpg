import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { openai, GAME_MASTER_MODEL } from '@/lib/openai'
import { buildPlanningPrompt } from '../prompts/planning'
import connectDB from '@/lib/mongodb'
import SessionModel from '@/lib/models/Session'
import { AdventurePlan } from '@/lib/types'

// Zod schema for adventure plan validation
const AdventureMonsterSchema = z.object({
  name: z.string(),
  description: z.string(),
  isScary: z.literal(false),
})

const AdventureScenarioSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  keyNPCs: z.array(z.string()),
  likelySkills: z.array(z.enum(['strong', 'smart', 'sneaky', 'kind'])),
  hasChallenge: z.boolean(),
  notesForGM: z.string(),
})

const AdventurePlanSchema = z.object({
  title: z.string(),
  setting: z.string(),
  heroName: z.string(),
  recommendedAgeRange: z.string(),
  overallGoal: z.string(),
  monster: AdventureMonsterSchema,
  scenarios: z.array(AdventureScenarioSchema),
  expectedNumberOfScenes: z.number(),
  designNotesForGM: z.string(),
})

interface PlanRequest {
  sessionId: string
}

export async function POST(request: NextRequest) {
  let sessionId: string | undefined

  try {
    const body = (await request.json()) as PlanRequest
    sessionId = body.sessionId

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Fetch session
    const session = await SessionModel.findOne({ sessionId })
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // If plan already exists, return it
    if (session.adventurePlan && session.planningStatus === 'ready') {
      return NextResponse.json({
        success: true,
        plan: session.adventurePlan,
        message: 'Plan already exists',
      })
    }

    // Update status to generating
    session.planningStatus = 'generating'
    await session.save()

    // Build planning prompt
    const systemPrompt = buildPlanningPrompt({
      setting: session.adventureSetting,
      playerName: session.characterName,
      length: session.adventureLength,
      adventureInspiration: session.adventureInspiration,
    })

    // Call OpenAI Chat Completions API with JSON output
    const completion = await openai.chat.completions.create({
      model: GAME_MASTER_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate the adventure plan.' },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    })

    // Get and parse plan from response
    const message = completion.choices[0]?.message

    if (!message?.content) {
      throw new Error('No content in AI response')
    }

    // Parse the JSON response and validate with Zod
    const jsonContent = JSON.parse(message.content)
    const parsedPlan = AdventurePlanSchema.parse(jsonContent)

    // Save plan to session
    const plan = parsedPlan as AdventurePlan
    session.adventurePlan = plan
    session.planGeneratedAt = new Date()
    session.planningStatus = 'ready'
    session.planningError = undefined
    await session.save()

    return NextResponse.json({
      success: true,
      plan,
      message: 'Plan generated successfully',
    })
  } catch (error) {
    console.error('Error generating adventure plan:', error)

    // Try to update session status
    if (sessionId) {
      try {
        await connectDB()
        const session = await SessionModel.findOne({ sessionId })
        if (session) {
          session.planningStatus = 'failed'
          session.planningError = error instanceof Error ? error.message : 'Unknown error'
          await session.save()
        }
      } catch (updateError) {
        console.error('Error updating session after failure:', updateError)
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to generate adventure plan',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
