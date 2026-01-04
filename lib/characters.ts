import { Character, CharacterId } from './types'

export const CHARACTERS: Record<CharacterId, Character> = {
  sorceress: {
    id: 'sorceress',
    displayName: 'Sorceress',
    skills: {
      strong: 0, // Not good yet
      smart: 3,  // Expert
      sneaky: 1, // Beginner
      kind: 2,   // Trained
    },
    archetype: 'Magical Scholar',
    description: 'A person who can cast spells and do magical things',
    color: '#E63946', // Red
    iconUrl: '/characters/sorceress.png',
  },
  knight: {
    id: 'knight',
    displayName: 'Knight',
    skills: {
      strong: 3, // Expert
      smart: 1,  // Beginner
      sneaky: 0, // Not good yet
      kind: 2,   // Trained
    },
    archetype: 'Brave Protector',
    description: 'A brave warrior who protects friends and fights for good',
    color: '#457B9D', // Blue
    iconUrl: '/characters/knight.png',
  },
  ranger: {
    id: 'ranger',
    displayName: 'Ranger',
    skills: {
      strong: 2, // Trained
      smart: 1,  // Beginner
      sneaky: 3, // Expert
      kind: 0,   // Not good yet
    },
    archetype: 'Swift Hunter',
    description: 'A skilled hunter who moves quietly and knows the forest',
    color: '#06A77D', // Green
    iconUrl: '/characters/ranger.png',
  },
  bard: {
    id: 'bard',
    displayName: 'Bard',
    skills: {
      strong: 1, // Beginner
      smart: 2,  // Trained
      sneaky: 0, // Not good yet
      kind: 3,   // Expert
    },
    archetype: 'Friendly Storyteller',
    description: 'A cheerful performer who makes friends and inspires others',
    color: '#FFB703', // Yellow
    iconUrl: '/characters/bard.png',
  },
}

export const SKILL_NAMES: Record<string, string> = {
  strong: 'Strong Stuff',
  smart: 'Smart Stuff',
  sneaky: 'Sneaky Stuff',
  kind: 'Kind Stuff',
}

export const SKILL_ICONS: Record<string, string> = {
  strong: '💪',
  smart: '📚',
  sneaky: '⚡',
  kind: '❤️',
}

export const SKILL_DESCRIPTIONS: Record<string, string> = {
  strong: 'Climbing, jumping, lifting, fighting, breaking things',
  smart: 'Solving puzzles, remembering facts, noticing clues',
  sneaky: 'Hiding, sneaking, running fast, dodging',
  kind: 'Talking, making friends, helping others, calming animals',
}

export const SKILL_RATING_LABELS: Record<number, string> = {
  0: 'Not good yet',
  1: 'Beginner',
  2: 'Trained',
  3: 'Expert',
}

export function getCharacter(id: CharacterId): Character {
  return CHARACTERS[id]
}

export function getAllCharacters(): Character[] {
  return Object.values(CHARACTERS)
}
