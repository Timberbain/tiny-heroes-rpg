# Tiny Heroes RPG - Development Guide

## Project Overview
A web-based AI-powered RPG for young children (ages 4-8) where an AI game master leads players through adventures using simple, fun mechanics focused on imagination and cooperation.

## 🎨 Design System First!

**BEFORE implementing ANY frontend features**, familiarize yourself with the design system:
- **View showcase**: Run `npm run dev` and visit `/design-system`
- **Read specs**: `docs/DESIGN_SYSTEM.md` - Complete design tokens
- **Copy patterns**: `docs/DESIGN_USAGE_GUIDE.md` - Code examples
- **Follow workflow**: See "Frontend Development Workflow" section below for required visual checks

All UI components MUST follow the "Storybook Adventure" design language with thick borders, offset shadows, rounded corners, and child-friendly typography.

## Tech Stack
- **Frontend**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS 4+ with custom design system
- **Database**: MongoDB
- **AI**: OpenAI GPT-4 API (game master)
- **Storage**: Local storage (MVP - anonymous sessions)
- **Language**: TypeScript
- **Fonts**: Fredoka, Nunito, Baloo 2 (Google Fonts)
- **Deployment**: TBD

## Core Game Mechanics

### Skills System
Four skills rated 0-3:
- **Strong Stuff** (0-3): Climbing, jumping, lifting, fighting, breaking things
  - Icon: 💪 Muscle/Arm
- **Smart Stuff** (0-3): Solving puzzles, remembering facts, noticing clues
  - Icon: 📚 Book
- **Sneaky Stuff** (0-3): Hiding, sneaking, running fast, dodging
  - Icon: ⚡ Lightning bolt
- **Kind Stuff** (0-3): Talking, making friends, helping others, calming animals
  - Icon: ❤️ Heart

### Dice Mechanics
- Roll 1d6 + skill rating vs Target Number (TN)
- **Exploding dice**: Rolling a 6 means roll again and add (can chain infinitely)
- **Target Numbers**:
  - Easy: 4
  - Normal: 6
  - Hard: 8
  - Epic: 10+

### Special Results
- **Rolling 6**: Critical success - something extra good happens, roll again and add
- **Rolling 1**: Fumble - something silly/funny happens (never punishing)

### Health System
- Each hero starts with 3 Hearts ❤️❤️❤️
- Losing all hearts = tired/scared (not dead)
- Hearts restore through rest, teamwork, story events
- **No character deaths ever**

### Cooperation
- Heroes can help each other for +1 bonus
- Teamwork encouraged over individual success

## Character Classes

### Sorceress (Magiker)
- **Strong Stuff**: 0 (Not good yet)
- **Smart Stuff**: 3 (Expert)
- **Sneaky Stuff**: 1 (Beginner)
- **Kind Stuff**: 2 (Trained)
- **Archetype**: Magical scholar, casts spells and solves puzzles with magic
- **Visual**: Red robes, pointed hat, magical staff with gems

### Knight (Riddare)
- **Strong Stuff**: 3 (Expert)
- **Smart Stuff**: 1 (Beginner)
- **Sneaky Stuff**: 0 (Not good yet)
- **Kind Stuff**: 2 (Trained)
- **Archetype**: Brave protector, strong fighter who helps friends
- **Visual**: Shiny armor, sword and shield, brave stance

### Ranger (Skogvaktare)
- **Strong Stuff**: 2 (Trained)
- **Smart Stuff**: 1 (Beginner)
- **Sneaky Stuff**: 3 (Expert)
- **Kind Stuff**: 0 (Not good yet)
- **Archetype**: Swift hunter, expert at sneaking and nature
- **Visual**: Green cloak, bow and arrows, animal companion

### Bard (Skald)
- **Strong Stuff**: 1 (Beginner)
- **Smart Stuff**: 2 (Trained)
- **Sneaky Stuff**: 0 (Not good yet)
- **Kind Stuff**: 3 (Expert)
- **Archetype**: Friendly storyteller, makes friends and inspires others
- **Visual**: Colorful clothes, musical instrument, cheerful expression

## Design System

**IMPORTANT**: A comprehensive design system has been created for this project. All frontend development MUST follow these guidelines.

