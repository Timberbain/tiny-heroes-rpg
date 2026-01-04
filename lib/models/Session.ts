import mongoose, { Schema, Model } from 'mongoose'
import { AdventureSession } from '../types'

const MessageSchema = new Schema({
  id: { type: String, required: true },
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  gameState: {
    hearts: Number,
    rollResult: {
      skill: String,
      diceRoll: Number,
      explodingRolls: [Number],
      skillBonus: Number,
      total: Number,
      targetNumber: Number,
      success: Boolean,
      critical: Boolean,
      fumble: Boolean,
    },
  },
})

const SessionSchema = new Schema<AdventureSession>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    characterId: {
      type: String,
      enum: ['sorceress', 'knight', 'ranger', 'bard'],
      required: true,
    },
    characterName: { type: String, required: true },
    hearts: { type: Number, required: true, min: 0, max: 3, default: 3 },
    maxHearts: { type: Number, required: true, default: 3 },
    adventureSetting: {
      type: String,
      enum: ['fantasy', 'sci-fi', 'horror', 'custom'],
      required: true,
    },
    adventureLength: { type: String, enum: ['short', 'long'], required: true },
    adventureInspiration: { type: String, default: '' },
    messages: { type: [MessageSchema], default: [] },
    interactionCount: { type: Number, default: 0 },
    isComplete: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

// Prevent model recompilation in development
const SessionModel: Model<AdventureSession> =
  mongoose.models.Session || mongoose.model<AdventureSession>('Session', SessionSchema)

export default SessionModel
