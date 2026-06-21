# Design System Documentation

## Overview

Design system portfolio ini menggunakan pendekatan AI-themed yang menggabungkan elemen modern dengan estetika yang hangat dan profesional. System ini dibangun di atas **shadcn/ui** dengan customisasi khusus untuk menciptakan identitas visual yang unik.

---

## 🎨 Color Palette

### Primary Colors

#### Light Mode
- **Background**: `#EAE0CF` (Warm Beige) - Warna dasar yang menciptakan suasana hangat
- **Foreground**: `#1a2938` (Deep Navy) - Teks utama untuk kontras optimal
- **Primary**: `#ea580c` (Orange-600) - Aksen utama untuk CTA dan elemen interaktif
- **Accent**: `#d97706` (Amber-600) - Aksen sekunder untuk variasi visual

#### Dark Mode
- **Background**: `#213448` (Deep Navy Blue) - Base yang elegan dan modern
- **Foreground**: `#ffffff` (White) - Teks yang jelas dan mudah dibaca
- **Primary**: `#fb923c` (Orange-400) - Aksen yang lebih terang untuk dark mode
- **Accent**: `#f59e0b` (Amber-500) - Aksen sekunder yang harmonis

### AI Theme Colors

Custom color palette yang spesifik untuk tema AI:

```css
/* Light Mode */
--ai-orange: #ea580c
--ai-amber: #d97706
--ai-navy: #1a2938
--ai-beige: #EAE0CF
--ai-success: #059669
--ai-warning: #ca8a04

/* Dark Mode */
--ai-orange: #fb923c
--ai-amber: #f59e0b
--ai-navy: #213448
--ai-success: #10b981
--ai-warning: #eab308
```

### Semantic Colors

- **Card**: Background untuk card components
- **Muted**: Untuk teks sekunder dan background subtle
- **Border**: Warna border yang konsisten
- **Destructive**: Untuk aksi destructive (hapus, error, dll)

---

## 📝 Typography

### Font Families

Portfolio menggunakan 3 font families utama:

1. **Display Font** - `Playfair Display` (serif)
   - Digunakan untuk: Headlines, titles, hero headings
   - Karakteristik: Elegant, editorial, premium feel
   - Weights: 400-900 (normal & italic)
   - CSS Variable: `--font-display`

2. **Body Font** - `Poppins` (sans-serif)
   - Digunakan untuk: Body text, descriptions, UI elements
   - Karakteristik: Clean, modern, highly readable
   - Weights: 100-900 (normal & italic)
   - CSS Variable: `--font-body`

3. **Code Font** - `Fira Code` (monospace)
   - Digunakan untuk: Code snippets, technical labels, badges
   - Karakteristik: Developer-friendly, clear distinction
   - Weights: 300-700
   - CSS Variable: `--font-code`

### Typography Scale

Menggunakan responsive typography dengan breakpoints:

```css
/* Base sizes */
text-responsive-xs: 0.75rem → 0.75rem
text-responsive-sm: 0.875rem → 0.875rem
text-responsive-base: 1rem → 1rem
text-responsive-lg: 1.125rem → 1.25rem → 1.875rem
text-responsive-xl: 1.25rem → 1.5rem → 1.875rem
text-responsive-2xl: 1.5rem → 1.875rem → 2.25rem
text-responsive-3xl: 1.875rem → 2.25rem → 3rem
text-responsive-4xl: 2.25rem → 3rem → 3.75rem
```

### Typography Usage

```tsx
// Display heading (Hero, Page titles)
<h1 className="font-display text-4xl md:text-5xl lg:text-7xl">

// Section heading
<h2 className="font-display text-3xl md:text-4xl lg:text-5xl">

// Body text
<p className="font-body text-base md:text-lg">

// Technical labels
<span className="font-code text-xs tracking-wider uppercase">
```

---

## 🎭 Design Patterns

### Glassmorphism

Salah satu signature design pattern portfolio ini:

#### Utility Classes:

1. **`.glass-light`** - Subtle transparency
   ```css
   background: rgba(33, 52, 72, 0.05)
   backdrop-filter: blur(8px)
   border: 1px solid rgba(33, 52, 72, 0.2)
   border-radius: 12px
   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05)
   ```

2. **`.glass`** - Medium transparency
   ```css
   background: rgba(33, 52, 72, 0.1)
   backdrop-filter: blur(12px)
   border: 1px solid rgba(33, 52, 72, 0.2)
   border-radius: 16px
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
   ```

3. **`.glass-heavy`** - Strong effect
   ```css
   background: rgba(33, 52, 72, 0.15)
   backdrop-filter: blur(16px)
   border: 1px solid rgba(33, 52, 72, 0.2)
   border-radius: 20px
   box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15)
   ```

4. **`.glass-card`** - Specialized for project cards
   - Light mode: `rgba(255, 255, 255, 0.65)` with high contrast
   - Dark mode: `rgba(255, 255, 255, 0.05)` with subtle effect

