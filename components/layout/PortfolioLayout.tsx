'use client';

import React from 'react';
import { Navigation } from './Navigation';
import { ScrollIndicator } from './ScrollIndicator';
import { ScrollToTop } from './ScrollToTop';
import { SectionIndicator } from './SectionIndicator';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { SkipLinks } from '@/components/accessibility/SkipLinks';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation';
import { useAccessibilityPreferences } from '@/lib/hooks/useAccessibility';
import { useResponsive } from '@/lib/hooks/useResponsive';

const navigationItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const { activeSection, scrollToSection } = useNavigation(navigationItems);
  const { reducedMotion, highContrast } = useAccessibilityPreferences();
  const { isMobile, isTablet } = useResponsive();
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    sections: navigationItems,
    onNavigate: scrollToSection,
    activeSection,
    enabled: true,
  });

  return (
    <>
      {/* Skip Links for Accessibility */}
      <SkipLinks />

      {/* Navigation Components */}
      <Navigation />
      <ScrollIndicator />
      {!isMobile && (
        <SectionIndicator
          sections={navigationItems}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
      )}
      <ScrollToTop />
      <KeyboardShortcuts />

      {/* Main Content */}
      <main 
        className="min-h-screen bg-background"
        data-reduced-motion={reducedMotion}
        data-high-contrast={highContrast}
        data-mobile={isMobile}
        data-tablet={isTablet}
      >
        {children}
      </main>
    </>
  );
}