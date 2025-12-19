// Glassmorphism Utilities
// Utility functions and configurations for glassmorphism effects

import { cn } from '@/lib/utils';

// Glassmorphism Variant Types
export type GlassVariant = 'light' | 'medium' | 'heavy';
export type GlassSize = 'sm' | 'md' | 'lg' | 'xl';

// Base Glassmorphism Classes
export const glassVariants = {
  light: 'glass-light',
  medium: 'glass',
  heavy: 'glass-heavy',
} as const;

// Glass Size Variants
export const glassSizes = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
} as const;

// Glass Blur Variants
export const glassBlur = {
  light: 'backdrop-blur-sm',
  medium: 'backdrop-blur-md',
  heavy: 'backdrop-blur-lg',
} as const;

// Glass Background Variants
export const glassBackground = {
  light: 'bg-white/5 dark:bg-white/5',
  medium: 'bg-white/10 dark:bg-white/10',
  heavy: 'bg-white/15 dark:bg-white/15',
} as const;

// Glass Border Variants
export const glassBorder = {
  light: 'border border-white/10 dark:border-white/10',
  medium: 'border border-white/20 dark:border-white/20',
  heavy: 'border border-white/30 dark:border-white/30',
} as const;

// Glass Shadow Variants
export const glassShadow = {
  light: 'shadow-lg shadow-black/5',
  medium: 'shadow-xl shadow-black/10',
  heavy: 'shadow-2xl shadow-black/15',
} as const;

// Glassmorphism Configuration Interface
export interface GlassConfig {
  variant?: GlassVariant;
  size?: GlassSize;
  hover?: boolean;
  animated?: boolean;
  className?: string;
}

// Generate Glassmorphism Classes
export const getGlassClasses = ({
  variant = 'medium',
  size = 'md',
  hover = false,
  animated = true,
  className = '',
}: GlassConfig = {}) => {
  const baseClasses = [
    glassBackground[variant],
    glassBlur[variant],
    glassBorder[variant],
    glassShadow[variant],
    glassSizes[size],
  ];

  const interactionClasses = [];
  
  if (hover) {
    interactionClasses.push('hover-glass');
  }
  
  if (animated) {
    interactionClasses.push('transition-all duration-300 ease-out');
  }

  return cn(...baseClasses, ...interactionClasses, className);
};

// Predefined Glass Styles
export const glassStyles = {
  card: {
    variant: 'medium' as GlassVariant,
    size: 'lg' as GlassSize,
    hover: true,
    animated: true,
  },
  button: {
    variant: 'light' as GlassVariant,
    size: 'md' as GlassSize,
    hover: true,
    animated: true,
  },
  modal: {
    variant: 'heavy' as GlassVariant,
    size: 'xl' as GlassSize,
    hover: false,
    animated: true,
  },
  navigation: {
    variant: 'light' as GlassVariant,
    size: 'sm' as GlassSize,
    hover: false,
    animated: true,
  },
  hero: {
    variant: 'medium' as GlassVariant,
    size: 'xl' as GlassSize,
    hover: false,
    animated: true,
  },
} as const;

// Glass Effect CSS Properties
export const glassCSS = {
  light: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  heavy: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)',
  },
} as const;

// Dark Mode Glass CSS Properties
export const darkGlassCSS = {
  light: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  heavy: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4)',
  },
} as const;

// Utility Functions
export const createGlassStyle = (
  variant: GlassVariant = 'medium',
  isDark: boolean = false
) => {
  return isDark ? darkGlassCSS[variant] : glassCSS[variant];
};

export const getGlassVariantClass = (variant: GlassVariant) => {
  return glassVariants[variant];
};

export const combineGlassClasses = (...configs: GlassConfig[]) => {
  return configs.map(config => getGlassClasses(config)).join(' ');
};

// Glass Animation Keyframes (for CSS-in-JS)
export const glassAnimations = {
  fadeIn: {
    from: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    to: {
      opacity: 1,
      backdropFilter: 'blur(12px)',
    },
  },
  slideUp: {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
      backdropFilter: 'blur(0px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
      backdropFilter: 'blur(12px)',
    },
  },
  scaleIn: {
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
      backdropFilter: 'blur(0px)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
      backdropFilter: 'blur(12px)',
    },
  },
} as const;

// Glass Hover Effects
export const glassHoverEffects = {
  lift: 'hover:translate-y-[-2px] hover:shadow-2xl',
  glow: 'hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]',
  scale: 'hover:scale-[1.02]',
  blur: 'hover:backdrop-blur-lg',
  brighten: 'hover:bg-white/20 dark:hover:bg-white/20',
} as const;

// Responsive Glass Classes
export const responsiveGlass = {
  mobile: 'glass-light md:glass',
  tablet: 'glass md:glass-heavy',
  desktop: 'glass-light lg:glass-heavy',
} as const;

// Glass Component Presets
export const glassPresets = {
  heroCard: getGlassClasses({
    variant: 'medium',
    size: 'xl',
    hover: true,
    animated: true,
    className: 'p-8 md:p-12',
  }),
  skillCard: getGlassClasses({
    variant: 'light',
    size: 'lg',
    hover: true,
    animated: true,
    className: 'p-6',
  }),
  projectCard: getGlassClasses({
    variant: 'medium',
    size: 'lg',
    hover: true,
    animated: true,
    className: 'p-6 overflow-hidden',
  }),
  navigationBar: getGlassClasses({
    variant: 'light',
    size: 'sm',
    hover: false,
    animated: true,
    className: 'px-6 py-4',
  }),
  modal: getGlassClasses({
    variant: 'heavy',
    size: 'xl',
    hover: false,
    animated: true,
    className: 'p-8 max-w-2xl mx-auto',
  }),
  button: getGlassClasses({
    variant: 'light',
    size: 'md',
    hover: true,
    animated: true,
    className: 'px-6 py-3 font-medium',
  }),
} as const;