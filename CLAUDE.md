# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Engineer Portfolio project for Ardiansyah, built with Next.js 16.0.10 and React 19 with TypeScript. The project follows a feature-based modular architecture and aims to create a professional portfolio website showcasing AI engineering capabilities with modern design elements including parallax scrolling and glassmorphism effects.

## Architecture & Structure

### Directory Layout (Feature-Based Architecture)

```
a-portofolio/
├── app/                     # Next.js App Router (routing, layouts, pages)
│   ├── layout.tsx          # Root layout with Geist fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles with Tailwind CSS v4
├── features/                # Modular features (per portfolio section)
│   ├── header/             # Header feature (already exists)
│   ├── hero/               # Hero section (to be created)
│   ├── about/              # About section (to be created)
│   ├── projects/           # Projects showcase (to be created)
│   └── contact/            # Contact section (to be created)
│       ├── components/     # Feature-specific UI components
│       ├── hooks/          # Custom hooks for feature logic
│       └── types.ts        # TypeScript types for feature
├── components/              # Shared components library
│   ├── ui/                 # shadcn/ui base components (installed)
│   ├── common/             # Reusable hybrid components
│   ├── layout/             # Header, Footer, Navigation
│   └── reactbits/          # Reactbits enhanced components
├── lib/                     # Global utilities and helpers
├── docs/                    # Project documentation
│   ├── project.md          # Project requirements and MSC framework
│   ├── design-guidelines.md # Detailed design system and component guidelines
│   └── reference.md        # Project structure reference
├── public/                  # Static assets
└── package.json
```

### Key Configuration

- **Next.js**: 16.0.10 with App Router and TypeScript
- **React**: 19.2.1 with modern features
- **Styling**: Tailwind CSS v4 with custom theme system
- **Path Aliases**: `@/*` maps to root directory
- **Fonts**: Geist Sans and Geist Mono from next/font/google
- **Architecture**: Feature-based modular structure
- **Components**: shadcn/ui (installed) + Reactbits (planned)

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Design System Requirements

Based on the design guidelines, this project will implement:

### Component Libraries

- **shadcn/ui**: Base UI components (buttons, cards, forms)
- **Reactbits**: Enhanced interactive components with animations
- **Combined approach**: Hybrid components using both libraries

### Visual Features

- **Glassmorphism**: Translucent layered effects with backdrop blur
- **Parallax Scrolling**: Multi-layer depth animations (X/Y/Z axis)
- **Color Scheme**: Dark mode primary with navy blue (#213448) and orange accent (#fb923c)
- **Typography**: Playfair Display (headings), Poppins (body), Fira Code (code)

### Performance Targets

- Page load time: < 3 seconds
- Mobile PageSpeed: > 90
- SEO Score: > 85
- Animation performance: 60fps with GPU acceleration

## Development Notes

### Current State

- ✅ Next.js 16.0.10 with React 19 and TypeScript configured
- ✅ Tailwind CSS 4 installed and configured
- ✅ shadcn/ui components installed and configured
- ✅ Essential dependencies installed (Framer Motion, clsx, tailwind-merge, etc.)
- ✅ Feature-based directory structure partially implemented (features/header/ exists)
- ⏳ Design system documented but custom AI theme not yet implemented
- ⏳ Reactbits components planned but not yet installed
- ⏳ Custom glassmorphism and animation utilities to be created

### Implementation Priority

The project follows MSC (Must/Should/Can Have) framework:

**Must Have**: Hero section, About, Skills, Projects showcase, Contact, Responsive design
**Should Have**: Blog section, Project filtering, Visual elements, SEO optimization
**Can Have**: Dark mode toggle, Multi-language support, Advanced animations

### Feature-Based Implementation Guide

When implementing new features, follow this modular structure:

```
features/[feature-name]/
├── components/           # Feature-specific UI components
│   ├── FeatureMain.tsx  # Main component for the feature
│   ├── FeatureCard.tsx  # Supporting components
│   └── index.ts         # Export barrel
├── hooks/               # Custom hooks for feature logic
│   ├── useFeature.ts    # Main feature hook
│   └── useFeatureData.ts # Data fetching/state management
├── types.ts             # TypeScript types specific to feature
└── api.ts               # API calls specific to feature (if needed)
```

**Example Feature Structure:**

```
features/
├── hero/                # Hero section
│   ├── components/      # HeroSection, HeroBackground, HeroContent
│   ├── hooks/          # useParallax, useHeroAnimations
│   └── types.ts        # Hero-specific types
├── projects/           # Projects showcase
│   ├── components/     # ProjectGrid, ProjectCard, ProjectFilter
│   ├── hooks/         # useProjectFilter, useProjectAnimations
│   └── types.ts       # Project-specific types
└── contact/           # Contact section
    ├── components/    # ContactForm, ContactInfo, SocialLinks
    ├── hooks/        # useContactForm, useFormValidation
    └── types.ts      # Contact-specific types
```

## Important Considerations

### Architecture

- The project uses `app/` directory with Next.js App Router (not `src/`)
- Feature-based modular architecture for scalability and maintainability
- Each feature is self-contained with its own components, hooks, and types
- Shared components in `components/` directory for reusability

### Configuration

- TypeScript paths configured with `@/*` mapping to root directory
- Custom AI color palette defined in globals.css with CSS custom properties
- Tailwind CSS 4 uses CSS-first configuration approach (not JavaScript config)
- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/features`

### Design System

- Design guidelines emphasize technical sophistication and GitHub-inspired aesthetic
- Glassmorphism effects require careful performance optimization
- Mobile-first responsive design is mandatory with interaction adaptations
- Custom fonts: Playfair Display (headings), Poppins (body), Fira Code (code)

### Performance

- Animation performance target: 60fps with GPU acceleration
- Page load time target: < 3 seconds
- Mobile PageSpeed target: > 90
- SEO Score target: > 85

### Development Workflow

- Use feature-based development approach
- Create components in appropriate feature directories
- Share common utilities in `lib/` directory
- Follow MSC (Must/Should/Can Have) priority framework
