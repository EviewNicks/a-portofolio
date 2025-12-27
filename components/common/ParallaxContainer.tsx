'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { PARALLAX_SPEED } from '@/lib/utils/animations';

export interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: [number, number];
  springConfig?: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  disabled?: boolean;
  threshold?: number;
}

/**
 * ParallaxContainer Component
 * 
 * A container that applies parallax scrolling effects to its children.
 * Supports multiple directions and configurable speed with performance optimization.
 * 
 * Features:
 * - Multi-directional parallax (up, down, left, right)
 * - Configurable speed and spring physics
 * - Intersection observer for performance
 * - Reduced motion support for accessibility
 * - GPU-accelerated transforms
 */
export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = PARALLAX_SPEED.medium,
  direction = 'up',
  className,
  offset = [0, 1],
  springConfig = {
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  disabled = false,
  // threshold = 0.1, // Removed as not used with current useIntersectionObserver
  ...props
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Use intersection observer to only animate when in view
  const [containerRef, isIntersecting] = useIntersectionObserver();
  
  // Combine refs - we'll use the containerRef from the hook directly

  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  // Calculate transform values based on direction and speed
  const transformAmount = speed * 100; // Convert to percentage
  
  const transformValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'down' || direction === 'right' 
      ? [0, transformAmount] 
      : [0, -transformAmount]
  );
  
  // Apply spring physics for smoother animation
  const springValue = useSpring(transformValue, springConfig);

  // Determine transform property based on direction
  const getTransformProperty = () => {
    if (disabled || prefersReducedMotion || !isIntersecting) {
      return {};
    }

    switch (direction) {
      case 'up':
      case 'down':
        return { y: springValue };
      case 'left':
      case 'right':
        return { x: springValue };
      default:
        return { y: springValue };
    }
  };

  const transformProps = getTransformProperty();

  return (
    <motion.div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={cn(
        'relative',
        // Ensure GPU acceleration
        'transform-gpu will-change-transform',
        className
      )}
      style={transformProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ParallaxContainer.displayName = 'ParallaxContainer'; // Not needed for FC

// Predefined ParallaxContainer variants for common use cases
export const SlowParallax: React.FC<Omit<ParallaxContainerProps, 'speed'>> = (props) => (
  <ParallaxContainer
    speed={PARALLAX_SPEED.slow}
    {...props}
  />
);

export const MediumParallax: React.FC<Omit<ParallaxContainerProps, 'speed'>> = (props) => (
  <ParallaxContainer
    speed={PARALLAX_SPEED.medium}
    {...props}
  />
);

export const FastParallax: React.FC<Omit<ParallaxContainerProps, 'speed'>> = (props) => (
  <ParallaxContainer
    speed={PARALLAX_SPEED.fast}
    {...props}
  />
);

export const BackgroundParallax: React.FC<Omit<ParallaxContainerProps, 'speed' | 'direction'>> = (props) => (
  <ParallaxContainer
    speed={PARALLAX_SPEED.background}
    direction="up"
    {...props}
  />
);

export const ForegroundParallax: React.FC<Omit<ParallaxContainerProps, 'speed' | 'direction'>> = (props) => (
  <ParallaxContainer
    speed={PARALLAX_SPEED.foreground}
    direction="down"
    {...props}
  />
);

ForegroundParallax.displayName = 'ForegroundParallax';

// Multi-layer parallax wrapper for complex scenes
export interface MultiLayerParallaxProps {
  children: React.ReactNode;
  className?: string;
  layers?: Array<{
    speed: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    zIndex?: number;
  }>;
}

export const MultiLayerParallax: React.FC<MultiLayerParallaxProps> = ({
  children,
  className,
  layers = [
    { speed: PARALLAX_SPEED.background, direction: 'up', zIndex: 1 },
    { speed: PARALLAX_SPEED.medium, direction: 'up', zIndex: 2 },
    { speed: PARALLAX_SPEED.foreground, direction: 'down', zIndex: 3 },
  ],
}) => {
  return (
    <div className={cn('relative', className)}>
      {layers.map((layer, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0',
            layer.className
          )}
          style={{ zIndex: layer.zIndex }}
        >
          <ParallaxContainer
            speed={layer.speed}
            direction={layer.direction}
            className="w-full h-full"
          >
            <div />
          </ParallaxContainer>
        </div>
      ))}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};