### Design System Documentation
- **Complete specification**: `docs/DESIGN_SYSTEM.md` - Full design tokens, components, patterns
- **Quick reference**: `docs/DESIGN_USAGE_GUIDE.md` - Copy-paste code examples
- **Interactive showcase**: `/design-system` route - Live component demonstrations
- **Summary**: `docs/DESIGN_SYSTEM_SUMMARY.md` - Executive overview

### Design Philosophy: "Storybook Adventure"
Inspired by popup children's books with:
- **Thick borders** (4-5px) creating storybook illustration effect
- **Offset shadows** giving 3D popup book depth
- **Bright, saturated colors** that feel magical and inviting
- **Rounded corners** (12-32px) everywhere for friendliness
- **Playful animations** with elastic/bouncy easing

### Key Design Tokens

#### Colors
- **Character Colors**: Sorceress (#E63946), Knight (#457B9D), Ranger (#06A77D), Bard (#FFB703)
- **Backgrounds**: Parchment (#F5E6D3), Cloud (#FFFCF9)
- **Text**: Primary (#2B2D42), Secondary (#5A5C6E)
- **Borders**: Dark (#3D2E1F) - main storybook outline

#### Typography
- **Fredoka** - Headings, buttons, character names (playful, rounded)
- **Nunito** - Body text, descriptions (clear, readable)
- **Baloo 2** - Special callouts (bouncy, fun)
- **Minimum sizes**: 18px body, 28px+ headings

#### Spacing
- Based on 8px grid: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

#### Shadows (Storybook Style)
- `shadow-sm`: `0 2px 0 0 #3D2E1F, 0 0 0 2px #3D2E1F`
- `shadow-md`: `0 4px 0 0 #3D2E1F, 0 0 0 3px #3D2E1F`
- `shadow-lg`: `0 6px 0 0 #3D2E1F, 0 0 0 4px #3D2E1F`
- `shadow-xl`: `0 8px 0 0 #3D2E1F, 0 0 0 4px #3D2E1F`

### Component Patterns
All components are documented with code examples in `docs/DESIGN_USAGE_GUIDE.md`:
- ✓ Buttons (Primary, Secondary, Character-specific)
- ✓ Cards (Basic, Character cards)
- ✓ Forms (Text input, Select, Textarea)
- ✓ Hearts display (Animated health)
- ✓ Skill badges (Icons + values)
- ✓ Dice roller (Animated results)

### Target Audience Requirements (Ages 4-8)
- ✓ **Large text** - 18px minimum
- ✓ **High contrast** - WCAG AA compliant (15.8:1 ratio achieved)
- ✓ **Big touch targets** - 64px minimum for primary buttons
- ✓ **Clear feedback** - Celebrate success, make failures funny
- ✓ **Mobile-first** - Responsive from 320px to 1920px
- ✓ **Accessible** - Keyboard navigation, screen reader friendly

## AI Game Master Strategy

### AI Responsibilities
The AI acts as the expert Game Guide (GM) and:
- Drives the narrative and story progression
- Determines when skill rolls are needed
- Chooses appropriate difficulty levels (TN)
- Simulates dice rolls (1d6 + skill + exploding 6s)
- Calculates success/failure
- Describes outcomes following game principles
- Manages heart loss and restoration
- Creates fun, age-appropriate challenges

### AI System Prompt Structure
The AI must be instructed to:
1. **Follow game principles**: Simplicity, positive play, exciting dice, fast play
2. **Know the rules**: Skills, dice mechanics, difficulty levels, hearts
3. **Tone**: Bright, friendly, funny, adventurous - for ages 4-8
4. **Failure handling**: Make failures funny/interesting, never harsh or scary
5. **Character awareness**: Know the player's chosen character and stats
6. **State management**: Track hearts, describe current situation clearly
7. **Pacing**: Keep interactions focused (MVP: 5 interactions ending in monster fight)
8. **Roll transparency**: Always show dice rolls and calculations
9. **Celebrate successes**: Make rolling high numbers exciting
10. **Safety**: No deaths, violence is cartoonish, always age-appropriate

## Game Master API Architecture

### OpenAI Chat Completions API with JSON Mode

The game uses OpenAI's **Chat Completions API** with JSON mode for structured output, combined with Zod validation for type safety.

**Key Components:**
- **`buildSystemPrompt(session: AdventureSession)`**: Dynamic system prompt generation
- **Zod Schemas**: Type-safe validation of AI responses
- **`openai.chat.completions.create()`**: Chat completions with `response_format: { type: 'json_object' }`
- **Model**: `gpt-4o-2024-08-06` for reliable JSON output

### System Prompt Generation

The `buildSystemPrompt()` function in `/app/api/game-master/prompts/adventure.ts` creates session-specific prompts:

```typescript
export function buildSystemPrompt(session: AdventureSession): string {
  const character = getCharacter(session.characterId)

  return `You are the Game Master for "${session.characterName} the ${character.displayName}".

CURRENT HERO:
- Name: ${session.characterName}
- Class: ${character.displayName}
- Skills: Strong ${character.skills.strong}, Smart ${character.skills.smart}, ...
- Hearts: ${session.hearts}/${session.maxHearts} ❤️

ADVENTURE: ${session.adventurePlan?.title}
Setting: ${session.adventureSetting}

${getBasePrompt()}  // Full game rules and instructions
`
}
```

This approach embeds critical session context directly in the system instructions, ensuring the AI has full awareness of the current hero, their skills, and the adventure state.

### Response Types

The AI can respond with two types of JSON structures, validated by Zod schemas:

#### 1. Roll Request (`request_roll`)
When the AI needs the player to make a dice roll:

```typescript
{
  "action": "request_roll",
  "skill": "strong" | "smart" | "sneaky" | "kind",
  "difficulty": "easy" | "normal" | "hard" | "epic",
  "narrative": "Description of what the hero is attempting..."
}
```

#### 2. Narration (`narrate`)
When the AI narrates story progression:

```typescript
{
  "action": "narrate",
  "narrative": "Story text describing what happens...",
  "heartChange": -1 | 0 | 1,
  "isMonsterEncounter": boolean,
  "adventureComplete": boolean
}
```

### API Routes

**Three main routes use the Responses API:**

1. **`/api/game-master/route.ts`** - Main adventure progression
   - Uses `GameMasterResponseSchema` (union of roll_request and narrate)
   - Handles both roll requests and narration responses

2. **`/api/game-master/roll/route.ts`** - Roll result processing
   - Uses `NarrateSchema` (narrate only)
   - Always responds with narration after a roll

3. **`/api/game-master/plan/route.ts`** - Adventure planning
   - Uses `AdventurePlanSchema`
   - Generates the adventure structure before gameplay

### Conversation History Handling

To preserve conversation history while keeping the API efficient, we format recent messages as a user message string:

```typescript
let conversationContext = ''

// Add recent message history (last 5 messages for context)
const recentMessages = session.messages.slice(-5)
for (const msg of recentMessages) {
  if (msg.role === 'user' || msg.role === 'assistant') {
    conversationContext += `${msg.role === 'user' ? 'Player' : 'GM'}: ${msg.content}\n\n`
  }
}

// Add current user message with payload
conversationContext += `Current turn:\n${userPayload}`
```

### Example API Call Pattern

```typescript
// Call OpenAI Chat Completions API with JSON mode
const completion = await openai.chat.completions.create({
  model: GAME_MASTER_MODEL,  // gpt-4o-2024-08-06
  messages: [
    { role: 'system', content: buildSystemPrompt(session) },
    { role: 'user', content: conversationContext },
  ],
  response_format: { type: 'json_object' },
  temperature: 0.8,
})

const message = completion.choices[0]?.message

if (!message?.content) {
  throw new Error('Failed to get AI response')
}

// Parse and validate the JSON response with Zod
const jsonContent = JSON.parse(message.content)
const parsed = GameMasterResponseSchema.parse(jsonContent)

if (parsed.action === 'request_roll') {
  // Handle roll request
} else {
  // Handle narration
}
```

### Game State Flow

```
User Action → Build system prompt with session context
           → Format conversation history as string
           → Send to OpenAI Chat Completions API with JSON mode
           → Parse JSON response and validate with Zod
           → Process response (roll request OR narration)
           → Update session state (hearts, progress, messages)
           → Return to client
```

### Benefits of This Architecture

1. **Type Safety**: Zod validates AI responses, catching malformed data
2. **Session Context**: AI always knows the hero's current state via system prompt
3. **Structured Output**: JSON mode ensures valid JSON, Zod ensures correct schema
4. **Reliable Model**: `gpt-4o-2024-08-06` provides consistent JSON output
5. **Maintainability**: Clear separation of concerns with schemas
6. **SDK Compatibility**: Uses stable Chat Completions API (openai@4.104.0)

## Data Architecture

### Character (Predefined Constants)
```typescript
interface Character {
  id: 'sorceress' | 'knight' | 'ranger' | 'bard'
  displayName: string
  skills: {
    strong: number // 0-3
    smart: number  // 0-3
    sneaky: number // 0-3
    kind: number   // 0-3
  }
  archetype: string
  description: string
  color: string // Primary theme color
  iconUrl: string // Character illustration
}
```

### Adventure Session (MongoDB + Local Storage)
```typescript
interface AdventureSession {
  sessionId: string // UUID v4
  characterId: 'sorceress' | 'knight' | 'ranger' | 'bard'
  characterName: string // Player's custom name
  hearts: number // Current hearts (0-3)
  maxHearts: number // Always 3
  adventureSetting: 'fantasy' | 'sci-fi' | 'horror' | 'custom'
  adventureLength: 'short' | 'long'
  adventureInspiration: string // Player's input for story direction
  messages: Message[] // Full conversation history
  interactionCount: number // Track progress (MVP ends at 5)
  isComplete: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Message
```typescript
interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  gameState?: GameState
}

interface GameState {
  hearts: number
  rollResult?: RollResult
}

interface RollResult {
  skill: 'strong' | 'smart' | 'sneaky' | 'kind'
  diceRoll: number // Initial 1d6 roll
  explodingRolls: number[] // Additional rolls from 6s
  skillBonus: number // Character's skill rating
  total: number // Sum of all rolls + bonus
  targetNumber: number // Difficulty TN
  success: boolean
  critical: boolean // Any 6 was rolled
  fumble: boolean // Initial roll was 1
}
```

## MVP Milestones

### Phase 1: Core Setup ✓
- [ ] Initialize Next.js 16 project with TypeScript
- [ ] Configure Tailwind CSS 4
- [ ] Set up MongoDB connection with Mongoose
- [ ] Configure OpenAI API integration
- [ ] Create character data constants
- [ ] Set up environment variables

### Phase 2: MVP Features
- [ ] Landing page with "Start Adventure" button
  - [ ] Hero section with title and illustration
  - [ ] Start button with animation
  - [ ] Child-friendly design matching character sheet style

- [ ] Character selection screen
  - [ ] Display all 4 character cards
  - [ ] Show character illustrations and archetypes
  - [ ] Display skill ratings with icons
  - [ ] Hover/touch interactions
  - [ ] Selection confirmation

- [ ] Character naming & adventure setup
  - [ ] Name input field (large, clear)
  - [ ] Adventure setting selection (fantasy/sci-fi/horror)
  - [ ] Adventure length choice (short/long)
  - [ ] Inspiration text area (optional)
  - [ ] Validation and submission

- [ ] Gameplay interface
  - [ ] Chat-style message display
  - [ ] User input area (large text box)
  - [ ] Hearts display (visual hearts that can be lost/gained)
  - [ ] Character info sidebar (name, class, skills)
  - [ ] Dice roll animations and results
  - [ ] Message history scroll

- [ ] AI Integration
  - [ ] System prompt engineering for GM behavior
  - [ ] Game state context in API calls
  - [ ] Response parsing (narrative + state updates)
  - [ ] Dice simulation logic (with exploding 6s)
  - [ ] Error handling and retry logic

- [ ] Data persistence
  - [ ] Session creation in MongoDB
  - [ ] Session ID in localStorage
  - [ ] Message append to session
  - [ ] State updates (hearts, interaction count)
  - [ ] Session retrieval on page load
  - [ ] Session completion handling

- [ ] MVP game flow
  - [ ] 5 interaction limit
  - [ ] Monster encounter at end
  - [ ] Victory/completion screen
  - [ ] Play again option

### Phase 3: Polish & Testing
- [ ] Responsive design (mobile-first)
- [ ] Accessibility (keyboard nav, screen readers)
- [ ] Loading states and animations
- [ ] Error states and messages
- [ ] Sound effects (optional)
- [ ] User testing with target age group
- [ ] Performance optimization
- [ ] Content safety validation

## Tech Implementation Details

### Next.js 16 Structure
```
app/
├── page.tsx                    # Landing page
├── select-character/
│   └── page.tsx               # Character selection
├── setup-adventure/
│   └── page.tsx               # Name & adventure setup
├── play/
│   └── page.tsx               # Main gameplay interface
├── api/
│   ├── sessions/
│   │   ├── route.ts          # POST create session
│   │   └── [id]/
│   │       └── route.ts      # GET session, PATCH update
│   └── game-master/
│       └── route.ts          # POST chat with AI GM
├── layout.tsx                 # Root layout
└── globals.css                # Tailwind imports

components/
├── character-card.tsx
├── hearts-display.tsx
├── dice-roll-animation.tsx
├── skill-display.tsx
├── message-bubble.tsx
└── adventure-setup-form.tsx

lib/
├── mongodb.ts                 # MongoDB connection
├── openai.ts                  # OpenAI client setup
├── game-logic.ts              # Dice rolling, skill checks
├── characters.ts              # Character constants
└── types.ts                   # TypeScript interfaces

public/
└── characters/
    ├── sorceress.png
    ├── knight.png
    ├── ranger.png
    └── bard.png
```

### Tailwind 4 Configuration
```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#F5E6D3',
        'adventure': {
          red: '#E63946',
          blue: '#457B9D',
          yellow: '#FFB703',
          green: '#06A77D',
        }
      },
      fontFamily: {
        'heading': ['Fredoka', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
      }
    },
  },
  plugins: [],
} satisfies Config
```

### Environment Variables
```bash
# .env.local
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Routes Design

