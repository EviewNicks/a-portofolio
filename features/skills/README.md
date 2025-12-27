# Skills Section

The Skills Section showcases technical expertise organized by category with visual progress indicators and learning status.

## Components

### SkillsSection

Main section component that combines all skills-related content with background effects and animations.

### SkillsContent

Displays technical skills organized by categories with:

- Category-specific colors and visual distinction
- Individual skill cards with progress bars
- Responsive grid layouts
- Animated entrance effects

### LearningProgress

Shows current learning items and certification plans with:

- Progress indicators with target dates
- Certification status tracking
- Visual status indicators
- Responsive card layouts

### ProgressBar

Reusable animated progress bar component with:

- Smooth animation transitions
- Customizable colors and styling
- Percentage value display
- Accessibility support

## Features

- **Category Organization**: Skills grouped by technology domain
- **Visual Progress**: Animated progress bars showing proficiency levels
- **Learning Tracking**: Current learning items with progress and target dates
- **Certification Status**: Professional certification plans and achievements
- **Responsive Design**: Optimized for all device sizes
- **Glassmorphism Effects**: Consistent with overall design system
- **Accessibility**: ARIA labels and keyboard navigation support

## Data Integration

Integrates with `docs/data/skills-section.json` containing:

- Skill categories with colors and descriptions
- Individual skills with proficiency levels
- Current learning items with progress tracking
- Certification plans and status

## Usage

```tsx
import { SkillsSection } from '@/features/skills'

export default function Page() {
  return <SkillsSection />
}
```
