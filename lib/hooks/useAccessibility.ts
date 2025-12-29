/**
 * Accessibility Hooks
 * React hooks for accessibility features and user preferences
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  prefersReducedMotion,
  prefersHighContrast,
  prefersDarkTheme,
  FocusManager,
  AriaManager,
  KeyboardManager,
  MotionManager,
} from '@/lib/utils/accessibility';

/**
 * Hook for user accessibility preferences
 */
export function useAccessibilityPreferences() {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    darkTheme: false,
  });

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    const updatePreferences = () => {
      setPreferences({
        reducedMotion: prefersReducedMotion(),
        highContrast: prefersHighContrast(),
        darkTheme: prefersDarkTheme(),
      });
    };

    // Initial update
    updatePreferences();

    // Listen for preference changes
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
    ];

    const handleChange = () => updatePreferences();

    mediaQueries.forEach(mq => {
      mq.addEventListener('change', handleChange);
    });

    return () => {
      mediaQueries.forEach(mq => {
        mq.removeEventListener('change', handleChange);
      });
    };
  }, [])

  return preferences;
}

/**
 * Hook for focus management
 */
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement | null>(null);

  const setFocus = useCallback((element: HTMLElement | null, delay = 0) => {
    if (element) {
      FocusManager.setFocus(element, delay);
      focusRef.current = element;
    }
  }, []);

  const trapFocus = useCallback((container: HTMLElement) => {
    return FocusManager.trapFocus(container);
  }, []);

  const getFocusableElements = useCallback((container: HTMLElement) => {
    return FocusManager.getFocusableElements(container);
  }, []);

  return {
    focusRef,
    setFocus,
    trapFocus,
    getFocusableElements,
  };
}

/**
 * Hook for keyboard navigation
 */
export function useKeyboardNavigation<T extends HTMLElement = HTMLElement>(
  items: T[],
  options: {
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical' | 'both';
    onActivate?: (index: number, item: T) => void;
    onEscape?: () => void;
  } = {}
) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { loop = true, orientation = 'both', onActivate, onEscape } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' ', 'Escape'];
    
    if (!validKeys.includes(event.key)) return;

    // Handle escape
    if (event.key === 'Escape' && onEscape) {
      KeyboardManager.handleEscape(event, onEscape);
      return;
    }

    // Handle activation
    if ((event.key === 'Enter' || event.key === ' ') && currentIndex >= 0 && onActivate) {
      KeyboardManager.handleActivation(event, () => {
        onActivate(currentIndex, items[currentIndex]);
      });
      return;
    }

    // Handle arrow navigation
    const isVertical = orientation === 'vertical' || orientation === 'both';
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        if (!isVertical) return;
        event.preventDefault();
        newIndex = loop 
          ? (currentIndex + 1) % items.length 
          : Math.min(currentIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
        if (!isVertical) return;
        event.preventDefault();
        newIndex = loop
          ? currentIndex <= 0 ? items.length - 1 : currentIndex - 1
          : Math.max(currentIndex - 1, 0);
        break;
      case 'ArrowRight':
        if (!isHorizontal) return;
        event.preventDefault();
        newIndex = loop
          ? (currentIndex + 1) % items.length
          : Math.min(currentIndex + 1, items.length - 1);
        break;
      case 'ArrowLeft':
        if (!isHorizontal) return;
        event.preventDefault();
        newIndex = loop
          ? currentIndex <= 0 ? items.length - 1 : currentIndex - 1
          : Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
      setCurrentIndex(newIndex);
      items[newIndex]?.focus();
    }
  }, [currentIndex, items, loop, orientation, onActivate, onEscape]);

  useEffect(() => {
    // SSR guard
    if (typeof document === 'undefined') return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    currentIndex,
    setCurrentIndex,
    handleKeyDown,
  };
}

/**
 * Hook for ARIA live announcements
 */
export function useAnnouncements() {
  const announce = useCallback((
    message: string,
    politeness: 'polite' | 'assertive' = 'polite'
  ) => {
    AriaManager.announce(message, politeness);
  }, []);

  return { announce };
}

/**
 * Hook for motion-safe animations
 */
export function useMotionSafe() {
  const { reducedMotion } = useAccessibilityPreferences();

  const createSafeAnimation = useCallback((
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ) => {
    return MotionManager.createSafeAnimation(element, keyframes, options);
  }, []);

  const getAnimationConfig = useCallback((defaultConfig: {
    duration: number;
    easing: string;
    delay?: number;
  }) => {
    return MotionManager.getAnimationConfig(defaultConfig);
  }, []);

  return {
    reducedMotion,
    createSafeAnimation,
    getAnimationConfig,
  };
}

/**
 * Hook for focus visible management
 */
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    const handleFocus = () => {
      setIsFocusVisible(isKeyboardUser);
    };

    const handleBlur = () => {
      setIsFocusVisible(false);
    };

    // SSR guard
    if (typeof document === 'undefined') return;

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, [isKeyboardUser]);

  return {
    isFocusVisible,
    isKeyboardUser,
  };
}

/**
 * Hook for skip links
 */
export function useSkipLinks(links: Array<{ id: string; label: string }>) {
  const skipToContent = useCallback((targetId: string) => {
    if (typeof document === 'undefined') return;
    
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const skipLinkProps = useCallback((targetId: string) => ({
    href: `#${targetId}`,
    onClick: (event: React.MouseEvent) => {
      event.preventDefault();
      skipToContent(targetId);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        skipToContent(targetId);
      }
    },
  }), [skipToContent]);

  return {
    skipToContent,
    skipLinkProps,
    links,
  };
}