### POST /api/sessions
Create new adventure session
```typescript
// Request
{
  characterId: 'sorceress',
  characterName: 'Luna',
  adventureSetting: 'fantasy',
  adventureLength: 'short',
  adventureInspiration: 'A quest to find a lost kitten'
}

// Response
{
  sessionId: 'uuid-v4',
  session: AdventureSession
}
```

### GET /api/sessions/[id]
Retrieve existing session
```typescript
// Response
{
  session: AdventureSession
}
```

### PATCH /api/sessions/[id]
Update session state (hearts, messages, etc.)
```typescript
// Request
{
  hearts?: number,
  messages?: Message[],
  interactionCount?: number,
  isComplete?: boolean
}
```

### POST /api/game-master
Send user action, get AI GM response
```typescript
// Request
{
  sessionId: string,
  userMessage: string,
  currentState: {
    characterId: string,
    characterName: string,
    hearts: number,
    interactionCount: number,
    messageHistory: Message[]
  }
}

// Response
{
  narrative: string,
  hearts: number,
  rollResult?: RollResult,
  isMonsterEncounter: boolean,
  adventureComplete: boolean
}
```

## AI Prompt Engineering

### System Prompt Template
```
You are an expert Game Guide for "Tiny Heroes RPG", a tabletop game for children aged 4-8.

CORE RULES:
- Four skills: Strong Stuff, Smart Stuff, Sneaky Stuff, Kind Stuff (rated 0-3)
- Dice: Roll 1d6 + skill rating vs target number
- If you roll a 6, roll again and add it (exploding dice, can chain)
- Target numbers: Easy (4), Normal (6), Hard (8), Epic (10+)
- Hearts: Players have 3 hearts, losing all = tired/scared (never dead)

CURRENT PLAYER:
- Character: {characterName} the {characterClass}
- Skills: Strong {strong}, Smart {smart}, Sneaky {sneaky}, Kind {kind}
- Hearts: {hearts}/3
- Interaction: {interactionCount}/5 (MVP ends at 5 with monster fight)

ADVENTURE SETUP:
- Setting: {adventureSetting}
- Inspiration: {adventureInspiration}

YOUR ROLE:
1. Create an exciting, age-appropriate story
2. When player attempts something risky, call for a skill roll
3. Simulate the dice roll (1d6 + skill, exploding 6s)
4. Describe outcomes enthusiastically
5. Make failures funny, not scary or harsh
6. Celebrate high rolls and critical successes
7. Build toward monster encounter at interaction 5
8. Keep language simple and friendly for ages 4-8

TONE: Bright, cheerful, encouraging, funny, adventurous
SAFETY: No death, no scary content, no harsh failure

Always return JSON:
{
  "narrative": "Your story response here",
  "roll": { ... } or null,
  "hearts": current hearts (0-3),
  "interactionCount": current count,
  "nextPrompt": "Suggested question for player"
}
```

