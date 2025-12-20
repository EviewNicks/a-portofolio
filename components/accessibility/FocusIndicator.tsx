/**
 * Focus Indicator Component
 * Provides visible focus indicators for interactive elements
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useFocusVisible } from '@/lib/hooks/useAccessibility';

interface FocusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  focusClassName?: string;
  disabled?: boolean;
}

export const FocusIndicator = forwardRef<HTMLDivElement, FocusIndicatorProps>(
  ({ children, className, focusClassName, disabled = false, ...props }, ref) => {
    const { isFocusVisible } = useFocusVisible();

    return (
      <div
        ref={ref}
        className={cn(
          'relative',
          // Base focus styles
          'focus-within:outline-none',
          // Custom focus indicator
          isFocusVisible && !disabled && [
            'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            'focus-within:ring-offset-background',
            focusClassName,
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FocusIndicator.displayName = 'FocusIndicator';