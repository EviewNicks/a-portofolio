'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkillsSectionData } from '@/lib/types/portfolio';
import { SkillsContent } from './SkillsContent';
import { LearningProgress } from './LearningProgress';
import { SkillsLogoLoop } from './SkillsLogoLoop';
import skillsData from '@/docs/data/skills-section.json';

interface SkillsSectionProps {
  className?: string;
}

/**
 * SkillsSection Component
 * 
 * Main skills section component that combines:
 * - SkillsContent: Technical skills organized by category with progress indicators
 * - SkillsLogoLoop: Animated showcase of technology icons
 * - LearningProgress: Current learning items and certification plans
 * 
 * Features:
 * - JSON data integration from skills-section.json
 * - Category-specific colors and icons for visual distinction
 * - Animated progress bars with percentage values
 * - Technology logo loop with hover effects
 * - Learning progress indicators with target dates
 * - Responsive layout with proper spacing
 * - Glassmorphism design elements
 * - Smooth animations and transitions
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ className }) => {
  const { skills } = skillsData as SkillsSectionData;

  return (
    <section
      id="skills"
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
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-linear-to-br from-ai-cyan/5 to-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-linear-to-br from-ai-amber/5 to-ai-cyan/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-linear-to-br from-primary/5 to-ai-amber/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Skills Content */}
      <SkillsContent skillsData={skills} />

      {/* Technology Logo Loop */}
      <div className="container mx-auto px-4 mt-16">
        <SkillsLogoLoop 
          categories={skills.categories}
          className="mb-16"
        />
      </div>

      {/* Learning Progress and Certifications */}
      <LearningProgress
        learning={skills.learning}
        certifications={skills.certifications}
      />

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

export default SkillsSection;