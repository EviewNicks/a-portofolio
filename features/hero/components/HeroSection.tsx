'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { HeroSectionData } from '@/lib/types/portfolio'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'
import heroData from '@/docs/data/hero-section.json'

interface HeroSectionProps {
  className?: string
}

/**
 * HeroSection Component - Editorial Magazine Style
 *
 * Redesigned hero section inspired by editorial/magazine layouts:
 * - Asymmetric split layout (60-40)
 * - Mixed typography with italic/bold combinations
 * - Minimalist editorial background
 * - Subtle animations (print-inspired)
 * - Dot matrix and geometric patterns
 * - Professional visual composition
 *
 * Features:
 * - JSON data integration from hero-section.json
 * - Editorial-style asymmetric layout
 * - Restrained parallax effects
 * - Mixed typographic hierarchy
 * - Geometric visual elements
 * - Numbered navigation system
 * - Accessibility considerations
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { hero } = heroData as HeroSectionData

  return (
    <section
      id="hero"
      className={cn(
        'relative flex min-h-screen items-center',
        'overflow-hidden',
        'py-12 md:py-16 lg:py-20',
        className
      )}
    >
      {/* Editorial Background - Simplified */}
      <HeroBackground
        parallaxConfig={hero.parallax}
        backgroundConfig={hero.background}
      />

      {/* Main Content - Editorial Layout */}
      <HeroContent heroData={hero} />

      {/* Scroll Indicator - More Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="border-foreground/20 bg-background/10 flex h-11 w-7 justify-center rounded-full border backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-foreground/40 mt-2.5 h-2 w-0.5 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
