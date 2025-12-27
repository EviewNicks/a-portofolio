/**
 * Accessibility Utilities
 * Utilities for keyboard navigation, ARIA labels, focus management, and accessibility compliance
 */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Check if user prefers dark theme
 */
export function prefersDarkTheme(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors));
  }

  /**
   * Trap focus within a container
   */
  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Focus first element
    firstElement?.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * Set focus to element with optional delay
   */
  static setFocus(element: HTMLElement, delay = 0): void {
    if (delay > 0) {
      setTimeout(() => element.focus(), delay);
    } else {
      element.focus();
    }
  }

  /**
   * Create visible focus indicator
   */
  static createFocusIndicator(element: HTMLElement): void {
    element.style.outline = '2px solid var(--ai-orange)';
    element.style.outlineOffset = '2px';
    element.style.borderRadius = '4px';
  }

  /**
   * Remove focus indicator
   */
  static removeFocusIndicator(element: HTMLElement): void {
    element.style.outline = '';
    element.style.outlineOffset = '';
  }
}

/**
 * ARIA utilities
 */
export class AriaManager {
  /**
   * Set ARIA attributes for an element
   */
  static setAttributes(element: HTMLElement, attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  /**
   * Create ARIA live region for announcements
   */
  static createLiveRegion(politeness: 'polite' | 'assertive' = 'polite'): HTMLElement {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  /**
   * Announce message to screen readers
   */
  static announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
    const liveRegion = this.createLiveRegion(politeness);
    liveRegion.textContent = message;
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  }

  /**
   * Generate unique ID for ARIA relationships
   */
  static generateId(prefix = 'aria'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Set up ARIA relationships between elements
   */
  static setupRelationship(
    trigger: HTMLElement,
    target: HTMLElement,
    relationship: 'describedby' | 'labelledby' | 'controls' | 'owns'
  ): void {
    const targetId = target.id || this.generateId();
    if (!target.id) target.id = targetId;
    
    trigger.setAttribute(`aria-${relationship}`, targetId);
  }
}

/**
 * Keyboard navigation utilities
 */
export class KeyboardManager {
  /**
   * Handle arrow key navigation in a list
   */
  static handleArrowNavigation(
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (index: number) => void
  ): void {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
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

    onIndexChange(newIndex);
    items[newIndex]?.focus();
  }

  /**
   * Handle escape key to close modals/dropdowns
   */
  static handleEscape(event: KeyboardEvent, onEscape: () => void): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
    }
  }

  /**
   * Handle enter/space key activation
   */
  static handleActivation(event: KeyboardEvent, onActivate: () => void): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  }
}

/**
 * Color contrast utilities
 */
export class ContrastManager {
  /**
   * Calculate relative luminance of a color
   */
  static getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  static getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
    const lum1 = this.getLuminance(...color1);
    const lum2 = this.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Check if contrast ratio meets WCAG standards
   */
  static meetsWCAG(
    color1: [number, number, number],
    color2: [number, number, number],
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean {
    const ratio = this.getContrastRatio(color1, color2);
    
    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7;
    } else {
      return size === 'large' ? ratio >= 3 : ratio >= 4.5;
    }
  }

  /**
   * Convert hex color to RGB
   */
  static hexToRgb(hex: string): [number, number, number] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : null;
  }
}

/**
 * Screen reader utilities
 */
export class ScreenReaderManager {
  /**
   * Hide element from screen readers
   */
  static hide(element: HTMLElement): void {
    element.setAttribute('aria-hidden', 'true');
  }

  /**
   * Show element to screen readers
   */
  static show(element: HTMLElement): void {
    element.removeAttribute('aria-hidden');
  }

  /**
   * Create screen reader only text
   */
  static createSROnlyText(text: string): HTMLElement {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  }

  /**
   * Add screen reader description to element
   */
  static addDescription(element: HTMLElement, description: string): void {
    const descElement = this.createSROnlyText(description);
    element.appendChild(descElement);
    AriaManager.setupRelationship(element, descElement, 'describedby');
  }
}

/**
 * Motion utilities
 */
export class MotionManager {
  /**
   * Get animation configuration based on user preferences
   */
  static getAnimationConfig(defaultConfig: {
    duration: number;
    easing: string;
    delay?: number;
  }): typeof defaultConfig {
    if (prefersReducedMotion()) {
      return {
        ...defaultConfig,
        duration: 0.01, // Nearly instant
        delay: 0,
      };
    }
    return defaultConfig;
  }

  /**
   * Apply reduced motion styles to element
   */
  static applyReducedMotion(element: HTMLElement): void {
    if (prefersReducedMotion()) {
      element.style.animation = 'none';
      element.style.transition = 'none';
    }
  }

  /**
   * Create motion-safe animation
   */
  static createSafeAnimation(
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation | null {
    if (prefersReducedMotion()) {
      // Apply final state immediately
      const finalFrame = keyframes[keyframes.length - 1];
      Object.assign(element.style, finalFrame);
      return null;
    }
    
    return element.animate(keyframes, options);
  }
}

/**
 * Accessibility validation utilities
 */
export class AccessibilityValidator {
  /**
   * Validate element for common accessibility issues
   */
  static validateElement(element: HTMLElement): string[] {
    const issues: string[] = [];

    // Check for missing alt text on images
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      issues.push('Image missing alt attribute');
    }

    // Check for missing labels on form controls
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
      const hasLabel = element.getAttribute('aria-label') ||
                      element.getAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${element.id}"]`);
      if (!hasLabel) {
        issues.push('Form control missing label');
      }
    }

    // Check for missing focus indicators
    const computedStyle = window.getComputedStyle(element);
    if (element.tabIndex >= 0 && computedStyle.outline === 'none' && !computedStyle.boxShadow) {
      issues.push('Interactive element missing focus indicator');
    }

    // Check for insufficient color contrast
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    if (color && backgroundColor && color !== backgroundColor) {
      // This is a simplified check - in practice, you'd need more sophisticated color parsing
      issues.push('Potential color contrast issue - manual verification needed');
    }

    return issues;
  }

  /**
   * Run accessibility audit on container
   */
  static auditContainer(container: HTMLElement): Record<string, string[]> {
    const results: Record<string, string[]> = {};
    const elements = container.querySelectorAll('*');

    elements.forEach((element, index) => {
      const issues = this.validateElement(element as HTMLElement);
      if (issues.length > 0) {
        results[`element-${index}`] = issues;
      }
    });

    return results;
  }
}