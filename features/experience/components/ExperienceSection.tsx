'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExperienceSectionData } from '@/lib/types/portfolio';
import { ExperienceContent } from './ExperienceContent';
import experienceData from '@/docs/data/experience-section.json';

interface ExperienceSectionProps {
  className?: string;
}

/**
 * ExperienceSection Component
 * 
 * Main experience section component that displays professional timeline
 * 
 * Features:
 * - JSON data integration from experience-section.json
 * - Timeline display in chronological order
 * - Experience details with technologies and achievements
 * - Visual indicators for different experience types
 * - Skills progression visualization over time
 * - Responsive layout with glassmorphism effects
 * - Smooth animations and transitions
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ className }) => {
  const { experience } = experienceData as ExperienceSectionData;

  return (
    <section
      id="experience"
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
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/6 right-1/6 w-96 h-96 bg-linear-to-br from-ai-cyan/5 to-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.2, 1],
            rotate: [90, 180, 270],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/6 left-1/6 w-80 h-80 bg-linear-to-br from-ai-amber/5 to-ai-cyan/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-linear-to-br from-primary/5 to-ai-amber/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Experience Content */}
      <ExperienceContent experienceData={experience} />

      {/* Section Divider */}
      <div className="container mx-auto px-4 mt-16">
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

export default ExperienceSection;