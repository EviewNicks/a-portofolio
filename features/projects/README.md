# Projects Section

The Projects Section showcases technical projects with detailed information, filtering capabilities, and interactive features.

## Components

### ProjectsSection

Main section component that combines all project-related content with background effects and animations.

### ProjectsContent

Displays projects organized by sections (featured, academic, personal) with:

- Project showcase with proper categorization
- Filtering system by category and status
- Project statistics display
- Responsive grid layouts
- Smooth transitions for filter changes

### ProjectCard

Individual project card component with:

- Project information display with technologies
- Expandable long description and highlights
- Functional GitHub and demo links
- Status indicators and category badges
- Hover effects and animations
- Responsive image handling

### ProjectFilters

Filtering system component with:

- Category filtering with counts
- Status filtering with smooth transitions
- Active state indicators
- Responsive button layouts
- Animated filter changes

## Features

- **Project Showcase**: Featured projects with proper categorization
- **Interactive Filtering**: Filter by category and status with smooth transitions
- **Expandable Details**: Click to expand project cards for more information
- **Functional Links**: Working GitHub and demo links where available
- **Project Statistics**: Display of project metrics and achievements
- **Responsive Design**: Optimized for all device sizes
- **Glassmorphism Effects**: Consistent with overall design system
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Data Integration

Integrates with `docs/data/projects-section.json` containing:

- Featured projects with detailed information
- Academic projects from coursework
- Personal projects and experiments
- Project filtering options and statistics
- Project links and metadata

## Usage

```tsx
import { ProjectsSection } from '@/features/projects'

export default function Page() {
  return <ProjectsSection />
}
```

## Project Structure

Projects are organized into three categories:

- **Featured**: Highlighted projects showcasing key skills
- **Academic**: Projects from academic studies and coursework
- **Personal**: Independent projects and experiments

Each project includes:

- Title, description, and detailed information
- Technology stack and highlights
- Status indicators and category badges
- Links to GitHub repositories and live demos
- Project images and metadata