## Design Principles

### UI/UX Guidelines
- **Large, friendly fonts**: Min 18px body, 24px+ headings
- **Bright, cheerful colors**: Saturated primaries, warm backgrounds
- **Simple navigation**: One clear action per screen
- **Big buttons**: Min 60px height for small fingers
- **Visual feedback**: Animations, hover states, sound effects
- **Heart icons**: Use actual ❤️ emojis or custom heart SVGs
- **Minimal text**: Use icons and illustrations
- **Illustrations**: Character art on every screen
- **Rounded corners**: Everything soft and friendly (24px+ radius)
- **High contrast**: Easy to read for young eyes
- **No clutter**: Lots of whitespace, one focus per screen

### Tone & Voice
- Encouraging and positive ("Great try!", "Amazing!")
- Simple words for ages 4-8
- Celebrate all successes enthusiastically
- Make failures silly and fun ("Oops! You slipped on a banana peel!")
- Always safe and friendly
- Use sound effects in descriptions ("WHOOSH!", "BOOM!", "Sparkle!")

### Accessibility
- WCAG 2.1 AA contrast ratios
- Keyboard navigation
- Screen reader friendly
- Focus indicators
- Alternative text for all images
- Clear error messages
- Skip links

## Security & Safety

### Content Filtering
- OpenAI moderation API on all AI responses
- Blacklist inappropriate keywords
- Manual review of common scenarios
- Parental controls (future)

