'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getGlassClasses, type GlassConfig } from '@/lib/utils/glassmorphism';
import { hoverScale, hoverGlow } from '@/lib/utils/animations';

export interface GlassCardProps extends GlassConfig {
  children: React.ReactNode;
  onClick?: () => void;
  asChild?: boolean;
  motionProps?: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    [key: string]: unknown;
  };
}

/**
 * GlassCard Component
 * 
 * A reusable glassmorphism card component with backdrop blur and translucent backgrounds.
 * Supports multiple variants (light, medium, heavy) and hover interactions.
 * 
 * Features:
 * - Glassmorphism effects with backdrop blur
 * - Multiple size and variant options
 * - Hover animations and interactions
 * - Accessibility support
 * - Motion animations with Framer Motion
 */
export const GlassCard = React.forwardRef<
  HTMLDivElement,
  GlassCardProps
>(({
  children,
  variant = 'medium',
  size = 'md',
  hover = false,
  animated = true,
  className,
  onClick,
  asChild = false,
  motionProps = {},
  ...props
}, ref) => {
  // Generate glassmorphism classes
  const glassClasses = getGlassClasses({
    variant,
    size,
    hover,
    animated,
    className,
  });

  // Determine if card is interactive
  const isInteractive = onClick || hover;

  // Base motion props
  const defaultMotionProps = {
    initial: 'initial',
    animate: 'animate',
    whileHover: isInteractive ? 'hover' : undefined,
    whileTap: onClick ? 'tap' : undefined,
    variants: {
      ...hoverScale,
      ...(hover ? hoverGlow : {}),
    },
    ...motionProps,
  };

  // Handle click events
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick();
    }
    // Call any additional click handlers from motionProps
    if (motionProps?.onClick) {
      motionProps.onClick(event);
    }
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
    // Call any additional keydown handlers from motionProps
    if (motionProps?.onKeyDown) {
      motionProps.onKeyDown(event);
    }
  };

  const cardProps = {
    ref,
    className: cn(
      glassClasses,
      // Add cursor pointer for interactive cards
      isInteractive && 'cursor-pointer',
      // Add focus styles for accessibility
      onClick && 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    ),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    // Add accessibility attributes for interactive cards
    ...(onClick && {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': false,
    }),
    ...props,
  };

  if (asChild) {
    // If asChild is true, clone the first child and apply props
    const child = React.Children.only(children) as React.ReactElement;
    // Create safe props without ref to avoid ref conflicts during render
    const safeProps = {
      className: cn(glassClasses, (child.props as { className?: string }).className),
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...(onClick && {
        role: 'button',
        tabIndex: 0,
        'aria-pressed': false,
      }),
      ...props,
    };
    return React.cloneElement(child, safeProps);
  }

  return (
    <motion.div
      {...defaultMotionProps}
      {...cardProps}
    >
      {children}
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';

// Predefined GlassCard variants for common use cases
export const HeroGlassCard = React.forwardRef<
  HTMLDivElement,
  Omit<GlassCardProps, 'variant' | 'size'>
>((props, ref) => (
  <GlassCard
    ref={ref}
    variant="medium"
    size="xl"
    hover={true}
    {...props}
  />
));

HeroGlassCard.displayName = 'HeroGlassCard';

export const SkillGlassCard = React.forwardRef<
  HTMLDivElement,
  Omit<GlassCardProps, 'variant' | 'size'>
>((props, ref) => (
  <GlassCard
    ref={ref}
    variant="light"
    size="lg"
    hover={true}
    {...props}
  />
));

SkillGlassCard.displayName = 'SkillGlassCard';

export const ProjectGlassCard = React.forwardRef<
  HTMLDivElement,
  Omit<GlassCardProps, 'variant' | 'size'>
>((props, ref) => (
  <GlassCard
    ref={ref}
    variant="medium"
    size="lg"
    hover={true}
    {...props}
  />
));

ProjectGlassCard.displayName = 'ProjectGlassCard';

export const NavigationGlassCard = React.forwardRef<
  HTMLDivElement,
  Omit<GlassCardProps, 'variant' | 'size' | 'hover'>
>((props, ref) => (
  <GlassCard
    ref={ref}
    variant="light"
    size="sm"
    hover={false}
    {...props}
  />
));

NavigationGlassCard.displayName = 'NavigationGlassCard';

export const ModalGlassCard = React.forwardRef<
  HTMLDivElement,
  Omit<GlassCardProps, 'variant' | 'size' | 'hover'>
>((props, ref) => (
  <GlassCard
    ref={ref}
    variant="heavy"
    size="xl"
    hover={false}
    {...props}
  />
));

ModalGlassCard.displayName = 'ModalGlassCard';