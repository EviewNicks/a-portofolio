'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxContainer } from '@/components/common/ParallaxContainer';
import { HeroData } from '@/lib/types/portfolio';

interface HeroBackgroundProps {
  parallaxConfig: HeroData['parallax'];
  backgroundConfig: HeroData['background'];
}

/**
 * HeroBackground Component
 * 
 * Handles all parallax background effects for the hero section including:
 * - Multi-layer parallax with different speeds
 * - AI-themed neural network patterns
 * - Floating particle animations
 * - Animated gradients
 * - Geometric shapes
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  parallaxConfig,
  backgroundConfig,
}) => {
  if (!parallaxConfig.enabled) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background Layer - Slowest with Animated Gradient */}
      <ParallaxContainer
        speed={0.1}
        direction="up"
        className="absolute inset-0"
      >
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--ai-amber) / 0.05) 50%, hsl(var(--ai-cyan) / 0.1) 100%)',
              'linear-gradient(135deg, hsl(var(--ai-cyan) / 0.1) 0%, hsl(var(--primary) / 0.05) 50%, hsl(var(--ai-amber) / 0.1) 100%)',
              'linear-gradient(135deg, hsl(var(--ai-amber) / 0.1) 0%, hsl(var(--ai-cyan) / 0.05) 50%, hsl(var(--primary) / 0.1) 100%)',
              'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--ai-amber) / 0.05) 50%, hsl(var(--ai-cyan) / 0.1) 100%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        />
      </ParallaxContainer>
      
      {/* Mid Layer - Medium Speed */}
      <ParallaxContainer
        speed={0.3}
        direction="down"
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent" />
      </ParallaxContainer>

      {/* AI Neural Network Pattern */}
      <ParallaxContainer
        speed={0.2}
        direction="right"
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-20">
          <svg
            className="absolute top-1/4 left-1/4 w-96 h-96 text-primary/30"
            viewBox="0 0 400 400"
            fill="none"
          >
            {/* Neural network nodes */}
            <circle cx="100" cy="100" r="4" fill="currentColor" />
            <circle cx="200" cy="80" r="4" fill="currentColor" />
            <circle cx="300" cy="120" r="4" fill="currentColor" />
            <circle cx="150" cy="200" r="4" fill="currentColor" />
            <circle cx="250" cy="180" r="4" fill="currentColor" />
            <circle cx="350" cy="220" r="4" fill="currentColor" />
            <circle cx="100" cy="300" r="4" fill="currentColor" />
            <circle cx="200" cy="320" r="4" fill="currentColor" />
            <circle cx="300" cy="280" r="4" fill="currentColor" />
            
            {/* Neural network connections */}
            <line x1="100" y1="100" x2="200" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="100" y1="100" x2="150" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="200" y1="80" x2="300" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="200" y1="80" x2="250" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="300" y1="120" x2="350" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="200" x2="250" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="200" x2="100" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="250" y1="180" x2="350" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="250" y1="180" x2="200" y2="320" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="350" y1="220" x2="300" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="100" y1="300" x2="200" y2="320" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="200" y1="320" x2="300" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </ParallaxContainer>

      {/* Floating Particles */}
      {backgroundConfig.particles && (
        <ParallaxContainer
          speed={0.4}
          direction="left"
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            {/* Animated particles */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-1/4 w-2 h-2 bg-ai-amber rounded-full"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-1/2 left-1/3 w-1 h-1 bg-ai-cyan rounded-full"
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </ParallaxContainer>
      )}

      {/* Geometric Shapes Layer */}
      <ParallaxContainer
        speed={0.5}
        direction="up"
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-10">
          {/* Floating geometric shapes */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rotate-45"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-ai-amber/30 rounded-full"
          />
          <motion.div
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 right-1/3 w-16 h-16 bg-ai-cyan/20 rotate-12"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        </div>
      </ParallaxContainer>

      {/* Foreground Layer - Fastest */}
      <ParallaxContainer
        speed={0.6}
        direction="down"
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--tw-gradient-stops))] from-ai-amber/5 via-transparent to-transparent" />
      </ParallaxContainer>
    </div>
  );
};