### Data Protection
- No PII collection in MVP (anonymous)
- Secure session IDs (UUID v4)
- HTTPS only in production
- MongoDB access controls
- Environment variable protection
- Rate limiting on API routes

### API Safety
- Rate limiting (10 requests/minute per session)
- Input validation on all routes
- Sanitize user inputs
- Error handling without exposing internals
- OpenAI API key protection
- Timeout limits on API calls

## Development Workflow

Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

### Getting Started
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev

# Open http://localhost:3000
```

### Database Setup
```bash
# Ensure MongoDB is running (local or Atlas)
# Connection string in .env.local

# Mongoose will auto-create collections on first use
```

### Implementation Verification

**CRITICAL**: After completing ANY implementation or code changes, you MUST verify the code passes both linting and building before considering the task complete.

#### Required Checks (Must Pass)

1. **Lint Check**: Ensure no ESLint errors or warnings
   ```bash
   npm run lint
   # ✓ Must exit with code 0 (no errors, no warnings)
   ```

2. **Build Check**: Ensure TypeScript compilation succeeds
   ```bash
   npm run build
   # ✓ Must complete successfully
   # ✓ All routes must generate
   # ✓ TypeScript validation must pass
   ```

#### When to Run These Checks

- ✅ After implementing new features
- ✅ After modifying existing code
- ✅ After fixing bugs
- ✅ After refactoring
- ✅ Before marking tasks as complete
- ✅ Before committing code

#### What to Fix

**Lint Issues:**
- Remove unused imports and variables
- Fix TypeScript type errors (`any` types, missing types)
- Resolve React Hook dependency warnings
- Fix exhaustive checks for discriminated unions

**Build Issues:**
- Fix TypeScript compilation errors
- Resolve type mismatches
- Handle null/undefined cases properly
- Ensure all imports are valid

**DO NOT:**
- Skip these checks to save time
- Commit code that doesn't pass lint and build
- Mark tasks complete without verification
- Use `@ts-ignore` or similar suppression comments unless absolutely necessary

### Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (recommended)
vercel deploy
```



