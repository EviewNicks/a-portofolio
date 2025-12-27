// Main Library Exports
// Centralized exports for all library utilities and types

// Types
export * from './types/portfolio';

// Utilities
export * from './utils/animations';
export * from './utils/glassmorphism';
export { cn } from './utils';

// Hooks (re-export existing hooks)
export { useIntersectionObserver } from './hooks/useIntersectionObserver';
export { useParallax } from './hooks/useParallax';
export { useTheme } from './hooks/useTheme';