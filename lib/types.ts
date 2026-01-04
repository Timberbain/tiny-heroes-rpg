// Character Types
export type CharacterId = 'sorceress' | 'knight' | 'ranger' | 'bard'

export type SkillType = 'strong' | 'smart' | 'sneaky' | 'kind'

export interface Skills {
  strong: number // 0-3
  smart: number  // 0-3
  sneaky: number // 0-3
  kind: number   // 0-3
}

export interface Character {
  id: CharacterId
  displayName: string
  skills: Skills
  archetype: string
  description: string
  color: string // Primary theme color
  iconUrl: string // Character illustration path
}

// Game State Types
export interface RollResult {
  skill: SkillType
  diceRoll: number // Initial 1d6 roll
  explodingRolls: number[] // Additional rolls from 6s
  skillBonus: number // Character's skill rating
  total: number // Sum of all rolls + bonus
  targetNumber: number // Difficulty TN
  success: boolean
  critical: boolean // Any 6 was rolled
  fumble: boolean // Initial roll was 1
}

export interface GameState {
  hearts: number
  rollResult?: RollResult
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  gameState?: GameState
}

// Adventure Session Types
export type AdventureSetting = 'fantasy' | 'sci-fi' | 'horror' | 'custom'
export type AdventureLength = 'short' | 'long'

export interface AdventureSession {
  sessionId: string // UUID v4
  characterId: CharacterId
  characterName: string // Player's custom name
  hearts: number // Current hearts (0-3)
  maxHearts: number // Always 3
  adventureSetting: AdventureSetting
  adventureLength: AdventureLength
  adventureInspiration: string // Player's input for story direction
  messages: Message[] // Full conversation history
  interactionCount: number // Track progress (MVP ends at 5)
  isComplete: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// API Types
export interface CreateSessionRequest {
  characterId: CharacterId
  characterName: string
  adventureSetting: AdventureSetting
  adventureLength: AdventureLength
  adventureInspiration: string
}

export interface CreateSessionResponse {
  sessionId: string
  session: AdventureSession
}

export interface GameMasterRequest {
  sessionId: string
  userMessage: string
  currentState: {
    characterId: CharacterId
    characterName: string
    hearts: number
    interactionCount: number
    messageHistory: Message[]
  }
}

export interface GameMasterResponse {
  narrative: string
  hearts: number
  rollResult?: RollResult
  isMonsterEncounter: boolean
  adventureComplete: boolean
}