## Testing Strategy

### Unit Tests
- Character data validation
- Dice rolling logic (including exploding 6s)
- Skill calculation
- Heart management

### Integration Tests
- API route responses
- Database operations
- OpenAI integration
- Session lifecycle

### User Testing
- Age-appropriate language
- UI usability for small children
- Fun factor and engagement
- Parent feedback
- Accessibility compliance

## Frontend Development Workflow

### Quick Visual Check

**CRITICAL**: IMMEDIATELY after implementing any front-end change, you MUST verify the implementation visually.

**Process (Required for ALL UI changes):**

1. **Identify what changed** - Review the modified components/pages you just created or updated

2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
   ```
   Example: mcp__playwright__browser_navigate(url: "http://localhost:3000/select-character")
   ```

3. **Verify design compliance** - Check against the design system:
   - Reference: `docs/DESIGN_SYSTEM.md` for specifications
   - Reference: `docs/DESIGN_USAGE_GUIDE.md` for patterns
   - Reference: `/design-system` showcase for examples
   - Verify:
     - ✓ Thick borders (4-5px) with `#3D2E1F` color
     - ✓ Storybook-style offset shadows
     - ✓ Rounded corners (12-32px)
     - ✓ Correct fonts (Fredoka/Nunito/Baloo 2)
     - ✓ Text size ≥ 18px
     - ✓ Character colors match spec
     - ✓ Touch targets ≥ 48px (64px for primary buttons)
     - ✓ Proper spacing using 8px grid
     - ✓ Hover states implemented
     - ✓ Mobile responsiveness

