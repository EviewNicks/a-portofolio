'use client';

import { useEffect, useCallback } from 'react';

export interface UseKeyboardNavigationOptions {
  sections: Array<{ id: string; href: string }>;
  onNavigate: (href: string) => void;
  activeSection: string;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  sections,
  onNavigate,
  activeSection,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Only handle navigation keys when not in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      const currentIndex = sections.findIndex(section => section.id === activeSection);

      switch (event.key) {
        case 'ArrowUp':
        case 'k': // Vim-style navigation
          event.preventDefault();
          if (currentIndex > 0) {
            onNavigate(sections[currentIndex - 1].href);
          }
          break;

        case 'ArrowDown':
        case 'j': // Vim-style navigation
          event.preventDefault();
          if (currentIndex < sections.length - 1) {
            onNavigate(sections[currentIndex + 1].href);
          }
          break;

        case 'Home':
          event.preventDefault();
          onNavigate(sections[0].href);
          break;

        case 'End':
          event.preventDefault();
          onNavigate(sections[sections.length - 1].href);
          break;

        case 'Escape':
          // Close mobile menu or blur active element
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement && activeElement.blur) {
            activeElement.blur();
          }
          break;
      }
    },
    [sections, onNavigate, activeSection, enabled]
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, enabled]);

  return {
    // Return current section info for accessibility
    currentSectionIndex: sections.findIndex(section => section.id === activeSection),
    totalSections: sections.length,
  };
}