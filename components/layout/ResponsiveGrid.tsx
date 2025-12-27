/**
 * Responsive Grid Component
 * Provides responsive grid layout with breakpoint-specific column configurations
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/lib/hooks/useResponsive';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
}

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

export function ResponsiveGrid({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = 'md',
  as: Component = 'div',
}: ResponsiveGridProps) {
  const { breakpoint } = useResponsive();

  const getGridColumns = () => {
    const cols = columns[breakpoint as keyof typeof columns] || columns.desktop || 3;
    return `grid-cols-${cols}`;
  };

  return React.createElement(
    Component,
    {
      className: cn(
        'grid',
        getGridColumns(),
        gapClasses[gap],
        className
      ),
      'data-breakpoint': breakpoint,
    },
    children
  );
}