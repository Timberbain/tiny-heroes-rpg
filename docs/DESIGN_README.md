# Tiny Heroes RPG Design System

## Overview

A comprehensive, child-friendly design system for ages 4-8, inspired by storybook adventures and popup books. The system emphasizes bold colors, thick borders, large text, and playful interactions that feel safe and inviting.

## What's Included

### 📚 Documentation
- **DESIGN_SYSTEM.md** - Complete design system specification with all tokens, components, and guidelines
- **DESIGN_USAGE_GUIDE.md** - Quick reference with code examples for common patterns
- **This file** - Overview and getting started guide

### 🎨 Interactive Showcase
- **Location**: `/app/design-system/page.tsx`
- **URL**: Visit `/design-system` when running the dev server
- **Features**:
  - Live color palette viewer
  - Typography samples
  - Interactive buttons and cards
  - Working dice roller
  - Hearts display with animations
  - Form element examples
  - Skill badges
  - Animation demonstrations

### 🎯 Design Assets
All visual assets from `/assets` have been copied to `/public` for use in components:
- `/public/characters/` - Character illustrations (sorceress, knight, ranger, bard, wizard)
- `/public/icons/` - Skill icons (heart, strength, knowledge, speed)
- `/public/backdrop/` - Decorative frames and backgrounds

## Design Philosophy

### Storybook Adventure
The design feels like stepping into an interactive popup children's book with:
- **Thick, dark outlines** (3-5px borders) like storybook illustrations
- **Bold, offset shadows** creating a 3D popup effect
- **Rounded corners** everywhere for friendliness
- **Bright, saturated colors** that feel magical and inviting
- **Playful animations** with elastic/bouncy easing

### Key Principles
1. **Clarity First** - Large text, high contrast, obvious interactions
2. **Touch-Friendly** - Big buttons (56-64px), forgiving spacing
3. **Delightful Details** - Animations celebrate success, failures are funny
4. **Safe & Encouraging** - Nothing scary, everything positive
5. **Accessible** - WCAG AA compliant, keyboard navigable

## Quick Start

### 1. View the Showcase

```bash
npm run dev
# Visit http://localhost:3000/design-system
```

The showcase page demonstrates all components with live interactions.

### 2. Use in Your Components

The design system is built on Tailwind CSS. Use utility classes:

```tsx
// Example: Primary button
<button className="
  font-heading text-lg font-bold
  px-8 py-4 min-h-[64px]
  bg-adventure-blue text-white
  border-4 border-border-dark rounded-xl
  shadow-md hover:shadow-lg
  hover:-translate-y-0.5
  transition-all duration-200
">
  Start Adventure! ✨
</button>
```

### 3. Reference the Guides

- **Quick patterns**: See `DESIGN_USAGE_GUIDE.md`
- **Full specification**: See `DESIGN_SYSTEM.md`
- **Live examples**: Check `/app/design-system/page.tsx`

## Color Palette

### Character Colors
- **Sorceress Red**: `#E63946` - Magic & Energy
- **Knight Blue**: `#457B9D` - Courage & Protection
- **Ranger Green**: `#06A77D` - Nature & Stealth
- **Bard Yellow**: `#FFB703` - Joy & Creativity

### Backgrounds
- **Parchment**: `#F5E6D3` - Main background (warm cream)
- **Cloud**: `#FFFCF9` - Cards and elevated surfaces

### Text & Borders
- **Text Primary**: `#2B2D42` - Main text (high contrast)
- **Border Dark**: `#3D2E1F` - Main borders (storybook outline)

## Typography

### Fonts (Auto-loaded via Next.js)
- **Fredoka** - Headings, buttons, character names
- **Nunito** - Body text, descriptions, paragraphs
- **Baloo 2** - Special callouts, decorative text

### Sizes (Mobile-First)
- Minimum body text: **18px** (critical for ages 4-8)
- Headings: **28px - 64px**
- Buttons: **22px**

## Components

### Available Components
✓ Buttons (Primary, Secondary, Character-specific)
✓ Cards (Basic, Character cards with decorative borders)
✓ Form inputs (Text, Select, Textarea)
✓ Hearts display (Animated health system)
✓ Skill badges (With icons and values)
✓ Dice roller (Animated roll results)

