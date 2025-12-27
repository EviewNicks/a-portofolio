/**
 * Smooth scroll utilities for enhanced navigation experience
 */

export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

// Easing functions
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};

/**
 * Smooth scroll to a specific position
 */
export function smoothScrollTo(
  targetPosition: number,
  options: SmoothScrollOptions = {}
): Promise<void> {
  const {
    duration = 800,
    easing = easingFunctions.easeInOutCubic,
    offset = 0,
  } = options;

  return new Promise((resolve) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    const startTime = performance.now();

    function animation(currentTime: number) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animation);
  });
}

/**
 * Smooth scroll to an element
 */
export function smoothScrollToElement(
  element: HTMLElement | string,
  options: SmoothScrollOptions = {}
): Promise<void> {
  const targetElement = typeof element === 'string' 
    ? document.getElementById(element) || document.querySelector(element)
    : element;

  if (!targetElement) {
    return Promise.reject(new Error('Target element not found'));
  }

  const targetPosition = targetElement.offsetTop;
  return smoothScrollTo(targetPosition, options);
}

/**
 * Get the currently visible section based on scroll position
 */
export function getCurrentSection(
  sections: Array<{ id: string; element?: HTMLElement | null }>,
  threshold = 0.3
): string | null {
  const scrollPosition = window.scrollY + window.innerHeight * threshold;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const element = section.element || document.getElementById(section.id);
    
    if (element && element.offsetTop <= scrollPosition) {
      return section.id;
    }
  }

  return sections[0]?.id || null;
}

/**
 * Check if an element is in viewport
 */
export function isElementInViewport(
  element: HTMLElement,
  threshold = 0
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
}

/**
 * Debounce function for scroll events
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for scroll events
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}