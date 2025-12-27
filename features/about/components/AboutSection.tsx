'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AboutSectionData } from '@/lib/types/portfolio';
import { AboutContent } from './AboutContent';
import { AboutValues } from './AboutValues';
import aboutData from '@/docs/data/about-section.json';

interface AboutSectionProps {
  className?: string;
}

/**
 * AboutSection Component
 * 
 * Main about section component that combines:
 * - AboutContent: Personal information, education, career objectives, and statistics
 * - AboutValues: Core values display with card layout
 * 
 * Features:
 * - JSON data integration from about-section.json
 * - Responsive layout with proper spacing
 * - Smooth animations and transitions
 * - Glassmorphism design elements
 * - Statistics with animated counters
 * - Interactive value cards with hover effects
 */
export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const { about } = aboutData as AboutSectionData;

  return (
    <section
      id="about"
      className={cn(
        'relative py-16 lg:py-24',
        'bg-linear-to-b from-background via-background/95 to-background',
        className
      )}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-linear-to-br from-primary/5 to-ai-amber/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-linear-to-br from-ai-cyan/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <AboutContent aboutData={about} />

      {/* Values Section */}
      <AboutValues values={about.values} />

      {/* Section Divider */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default AboutSection;