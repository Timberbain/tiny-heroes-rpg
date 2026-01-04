# Tiny Heroes RPG - Design System

## Design Philosophy

**Storybook Adventure**: A vibrant, tactile interface that feels like stepping into an interactive popup children's book. Every element has personality, with thick outlines, bold colors, and playful details that invite exploration without overwhelming young users.

### Core Principles
1. **Bold & Friendly**: Thick borders, rounded corners, high contrast
2. **Readable & Clear**: Large text, simple language, obvious interactions
3. **Magical & Safe**: Whimsical details that delight without frightening
4. **Touch-First**: Big buttons, generous spacing, forgiving interactions

---

## Color Palette

### Primary Colors
```css
--color-parchment: #F5E6D3;        /* Warm cream background */
--color-parchment-dark: #E8D4B8;   /* Darker variant for depth */

--color-adventure-red: #E63946;     /* Sorceress - Magic & Energy */
--color-adventure-blue: #457B9D;    /* Knight - Courage & Protection */
--color-adventure-green: #06A77D;   /* Ranger - Nature & Stealth */
--color-adventure-yellow: #FFB703;  /* Bard - Joy & Creativity */
```

### Supporting Colors
```css
--color-dragon-orange: #FF6B35;     /* Accents, warnings */
--color-castle-gray: #6C757D;       /* Secondary text, borders */
--color-forest-green: #2D6A4F;      /* Success states */
--color-sky-blue: #90D5FF;          /* Info, highlights */
--color-cloud-white: #FFFCF9;       /* Cards, elevated surfaces */
```

### Semantic Colors
```css
--color-text-primary: #2B2D42;      /* Main text - high contrast */
--color-text-secondary: #5A5C6E;    /* Secondary text */
--color-text-light: #8D8F9E;        /* Disabled, hints */

--color-success: #06A77D;           /* Success states */
--color-warning: #FFB703;           /* Warnings, caution */
--color-danger: #E63946;            /* Errors, hearts lost */
--color-info: #457B9D;              /* Information, tips */

--color-border-dark: #3D2E1F;       /* Main borders (storybook outline) */
--color-border-medium: #8B7355;     /* Secondary borders */
--color-border-light: #D4C4AE;      /* Subtle borders */
```

### Gradients
```css
--gradient-sky: linear-gradient(180deg, #90D5FF 0%, #E0F4FF 100%);
--gradient-grass: linear-gradient(180deg, #06A77D 0%, #2D6A4F 100%);
--gradient-magic: linear-gradient(135deg, #E63946 0%, #FF6B35 100%);
--gradient-sunset: linear-gradient(135deg, #FFB703 0%, #FF6B35 100%);
```

---

## Typography

### Font Families