#### Usage Example:
```tsx
<div className="glass-card p-6 rounded-lg">
  <h3>Project Title</h3>
  <p>Description...</p>
</div>
```

### Editorial Magazine Style

Inspired by print design dengan karakteristik:

- Asymmetric grid layouts (60-40 split)
- Mixed typography (regular + italic + bold dalam satu heading)
- Numbered navigation system
- Feature badges instead of bullet lists
- Collage-inspired visual compositions
- Print-inspired subtle animations

### Animated Gradients

Background gradient yang animated untuk visual interest:

```css
.projects-bg-gradient {
  background: linear-gradient(135deg, 
    #EAE0CF 0%, #f5f1e8 35%, 
    #e8d9c0 65%, #EAE0CF 100%);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}
```

---

## 🎬 Animations

### Custom Keyframes

1. **Float Animation** - Subtle floating effect
   ```css
   @keyframes float {
     0%, 100% { transform: translateY(0px); }
     50% { transform: translateY(-10px); }
   }
   ```
   Usage: `.animate-float`

2. **Glow Animation** - Pulsing glow effect
   ```css
   @keyframes glow {
     0% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
     100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.8); }
   }
   ```
   Usage: `.animate-glow` atau `.hover-glow:hover`

3. **Parallax Animations** - Staggered reveal effects
   ```css
   animate-parallax-slow: 0.5s ease-out
   animate-parallax-medium: 0.3s ease-out
   animate-parallax-fast: 0.1s ease-out
   ```

4. **Gradient Shift** - Background gradient animation
   ```css
   @keyframes gradientShift {
     0% { background-position: 0% 50%; }
     50% { background-position: 100% 50%; }
     100% { background-position: 0% 50%; }
   }
   ```

### Framer Motion Integration

Menggunakan Framer Motion untuk page transitions dan component animations:

```tsx
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}
```

---

## 🧩 Component Patterns

### Button Component

Menggunakan **class-variance-authority** (CVA) untuk variant management:

#### Variants:
- `default` - Primary button dengan `bg-primary`
- `destructive` - Untuk aksi berbahaya
- `outline` - Bordered button untuk secondary actions
- `secondary` - Alternative style
- `ghost` - Minimal style
- `link` - Text link style

#### Sizes:
- `sm` - h-8, compact
- `default` - h-9, standard
- `lg` - h-10, prominent
- `icon` / `icon-sm` / `icon-lg` - Square buttons

#### Usage:
```tsx
<Button variant="default" size="lg">
  Primary Action
</Button>

<Button variant="outline" size="default">
  Secondary Action
</Button>
```

### Badge Component

Untuk menampilkan status, kategori, atau labels:

```tsx
// Technical badge dengan dot indicator
<div className="flex items-center gap-2 rounded-full border px-4 py-2">
  <div className="h-2 w-2 rounded-full bg-primary" />
  <span className="font-code text-xs tracking-wide uppercase">
    AI Engineering
  </span>
</div>
```

### Card Patterns

Standard card structure:

```tsx
<div className="glass-card rounded-lg overflow-hidden">
  {/* Card Header */}
  <div className="p-6 border-b border-border">
    <h3 className="font-display text-xl">Card Title</h3>
  </div>
  
  {/* Card Content */}
  <div className="p-6">
    <p className="font-body text-muted-foreground">
      Card content...
    </p>
  </div>
  
  {/* Card Footer (optional) */}
  <div className="p-6 border-t border-border">
    <Button>Action</Button>
  </div>
</div>
```

---

## 📐 Spacing System

### Border Radius

Custom radius scale dengan variable `--radius: 0.625rem` (10px):

```css
--radius-sm: calc(var(--radius) - 4px)    /* 6px */
--radius-md: calc(var(--radius) - 2px)    /* 8px */
--radius-lg: var(--radius)                /* 10px */
--radius-xl: calc(var(--radius) + 4px)    /* 14px */
--radius-2xl: calc(var(--radius) + 8px)   /* 18px */
--radius-3xl: calc(var(--radius) + 12px)  /* 22px */
--radius-4xl: calc(var(--radius) + 16px)  /* 26px */
```

### Responsive Spacing

Menggunakan utility classes untuk spacing yang adaptive:

```css
.space-responsive-sm: 1rem → 1rem
.space-responsive-md: 1.5rem → 2rem
.space-responsive-lg: 2rem → 3rem → 4rem
.space-responsive-xl: 3rem → 4rem → 6rem
```

