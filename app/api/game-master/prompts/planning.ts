import { Locale } from '@/lib/types'

interface PlanningPromptParams {
  setting: string;
  playerName: string;
  length: 'short' | 'long';
  adventureInspiration?: string;
  locale?: Locale;
}

/**
 * Language-specific instructions for adventure plan generation
 */
const PLANNING_LANGUAGE_INSTRUCTIONS: Record<Locale, string> = {
  en: `
LANGUAGE: English
- Generate ALL content in English
- Use simple, fun words that children aged 4-8 can understand
- Adventure title, setting, scenarios, monster name - everything in English
`,
  sv: `
LANGUAGE: Swedish (Svenska)
- Generate ALL content in Swedish (Svenska)
- Use simple, fun Swedish words that children aged 4-8 can understand
- Adventure title, setting, scenarios, monster name - everything in Swedish
- Use Swedish names for characters and places (e.g., "Trollskogen", "Glittergrottan", "Sagolandet")
- Example monster names: "Kluddiga Klansen", "Fnissiga Fansen", "Bubblige Bansen", "Pilliga Pansen"
`,
}

export function buildPlanningPrompt(params: PlanningPromptParams): string {
  const locale = params.locale || 'en'

  return `You are an RPG adventure planner for a kids' story game.
${PLANNING_LANGUAGE_INSTRUCTIONS[locale]}

Your job is to create a simple, exciting adventure *plan* that will later guide a separate Game Master model. This plan is NOT the story itself but a list of high-level scenarios (steps) that the Game Master will expand into scenes.

Constraints and style:
- The adventure is for a child aged 4-8.
- Keep everything light, friendly, and non-scary.
- Tone: playful, encouraging, imaginative.
- Language: simple, short sentences that are easy for kids to follow.
- If the player provided story inspiration, you MUST weave their idea into the adventure plan. Make it central to the plot.
- The adventure should naturally build up toward a fun monster encounter that is more silly than scary.
- The final step should clearly resolve the adventure in a positive way.

Adventure details:
- Adventure setting: ${params.setting}
- Player name: ${params.playerName} (the main hero)
- Length: ${params.length}
${params.adventureInspiration ? `- Player's inspiration: "${params.adventureInspiration}" - You MUST incorporate this idea into the adventure!` : ''}

You MUST respond with **only valid JSON**, no explanations, no extra text.

JSON format:
{
  "title": "Short, fun adventure title",
  "setting": "One or two short sentences describing the world in kid-friendly language",
  "heroName": "Name of the main hero (usually the player's name)",
  "recommendedAgeRange": "e.g. 4-8",
  "overallGoal": "One sentence describing what the hero is trying to achieve",
  "monster": {
    "name": "Silly monster name",
    "description": "Very short, friendly/silly description of the monster",
    "isScary": false
  },
  "scenarios": [
    {
      "id": 1,
      "name": "Short name of the scenario",
      "description": "2-3 simple sentences describing what happens in this step",
      "location": "Where this part happens",
      "keyNPCs": [
        "List of important friendly characters",
        "Can be empty if no one special appears"
      ],
      "likelySkills": [
        "One or more of: strong, smart, sneaky, kind"
      ],
      "hasChallenge": true,
      "notesForGM": "Short notes to the game master: what kind of challenge or choice might happen here, but do NOT describe exact dice rolls"
    }
  ],
  "expectedNumberOfScenes": 5,
  "designNotesForGM": "Short guidance for the later Game Master about pacing, safety (non-scary), and when to introduce the monster."
}

Rules:
- "scenarios" must be an ordered list that roughly follows the story from beginning to end.
- Include at least ${params.length === 'short' ? 5 : 8} scenarios and at most ${params.length === 'short' ? 8 : 12}.
- At least one mid-adventure scenario should hint at the monster.
- The second-to-last or last scenario should be the main monster encounter.
- The final scenario should clearly finish the adventure and feel cozy and safe.
- In "likelySkills", only use: "strong", "smart", "sneaky", "kind".
- Always set "monster.isScary" to false and keep its description silly or cute.

Output:
- Return ONLY the JSON object described above.
- Do NOT wrap it in markdown.
- Do NOT include comments.
`
}