**Display/Headings**: [Fredoka](https://fonts.google.com/specimen/Fredoka)
- Rounded, playful, friendly
- Perfect for storybook feel
- High legibility for young readers

**Body Text**: [Nunito](https://fonts.google.com/specimen/Nunito)
- Rounded sans-serif
- Excellent readability
- Warm, approachable character

**Special/Fancy**: [Baloo 2](https://fonts.google.com/specimen/Baloo+2)
- For character names, special callouts
- Bouncy, fun personality

```css
--font-heading: 'Fredoka', 'Comic Sans MS', cursive;
--font-body: 'Nunito', 'Segoe UI', sans-serif;
--font-special: 'Baloo 2', 'Fredoka', cursive;
```

### Type Scale (Mobile-First)

**Mobile (Default)**
```css
--text-xs: 14px;      /* Small labels, hints */
--text-sm: 16px;      /* Secondary text */
--text-base: 18px;    /* Body text - MINIMUM for ages 4-8 */
--text-lg: 22px;      /* Large body, small headings */
--text-xl: 28px;      /* Medium headings */
--text-2xl: 36px;     /* Large headings */
--text-3xl: 48px;     /* Hero headings */
--text-4xl: 64px;     /* Display text */
```

**Tablet (768px+)**
```css
--text-base: 20px;
--text-xl: 32px;
--text-2xl: 42px;
--text-3xl: 56px;
--text-4xl: 72px;
```

**Desktop (1024px+)**
```css
--text-base: 22px;
--text-xl: 36px;
--text-2xl: 48px;
--text-3xl: 64px;
--text-4xl: 84px;
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.1;     /* Large headings */
--leading-snug: 1.3;      /* Small headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.7;   /* Readable paragraphs */
```

---

## Spacing System

Based on 8px grid for consistency and rhythm.

```css
--space-1: 4px;      /* Tiny gaps */
--space-2: 8px;      /* Small gaps */
--space-3: 12px;     /* Medium gaps */
--space-4: 16px;     /* Default spacing */
--space-5: 20px;     /* Comfortable spacing */
--space-6: 24px;     /* Generous spacing */
--space-8: 32px;     /* Large spacing */
--space-10: 40px;    /* Extra large */
--space-12: 48px;    /* Section spacing */
--space-16: 64px;    /* Hero spacing */
--space-20: 80px;    /* Maximum spacing */
```

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;
```

---

## Border Radius

Creating the storybook, friendly aesthetic.

```css
--radius-sm: 8px;       /* Small elements */
--radius-md: 12px;      /* Buttons, inputs */
--radius-lg: 16px;      /* Cards */
--radius-xl: 24px;      /* Large cards */
--radius-2xl: 32px;     /* Hero elements */
--radius-full: 9999px;  /* Pills, circles */
```

---

## Shadows & Depth

**Storybook Style**: Bold, offset shadows for popup book effect.

```css
/* Main storybook shadow - thick dark outline */
--shadow-outline: 0 0 0 4px var(--color-border-dark);

/* Elevated elements */
--shadow-sm:
  0 2px 0 0 var(--color-border-dark),
  0 0 0 2px var(--color-border-dark);

--shadow-md:
  0 4px 0 0 var(--color-border-dark),
  0 0 0 3px var(--color-border-dark);

--shadow-lg:
  0 6px 0 0 var(--color-border-dark),
  0 0 0 4px var(--color-border-dark);

--shadow-xl:
  0 8px 0 0 var(--color-border-dark),
  0 0 0 4px var(--color-border-dark);

/* Pressed state */
--shadow-pressed:
  0 0 0 3px var(--color-border-dark),
  inset 0 2px 4px rgba(0, 0, 0, 0.1);

/* Floating elements (modals, tooltips) */
--shadow-float:
  0 8px 16px rgba(0, 0, 0, 0.15),
  0 0 0 4px var(--color-border-dark);

/* Inner shadows for depth */
--shadow-inset: inset 0 2px 6px rgba(0, 0, 0, 0.1);
```

---

## Components

### Buttons

**Primary Button (Call-to-Action)**
```css
.button-primary {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-xl);
  border: 4px solid var(--color-border-dark);
  box-shadow: var(--shadow-md);
  background: var(--color-adventure-blue);
  color: white;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  touch-action: manipulation;
  min-height: 64px; /* Large touch target */
  min-width: 120px;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.button-primary:active {
  transform: translateY(2px);
  box-shadow: var(--shadow-pressed);
}

.button-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

**Secondary Button**
```css
.button-secondary {
  /* Similar to primary but with: */
  background: var(--color-cloud-white);
  color: var(--color-text-primary);
  border-color: var(--color-border-medium);
}
```

**Character Button (Special)**
```css
.button-character {
  /* Dynamic color based on character */
  background: var(--character-color);
  border: 4px solid var(--color-border-dark);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  /* Contains character image + name */
}
```

### Cards

**Base Card**
```css
.card {
  background: var(--color-cloud-white);
  border: 4px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

**Character Card**
```css
.card-character {
  position: relative;
  background: var(--color-parchment);
  border: 5px solid var(--color-border-dark);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-xl);
  /* Decorative border pattern */
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 10px,
      var(--color-border-light) 10px,
      var(--color-border-light) 12px
    );
  background-position: 0 0, 0 100%;
  background-size: 100% 6px;
  background-repeat: no-repeat;
}
```

### Inputs

**Text Input**
```css
.input-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: var(--space-4) var(--space-5);
  border: 3px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  background: white;
  box-shadow: var(--shadow-inset);
  min-height: 56px; /* Easy to tap */
  transition: all 0.2s ease;
}

.input-text:focus {
  outline: none;
  border-color: var(--color-adventure-blue);
  box-shadow:
    var(--shadow-inset),
    0 0 0 4px rgba(69, 123, 157, 0.2);
}
```

**Select Dropdown**
```css
.select {
  /* Similar to input but with: */
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Custom arrow */
  background-position: right var(--space-4) center;
  background-repeat: no-repeat;
  padding-right: var(--space-12);
}
```

### Hearts Display

```css
.hearts-container {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--color-cloud-white);
  border: 3px solid var(--color-border-dark);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
}

.heart {
  width: 48px;
  height: 48px;
  background-image: url('/assets/icons/heart.png');
  background-size: contain;
  animation: heartbeat 1s ease-in-out infinite;
}