4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
   - Does it match the acceptance criteria?
   - Does it solve the stated problem?
   - Are all requested features present?

5. **Check acceptance criteria** - Review any provided context files or requirements
   - Re-read the user's original request
   - Verify each requirement has been implemented
   - Check edge cases mentioned

6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
   ```
   # Resize to desktop viewport
   mcp__playwright__browser_resize(width: 1440, height: 900)

   # Take full page screenshot
   mcp__playwright__browser_take_screenshot(fullPage: true, filename: "page-name-desktop.png")
   ```

7. **Check for errors** - Run `mcp__playwright__browser_console_messages` to catch any runtime errors
   ```
   mcp__playwright__browser_console_messages(level: "error")
   ```

**This verification ensures changes meet design standards and user requirements.**

### Why This Matters

- **Design consistency**: Ensures storybook aesthetic is maintained
- **Quality assurance**: Catches visual bugs immediately
- **Age-appropriate**: Verifies large text, clear buttons for 4-8 year olds
- **Accessibility**: Validates contrast, touch targets, responsive design
- **Documentation**: Screenshots provide evidence of implementation

### When to Skip

Never skip this process for UI changes. For backend-only changes (API routes, database models, utility functions with no UI), visual checks are not required.

## Future Enhancements (Post-MVP)

### Version 1
- [ ] User authentication
- [ ] Continue saved adventures
- [ ] Character history tracking
- [ ] Multiple saved adventures
- [ ] Character progression (skill increases)

### Future Ideas
- [ ] Multiplayer cooperative adventures
- [ ] Special items and inventory system
- [ ] Visual character customization
- [ ] Adventure templates library
- [ ] Printable character sheets
- [ ] Sound effects and background music
- [ ] Achievement system
- [ ] Parent dashboard
- [ ] Multiple language support
- [ ] Mobile native app (React Native)
- [ ] Voice interaction mode
- [ ] Illustrated adventure moments
- [ ] Shareable adventure summaries

---

## Quick Reference

**Skill Ratings:**
- 0 = Not good yet
- 1 = Beginner
- 2 = Trained
- 3 = Expert

**Difficulty Levels:**
- Easy (4): Everyday actions
- Normal (6): Common challenges
- Hard (8): Tricky/dangerous tasks
- Epic (10+): Legendary feats

**Core Principle:** Fun, imagination, cooperation over rules mastery

**AI Must:** Be enthusiastic, keep it simple, make failures funny, celebrate successes

---

## Development Learnings & Common Pitfalls

This section documents important lessons learned during development to help avoid repeating mistakes.

### Framework-Specific Knowledge

#### Next.js 16+ Breaking Changes
**Issue:** In Next.js 16, route `params` are now Promises and must be awaited.

**Problem Encountered:**
```typescript
// ❌ This breaks in Next.js 16 client components:
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params // Error: params is a Promise
}
```

**Solution:**
```typescript
// ✅ Use React's use() hook to unwrap the Promise:
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // Correctly unwraps the Promise
}
```

**Lesson:** Always check for framework version-specific breaking changes BEFORE implementing features. For Next.js upgrades, review the migration guide at https://nextjs.org/docs/app/building-your-application/upgrading

**When This Matters:** Any dynamic route using `[param]` in the file path when using client components.

---

### Testing & Verification

#### Verify Auto-Triggered Features Carefully
**Issue:** Auto-start features that trigger without user interaction need thorough testing.

**Problem Encountered:**
- Implemented `startAdventure()` function to automatically introduce the player when adventure begins
- Function exists and appears correct in code
- During testing, no initial GM message appeared - player had to click "Continue" to see first message
- Suggests feature isn't triggering correctly despite being implemented

**Lesson:** For auto-triggered features:
1. Don't just verify the code exists - verify it actually executes
2. Add console logging or debugging to trace execution
3. Test multiple times to catch intermittent issues
4. Check for race conditions or timing issues
5. Verify state updates propagate correctly to the UI

