import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SessionModel from '@/lib/models/Session'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await connectDB()

    const session = await SessionModel.findOne({ sessionId: id })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ session: session.toObject() })
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const updates = await request.json()

    await connectDB()

    const session = await SessionModel.findOneAndUpdate(
      { sessionId: id },
      { $set: updates },
      { new: true, runValidators: true }
    )

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ session: session.toObject() })
  } catch (error) {
    console.error('Error updating session:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}
