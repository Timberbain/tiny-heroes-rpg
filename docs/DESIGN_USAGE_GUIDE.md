# Design System Usage Guide

Quick reference for implementing the Tiny Heroes RPG design system in your components.

## Quick Start

The design system is built on Tailwind CSS with custom tokens. All components should use Tailwind utility classes for consistency.

## Common Patterns

### Buttons

**Primary Action Button**
```tsx
<button className="
  font-heading text-lg font-bold
  px-8 py-4 min-h-[64px]
  bg-adventure-blue text-white
  border-4 border-border-dark rounded-xl
  shadow-md hover:shadow-lg
  hover:-translate-y-0.5 active:translate-y-0.5
  active:shadow-pressed
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Start Adventure! ✨
</button>
```

**Secondary Button**
```tsx
<button className="
  font-heading text-lg font-bold
  px-8 py-4 min-h-[64px]
  bg-cloud text-text-primary
  border-4 border-border-dark rounded-xl
  shadow-md hover:shadow-lg
  hover:-translate-y-0.5 active:translate-y-0.5
  transition-all duration-200
">
  Go Back
</button>
```

**Character-Specific Button**
```tsx
<button className="
  font-heading text-xl font-bold
  px-6 py-4 min-h-[64px]
  bg-adventure-red text-white
  border-4 border-border-dark rounded-2xl
  shadow-lg hover:shadow-xl
  hover:-translate-y-1 hover:scale-105
  active:translate-y-1
  transition-all duration-200
">
  Choose Sorceress
</button>
```

### Cards

**Basic Card**
```tsx
<div className="
  bg-cloud
  border-4 border-border-dark rounded-xl
  shadow-md hover:shadow-lg
  p-6
  hover:-translate-y-1
  transition-all duration-300
">
  <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
    Card Title
  </h3>
  <p className="font-body text-base text-text-primary">
    Card content goes here.
  </p>
</div>
```

**Character Card (Storybook Style)**
```tsx
<div className="
  relative
  bg-linear-to-br from-parchment to-parchment-dark
  border-5 border-border-dark rounded-2xl
  shadow-xl
  p-8
  hover:-translate-y-1 hover:shadow-float
  transition-all duration-300
">
  {/* Content */}
</div>
```

### Forms

**Text Input**
```tsx
<div className="flex flex-col gap-2">
  <label className="font-heading text-lg font-semibold text-text-primary">
    What's your hero's name?
  </label>
  <input
    type="text"
    placeholder="Enter a brave name..."
    className="
      font-body text-base
      px-5 py-4 min-h-[56px]
      bg-white
      border-3 border-border-dark rounded-xl
      shadow-inner
      focus:outline-none focus:border-adventure-blue
      focus:ring-4 focus:ring-adventure-blue/20
      transition-all duration-200
    "
  />
</div>
```

**Select Dropdown**
```tsx
<select className="
  font-body text-base
  px-5 py-4 pr-12 min-h-[56px]
  bg-white
  border-3 border-border-dark rounded-xl
  shadow-inner
  appearance-none cursor-pointer
  focus:outline-none focus:border-adventure-blue
  focus:ring-4 focus:ring-adventure-blue/20
  transition-all duration-200
">
  <option>Fantasy Quest</option>
  <option>Space Adventure</option>
</select>
```

**Textarea**
```tsx
<textarea
  rows={4}
  placeholder="What exciting adventure should we go on?"
  className="
    font-body text-base
    px-5 py-4
    bg-white
    border-3 border-border-dark rounded-xl
    shadow-inner resize-none
    focus:outline-none focus:border-adventure-blue
    focus:ring-4 focus:ring-adventure-blue/20
    transition-all duration-200
  "
/>
```

### Game Components

**Hearts Display**
```tsx
<div className="flex gap-4 px-6 py-4 bg-cloud border-3 border-border-dark rounded-full shadow-sm">
  {[1, 2, 3].map((heart) => (
    <span
      key={heart}
      className={`text-5xl ${
        heart > currentHearts
          ? 'opacity-30 grayscale scale-90'
          : 'animate-heartbeat'
      } transition-all duration-300`}
    >
      ❤️
    </span>
  ))}
</div>
```

**Skill Badge**
```tsx
<div className="
  inline-flex items-center gap-3
  px-5 py-3
  bg-cloud
  border-3 border-border-dark rounded-full
  shadow-sm hover:shadow-md
  hover:-translate-y-0.5
  transition-all duration-200
">
  <span className="text-4xl">💪</span>
  <span className="font-heading text-lg font-bold text-text-primary">
    Strong Stuff
  </span>
  <span className="
    flex items-center justify-center
    min-w-[36px] h-[36px]
    bg-adventure-red text-white
    border-2 border-border-dark rounded-full
    font-heading text-xl font-extrabold
  ">
    3
  </span>
</div>
```

**Dice Roll Result**
```tsx
<div className="
  bg-linear-to-br from-adventure-red to-dragon
  border-4 border-border-dark rounded-2xl
  px-12 py-8
  shadow-lg
  text-center
  animate-[celebrate_0.6s_cubic-bezier(0.34,1.56,0.64,1)]
">
  <div className="
    font-heading text-7xl font-extrabold
    text-white
    [text-shadow:0_3px_0_#3D2E1F,0_6px_12px_rgba(0,0,0,0.3)]
    mb-2
  ">
    6
  </div>
  <div className="font-heading text-2xl font-bold text-white">
    🌟 Critical Success!
  </div>
</div>
```

