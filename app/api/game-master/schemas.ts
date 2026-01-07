import { z } from 'zod'

/**
 * Zod schemas for OpenAI Responses API structured outputs
 * These schemas define the expected JSON structure for Game Master responses
 */

// Roll request response schema
// Used when the GM asks the player to make a dice roll
export const RollRequestSchema = z.object({
  action: z.literal('request_roll'),
  skill: z.enum(['strong', 'smart', 'sneaky', 'kind']),
  difficulty: z.enum(['easy', 'normal', 'hard', 'epic']),
  narrative: z.string(),
})

// Narration response schema
// Used when the GM narrates story progression
export const NarrateSchema = z.object({
  action: z.literal('narrate'),
  narrative: z.string(),
  heartChange: z.number().min(-1).max(1),
  isMonsterEncounter: z.boolean(),
  adventureComplete: z.boolean(),
})

// Combined schema - GM can respond with either a roll request or narration
export const GameMasterResponseSchema = z.union([RollRequestSchema, NarrateSchema])

// TypeScript types inferred from Zod schemas
export type RollRequest = z.infer<typeof RollRequestSchema>
export type Narrate = z.infer<typeof NarrateSchema>
export type GameMasterAIResponse = z.infer<typeof GameMasterResponseSchema>
