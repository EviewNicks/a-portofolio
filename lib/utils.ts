import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Glassmorphism utility functions
export function glassEffect(variant: 'light' | 'medium' | 'heavy' = 'medium') {
  const variants = {
    light: 'backdrop-blur-sm bg-white/10 border border-white/20',
    medium: 'backdrop-blur-md bg-white/20 border border-white/30',
    heavy: 'backdrop-blur-lg bg-white/30 border border-white/40',
  }
  return variants[variant]
}

export function glassCard(variant: 'light' | 'medium' | 'heavy' = 'medium') {
  return cn('rounded-xl shadow-xl', glassEffect(variant))
}

export function glassSurface(variant: 'light' | 'medium' | 'heavy' = 'medium') {
  return cn('backdrop-saturate-150', glassEffect(variant))
}

// Animation utility functions
export function fadeInUp(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  }
}

export function fadeInLeft(delay: number = 0) {
  return {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay },
  }
}

export function fadeInRight(delay: number = 0) {
  return {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay },
  }
}

export function scaleIn(delay: number = 0) {
  return {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, delay },
  }
}
