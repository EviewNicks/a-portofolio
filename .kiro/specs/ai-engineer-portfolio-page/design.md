# Design Document

## Overview

The AI Engineer Portfolio Page is a sophisticated Single Page Application (SPA) that showcases Ardiansyah's technical expertise, projects, and professional journey. Built with Next.js 16.0.10 and React 19, the portfolio implements modern web technologies including glassmorphism effects, parallax scrolling, and AI-themed visual elements. The design follows a feature-based modular architecture that integrates existing JSON data sources with a comprehensive component system using shadcn/ui and Framer Motion.

The portfolio serves as both a professional showcase and a demonstration of technical capabilities, featuring six main sections: Hero, About, Skills, Projects, Experience, and Contact. Each section is designed to provide specific value to visitors while maintaining visual cohesion through a carefully crafted design system based on glassmorphism aesthetics and GitHub-inspired developer themes.

## Architecture

### System Architecture

The portfolio follows a feature-based modular architecture built on Next.js App Router with TypeScript. The system is structured as a client-side rendered SPA with server-side generation for optimal performance and SEO.

```
Portfolio System Architecture:
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
├─────────────────────────────────────────────────────────────┤
│  app/page.tsx (Main Portfolio Page)                        │
├─────────────────────────────────────────────────────────────┤
│  Feature Modules                                           │
│  ├── Hero Section        ├── Skills Section               │
│  ├── About Section       ├── Projects Section             │
│  ├── Experience Section  └── Contact Section              │
├─────────────────────────────────────────────────────────────┤
│  Component Libraries                                       │
│  ├── shadcn/ui (Base)    ├── Framer Motion (Animation)    │
│  └── Custom Components   └── Tailwind CSS (Styling)       │
├─────────────────────────────────────────────────────────────┤
│  Data Layer                                                │
│  └── JSON Data Sources (docs/data/*.json)                 │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 16.0.10 with React 19.2.1
- **Language**: TypeScript for type safety and developer experience
- **Styling**: Tailwind CSS v4 with custom AI-themed design system
- **Animation**: Framer Motion for complex animations and parallax effects
- **Component Library**: shadcn/ui for foundational UI components
- **Build Tool**: Next.js with App Router and static generation
- **Performance**: GPU-accelerated animations with 60fps target

### Data Flow Architecture

The portfolio implements a unidirectional data flow pattern where JSON data sources are imported and processed through React components:

```
JSON Data Sources → React Components → Rendered UI
     ↓                    ↓              ↓
Static Import → Props/State → DOM Elements
```

## Components and Interfaces

### Core Component Structure

The portfolio is built using a hierarchical component structure that promotes reusability and maintainability:

#### Page-Level Components
- **PortfolioPage**: Main page component that orchestrates all sections
- **SectionContainer**: Wrapper component for consistent section spacing and animations
- **NavigationProvider**: Context provider for smooth scrolling navigation

#### Section Components
- **HeroSection**: Hero area with parallax background and call-to-action elements
- **AboutSection**: Personal information, education, and career objectives
- **SkillsSection**: Technical skills organized by category with progress indicators
- **ProjectsSection**: Project showcase with filtering and detailed views
- **ExperienceSection**: Professional timeline with achievements and technologies
- **ContactSection**: Contact information, social links, and contact form

#### Shared Components
- **GlassCard**: Reusable glassmorphism card component
- **AnimatedText**: Text component with typing and fade animations
- **ParallaxContainer**: Container for parallax scrolling effects
- **ProgressBar**: Animated progress indicator for skills
- **InteractiveButton**: Enhanced button with hover and click animations

### Component Interfaces

#### Data Interfaces
```typescript
interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  cta: {
    primary: { text: string; link: string; variant: string };
    secondary: { text: string; link: string; variant: string };
  };
  highlights: string[];
  avatar: { url: string; alt: string };
  background: { type: string; theme: string; particles: boolean };
  parallax: { enabled: boolean; layers: ParallaxLayer[] };
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  skills: Skill[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  status: string;
  featured: boolean;
  images: ProjectImage[];
  links: ProjectLink[];
  highlights: string[];
}
```

#### Component Props Interfaces
```typescript
interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy';
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

