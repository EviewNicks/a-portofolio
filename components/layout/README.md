# Navigation and Scrolling System

This directory contains the complete navigation and scrolling system for the AI Engineer Portfolio, providing smooth navigation, keyboard shortcuts, and enhanced user experience.

## Components

### Navigation
Main navigation bar with smooth scrolling, active section tracking, and mobile menu support.

**Features:**
- Fixed navigation bar with glassmorphism effects
- Active section highlighting
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- URL hash support
- Brand logo with scroll-to-top functionality

### ScrollIndicator
Progress bar showing scroll position through the page.

**Features:**
- Fixed top position
- Gradient progress bar
- Real-time scroll tracking
- Smooth animations

### ScrollToTop
Floating button to quickly return to the top of the page.

**Features:**
- Appears after scrolling down 300px
- Smooth scroll animation
- Glassmorphism styling
- Fade in/out animations

### SectionIndicator
Side navigation dots showing current section and allowing quick navigation.

**Features:**
- Fixed right-side position (desktop only)
- Visual indicators for each section
- Hover tooltips with section names
- Click to navigate functionality

### KeyboardShortcuts
Keyboard navigation support with help modal.

**Features:**
- Arrow keys / Vim-style navigation (j/k)
- Home/End key support
- Help modal with '?' key
- Escape key for closing menus
- Input field detection to avoid conflicts

### PortfolioLayout
Main layout wrapper that orchestrates all navigation components.

**Features:**
- Integrates all navigation components
- Manages navigation state
- Provides keyboard navigation
- Handles section tracking

## Hooks

### useNavigation
Core navigation hook for managing active sections and smooth scrolling.

**Features:**
- Active section detection based on scroll position
- Smooth scroll to sections with offset
- URL hash navigation support
- Configurable threshold and offset

### useKeyboardNavigation
Keyboard navigation support for accessibility and power users.

**Features:**
- Arrow key navigation between sections
- Vim-style j/k navigation
- Home/End key support
- Input field detection
- Configurable enable/disable

## Utilities

### smoothScroll.ts
Advanced smooth scrolling utilities with easing functions.

**Features:**
- Multiple easing functions
- Promise-based API
- Element and position targeting
- Viewport detection utilities
- Debounce and throttle helpers

## Usage

### Basic Setup
```tsx
import { PortfolioLayout } from '@/components/layout';

export default function Page() {
  return (
    <PortfolioLayout>
      <section id="hero">Hero Content</section>
      <section id="about">About Content</section>
      {/* More sections */}
    </PortfolioLayout>
  );
}
```

### Custom Navigation
```tsx
import { useNavigation } from '@/lib/hooks';

const sections = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
];

function CustomNav() {
  const { activeSection, scrollToSection } = useNavigation(sections);
  
  return (
    <nav>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.href)}
          className={activeSection === section.id ? 'active' : ''}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
```

### Keyboard Navigation
```tsx
import { useKeyboardNavigation } from '@/lib/hooks';

function MyComponent() {
  useKeyboardNavigation({
    sections: navigationItems,
    onNavigate: scrollToSection,
    activeSection,
    enabled: true,
  });
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↑` / `K` | Navigate to previous section |
| `↓` / `J` | Navigate to next section |
| `Home` | Go to top of page |
| `End` | Go to bottom of page |
| `Esc` | Close menus / blur focus |
| `?` | Show/hide keyboard shortcuts help |

## Accessibility

The navigation system includes comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support for all navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Maintains proper contrast ratios

## Responsive Design

The navigation system adapts to different screen sizes:

- **Desktop**: Full navigation bar with side indicators
- **Tablet**: Simplified navigation with reduced parallax
- **Mobile**: Hamburger menu with touch-optimized controls

## Performance

The system is optimized for performance:

- **Passive Event Listeners**: Scroll events use passive listeners
- **Throttled Updates**: Scroll position updates are throttled
- **Intersection Observer**: Efficient section detection
- **GPU Acceleration**: Smooth animations using transform properties

## Configuration

The navigation system can be configured through:

- **Navigation Items**: Customize sections and labels
- **Scroll Options**: Adjust offset, threshold, and easing
- **Keyboard Options**: Enable/disable keyboard navigation
- **Animation Options**: Customize animation duration and easing