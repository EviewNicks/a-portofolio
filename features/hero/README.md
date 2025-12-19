# Hero Section Feature

This feature contains all components related to the hero section of the AI Engineer Portfolio.

## Structure

```
features/hero/
├── components/
│   ├── HeroBackground.tsx    # Parallax background effects
│   ├── HeroContent.tsx       # Main content (text, avatar, highlights, CTA)
│   ├── HeroSection.tsx       # Main component that combines all parts
│   └── index.ts             # Component exports
├── index.ts                 # Feature export
└── README.md               # This file
```

## Components

### HeroSection

Main component that orchestrates the entire hero section. Combines HeroBackground and HeroContent with scroll indicator.

**Props:**

- `className?: string` - Optional CSS classes

**Features:**

- JSON data integration from `docs/data/hero-section.json`
- Responsive layout with asymmetric design
- Scroll indicator animation
- Accessibility considerations

### HeroContent

Handles all content elements including text, avatar, highlights, and call-to-action buttons.

**Props:**

- `heroData: HeroData` - Hero section data from JSON

**Features:**

- Animated text with staggered entrance
- Professional highlights with bullet animations
- Call-to-action buttons with smooth scrolling
- Avatar with error handling and placeholder fallback
- Responsive grid layout

### HeroBackground

Manages all parallax background effects and animations.

**Props:**

- `parallaxConfig: HeroData['parallax']` - Parallax configuration
- `backgroundConfig: HeroData['background']` - Background configuration

**Features:**

- Multi-layer parallax with different speeds and directions
- AI-themed neural network SVG patterns
- Floating particle animations
- Animated gradients that cycle through AI theme colors
- Geometric shapes with rotation and scaling animations

## Usage

```tsx
import { HeroSection } from '@/features/hero'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}
```

## Data Integration

The hero section automatically imports and processes data from `docs/data/hero-section.json`. The data structure follows the `HeroSectionData` interface defined in `lib/types/portfolio.ts`.

## Animations

All animations are built with Framer Motion and include:

- Staggered entrance animations for content elements
- Typewriter effect for tagline
- Parallax scrolling effects
- Particle and geometric shape animations
- Smooth scroll indicator
- Reduced motion support for accessibility

## Responsive Design

The hero section adapts to different screen sizes:

- **Desktop**: Full asymmetric layout with all effects
- **Tablet**: Simplified grid with reduced parallax
- **Mobile**: Single-column layout with minimal animations

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Reduced motion preference detection
- High contrast text ratios
- Focus indicators for interactive elements
