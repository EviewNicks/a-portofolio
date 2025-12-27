# About Section Feature

This feature contains all components related to the about section of the AI Engineer Portfolio.

## Structure

```
features/about/
├── components/
│   ├── AboutContent.tsx      # Main content (personal info, education, objectives, stats)
│   ├── AboutValues.tsx       # Values display with card layout
│   ├── AboutSection.tsx      # Main component that combines all parts
│   └── index.ts             # Component exports
├── index.ts                 # Feature export
└── README.md               # This file
```

## Components

### AboutSection

Main component that orchestrates the entire about section. Combines AboutContent and AboutValues with background decorative elements.

**Props:**

- `className?: string` - Optional CSS classes

**Features:**

- JSON data integration from `docs/data/about-section.json`
- Responsive layout with proper spacing
- Background decorative elements with animations
- Section divider with gradient line

### AboutContent

Handles all main content including personal information, education, career objectives, and statistics.

**Props:**

- `aboutData: AboutData` - About section data from JSON

**Features:**

- Personal information display (bio, philosophy, interests)
- Education details with achievements and focus areas
- Career objectives with animated list items
- Statistics with animated counters
- Responsive grid layout
- Interest tags with staggered animations

### AboutValues

Displays personal values as interactive glassmorphism cards.

**Props:**

- `values: Value[]` - Array of values from JSON data

**Features:**

- Interactive cards with hover effects
- Numbered value indicators
- Smooth animations and transitions
- Decorative background elements
- Responsive grid layout (1-2-4 columns)

## Usage

```tsx
import { AboutSection } from '@/features/about'

export default function HomePage() {
  return (
    <main>
      <AboutSection />
    </main>
  )
}
```

## Data Integration

The about section automatically imports and processes data from `docs/data/about-section.json`. The data structure follows the `AboutSectionData` interface defined in `lib/types/portfolio.ts`.

### Data Structure

- **Personal Information**: Bio, philosophy, location, timezone, interests
- **Education**: Current degree, institution, GPA, focus areas, achievements
- **Career Objectives**: List of professional goals and aspirations
- **Values**: Core principles with titles and descriptions
- **Statistics**: Numerical achievements with animated counters

## Animations

All animations are built with Framer Motion and include:

- Staggered entrance animations for content sections
- Animated counters for statistics
- Interest tag animations with delays
- Value card hover effects with scale and lift
- Background decorative element rotations
- Smooth transitions between states

## Responsive Design

The about section adapts to different screen sizes:

- **Desktop**: Two-column layout with full content display
- **Tablet**: Simplified grid with adjusted spacing
- **Mobile**: Single-column layout with stacked content

## Accessibility

- Semantic HTML structure with proper headings
- ARIA labels where appropriate
- Keyboard navigation support
- Reduced motion preference detection
- High contrast text ratios
- Focus indicators for interactive elements

## Glassmorphism Integration

Uses the glassmorphism utility system with:

- **Medium variant** for main content cards
- **Light variant** for secondary content
- **Hover effects** for interactive elements
- **Consistent styling** across all cards
- **Proper backdrop blur** and transparency
