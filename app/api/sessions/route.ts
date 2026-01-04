import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import connectDB from '@/lib/mongodb'
import SessionModel from '@/lib/models/Session'
import { CreateSessionRequest, CreateSessionResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: CreateSessionRequest = await request.json()

    // Validate required fields
    if (!body.characterId || !body.characterName) {
      return NextResponse.json(
        { error: 'Character ID and name are required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Create new session
    const sessionId = uuidv4()
    const session = await SessionModel.create({
      sessionId,
      characterId: body.characterId,
      characterName: body.characterName,
      hearts: 3,
      maxHearts: 3,
      adventureSetting: body.adventureSetting || 'fantasy',
      adventureLength: body.adventureLength || 'short',
      adventureInspiration: body.adventureInspiration || '',
      messages: [],
      interactionCount: 0,
      isComplete: false,
    })

    const response: CreateSessionResponse = {
      sessionId,
      session: session.toObject(),
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
