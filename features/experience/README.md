# Experience Section

The Experience Section displays professional timeline, educational background, and skills development journey with interactive timeline visualization.

## Components

### ExperienceSection

Main section component that combines all experience-related content with background effects and animations.

### ExperienceContent

Displays experience information organized by timeline with:

- Professional timeline in chronological order
- Experience summary with statistics
- Skills progression visualization
- Call-to-action for opportunities
- Responsive layout with proper spacing

### TimelineEntry

Individual timeline entry component with:

- Experience information display with technologies
- Visual indicators for different experience types (education, work, project)
- Expandable details and achievements
- Status indicators (current/completed)
- Responsive timeline design
- Smooth animations and hover effects

### SkillsProgression

Skills development visualization component with:

- Timeline visualization of skill development
- Interactive year-by-year progression
- Skill tags with animations
- Summary statistics
- Visual representation of learning journey

## Features

- **Professional Timeline**: Chronological display of education, work, and projects
- **Experience Types**: Visual distinction between education, work, and project experiences
- **Expandable Details**: Click to expand timeline entries for more information
- **Skills Progression**: Year-by-year visualization of skill development
- **Experience Summary**: Statistics and overview of professional journey
- **Responsive Design**: Optimized for all device sizes
- **Glassmorphism Effects**: Consistent with overall design system
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Data Integration

Integrates with `docs/data/experience-section.json` containing:

- Timeline entries with detailed information
- Experience summary statistics
- Skills progression data by year
- Achievement and technology information

## Usage

```tsx
import { ExperienceSection } from '@/features/experience'

export default function Page() {
  return <ExperienceSection />
}
```

## Timeline Structure

Timeline entries are organized by:

- **Type**: Education, Work, or Project experiences
- **Status**: Current or Completed
- **Chronological Order**: Most recent first
- **Details**: Responsibilities, achievements, and technologies

Each timeline entry includes:

- Title, organization, and location
- Date range and current status
- Description and key responsibilities
- Technologies used and achievements
- Visual type indicators and status badges
