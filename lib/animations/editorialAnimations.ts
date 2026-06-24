/**
 * Editorial Animation Configurations
 * Centralized Framer Motion variants for consistent animations
 */

// Ease curves matching CSS custom properties
export const eases = {
  outExpo: [0.22, 1, 0.36, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const

// Durations (in seconds)
export const durations = {
  reveal: 0.9,
  hover: 0.18,
  nav: 0.36,
} as const

// Container variants for staggered children
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// Item variants for staggered reveal
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      ease: eases.outExpo,
    },
  },
}

// Card entrance variants
export const cardEntranceVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: eases.outExpo,
    },
  },
}

// Card hover variants
export const cardHoverVariants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: durations.hover * 1.5, // 270ms
      ease: eases.outExpo,
    },
  },
}

// Button interaction variants
export const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: durations.hover, ease: eases.outQuart },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: eases.outQuart },
  },
}

// Scale reveal variants
export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.reveal,
      ease: eases.outExpo,
    },
  },
}

// Slide variants (from left/right)
export const slideVariants = {
  left: {
    hidden: { opacity: 0, x: -36 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.reveal, ease: eases.outExpo },
    },
  },
  right: {
    hidden: { opacity: 0, x: 36 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.reveal, ease: eases.outExpo },
    },
  },
}

// Viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  amount: 0.2,
} as const

export const cardViewport = {
  once: true,
  amount: 0.3,
} as const
