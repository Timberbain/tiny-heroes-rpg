# Tiny Heroes RPG

AI-powered RPG for children ages 4-8. Next.js 16+, TypeScript, Tailwind CSS 4+, MongoDB, OpenAI GPT-4.

## Key documentation

- Game rules, skills, classes, dice mechanics: `docs/tiny_heroes_rpg_game_design_document.md`
- Design system specification: `docs/DESIGN_SYSTEM.md`
- Design system code examples: `docs/DESIGN_USAGE_GUIDE.md`
- Interactive design showcase: `/design-system` route
- Project setup and structure: `README.md`

## Design system (IMPORTANT)

BEFORE implementing ANY frontend feature, review the design system docs above.

All UI must follow the "Storybook Adventure" aesthetic:
- Thick borders (4-5px) with `#3D2E1F` color
- Offset shadows for popup-book depth
- Rounded corners (12-32px)
- Fonts: Fredoka (headings), Nunito (body), Baloo 2 (callouts)
- Minimum 18px body text, 28px+ headings
- Touch targets: 48px minimum, 64px for primary buttons
- Character colors: Sorceress `#E63946`, Knight `#457B9D`, Ranger `#06A77D`, Bard `#FFB703`

## Code style

- TypeScript strict, ES modules
- Always use Context7 MCP for library/API documentation automatically
- Prefer editing existing files over creating new ones

## Verification (MUST PASS)

After ANY code change, run both:

```bash
npm run lint   # Must exit 0, no errors or warnings
npm run build  # Must complete successfully
```

Do not skip these. Do not commit code that fails either check.

## Frontend visual check workflow

After ANY frontend change, verify visually using Playwright MCP:

1. Navigate to affected pages with `browser_navigate`
2. Check design system compliance (borders, shadows, corners, fonts, sizes, colors, spacing)
3. Validate the feature matches acceptance criteria
4. Resize to 1440x900 and take a full-page screenshot
5. Check `browser_console_messages(level: "error")` for runtime errors

Never skip this for UI changes. Backend-only changes don't need it.

## Gotchas

### Next.js 16: params are Promises
Dynamic route params must be awaited. In client components, use React's `use()` hook:
```typescript
import { use } from 'react'
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
}
```

### React state timing in async functions
`setState()` is asynchronous. Don't rely on state variables immediately after setting them in async flows. Pass values explicitly instead (e.g., pass `sessionId` as a parameter rather than reading from `session` state).

### Validate data completeness, not just existence
When rendering dynamic data (especially `rollResult`), check that all fields exist, not just the parent object. Use `!== undefined` for numeric values that could be 0.
