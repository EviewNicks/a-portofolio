/**
 * Motion Wrapper Component
 * Wraps animations with reduced motion support
 */

'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useMotionSafe } from '@/lib/hooks/useAccessibility';

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ElementType;
  reduceMotion?: boolean;
}

export function MotionWrapper({
  children,
  fallback: Fallback = 'div',
  reduceMotion = true,
  ...motionProps
}: MotionWrapperProps) {
  const { reducedMotion } = useMotionSafe();

  // If user prefers reduced motion and we should respect it, render fallback
  if (reducedMotion && reduceMotion) {
    return React.createElement(Fallback, {}, children);
  }

  // Otherwise render with motion
  return <motion.div {...motionProps}>{children}</motion.div>;
}

/**
 * Motion-safe variants of common motion components
 */
export const MotionDiv = (props: MotionWrapperProps) => (
  <MotionWrapper {...props} />
);

export const MotionSection = (props: MotionWrapperProps) => (
  <MotionWrapper {...props} fallback={'section' as React.ElementType} />
);

export const MotionArticle = (props: MotionWrapperProps) => (
  <MotionWrapper {...props} fallback={'article' as React.ElementType} />
);

export const MotionHeader = (props: MotionWrapperProps) => (
  <MotionWrapper {...props} fallback={'header' as React.ElementType} />
);

export const MotionFooter = (props: MotionWrapperProps) => (
  <MotionWrapper {...props} fallback={'footer' as React.ElementType} />
);