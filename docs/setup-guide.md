# AI Engineer Portfolio - Development Environment Setup Guide

## 🚀 Quick Start Guide

Based on analysis of your current project structure, you already have a Next.js 16.0.10 project with React 19 and Tailwind CSS 4. This guide will help you set up the complete development environment according to your design guidelines.

---

## 📋 Prerequisites

### Required Software

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher (or yarn v1.22.0+)
- **Git**: v2.30.0 or higher
- **VS Code** (recommended) with extensions

### VS Code Extensions (Recommended)

```bash
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension formulahendry.auto-rename-tag
code --install-extensionchristian-kohler.path-intellisense
```

---

## 🔧 Current Project Analysis

**✅ Already Installed:**

- Next.js 16.0.10 ✅
- React 19.2.1 ✅
- Tailwind CSS 4 ✅
- TypeScript 5 ✅
- ESLint 9 ✅

**📦 Additional Dependencies Needed:**

- shadcn/ui components
- Framer Motion (animations)
- Lucide React (icons)
- Additional UI libraries

---

## 📦 Step-by-Step Setup Instructions

### Step 1: Install shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Answer the prompts:
# ? Would you like to use TypeScript? → Yes
# ? Which style would you like to use? → Default
# ? Which color would you like to use as base color? → Slate
# ? Where is your global CSS file? → app/globals.css
# ? Would you like to use CSS variables for colors? → Yes
# ? Are you using a custom tailwind prefix? → None
# ? Where is your tailwind.config.js located? → tailwind.config.js
# ? Configure the import alias for components? → src/components
# ? Configure the import alias for utils? → src/lib/utils
```

### Step 2: Install Required Components

```bash
# Install essential shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add tooltip
npx shadcn@latest add progress
npx shadcn@latest add switch
npx shadcn@latest add select
```

### Step 3: Install Animation & Icon Libraries

```bash
# Install Framer Motion for animations
npm install framer-motion

# Install Lucide React for icons
npm install lucide-react

# Install additional utility libraries
npm install clsx
npm install tailwind-merge
npm install class-variance-authority
npm install @radix-ui/react-slot
```

### Step 4: Install Font Packages

```bash
# Install Google Fonts
npm install @next/font

# Or use next/font (built-in with Next.js 13+)
# No additional installation needed
```

### Step 5: Development Tools Setup

```bash
# Install Prettier for code formatting
npm install --save-dev prettier prettier-plugin-tailwindcss

# Install Husky for git hooks (optional)
npm install --save-dev husky lint-staged

# Install development dependencies
npm install --save-dev @types/node@latest
```

---

## ⚙️ Configuration Files

### 1. Update tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom AI Portfolio Colors
        "ai-dark": "#213448",
        "ai-light": "#EAE0CF",
        "ai-orange": "#fb923c",
        "ai-navy": "#1a2938",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "parallax-slow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50px)" },
        },
        "parallax-medium": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100px)" },
        },
        "parallax-fast": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-200px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "parallax-slow": "parallax-slow 10s linear infinite",
        "parallax-medium": "parallax-medium 8s linear infinite",
        "parallax-fast": "parallax-fast 6s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### 2. Create .prettierrc

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 3. Create components.json (if not created by shadcn)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 📁 Project Structure Setup

### Create Required Directories

```bash
# Create the complete folder structure
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/lib
mkdir -p src/data
mkdir -p src/styles
mkdir -p public/images
mkdir -p public/assets
mkdir -p hooks
mkdir -p types
mkdir -p utils
```

### Create Utility Files

#### src/lib/utils.ts

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Glassmorphism utility
export const glassStyles = {
  light: "bg-white/5 backdrop-blur-sm border-white/10",
  medium: "bg-white/10 backdrop-blur-md border-white/20",
  heavy: "bg-white/15 backdrop-blur-lg border-white/30",
};

// Animation utility
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  },
};
```

---

## 🎨 Theme Setup

### Update app/globals.css

