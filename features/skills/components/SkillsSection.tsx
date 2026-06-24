'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkillsSectionData } from '@/lib/types/portfolio';
import { SkillsContent } from './SkillsContent';
import { LearningProgress } from './LearningProgress';
import { SkillsLogoLoop } from './SkillsLogoLoop';
import skillsData from '@/docs/data/skills-section.json';
import { Course } from '@/features/certificates/types';

interface SkillsSectionProps {
  courses?: Course[]
  className?: string
}

/**
 * SkillsSection Component
 *
 * Main skills section component that combines:
 * - SkillsContent: Technical skills organized by category with progress indicators
 * - SkillsLogoLoop: Animated showcase of technology icons
 * - LearningProgress: Current learning and completed certificates from DB
 *
 * Features:
 * - JSON data integration from skills-section.json for skill categories
 * - Course data from DB for LearningProgress (split by status)
 * - Category-specific colors and icons for visual distinction
 * - Animated progress bars with percentage values
 * - Technology logo loop with hover effects
 * - Responsive layout with proper spacing
 * - Smooth animations and transitions
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ courses = [], className }) => {
  const { skills } = skillsData as SkillsSectionData;

  return (
    <section
      id="skills"
      className={cn(
        'relative py-20 lg:py-32 bg-paper overflow-hidden',
        className
      )}
    >
      {/* Subtle grain / texture overlay — keeps bg-paper from being too flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 0h80v80H0z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Main Skills Content */}
      <SkillsContent skillsData={skills} />

      {/* Technology Logo Loop — wire divider + marquee */}
      <div className="mt-20 lg:mt-28">
        {/* Wire section rule */}
        <div className="container mx-auto px-6 md:px-8 lg:px-16 border-t border-line pt-[18px] mb-8 flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span
            className="font-serif italic text-coral text-[14px] tracking-wider normal-case"
            style={{ fontFamily: 'var(--font-editorial-serif)' }}
          >
            03.a
          </span>
          <span className="hidden sm:block">Technology stack · tools · ecosystem</span>
          <span>Stack / Loop</span>
        </div>
        <SkillsLogoLoop
          categories={skills.categories}
          className="mb-0"
        />
      </div>

      {/* Learning Progress and Certifications — from DB */}
      <LearningProgress courses={courses} />

      {/* Section-end rule */}
      <div className="container mx-auto px-6 md:px-8 lg:px-16 mt-20">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-line"
          style={{ originX: 0 }}
        />
      </div>
    </section>
  );
};

export default SkillsSection;