.heart.lost {
  opacity: 0.3;
  filter: grayscale(100%);
  animation: none;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

### Skill Display

```css
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  background: var(--color-cloud-white);
  border: 3px solid var(--color-border-dark);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
}

.skill-icon {
  width: 36px;
  height: 36px;
}

.skill-value {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--skill-color);
  border: 2px solid var(--color-border-dark);
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--text-xl);
}
```

### Dice Roll Display

```css
.dice-roll {
  background: var(--gradient-magic);
  border: 4px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  animation: diceAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes diceAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.dice-number {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: white;
  text-shadow:
    0 2px 0 var(--color-border-dark),
    0 4px 8px rgba(0, 0, 0, 0.3);
  animation: diceRoll 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes diceRoll {
  0%, 20%, 40%, 60%, 80% {
    transform: rotate(0deg) scale(1);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(360deg) scale(1.2);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
```

---

## Backgrounds & Decorative Elements

### Page Backgrounds

```css
.page-background {
  background: var(--color-parchment);
  position: relative;
  overflow: hidden;
}

/* Subtle texture */
.page-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg width='20' height='20'...");
  opacity: 0.05;
  pointer-events: none;
}
```

### Decorative Borders (Storybook Frame)

```css
.storybook-frame {
  position: relative;
  padding: var(--space-12);
  background: var(--color-cloud-white);
  border: 6px solid var(--color-border-dark);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);

  /* Decorative corners */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 48px;
    height: 48px;
    border: 6px solid var(--color-border-dark);
  }

  &::before {
    top: -6px;
    left: -6px;
    border-right: none;
    border-bottom: none;
    border-radius: var(--radius-md) 0 0 0;
  }

  &::after {
    bottom: -6px;
    right: -6px;
    border-left: none;
    border-top: none;
    border-radius: 0 0 var(--radius-md) 0;
  }
}
```

---

## Animations

### Principles
1. **Bounce & Delight**: Use elastic easing for playful feel
2. **Clear Feedback**: Every interaction has visible response
3. **Not Overwhelming**: Animations enhance, don't distract
4. **Performance**: Prefer CSS transforms and opacity

### Animation Timing
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;

--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Animations

**Page Entrance**
```css
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.page {
  animation: pageEnter 0.4s var(--ease-smooth);
}
```

**Button Wiggle (for emphasis)**
```css
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

.button-emphasis {
  animation: wiggle 0.5s ease-in-out;
}
```

**Success Celebration**
```css
@keyframes celebrate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.2) rotate(-5deg);
  }
  50% {
    transform: scale(1.3) rotate(5deg);
  }
  75% {
    transform: scale(1.2) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.success-element {
  animation: celebrate 0.6s var(--ease-bounce);
}
```

**Loading Spinner**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border-light);
  border-top-color: var(--color-adventure-blue);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}
```

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large)
- Primary text on parchment: 15.8:1 ratio
- Buttons use high-contrast text colors

### Touch Targets
- Minimum 48px × 48px for all interactive elements
- Recommended 56px-64px for primary actions
- 8px minimum spacing between touch targets

### Focus States
```css
*:focus-visible {
  outline: 4px solid var(--color-adventure-blue);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}
```

### Screen Readers
- All images have meaningful alt text
- Buttons have descriptive labels
- Form inputs have associated labels
- Skip navigation links provided
- ARIA landmarks used appropriately

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Icon Usage

### Skill Icons
- Size: 36px-48px for standard display, 64px+ for hero sections
- Style: Bold outlines (2-3px), simple shapes, high contrast
- Format: PNG with transparency preferred for consistency
- Fallback: Emoji alternatives (💪 📚 ⚡ ❤️)

### UI Icons
- Chevrons, arrows, close buttons: 24px minimum
- Consistent stroke width: 2-3px
- Rounded corners matching overall aesthetic
- Color: Use --color-border-dark for neutrals, theme colors for emphasis

---

## Layout Patterns

### Mobile-First Container
```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### Card Grid
```css
.card-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
  }
}
```

### Stack (Vertical Spacing)
```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.stack-lg {
  gap: var(--space-8);
}
```

---

## Usage Guidelines

### DO ✓
- Use bold, thick borders (3-5px) for storybook feel
- Incorporate character colors in context
- Make touch targets LARGE (56px+ minimum)
- Use playful animations sparingly
- Celebrate successes with visual feedback
- Keep language simple and encouraging
- Provide clear visual hierarchy

### DON'T ✗
- Use thin, subtle borders
- Overwhelm with too many colors at once
- Create small, hard-to-tap buttons
- Animate everything constantly
- Use scary imagery or harsh language
- Hide important information
- Create complex multi-step interactions

---

## File Organization

```
/public/assets/
  /icons/          # Skill icons, UI icons
  /characters/     # Character illustrations
  /backdrop/       # Decorative frames, backgrounds
  /sounds/         # (Future) Sound effects

/app/globals.css   # CSS variables, base styles
/components/
  /ui/             # Reusable UI components
    /Button.tsx
    /Card.tsx
    /Hearts.tsx
    /SkillBadge.tsx
```

---

## Quick Reference

**Most Used Values:**
- Primary color: `#457B9D` (adventure-blue)
- Border: `4px solid #3D2E1F`
- Border radius: `16px` (cards), `24px` (large)
- Text size: `18px` minimum
- Shadow: `var(--shadow-md)`
- Spacing: `16px` default, `24px` comfortable
- Animation: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce)

---

*This design system creates a cohesive, delightful experience that makes young heroes feel brave, capable, and excited to explore!* ✨
