/**
 * Accessibility Demo Component
 * Demonstrates accessibility and responsive features implementation
 */

'use client';

import React, { useState } from 'react';
import { ResponsiveSection } from '@/components/layout/ResponsiveSection';
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';
import { FocusIndicator } from '@/components/accessibility/FocusIndicator';
import { MotionDiv } from '@/components/accessibility/MotionWrapper';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/lib/hooks/useResponsive';
import { useAccessibilityPreferences, useAnnouncements } from '@/lib/hooks/useAccessibility';
import { cn } from '@/lib/utils';

export function AccessibilityDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const { breakpoint, isMobile, isTablet } = useResponsive();
  const { reducedMotion, highContrast, darkTheme } = useAccessibilityPreferences();
  const { announce } = useAnnouncements();

  const handleDemoActivation = (demoId: string) => {
    setActiveDemo(demoId);
    announce(`${demoId} demo activated`, 'polite');
  };

  const demoFeatures = [
    {
      id: 'responsive',
      title: 'Responsive Design',
      description: 'Adaptive layouts for all screen sizes',
      status: `Current: ${breakpoint}`,
      color: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      id: 'motion',
      title: 'Reduced Motion',
      description: 'Respects user motion preferences',
      status: reducedMotion ? 'Enabled' : 'Disabled',
      color: 'bg-green-500/10 border-green-500/20',
    },
    {
      id: 'contrast',
      title: 'High Contrast',
      description: 'Enhanced contrast for better visibility',
      status: highContrast ? 'Enabled' : 'Disabled',
      color: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      id: 'theme',
      title: 'Dark Theme',
      description: 'Automatic theme detection',
      status: darkTheme ? 'Dark' : 'Light',
      color: 'bg-orange-500/10 border-orange-500/20',
    },
  ];

  return (
    <ResponsiveSection
      id="accessibility-demo"
      ariaLabel="Accessibility and responsive design demonstration"
      spacing="xl"
      background="muted"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-responsive-3xl font-display font-bold text-foreground">
            Accessibility & Responsive Design
          </h2>
          <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto">
            This portfolio implements comprehensive accessibility features and responsive design 
            patterns to ensure an optimal experience for all users.
          </p>
        </div>

        {/* Current Status */}
        <GlassCard className="p-6">
          <h3 className="text-responsive-xl font-semibold mb-4">Current Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Breakpoint:</span>
              <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded">
                {breakpoint}
              </span>
            </div>
            <div>
              <span className="font-medium">Device:</span>
              <span className="ml-2">
                {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
              </span>
            </div>
            <div>
              <span className="font-medium">Motion:</span>
              <span className={cn(
                "ml-2 px-2 py-1 rounded",
                reducedMotion 
                  ? "bg-green-500/10 text-green-600" 
                  : "bg-gray-500/10 text-gray-600"
              )}>
                {reducedMotion ? 'Reduced' : 'Normal'}
              </span>
            </div>
            <div>
              <span className="font-medium">Contrast:</span>
              <span className={cn(
                "ml-2 px-2 py-1 rounded",
                highContrast 
                  ? "bg-purple-500/10 text-purple-600" 
                  : "bg-gray-500/10 text-gray-600"
              )}>
                {highContrast ? 'High' : 'Normal'}
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Feature Demos */}
        <ResponsiveGrid
          columns={{ mobile: 1, tablet: 2, desktop: 2, wide: 4 }}
          gap="lg"
        >
          {demoFeatures.map((feature) => (
            <FocusIndicator key={feature.id}>
              <MotionDiv
                whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
              >
                <GlassCard 
                  className={cn(
                    "p-6 h-full cursor-pointer transition-colors",
                    feature.color,
                    activeDemo === feature.id && "ring-2 ring-primary"
                  )}
                  onClick={() => handleDemoActivation(feature.title)}
                  hover
                >
                  <div className="space-y-3">
                    <h4 className="text-responsive-lg font-semibold">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">
                        {feature.status}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="touch-target"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDemoActivation(feature.title);
                        }}
                        aria-label={`Activate ${feature.title} demo`}
                      >
                        Demo
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            </FocusIndicator>
          ))}
        </ResponsiveGrid>

        {/* Accessibility Features List */}
        <GlassCard className="p-6">
          <h3 className="text-responsive-xl font-semibold mb-6">
            Implemented Features
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-primary">Accessibility</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Skip links for keyboard navigation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  ARIA labels and semantic HTML
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Focus indicators and management
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Reduced motion support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Color contrast compliance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Screen reader announcements
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-primary">Responsive Design</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Mobile-first responsive layouts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Breakpoint-specific styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Touch-friendly interactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Orientation change handling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Performance optimizations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Adaptive animations
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Instructions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Try resizing your browser window, using keyboard navigation (Tab, Arrow keys), 
            or changing your system preferences to see these features in action.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <kbd className="px-2 py-1 bg-muted rounded">Tab</kbd>
            <kbd className="px-2 py-1 bg-muted rounded">↑↓←→</kbd>
            <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd>
            <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd>
            <span className="text-muted-foreground">for keyboard navigation</span>
          </div>
        </div>
      </div>
    </ResponsiveSection>
  );
}