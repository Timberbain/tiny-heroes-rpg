import { RollResult, SkillType } from './types'

/**
 * Roll a single d6
 */
export function rollD6(): number {
  return Math.floor(Math.random() * 6) + 1
}

/**
 * Simulate a skill roll with exploding dice mechanic
 * Rolling a 6 means roll again and add (can chain infinitely)
 */
export function simulateSkillRoll(
  skill: SkillType,
  skillBonus: number,
  targetNumber: number
): RollResult {
  const initialRoll = rollD6()
  const explodingRolls: number[] = []
  let currentRoll = initialRoll

  // Handle exploding dice (6s)
  while (currentRoll === 6) {
    currentRoll = rollD6()
    explodingRolls.push(currentRoll)
  }

  // Calculate total
  const total =
    initialRoll + explodingRolls.reduce((sum, roll) => sum + roll, 0) + skillBonus

  return {
    skill,
    diceRoll: initialRoll,
    explodingRolls,
    skillBonus,
    total,
    targetNumber,
    success: total >= targetNumber,
    critical: initialRoll === 6 || explodingRolls.some((r) => r === 6),
    fumble: initialRoll === 1,
  }
}

/**
 * Get difficulty target number based on difficulty name
 */
export function getTargetNumber(difficulty: 'easy' | 'normal' | 'hard' | 'epic'): number {
  const targetNumbers = {
    easy: 4,
    normal: 6,
    hard: 8,
    epic: 10,
  }
  return targetNumbers[difficulty]
}

/**
 * Format roll result for display
 */
export function formatRollResult(roll: RollResult): string {
  let result = `🎲 Rolled ${roll.diceRoll}`

  if (roll.explodingRolls.length > 0) {
    result += ` + ${roll.explodingRolls.join(' + ')}`
  }

  if (roll.skillBonus > 0) {
    result += ` + ${roll.skillBonus} (skill)`
  }

  result += ` = ${roll.total}`

  if (roll.success) {
    result += ` ✨ SUCCESS!`
    if (roll.critical) {
      result += ` 🌟 CRITICAL!`
    }
  } else {
    result += ` ❌ Not quite...`
  }

  if (roll.fumble && !roll.success) {
    result += ` 😅 Fumble! (Something silly happens)`
  }

  return result
}
