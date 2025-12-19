// Export all hooks from a single entry point
export { useTheme } from './useTheme'
export { useParallax, useScrollParallax, useMouseParallax } from './useParallax'
export { useIntersectionObserver, useMultipleIntersectionObserver } from './useIntersectionObserver'
export { useNavigation } from './useNavigation'
export { useKeyboardNavigation } from './useKeyboardNavigation'

export type { Theme } from './useTheme'
export type { ParallaxOptions } from './useParallax'
export type { UseIntersectionObserverOptions } from './useIntersectionObserver'
export type { NavigationItem, UseNavigationOptions } from './useNavigation'
export type { UseKeyboardNavigationOptions } from './useKeyboardNavigation'