interface ParallaxContainerProps {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
}
```

## Data Models

### JSON Data Structure

The portfolio integrates six primary JSON data sources, each corresponding to a specific section:

#### Hero Section Data Model
```json
{
  "hero": {
    "name": "string",
    "title": "string",
    "subtitle": "string",
    "description": "string",
    "tagline": "string",
    "cta": {
      "primary": { "text": "string", "link": "string", "variant": "string" },
      "secondary": { "text": "string", "link": "string", "variant": "string" }
    },
    "highlights": ["string"],
    "avatar": { "url": "string", "alt": "string" },
    "background": { "type": "string", "theme": "string", "particles": "boolean" },
    "parallax": {
      "enabled": "boolean",
      "layers": [{ "element": "string", "speed": "number", "direction": "string" }]
    }
  }
}
```

#### Skills Section Data Model
```json
{
  "skills": {
    "categories": [{
      "id": "string",
      "name": "string",
      "description": "string",
      "icon": "string",
      "color": "string",
      "skills": [{
        "id": "string",
        "name": "string",
        "level": "number",
        "experience": "string",
        "icon": "string",
        "description": "string"
      }]
    }],
    "learning": [{ "name": "string", "progress": "number", "target_date": "string" }],
    "certifications": [{ "name": "string", "issuer": "string", "status": "string" }]
  }
}
```

#### Projects Section Data Model
```json
{
  "projects": {
    "featured": [{
      "id": "string",
      "title": "string",
      "description": "string",
      "longDescription": "string",
      "technologies": ["string"],
      "category": "string",
      "status": "string",
      "featured": "boolean",
      "images": [{ "id": "string", "url": "string", "alt": "string", "isPrimary": "boolean" }],
      "links": [{ "id": "string", "type": "string", "url": "string", "label": "string" }],
      "highlights": ["string"],
      "createdAt": "string",
      "updatedAt": "string"
    }],
    "filters": {
      "categories": [{ "id": "string", "name": "string", "count": "number" }],
      "status": [{ "id": "string", "name": "string", "count": "number" }]
    }
  }
}
```

### Data Processing Pipeline

The portfolio implements a data processing pipeline that transforms JSON data into React component props:

1. **Data Import**: Static import of JSON files at build time
2. **Type Validation**: TypeScript interfaces ensure data structure integrity
3. **Data Transformation**: Processing functions adapt JSON data for component consumption
4. **Component Rendering**: React components receive typed props and render UI elements

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before defining the correctness properties, I need to analyze the acceptance criteria for testability:

<function_calls>
<invoke name="prework">
<parameter name="featureName">ai-engineer-portfolio-page

### Property Reflection

After reviewing all properties identified in the prework analysis, I've identified several areas where properties can be consolidated to eliminate redundancy and provide more comprehensive validation:

**Redundancy Elimination:**
- Properties 3.2, 4.2, 5.2, 5.3, and 6.2 all test that data objects display all required properties - these can be combined into a single comprehensive property about data completeness
- Properties 7.1, 7.2, 7.3, and 7.4 all test navigation functionality - these can be consolidated into comprehensive navigation properties
- Properties 8.1, 8.2, and 8.3 test responsive behavior at different breakpoints - these can be combined into responsive layout properties
- Properties 9.1, 9.2, 9.3, and 9.4 test various animation behaviors - these can be consolidated into animation consistency properties
- Properties 10.1, 10.2, 10.3, 10.4, and 10.5 all test accessibility features - these can be combined into comprehensive accessibility properties

**Consolidated Properties:**
The following properties provide unique validation value after consolidation:

Property 1: Parallax effect consistency
*For any* element with parallax configuration, scrolling should move that element at the specified speed relative to the scroll position
**Validates: Requirements 1.5**

Property 2: Data completeness validation
*For any* data object (skill, project, experience, social link), all required properties defined in the JSON schema should be displayed in the rendered component
**Validates: Requirements 3.2, 4.2, 5.2, 5.3, 6.2**

Property 3: Progress bar accuracy
*For any* skill with a level value, the progress bar width should accurately represent the percentage value from the skill level
**Validates: Requirements 3.3**

Property 4: Category visual distinction
*For any* skill category, the displayed color and icon should match the category's defined color and icon properties
**Validates: Requirements 3.4**

Property 5: Project link functionality
*For any* project with links, each link should have a valid href attribute that matches the URL from the project data
**Validates: Requirements 4.4**

Property 6: Project filtering behavior
*For any* filter selection (category or status), only projects matching that filter criteria should be visible in the results
**Validates: Requirements 4.5**

Property 7: Timeline chronological ordering
*For any* set of experience entries, they should be displayed in chronological order based on their date values
**Validates: Requirements 5.1**

Property 8: Experience type visual distinction
*For any* experience entry, the visual indicator should correspond to the experience type (education, work, project)
**Validates: Requirements 5.4**

Property 9: Navigation smooth scrolling
*For any* navigation link clicked, the page should scroll to the target section with smooth animation behavior
**Validates: Requirements 7.1, 7.2**

Property 10: Navigation state synchronization
*For any* scroll position, the active navigation state should reflect the currently visible section
**Validates: Requirements 7.3**

Property 11: URL anchor navigation
*For any* section anchor in the URL hash, the page should scroll to and display that specific section
**Validates: Requirements 7.4**

Property 12: Responsive layout adaptation
*For any* viewport size change, the layout should adapt appropriately while maintaining content readability and functionality
**Validates: Requirements 8.4, 8.5**

Property 13: Animation performance consistency
*For any* running animation, it should maintain smooth performance and respect user motion preferences
**Validates: Requirements 9.5**

Property 14: Glassmorphism style consistency
*For any* element with glassmorphism effects, it should use consistent backdrop blur and translucent background styling
**Validates: Requirements 9.2**

Property 15: Hover effect consistency
*For any* interactive element, hover states should apply appropriate visual effects (scale, glow, transform)
**Validates: Requirements 9.4**

Property 16: Accessibility compliance
*For any* interactive element, it should provide visible focus indicators and appropriate ARIA labels for screen readers
**Validates: Requirements 10.1, 10.2**

Property 17: Motion preference respect
*For any* animation, it should be reduced or disabled when the user has prefers-reduced-motion enabled
**Validates: Requirements 10.3**

Property 18: Color accessibility compliance
*For any* text element, it should maintain minimum contrast ratios and not rely solely on color for information
**Validates: Requirements 10.4, 10.5**

## Error Handling

### Client-Side Error Handling

The portfolio implements comprehensive error handling to ensure graceful degradation when issues occur:

#### Data Loading Errors
- **JSON Import Failures**: Fallback to default data structures when JSON files are missing or malformed
- **Image Loading Errors**: Placeholder images and lazy loading with error boundaries
- **Font Loading Failures**: System font fallbacks to maintain readability

#### Animation and Interaction Errors
- **Animation Frame Errors**: Graceful fallback to CSS transitions when JavaScript animations fail
- **Parallax Calculation Errors**: Disable parallax effects and maintain static layouts
- **Scroll Event Errors**: Fallback navigation without smooth scrolling

#### Responsive Design Errors
- **Viewport Detection Failures**: Default to mobile-first responsive design
- **CSS Feature Detection**: Progressive enhancement for advanced CSS features
- **Touch Event Errors**: Fallback to click events for interaction

### Error Boundary Implementation

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorSection?: string;
}

class PortfolioErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  // Error boundary implementation for section-level error isolation
}
```

