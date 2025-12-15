# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Engineer Portfolio project for Ardiansyah, built with Next.js 14+ and TypeScript. The project is currently in the planning phase and aims to create a professional portfolio website showcasing AI engineering capabilities with modern design elements including parallax scrolling and glassmorphism effects.

## Architecture & Structure

### Directory Layout
```
a-portofolio/
├── app/                     # Next.js App Router (not src/)
│   ├── layout.tsx          # Root layout with Geist fonts
│   ├── page.tsx            # Home page (currently default Next.js template)
│   └── globals.css         # Global styles with Tailwind CSS v4
├── docs/                    # Project documentation
│   ├── project.md          # Project requirements and MSC framework
│   └── design-guidelines.md # Detailed design system and component guidelines
└── package.json
```

### Key Configuration
- **Next.js**: App Router with TypeScript
- **Styling**: Tailwind CSS v4 with custom theme system
- **Path Aliases**: `@/*` maps to root directory
- **Fonts**: Geist Sans and Geist Mono from next/font/google

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
- Project is in initial setup phase with default Next.js template
- Design system is well-documented but not yet implemented
- Component libraries (shadcn/ui, Reactbits) are planned but not installed

### Implementation Priority
The project follows MSC (Must/Should/Can Have) framework:

**Must Have**: Hero section, About, Skills, Projects showcase, Contact, Responsive design
**Should Have**: Blog section, Project filtering, Visual elements, SEO optimization
**Can Have**: Dark mode toggle, Multi-language support, Advanced animations

### File Structure Planning
When implementing features, follow the planned structure:
```
app/
├── about/
├── projects/
├── blog/
├── contact/
components/
├── ui/                    # shadcn/ui base components
├── reactbits/             # Reactbits enhanced components
├── sections/             # Page sections (Hero, Projects, etc.)
├── common/               # Reusable hybrid components
└── layout/               # Header, Footer, Navigation
```

## Important Considerations

- The project uses `app/` directory, not `src/` (confirmed by examining file structure)
- Custom color palette is defined in globals.css with CSS custom properties
- TypeScript paths are configured with `@/*` mapping to root
- Design guidelines emphasize technical sophistication and GitHub-inspired aesthetic
- Glassmorphism effects require careful performance optimization
- Mobile-first responsive design is mandatory with interaction adaptations