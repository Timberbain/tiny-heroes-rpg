# Tiny Heroes RPG

An AI-powered RPG adventure game for young children (ages 4-8).

## Project Status

**Phase 1: Core Setup** ✅ Complete

- Next.js 16 with TypeScript
- Tailwind CSS 4 configured with custom design tokens
- MongoDB integration ready
- OpenAI API integration ready
- Character data and game logic implemented
- **Comprehensive design system** created and documented

**Phase 2: MVP Features** 🚧 Ready to start

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- OpenAI API key

### Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   - `MONGODB_URI`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXT_PUBLIC_APP_URL`: Your app URL (default: http://localhost:3000)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
tiny-heroes-rpg/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── select-character/    # Character selection
│   ├── setup-adventure/     # Adventure setup
│   ├── play/                # Gameplay interface
│   └── api/                 # API routes
│       ├── sessions/        # Session management
│       └── game-master/     # AI game master
├── components/              # React components
├── lib/                     # Utilities and shared code
│   ├── characters.ts        # Character data
│   ├── types.ts             # TypeScript types
│   ├── game-logic.ts        # Dice rolling, skill checks
│   ├── mongodb.ts           # MongoDB connection
│   ├── openai.ts            # OpenAI client
│   └── models/              # Mongoose schemas
│       └── Session.ts       # Adventure session model
├── public/                  # Static assets
│   └── characters/          # Character illustrations
└── docs/                    # Documentation
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI GPT-4
- **Storage**: LocalStorage (MVP)
- **Fonts**: Fredoka, Nunito, Baloo 2 (Google Fonts)

## Design System

A comprehensive, child-friendly design system inspired by popup storybooks.

### View the Design System
```bash
npm run dev
# Visit http://localhost:3000/design-system
```

### Key Features
- 🎨 **Storybook aesthetic** - Thick borders, offset shadows, rounded corners
- 📝 **Large, readable text** - 18px minimum, perfect for ages 4-8
- 🎯 **Big touch targets** - 64px buttons for small fingers
- ✨ **Playful animations** - Celebrate success, make failures funny
- ♿ **WCAG AA compliant** - High contrast, keyboard navigation
- 📱 **Mobile-first** - Responsive from 320px to 1920px

### Documentation
- **Complete specification**: `docs/DESIGN_SYSTEM.md`
- **Quick reference**: `docs/DESIGN_USAGE_GUIDE.md`
- **Getting started**: `docs/DESIGN_README.md`
- **Summary**: `docs/DESIGN_SYSTEM_SUMMARY.md`

### Color Palette
- **Sorceress Red** (#E63946) - Magic & Energy
- **Knight Blue** (#457B9D) - Courage & Protection
- **Ranger Green** (#06A77D) - Nature & Stealth
- **Bard Yellow** (#FFB703) - Joy & Creativity

## Game Mechanics

### Four Skills (0-3 rating)
- 💪 **Strong Stuff**: Climbing, fighting, lifting
- 📚 **Smart Stuff**: Puzzles, clues, knowledge
- ⚡ **Sneaky Stuff**: Hiding, sneaking, dodging
- ❤️ **Kind Stuff**: Talking, helping, making friends

### Dice System
- Roll 1d6 + skill rating vs Target Number
- **Exploding 6s**: Roll again and add when you roll a 6
- **Target Numbers**: Easy (4), Normal (6), Hard (8), Epic (10+)

### Characters
1. **Sorceress** - Expert at Smart Stuff (magic and puzzles)
2. **Knight** - Expert at Strong Stuff (fighting and protecting)
3. **Ranger** - Expert at Sneaky Stuff (hiding and nature)
4. **Bard** - Expert at Kind Stuff (talking and inspiring)

### Hearts System
- Each hero has 3 hearts ❤️❤️❤️
- Losing all hearts = tired/scared (never dead!)
- Hearts restore through rest and teamwork

## Development Roadmap

### Phase 1: Core Setup ✅
- [x] Next.js 16 with TypeScript
- [x] Tailwind CSS 4
- [x] MongoDB connection
- [x] OpenAI integration
- [x] Character data
- [x] Game logic utilities
- [x] Type definitions

### Phase 2: MVP Features (Next)
- [ ] Landing page
- [ ] Character selection screen
- [ ] Adventure setup form
- [ ] Gameplay chat interface
- [ ] AI Game Master implementation
- [ ] Session management API
- [ ] LocalStorage persistence
- [ ] Hearts display
- [ ] Dice roll animations

### Phase 3: Polish & Testing
- [ ] Responsive design
- [ ] Accessibility
- [ ] Error handling
- [ ] User testing
- [ ] Performance optimization

## Contributing

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines and architecture decisions.

## License

Private project - All rights reserved