**When This Matters:** Any feature that should trigger automatically without user action (auto-save, auto-load, welcome messages, etc.)

---

### Visual Bugs & UI Issues

#### Always Check Rendered Output
**Issue:** Code may work logically but render incorrectly.

**Problem Encountered:**
- Dice roll display showed broken output: `"Rolled: ="` and `"❌ Not quite..."`
- Suggests missing data or incorrect conditional rendering
- Visual bug that impacts user experience

**Lesson:**
1. Visual checks aren't just for design system compliance
2. Also verify data displays correctly with realistic values
3. Check edge cases: empty data, missing fields, zero values
4. Use browser DevTools to inspect component state during rendering

**When This Matters:** All UI components, especially those displaying dynamic data.

---

### Implementation Best Practices

#### Research Framework Changes First
**Anti-Pattern:** Implement based on older framework knowledge, then fix errors during testing.

**Best Practice:**
1. Before starting implementation, check for breaking changes in current versions
2. Use Context7 MCP to get up-to-date documentation
3. Search for "[Framework] [Version] breaking changes" or migration guides
4. Review recent release notes

**Time Saved:** 10-30 minutes of debugging can be avoided by 5 minutes of research upfront.

---

### Known Issues To Fix

No known issues at this time. Both previously identified bugs have been resolved:
- ✅ Auto-introduction feature (fixed 2026-01-07)
- ✅ Dice roll display bug (fixed 2026-01-07)

See "Resolved Issues" section below for details on the fixes.

---

### Resolved Issues

#### 1. Auto-Introduction Feature (Fixed 2026-01-07)
**Problem:** After adventure planning completed, no initial Game Master message appeared. Player had to click "Continue" to see the first message.

**Root Cause:** React state timing issue. When `startAdventure()` was called, it tried to call `updateSession()` which checked `if (!session) return`. However, `setSession()` is asynchronous, so the `session` state variable was still null when `updateSession()` executed, causing it to return early without saving the message.

**Fix:** Modified `updateSession()` to accept an optional `targetSessionId` parameter:
```typescript
async function updateSession(updates: Partial<AdventureSession>, targetSessionId?: string) {
  const id = targetSessionId || session?.sessionId
  if (!id) return
  // ... rest of function
}
```

Then passed the sessionId explicitly when calling from `startAdventure()`:
```typescript
await updateSession({
  messages: [...sessionData.messages, aiMessage],
  hearts: gameState.hearts,
}, sessionId)
```

**Lesson:** Be careful with React state updates in async functions. State may not be updated immediately after `setState()` calls.

**Files Modified:** `/app/play/[sessionId]/page.tsx` lines 184-186, 201-204, 445-461

---

#### 2. Dice Roll Display Bug (Fixed 2026-01-07)
**Problem:** Dice roll results showed broken display: `"Rolled: ="` instead of proper values.

**Root Cause:** The rendering code checked for `message.gameState?.rollResult` but didn't validate that the rollResult object contained all required fields. Some old database records had incomplete rollResult data.

**Fix:** Added comprehensive null checks before rendering roll data:
```typescript
{message.gameState?.rollResult &&
 message.gameState.rollResult.diceRoll !== undefined &&
 message.gameState.rollResult.total !== undefined && (
  // ... render dice roll display
)}
```

Also added null checks for optional fields like `explodingRolls` and `skillBonus`.

**Lesson:** Always validate data structure completeness, not just existence. Use `!== undefined` checks for numeric values that could be 0.

**Files Modified:** `/app/play/[sessionId]/page.tsx` lines 585-606

---

### Development Workflow Reminders

1. **Check framework versions first** - Especially after upgrades
2. **Test auto-features thoroughly** - Don't assume they work because the code exists
3. **Verify visual output** - Not just that code runs, but that it displays correctly
4. **Use browser console** - Check for errors during testing
5. **Document issues immediately** - Don't let bugs slip through QA

---

### Questions To Ask Before Marking "Complete"

- ✅ Does the feature work as specified in requirements?
- ✅ Does it handle edge cases?
- ✅ Are there visual bugs or display issues?
- ✅ Does it work on multiple test runs (not just once)?
- ✅ Are there console errors or warnings?
- ✅ Does the user experience match expectations?

If you answer "no" or "unsure" to any of these, investigate further before marking complete