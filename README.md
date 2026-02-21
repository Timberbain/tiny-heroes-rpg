# Tiny Heroes RPG

An AI-powered tabletop RPG for young children (ages 4-8), where an AI Game Master leads players through adventures using simple, fun mechanics focused on imagination and cooperation.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)
- OpenAI API key

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add:
   - `MONGODB_URI` — Your MongoDB connection string
   - `OPENAI_API_KEY` — Your OpenAI API key
   - `NEXT_PUBLIC_APP_URL` — Your app URL (default: `http://localhost:3000`)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI GPT-4 (Chat Completions API + JSON mode)
- **Validation**: Zod
- **Internationalization**: next-intl (English & Swedish)
- **Fonts**: Fredoka, Nunito, Baloo 2 (Google Fonts)

## Project Structure

```
tiny-heroes-rpg/
├── app/
│   ├── [locale]/               # Localized pages (en, sv)
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Locale layout
│   │   ├── select-character/   # Character selection
│   │   ├── setup-adventure/    # Adventure setup
│   │   ├── play/[sessionId]/   # Gameplay interface
│   │   └── design-system/      # Design system showcase
│   ├── layout.tsx              # Root layout
│   └── api/
│       ├── sessions/           # Session CRUD
│       └── game-master/        # AI game master (main, roll, plan)
├── components/                 # Shared React components
├── lib/                        # Utilities and shared code
│   ├── characters.ts           # Character data constants
│   ├── game-logic.ts           # Dice rolling, skill checks
│   ├── types.ts                # TypeScript interfaces
│   ├── mongodb.ts              # MongoDB connection
│   ├── openai.ts               # OpenAI client
│   ├── session-storage.ts      # Local storage helpers
│   └── models/                 # Mongoose schemas
├── src/i18n/                   # Internationalization config
├── messages/                   # Translation files (en.json, sv.json)
├── public/                     # Static assets & character images
├── docs/                       # Design system documentation
└── middleware.ts               # Locale routing middleware
```

## Game Mechanics

### Skills (rated 0-3)

| Skill | Icon | Description |
|-------|------|-------------|
| Strong Stuff | :muscle: | Climbing, fighting, lifting |
| Smart Stuff | :books: | Puzzles, clues, knowledge |
| Sneaky Stuff | :zap: | Hiding, sneaking, dodging |
| Kind Stuff | :heart: | Talking, helping, making friends |

### Dice System

- Roll **1d6 + skill rating** vs a Target Number
- **Exploding 6s**: rolling a 6 means roll again and add (can chain)
- **Target Numbers**: Easy (4), Normal (6), Hard (8), Epic (10+)
- Rolling a **1** is a fumble — something silly happens (never punishing)

### Characters

| Class | Expert Skill | Archetype |
|-------|-------------|-----------|
| Sorceress | Smart Stuff (3) | Magical scholar |
| Knight | Strong Stuff (3) | Brave protector |
| Ranger | Sneaky Stuff (3) | Swift hunter |
| Bard | Kind Stuff (3) | Friendly storyteller |

### Hearts

Each hero has 3 hearts. Losing all hearts means the hero is tired or scared — never dead. Hearts restore through rest, teamwork, and story events.

## Design System

The UI follows a "Storybook Adventure" design language inspired by popup children's books, with thick borders, offset shadows, rounded corners, and playful animations.

**View the interactive showcase**: run `npm run dev` and visit `/design-system`

Documentation:
- `docs/DESIGN_SYSTEM.md` — Complete specification
- `docs/DESIGN_USAGE_GUIDE.md` — Code examples and patterns

## Internationalization

The game supports **English** and **Swedish** via [next-intl](https://next-intl.dev). Translation files are in `messages/`. The locale is detected automatically and can be switched in-game with the language selector.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines, architecture decisions, and coding standards.

## License

Private project — All rights reserved
