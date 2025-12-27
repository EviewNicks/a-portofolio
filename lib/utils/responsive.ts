/**
 * Responsive Design Utilities
 * Utilities for handling responsive breakpoints, device detection, and layout adaptations
 */

export interface Breakpoint {
  name: string;
  min: number;
  max?: number;
}

export const breakpoints: Record<string, Breakpoint> = {
  mobile: { name: 'mobile', min: 0, max: 767 },
  tablet: { name: 'tablet', min: 768, max: 1023 },
  desktop: { name: 'desktop', min: 1024 },
  wide: { name: 'wide', min: 1440 },
} as const;

export type BreakpointName = keyof typeof breakpoints;

/**
 * Get current breakpoint based on window width
 */
export function getCurrentBreakpoint(): BreakpointName {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints.wide.min) return 'wide';
  if (width >= breakpoints.desktop.min) return 'desktop';
  if (width >= breakpoints.tablet.min) return 'tablet';
  return 'mobile';
}

/**
 * Check if current viewport matches a specific breakpoint
 */
export function isBreakpoint(breakpoint: BreakpointName): boolean {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  const bp = breakpoints[breakpoint];
  
  return width >= bp.min && (bp.max ? width <= bp.max : true);
}

/**
 * Check if device is mobile based on user agent and viewport
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet'];
  const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
  const isMobileViewport = window.innerWidth < breakpoints.tablet.min;
  
  return isMobileUA || isMobileViewport;
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get device orientation
 */
export function getOrientation(): 'portrait' | 'landscape' {
  if (typeof window === 'undefined') return 'portrait';
  
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * Responsive configuration for different breakpoints
 */
export interface ResponsiveConfig<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
}

/**
 * Get responsive value based on current breakpoint
 */
export function getResponsiveValue<T>(config: ResponsiveConfig<T>, fallback: T): T {
  const currentBreakpoint = getCurrentBreakpoint();
  
  return config[currentBreakpoint as keyof ResponsiveConfig<T>] ?? config.desktop ?? config.tablet ?? config.mobile ?? fallback;
}

/**
 * Layout configurations for different sections
 */
export const layoutConfigs = {
  hero: {
    mobile: {
      columns: 1,
      spacing: 'compact',
      parallax: false,
      animations: 'minimal',
    },
    tablet: {
      columns: 1,
      spacing: 'normal',
      parallax: 'reduced',
      animations: 'normal',
    },
    desktop: {
      columns: 2,
      spacing: 'spacious',
      parallax: true,
      animations: 'full',
    },
  },
  about: {
    mobile: {
      layout: 'stacked',
      cardColumns: 1,
      statsLayout: 'vertical',
    },
    tablet: {
      layout: 'stacked',
      cardColumns: 2,
      statsLayout: 'horizontal',
    },
    desktop: {
      layout: 'side-by-side',
      cardColumns: 2,
      statsLayout: 'horizontal',
    },
  },
  skills: {
    mobile: {
      categoriesPerRow: 1,
      skillsLayout: 'list',
      progressBarSize: 'small',
    },
    tablet: {
      categoriesPerRow: 2,
      skillsLayout: 'grid',
      progressBarSize: 'medium',
    },
    desktop: {
      categoriesPerRow: 3,
      skillsLayout: 'grid',
      progressBarSize: 'large',
    },
  },
  projects: {
    mobile: {
      cardsPerRow: 1,
      filterLayout: 'dropdown',
      cardSize: 'compact',
    },
    tablet: {
      cardsPerRow: 2,
      filterLayout: 'tabs',
      cardSize: 'medium',
    },
    desktop: {
      cardsPerRow: 3,
      filterLayout: 'sidebar',
      cardSize: 'large',
    },
  },
  experience: {
    mobile: {
      timelineLayout: 'compact',
      itemsVisible: 3,
      expandable: true,
    },
    tablet: {
      timelineLayout: 'normal',
      itemsVisible: 5,
      expandable: false,
    },
    desktop: {
      timelineLayout: 'detailed',
      itemsVisible: 'all',
      expandable: false,
    },
  },
  contact: {
    mobile: {
      layout: 'stacked',
      formWidth: 'full',
      socialLayout: 'grid',
    },
    tablet: {
      layout: 'stacked',
      formWidth: 'constrained',
      socialLayout: 'row',
    },
    desktop: {
      layout: 'side-by-side',
      formWidth: 'half',
      socialLayout: 'row',
    },
  },
} as const;

/**
 * Animation configurations for different devices
 */
export const animationConfigs = {
  mobile: {
    duration: 0.2,
    easing: 'ease-out',
    parallax: false,
    stagger: 0.05,
    reducedMotion: true,
  },
  tablet: {
    duration: 0.3,
    easing: 'ease-out',
    parallax: 'reduced',
    stagger: 0.1,
    reducedMotion: false,
  },
  desktop: {
    duration: 0.4,
    easing: 'ease-out',
    parallax: true,
    stagger: 0.15,
    reducedMotion: false,
  },
} as const;

/**
 * Performance optimizations for different devices
 */
export const performanceConfigs = {
  mobile: {
    lazyLoading: true,
    imageQuality: 'medium',
    animationFrameRate: 30,
    parallaxLayers: 1,
    blurEffects: 'minimal',
  },
  tablet: {
    lazyLoading: true,
    imageQuality: 'high',
    animationFrameRate: 60,
    parallaxLayers: 2,
    blurEffects: 'normal',
  },
  desktop: {
    lazyLoading: false,
    imageQuality: 'high',
    animationFrameRate: 60,
    parallaxLayers: 3,
    blurEffects: 'full',
  },
} as const;