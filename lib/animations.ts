import { Variants } from 'framer-motion'

// Common animation variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

// Stagger animation for lists
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// Parallax animation variants
export const parallaxVariants = {
  slow: { y: [0, -50], transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' as const } },
  medium: { y: [0, -30], transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' as const } },
  fast: { y: [0, -20], transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const } }
}

// Floating animation
export const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Hover animations
export const hoverScale: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } }
}

export const hoverGlow: Variants = {
  hover: { 
    boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)',
    transition: { duration: 0.2 }
  }
}

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, x: '-100vw' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '100vw' }
}

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

// Custom animation helpers
export function createStaggerAnimation(itemCount: number, staggerDelay: number = 0.1) {
  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }
  }
}

export function createParallaxConfig(speed: number = 0.5, direction: 'up' | 'down' = 'up') {
  const yValue = direction === 'up' ? -speed * 100 : speed * 100
  return {
    y: [0, yValue],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut'
    }
  }
}