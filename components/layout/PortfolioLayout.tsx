'use client'

import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { EditorialNavbar } from './EditorialNavbar'
import { ScrollIndicator } from './ScrollIndicator'
import { ScrollToTop } from './ScrollToTop'
import { SectionIndicator } from './SectionIndicator'
import { KeyboardShortcuts } from './KeyboardShortcuts'
import { SkipLinks } from '@/components/accessibility/SkipLinks'
import { useNavigation } from '@/lib/hooks/useNavigation'
import { useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation'
import { useAccessibilityPreferences } from '@/lib/hooks/useAccessibility'
import { useResponsive } from '@/lib/hooks/useResponsive'

const navigationItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

interface PortfolioLayoutProps {
  children: React.ReactNode
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'An unexpected error occurred'
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown
  resetErrorBoundary: () => void
}) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-foreground mb-4 text-2xl font-bold">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-6">{getErrorMessage(error)}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <PortfolioLayoutContent>{children}</PortfolioLayoutContent>
      </Suspense>
    </ErrorBoundary>
  )
}

function PortfolioLayoutContent({ children }: PortfolioLayoutProps) {
  const { activeSection, scrollToSection } = useNavigation(navigationItems)
  const { reducedMotion, highContrast } = useAccessibilityPreferences()
  const { isMobile, isTablet } = useResponsive()

  // Enable keyboard navigation
  useKeyboardNavigation({
    sections: navigationItems,
    onNavigate: scrollToSection,
    activeSection,
    enabled: true,
  })

  return (
    <>
      {/* Skip Links for Accessibility */}
      <SkipLinks />

      {/* Editorial Navigation Bar */}
      <EditorialNavbar pageTitle="Portfolio" showSideText={true} />

      {/* Additional Navigation Components */}
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
        className="bg-background min-h-screen"
        data-reduced-motion={reducedMotion}
        data-high-contrast={highContrast}
        data-mobile={isMobile}
        data-tablet={isTablet}
      >
        {children}
      </main>
    </>
  )
}
