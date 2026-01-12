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

const AdventureMonsterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isScary: { type: Boolean, default: false },
})

const AdventureScenarioSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  keyNPCs: { type: [String], default: [] },
  likelySkills: { type: [String], default: [] },
  hasChallenge: { type: Boolean, default: true },
  notesForGM: { type: String, default: '' },
})

const AdventurePlanSchema = new Schema({
  title: { type: String, required: true },
  setting: { type: String, required: true },
  heroName: { type: String, required: true },
  recommendedAgeRange: { type: String, default: '4-8' },
  overallGoal: { type: String, required: true },
  monster: { type: AdventureMonsterSchema, required: true },
  scenarios: { type: [AdventureScenarioSchema], required: true },
  expectedNumberOfScenes: { type: Number, default: 5 },
  designNotesForGM: { type: String, default: '' },
})

const GameProgressStateSchema = new Schema({
  currentScenarioId: { type: Number, default: 1 },
  monsterAppeared: { type: Boolean, default: false },
  adventureComplete: { type: Boolean, default: false },
})

const PendingRollRequestSchema = new Schema({
  skill: { type: String, enum: ['strong', 'smart', 'sneaky', 'kind'], required: true },
  difficulty: { type: String, enum: ['easy', 'normal', 'hard', 'epic'], required: true },
  narrative: { type: String, required: true },
  context: { type: String, required: true },
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
    locale: { type: String, enum: ['en', 'sv'], default: 'en', required: true },
    messages: { type: [MessageSchema], default: [] },
    interactionCount: { type: Number, default: 0 },
    isComplete: { type: Boolean, default: false },
    completedAt: { type: Date },
    // Adventure planning fields
    adventurePlan: { type: AdventurePlanSchema },
    planGeneratedAt: { type: Date },
    planningStatus: {
      type: String,
      enum: ['pending', 'generating', 'ready', 'failed'],
      default: 'pending',
    },
    planningError: { type: String },
    gameProgress: {
      type: GameProgressStateSchema,
      default: () => ({ currentScenarioId: 1, monsterAppeared: false, adventureComplete: false }),
    },
    pendingRoll: { type: PendingRollRequestSchema },
  },
  {
    timestamps: true,
  }
)

// Prevent model recompilation in development
const SessionModel: Model<AdventureSession> =
  mongoose.models.Session || mongoose.model<AdventureSession>('Session', SessionSchema)

export default SessionModel
