/**
 * Responsive Section Component
 * Provides responsive section wrapper with accessibility features
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer } from './ResponsiveContainer';
import { MotionSection } from '@/components/accessibility/MotionWrapper';
import { useResponsive } from '@/lib/hooks/useResponsive';
import { useAccessibilityPreferences } from '@/lib/hooks/useAccessibility';

interface ResponsiveSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerProps?: {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  };
  ariaLabel?: string;
  ariaLabelledBy?: string;
  background?: 'default' | 'muted' | 'accent';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  enableMotion?: boolean;
}

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted/50',
  accent: 'bg-accent/5',
};

const spacingClasses = {
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-20 lg:py-24',
  xl: 'py-20 sm:py-24 lg:py-32',
};

export const ResponsiveSection = forwardRef<HTMLElement, ResponsiveSectionProps>(
  ({
    id,
    children,
    className,
    containerProps = {},
    ariaLabel,
    ariaLabelledBy,
    background = 'default',
    spacing = 'lg',
    enableMotion = true,
  }, ref) => {
    const { isMobile, isTablet } = useResponsive();
    const { reducedMotion } = useAccessibilityPreferences();

    const sectionProps = {
      id,
      ref,
      className: cn(
        'relative w-full',
        backgroundClasses[background],
        spacingClasses[spacing],
        className
      ),
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-section': id,
      'data-mobile': isMobile,
      'data-tablet': isTablet,
      'data-reduced-motion': reducedMotion,
      tabIndex: -1, // Allow programmatic focus for skip links
    };

    const motionVariants = {
      hidden: { 
        opacity: 0, 
        y: reducedMotion ? 0 : 20 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: reducedMotion ? 0.01 : 0.6,
          ease: [0.4, 0, 0.2, 1] as const,
        }
      }
    };

    const content = (
      <ResponsiveContainer {...containerProps}>
        {children}
      </ResponsiveContainer>
    );

    if (enableMotion && !reducedMotion) {
      return (
        <MotionSection
          {...sectionProps}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={motionVariants}
        >
          {content}
        </MotionSection>
      );
    }

    return (
      <section {...sectionProps}>
        {content}
      </section>
    );
  }
);

ResponsiveSection.displayName = 'ResponsiveSection';