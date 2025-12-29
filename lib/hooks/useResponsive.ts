/**
 * Responsive Design Hook
 * React hook for handling responsive breakpoints and device detection
 */

import { useState, useEffect } from 'react';
import {
  getCurrentBreakpoint,
  isBreakpoint,
  isTouchDevice,
  getOrientation,
  getResponsiveValue,
  type BreakpointName,
  type ResponsiveConfig,
} from '@/lib/utils/responsive';

export interface UseResponsiveReturn {
  breakpoint: BreakpointName;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  isTouchDevice: boolean;
  orientation: 'portrait' | 'landscape';
  getResponsiveValue: <T>(config: ResponsiveConfig<T>, fallback: T) => T;
}

/**
 * Hook for responsive design utilities
 */
export function useResponsive(): UseResponsiveReturn {
  const [breakpoint, setBreakpoint] = useState<BreakpointName>('desktop');
  const [isTouch, setIsTouch] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    const updateResponsiveState = () => {
      setBreakpoint(getCurrentBreakpoint());
      setIsTouch(isTouchDevice());
      setOrientation(getOrientation());
    };

    // Initial update
    updateResponsiveState();

    // Listen for resize events
    const handleResize = () => {
      updateResponsiveState();
    };

    // Listen for orientation changes
    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(updateResponsiveState, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return {
    breakpoint,
    isMobile: isBreakpoint('mobile'),
    isTablet: isBreakpoint('tablet'),
    isDesktop: isBreakpoint('desktop') || isBreakpoint('wide'),
    isWide: isBreakpoint('wide'),
    isTouchDevice: isTouch,
    orientation,
    getResponsiveValue,
  };
}

/**
 * Hook for responsive values that change based on breakpoint
 */
export function useResponsiveValue<T>(
  config: ResponsiveConfig<T>,
  fallback: T
): T {
  const { getResponsiveValue: getValue } = useResponsive();
  return getValue(config, fallback);
}

/**
 * Hook for media query matching
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Hook for viewport dimensions
 */
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial update
    updateViewport();

    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
}