### Performance Error Handling

- **Animation Performance**: Automatic fallback to reduced animations on low-performance devices
- **Memory Management**: Cleanup of event listeners and animation frames
- **Bundle Loading**: Progressive loading with fallbacks for network issues

## Testing Strategy

The portfolio implements a dual testing approach combining unit testing and property-based testing to ensure comprehensive coverage and correctness validation.

### Unit Testing Approach

Unit tests verify specific examples, edge cases, and integration points between components:

#### Component Testing
- **Rendering Tests**: Verify components render correctly with provided props
- **Interaction Tests**: Test user interactions like clicks, hovers, and form submissions
- **Data Integration Tests**: Verify JSON data is correctly processed and displayed
- **Responsive Behavior Tests**: Test layout changes at specific breakpoints

#### Integration Testing
- **Section Integration**: Test how different portfolio sections work together
- **Navigation Integration**: Verify smooth scrolling and section navigation
- **Animation Integration**: Test animation sequences and timing
- **Form Integration**: Test contact form validation and submission

### Property-Based Testing Approach

Property-based testing verifies universal properties that should hold across all inputs using **fast-check** library for JavaScript/TypeScript. Each property-based test runs a minimum of 100 iterations to ensure comprehensive coverage.

#### Property Test Configuration
```typescript
import fc from 'fast-check';

// Configure property tests to run 100+ iterations
const propertyTestConfig = {
  numRuns: 100,
  verbose: true,
  seed: 42 // For reproducible test runs
};
```

#### Property Test Implementation
Each correctness property is implemented by a single property-based test with explicit tagging:

```typescript
// Example property test structure
describe('Portfolio Property Tests', () => {
  it('should maintain parallax effect consistency', () => {
    // **Feature: ai-engineer-portfolio-page, Property 1: Parallax effect consistency**
    fc.assert(fc.property(
      fc.record({
        speed: fc.float({ min: 0.1, max: 2.0 }),
        scrollPosition: fc.integer({ min: 0, max: 5000 })
      }),
      ({ speed, scrollPosition }) => {
        // Test implementation
      }
    ), propertyTestConfig);
  });
});
```

#### Property Test Categories

**Data Validation Properties**
- Test that all required data properties are displayed correctly
- Verify data transformation and processing accuracy
- Validate JSON schema compliance

**UI Behavior Properties**
- Test responsive layout adaptation across viewport sizes
- Verify animation consistency and performance
- Validate interaction behavior and state management

**Accessibility Properties**
- Test keyboard navigation and focus management
- Verify screen reader compatibility and ARIA labels
- Validate color contrast and motion preference compliance

**Performance Properties**
- Test animation frame rates and GPU acceleration
- Verify memory management and cleanup
- Validate loading performance and optimization

### Testing Requirements Summary

- **Unit Tests**: Focus on specific examples, edge cases, and component integration
- **Property Tests**: Verify universal properties across all valid inputs using fast-check
- **Test Coverage**: Both approaches are complementary and required for comprehensive validation
- **Property Test Tagging**: Each test explicitly references its corresponding design property
- **Iteration Count**: Minimum 100 iterations per property test for thorough validation
- **Performance Testing**: Animation and interaction performance validation included