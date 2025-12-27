// Simplified Animation Utilities
// Centralized animation configurations for consistent motion design

import { Variants } from 'framer-motion';

// Animation Durations
export const ANIMATION_DURATION = {
  fast: 0.2,
  medium: 0.3,
  slow: 0.5,
  extra_slow: 0.8,
} as const;

// Parallax Speed Configuration
export const PARALLAX_SPEED = {
  background: 0.1,
  slow: 0.3,
  medium: 0.5,
  fast: 0.7,
  foreground: 0.9,
} as const;

// Common Animation Variants
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Stagger Animation Variants
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Hover Animation Variants
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: [0, 0, 0.2, 1],
    },
  },
};

export const hoverGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(251, 146, 60, 0)',
  },
  hover: {
    boxShadow: '0 0 20px rgba(251, 146, 60, 0.4), 0 0 40px rgba(251, 146, 60, 0.2)',
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
};

// Typing Animation for Text
export const typingContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const typingChar: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
};

// Reduced Motion Variants (for accessibility)
export const reducedMotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

// Animation Configuration Helper
export const getAnimationConfig = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      variants: reducedMotionVariants,
      transition: { duration: 0.01 },
    };
  }
  
  return {
    variants: {
      fadeInUp,
      fadeInDown,
      fadeInLeft,
      fadeInRight,
      scaleIn,
      staggerContainer,
      staggerItem,
      hoverScale,
      hoverGlow,
    },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  };
};