### Component Anatomy
Every component follows this pattern:
1. **Bold border** (3-5px solid dark outline)
2. **Offset shadow** (creates 3D popup effect)
3. **Rounded corners** (12-32px radius)
4. **Hover state** (lift up slightly)
5. **Active state** (press down)
6. **Smooth transitions** (200-300ms with bounce easing)

## Responsive Design

Mobile-first approach with breakpoints:
- **Base** (Mobile): 18px text, single column, full width buttons
- **sm** (640px+): Slightly larger text, 2-column grids
- **md** (768px+): 20px text, more spacing
- **lg** (1024px+): 22px text, 4-column grids, desktop layout

## Accessibility Features

- ✓ **WCAG AA** color contrast ratios
- ✓ **Large touch targets** (48px minimum, 64px recommended)
- ✓ **Focus indicators** (4px blue ring)
- ✓ **Keyboard navigation** support
- ✓ **Screen reader** friendly markup
- ✓ **Reduced motion** support (respects prefers-reduced-motion)

## Using Character Assets

Character images are in `/public/characters/`:

```tsx
import Image from 'next/image'

<Image
  src="/characters/sorceress.png"
  alt="Sorceress character"
  width={200}
  height={200}
  className="object-contain"
/>
```

Skill icons in `/public/icons/`:

```tsx
<Image
  src="/icons/heart.png"
  alt="Kind Stuff skill"
  width={36}
  height={36}
/>
```

Or use emoji alternatives:
- 💪 Strong Stuff
- 📚 Smart Stuff
- ⚡ Sneaky Stuff
- ❤️ Kind Stuff

## Tailwind Configuration

The design system extends Tailwind with custom tokens in `tailwind.config.ts`:

- **Colors**: `adventure-red`, `adventure-blue`, `parchment`, `border-dark`, etc.
- **Fonts**: `font-heading`, `font-body`, `font-special`
- **Shadows**: `shadow-sm` through `shadow-xl` (storybook style)
- **Animations**: `animate-heartbeat`, `animate-celebrate`, `animate-wiggle`

## Animation Principles

Animations should be:
1. **Playful** - Use elastic/bounce easing for joy
2. **Celebratory** - Success moments deserve flair
3. **Clear** - Show what changed (hearts lost, dice rolled)
4. **Not overwhelming** - Smooth, not frantic
5. **Respectful** - Honor prefers-reduced-motion

Example easing function:
```css
cubic-bezier(0.34, 1.56, 0.64, 1) /* Bouncy */
```

## Development Workflow

### 1. Design New Components
- Reference existing patterns in showcase
- Follow component checklist in usage guide
- Use Tailwind utilities for consistency

### 2. Test Across Devices
- Mobile (320px - 640px)
- Tablet (640px - 1024px)
- Desktop (1024px+)

### 3. Verify Accessibility
- Test keyboard navigation
- Check color contrast
- Verify touch target sizes
- Test with screen reader (optional but recommended)

## File Structure

```
docs/
  ├── DESIGN_SYSTEM.md         # Complete specification
  ├── DESIGN_USAGE_GUIDE.md    # Quick reference
  └── DESIGN_README.md         # This file

app/
  ├── design-system/
  │   ├── page.tsx             # Interactive showcase
  │   └── design-system.css    # Showcase-specific styles
  ├── layout.tsx               # Fonts loaded here
  └── globals.css              # Global styles

public/
  ├── characters/              # Character illustrations
  ├── icons/                   # Skill icons
  └── backdrop/                # Decorative elements

tailwind.config.ts             # Design tokens
```

## Next Steps

1. **Explore the showcase** at `/design-system` to see components in action
2. **Reference the usage guide** when building new components
3. **Copy patterns** from the showcase code
4. **Stay consistent** with the established design language

## Support

Questions about the design system?
- Check `DESIGN_SYSTEM.md` for detailed specs
- See `DESIGN_USAGE_GUIDE.md` for code examples
- Look at `/app/design-system/page.tsx` for implementations

---

**Remember**: This design system is for young heroes ages 4-8. Keep it big, bold, friendly, and fun! ✨🎮🏰
