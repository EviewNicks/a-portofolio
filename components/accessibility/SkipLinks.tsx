/**
 * Skip Links Component
 * Provides keyboard navigation shortcuts for accessibility
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useSkipLinks } from '@/lib/hooks/useAccessibility';

const skipLinks = [
  { id: 'hero', label: 'Skip to main content' },
  { id: 'about', label: 'Skip to about section' },
  { id: 'skills', label: 'Skip to skills section' },
  { id: 'projects', label: 'Skip to projects section' },
  { id: 'experience', label: 'Skip to experience section' },
  { id: 'contact', label: 'Skip to contact section' },
];

export function SkipLinks() {
  const { skipLinkProps } = useSkipLinks(skipLinks);

  return (
    <nav
      className="sr-only focus-within:not-sr-only"
      aria-label="Skip navigation links"
    >
      <ul className="fixed top-0 left-0 z-50 flex flex-col bg-background border border-border rounded-md shadow-lg p-2">
        {skipLinks.map((link) => (
          <li key={link.id}>
            <a
              {...skipLinkProps(link.id)}
              className={cn(
                'block px-4 py-2 text-sm font-medium text-foreground',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring',
                'rounded-sm transition-colors'
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}