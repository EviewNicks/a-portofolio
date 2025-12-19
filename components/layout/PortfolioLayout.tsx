'use client';

import React from 'react';
import { Navigation } from './Navigation';
import { ScrollIndicator } from './ScrollIndicator';
import { ScrollToTop } from './ScrollToTop';
import { SectionIndicator } from './SectionIndicator';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation';

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
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    sections: navigationItems,
    onNavigate: scrollToSection,
    activeSection,
    enabled: true,
  });

  return (
    <>
      {/* Navigation Components */}
      <Navigation />
      <ScrollIndicator />
      <SectionIndicator
        sections={navigationItems}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      <ScrollToTop />
      <KeyboardShortcuts />

      {/* Main Content */}
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </>
  );
}