### Container System

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  {/* Content dengan responsive padding */}
</div>
```

---

## ♿ Accessibility Features

### Screen Reader Support

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Focus Management

```css
.focus-visible {
  outline: 2px solid var(--ai-orange);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Touch-Friendly Elements

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  .glass, .glass-light, .glass-heavy {
    background: var(--background);
    border: 2px solid var(--border);
    backdrop-filter: none;
  }
}
```

---

## 🎯 Design Principles

1. **Consistency First**
   - Gunakan design tokens (CSS variables) untuk consistency
   - Follow spacing system yang sudah ada
   - Maintain typography hierarchy

2. **Progressive Enhancement**
   - Base experience tanpa JavaScript
   - Enhanced dengan animations dan interactions
   - Graceful degradation untuk older browsers

3. **Mobile-First Approach**
   - Design untuk mobile terlebih dahulu
   - Scale up untuk larger screens
   - Touch-friendly interfaces

4. **Performance Conscious**
   - Lazy load images
   - Optimize animations (use `transform` dan `opacity`)
   - Minimize layout shifts

5. **Accessibility by Default**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support
   - Screen reader friendly

---

## 🔧 Implementation Guidelines

### Using Design Tokens

Selalu gunakan CSS variables untuk colors:

```tsx
// ❌ Avoid hardcoded colors
<div className="bg-[#ea580c]">

// ✅ Use design tokens
<div className="bg-primary">
<div className="bg-ai-orange">
```

### Typography Hierarchy

```tsx
// Page Title
<h1 className="font-display text-responsive-4xl font-bold">

// Section Heading
<h2 className="font-display text-responsive-3xl font-semibold">

// Subsection
<h3 className="font-display text-responsive-2xl">

// Body Text
<p className="font-body text-responsive-base text-muted-foreground">

// Small Print
<span className="font-body text-responsive-sm text-muted-foreground">

// Technical Label
<code className="font-code text-responsive-xs uppercase tracking-wider">
```

### Responsive Patterns

```tsx
// Mobile-first approach
<div className="
  p-4              {/* mobile: 16px padding */}
  md:p-6           {/* tablet: 24px padding */}
  lg:p-8           {/* desktop: 32px padding */}
  
  grid 
  grid-cols-1      {/* mobile: 1 column */}
  md:grid-cols-2   {/* tablet: 2 columns */}
  lg:grid-cols-3   {/* desktop: 3 columns */}
  
  gap-4            {/* mobile: 16px gap */}
  md:gap-6         {/* tablet: 24px gap */}
  lg:gap-8         {/* desktop: 32px gap */}
">
```

### Animations Best Practices

```tsx
// Framer Motion dengan variants
<motion.div
  variants={containerVariants}
  initial="initial"
  animate="animate"
  className="..."
>
  <motion.div variants={itemVariants}>
    {/* Animated children */}
  </motion.div>
</motion.div>

// CSS animations untuk simple cases
<div className="animate-float hover-glow">
```

---

## 📦 Component Checklist

Saat membuat component baru, pastikan:

- [ ] Menggunakan design tokens untuk colors
- [ ] Follow typography scale
- [ ] Responsive di semua breakpoints
- [ ] Support dark mode
- [ ] Accessible (keyboard, screen reader)
- [ ] Consistent spacing
- [ ] Loading states (jika applicable)
- [ ] Error states (jika applicable)
- [ ] Hover/focus states
- [ ] Proper TypeScript types

---

## 🎨 Visual Identity

### Editorial Magazine Aesthetic

- Asymmetric layouts untuk visual interest
- Mixed typography dalam headlines
- Numbered navigation systems
- Badge-based categorization
- Collage-inspired compositions

### Glassmorphism & Depth

- Layer information dengan transparency
- Backdrop blur untuk visual depth
- Subtle shadows untuk elevation
- Border highlights untuk definition

### Warm Professional Tone

- Beige base untuk approachability
- Navy untuk professionalism
- Orange accents untuk energy
- Smooth animations untuk polish

---

## 📚 Resources

### CSS Variables Location
- **Global styles**: `app/globals.css`
- **Theme definitions**: CSS `:root` dan `.dark` selectors

### Component Library
- **Base**: shadcn/ui components
- **Custom**: Extended dengan AI theme customizations

### Key Dependencies
- Tailwind CSS 4.0
- Framer Motion
- Radix UI Primitives
- class-variance-authority (CVA)

---

## 🚀 Getting Started

### Quick Start Template

```tsx
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export const NewComponent = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Glassmorphic Card */}
        <motion.div 
          className="glass-card p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Display Heading */}
          <h2 className="font-display text-responsive-3xl font-bold mb-4">
            Component Title
          </h2>
          
          {/* Body Text */}
          <p className="font-body text-responsive-base text-muted-foreground mb-6">
            Component description with proper typography.
          </p>
          
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 inline-flex mb-6">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-code text-xs tracking-wide uppercase">
              Category
            </span>
          </div>
          
          {/* CTA */}
          <Button variant="default" size="lg">
            Primary Action
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```

---

**Last Updated**: June 2026
**Version**: 1.0
**Maintainer**: Design System Team