### Typography

**Hero Heading**
```tsx
<h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
  Tiny Heroes RPG
</h1>
```

**Section Heading**
```tsx
<h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">
  Choose Your Hero
</h2>
```

**Body Text**
```tsx
<p className="font-body text-base md:text-lg text-text-primary leading-relaxed">
  Embark on an exciting adventure!
</p>
```

**Special Text (Character Names, etc.)**
```tsx
<span className="font-special text-xl font-bold text-adventure-red">
  Luna the Sorceress
</span>
```

### Layout Containers

**Main Container**
```tsx
<div className="container mx-auto px-4 md:px-8 max-w-7xl">
  {/* Content */}
</div>
```

**Centered Content**
```tsx
<div className="min-h-screen flex flex-col items-center justify-center p-8">
  {/* Centered content */}
</div>
```

**Grid Layout (Responsive)**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
  {/* Grid items */}
</div>
```

**Stack (Vertical Spacing)**
```tsx
<div className="flex flex-col gap-4 md:gap-6">
  {/* Vertically stacked items */}
</div>
```

## Color Usage

### Character Colors
```tsx
// Sorceress - Red
className="bg-adventure-red text-white"

// Knight - Blue
className="bg-adventure-blue text-white"

// Ranger - Green
className="bg-adventure-green text-white"

// Bard - Yellow
className="bg-adventure-yellow text-white"
```

### Backgrounds
```tsx
// Main background
className="bg-parchment"

// Elevated surfaces (cards, modals)
className="bg-cloud"

// Darker parchment variant
className="bg-parchment-dark"
```

### Text Colors
```tsx
// Primary text (most text)
className="text-text-primary"

// Secondary text (descriptions, metadata)
className="text-text-secondary"

// Light text (disabled, hints)
className="text-text-light"
```

### Borders
```tsx
// Main borders (most elements)
className="border-4 border-border-dark"

// Secondary borders
className="border-3 border-border-medium"

// Subtle borders
className="border-2 border-border-light"
```

## Animations

### Built-in Animations
```tsx
// Gentle bounce
className="animate-bounce-gentle"

// Wiggle on hover
className="hover:animate-wiggle"

// Celebrate success
className="animate-celebrate"

// Heartbeat pulse
className="animate-heartbeat"

// Dice rolling
className="animate-dice-roll"
```

### Custom Transitions
```tsx
// Smooth hover lift
className="hover:-translate-y-1 transition-transform duration-200"

// Scale on hover
className="hover:scale-105 transition-transform duration-200"

// Rotate slightly
className="hover:rotate-3 transition-transform duration-200"
```

## Responsive Design

### Breakpoints
- `sm:` - 640px and up (tablets)
- `md:` - 768px and up (small laptops)
- `lg:` - 1024px and up (desktops)
- `xl:` - 1280px and up (large desktops)

### Mobile-First Example
```tsx
<h1 className="
  text-3xl     /* Mobile: 48px */
  sm:text-4xl  /* Tablet: 64px */
  lg:text-5xl  /* Desktop: 72px */
  font-heading font-bold
">
  Responsive Heading
</h1>
```

## Accessibility

### Focus States
All interactive elements automatically get focus rings:
```tsx
className="focus:outline-none focus:ring-4 focus:ring-adventure-blue"
```

### Touch Targets
All buttons should have minimum 48px height:
```tsx
className="min-h-[48px] md:min-h-[64px]"
```

### Color Contrast
- Text on parchment: Minimum 4.5:1 (WCAG AA)
- White text on character colors: 4.5:1+
- Always test text contrast for readability

### Screen Readers
```tsx
// Hidden text for screen readers
<span className="sr-only">Descriptive text</span>

// Aria labels
<button aria-label="Start new adventure">
  ✨
</button>
```

## Best Practices

### DO ✓
- Use Tailwind utilities for all styling
- Maintain 4px border thickness for main elements
- Use large touch targets (56-64px)
- Implement hover and active states
- Test on mobile devices
- Use semantic HTML elements
- Add proper alt text to images

### DON'T ✗
- Write custom CSS unless absolutely necessary
- Use thin borders (< 3px)
- Create small touch targets (< 48px)
- Forget transition animations
- Skip responsive breakpoints
- Use generic button text
- Leave images without alt text

## Component Checklist

When creating a new component:
- [ ] Uses appropriate font family (heading/body/special)
- [ ] Has proper text size for age group (18px+ minimum)
- [ ] Includes thick borders (3-5px)
- [ ] Has storybook-style shadow
- [ ] Implements hover state
- [ ] Implements active/pressed state
- [ ] Has minimum 48px touch target
- [ ] Is responsive (mobile-first)
- [ ] Has proper focus state
- [ ] Includes smooth transitions

## Examples in Code

See `/app/design-system/page.tsx` for live examples of all components.

Run the dev server and visit `/design-system` to see the interactive showcase.

---

**Need help?** Check the full design system documentation in `/docs/DESIGN_SYSTEM.md`
