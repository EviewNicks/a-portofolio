'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeroSectionData } from '@/lib/types/portfolio';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import heroData from '@/docs/data/hero-section.json';

interface HeroSectionProps {
  className?: string;
}

/**
 * HeroSection Component
 * 
 * Main hero section component that combines:
 * - HeroBackground: Parallax background effects
 * - HeroContent: All content elements (text, avatar, highlights, CTA)
 * - Scroll indicator animation
 * 
 * Features:
 * - JSON data integration from hero-section.json
 * - Responsive layout with asymmetric design
 * - Multi-layer parallax background effects
 * - Animated content with staggered entrance
 * - Smooth scrolling call-to-action buttons
 * - Professional highlights with animations
 * - Accessibility considerations
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { hero } = heroData as HeroSectionData;

  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen flex items-center justify-center',
        'overflow-hidden',
        className
      )}
    >
      {/* Parallax Background Effects */}
      <HeroBackground 
        parallaxConfig={hero.parallax}
        backgroundConfig={hero.background}
      />

      {/* Main Content */}
      <HeroContent heroData={hero} />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;