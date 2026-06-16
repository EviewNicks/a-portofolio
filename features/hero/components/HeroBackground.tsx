'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeroData } from '@/lib/types/portfolio'

interface HeroBackgroundProps {
  parallaxConfig: HeroData['parallax']
  backgroundConfig: HeroData['background']
}

/**
 * HeroBackground Component - Editorial Magazine Style
 *
 * Simplified editorial background with:
 * - Dot matrix pattern (print-inspired)
 * - Large geometric shape accent (circle/rectangle)
 * - Subtle gradient overlays
 * - Minimalist frame elements
 * - Restrained animation philosophy
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  parallaxConfig,
  backgroundConfig,
}) => {
  if (!parallaxConfig.enabled) {
    return null
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base Subtle Gradient */}
      <div className="from-background via-background to-muted/20 absolute inset-0 bg-gradient-to-br" />

      {/* Dot Matrix Pattern - Editorial Style */}
      <div className="absolute top-[15%] left-[10%] opacity-30">
        <svg
          width="120"
          height="200"
          viewBox="0 0 120 200"
          className="text-foreground/20"
        >
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`dot-${row}-${col}`}
                cx={col * 20 + 10}
                cy={row * 20 + 10}
                r="1.5"
                fill="currentColor"
              />
            ))
          )}
        </svg>
      </div>

      {/* Large Geometric Circle Accent - Like Open Design */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-[20%] right-[5%] hidden lg:block"
      >
        <div className="relative h-[500px] w-[500px]">
          {/* Main circle */}
          <div className="bg-primary/10 absolute inset-0 rounded-full blur-3xl" />
          <div className="border-primary/20 absolute inset-8 rounded-full border" />
        </div>
      </motion.div>

      {/* Geometric Frame Elements */}
      <div className="absolute top-[25%] right-[8%] hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-2"
        >
          <div className="border-primary/30 h-16 w-24 border-t-2 border-l-2" />
        </motion.div>
      </div>

      {/* Minimal Decorative Lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="bg-foreground/10 absolute bottom-[15%] left-[5%] h-px w-32 origin-left"
      />

      {/* Subtle Radial Gradient Overlay */}
      <div className="from-primary/5 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] via-transparent to-transparent" />

      {/* Typography-inspired decorative element */}
      <div className="font-display text-foreground/10 absolute right-[10%] bottom-[10%] hidden text-sm tracking-wider uppercase lg:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Portfolio / 2024
        </motion.div>
      </div>

      {/* Small accent dots (minimal particles) */}
      {backgroundConfig.particles && (
        <>
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="bg-primary/30 absolute top-[30%] right-[15%] h-2 w-2 rounded-full"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="bg-accent/30 absolute bottom-[25%] left-[20%] h-1.5 w-1.5 rounded-full"
          />
        </>
      )}
    </div>
  )
}