```css
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 234 224 207;
    --foreground: 26 41 56;
    --card: 255 255 255;
    --card-foreground: 26 41 56;
    --popover: 255 255 255;
    --popover-foreground: 26 41 56;
    --primary: 251 146 60;
    --primary-foreground: 255 255 255;
    --secondary: 33 52 72;
    --secondary-foreground: 255 255 255;
    --muted: 148 163 184;
    --muted-foreground: 71 85 105;
    --accent: 245 158 11;
    --accent-foreground: 255 255 255;
    --destructive: 239 68 68;
    --destructive-foreground: 255 255 255;
    --border: 226 232 240;
    --input: 226 232 240;
    --ring: 251 146 60;
    --radius: 0.75rem;
  }

  .dark {
    --background: 33 52 72;
    --foreground: 255 255 255;
    --card: 26 41 56;
    --card-foreground: 255 255 255;
    --popover: 26 41 56;
    --popover-foreground: 255 255 255;
    --primary: 251 146 60;
    --primary-foreground: 255 255 255;
    --secondary: 234 224 207;
    --secondary-foreground: 26 41 56;
    --muted: 148 163 184;
    --muted-foreground: 148 163 184;
    --accent: 245 158 11;
    --accent-foreground: 255 255 255;
    --destructive: 239 68 68;
    --destructive-foreground: 255 255 255;
    --border: 51 65 85;
    --input: 51 65 85;
    --ring: 251 146 60;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-body;
  }
}

/* Custom Glassmorphism Styles */
.glass {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl;
}

.glass-light {
  @apply bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl;
}

.glass-heavy {
  @apply bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl;
}

/* Custom Animation Classes */
.parallax-slow {
  will-change: transform;
}

.parallax-medium {
  will-change: transform;
}

.parallax-fast {
  will-change: transform;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

/* Focus Styles */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background;
}
```

---

## 🚀 Development Commands

### Start Development Server

```bash
# Start the development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npx prettier --write .

# Type checking
npx tsc --noEmit
```

---

## 📱 Environment Setup

### Create .env.local

```env
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=dark

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Contact Form (Optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🔧 Git Configuration

### Create .gitignore Updates

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
.next/
out/
dist/
build/

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Setup Git Hooks (Optional)

```bash
# Initialize Husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Add pre-push hook
npx husky add .husky/pre-push "npm run lint && npm run build"
```

---

## ✅ Verification Checklist

After completing the setup, verify everything is working:

### Development Environment

- [ ] Next.js development server starts without errors
- [ ] TypeScript compilation succeeds
- [ ] Tailwind CSS classes are working
- [ ] shadcn/ui components are importable
- [ ] Framer Motion is working

### Theme System

- [ ] Dark/light mode toggle works
- [ ] Custom colors are applied correctly
- [ ] Glassmorphism effects are visible

### Build Process

- [ ] Production build succeeds
- [ ] No TypeScript errors
- [ ] All assets are optimized

### Code Quality

- [ ] ESLint runs without errors
- [ ] Prettier formatting works
- [ ] Git hooks are functioning (if installed)

---

## 🚨 Common Issues & Solutions

### Issue: shadcn/ui components not found

```bash
# Re-initialize shadcn/ui
npx shadcn@latest init
```

### Issue: Tailwind classes not working

```bash
# Restart development server
npm run dev
```

### Issue: TypeScript errors

```bash
# Update tsconfig.json paths
npm install --save-dev @types/node@latest
```

### Issue: Glassmorphism not visible

```css
/* Ensure backdrop-blur is supported */
.glass {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
```

---

## 📚 Next Steps

After successful setup:

1. **Create Layout Components** (Header, Footer, Navigation)
2. **Build Section Components** (Hero, About, Projects, Skills)
3. **Implement Parallax System** with Intersection Observer
4. **Add Glassmorphism Effects** and animations
5. **Setup Dark/Light Mode** with theme persistence
6. **Optimize Performance** and SEO

---

_Setup Guide Version: 1.0_
_Last Updated: 15 December 2024_
_Based on Next.js 16.0.10 and Modern Web Stack_
