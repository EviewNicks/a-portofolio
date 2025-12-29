'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExperienceData } from '@/lib/types/portfolio';
import { TimelineEntry } from './TimelineEntry';
import { SkillsProgression } from './SkillsProgression';
import { GlassCard } from '@/components/common';

interface ExperienceContentProps {
  experienceData: ExperienceData;
  className?: string;
}

/**
 * ExperienceContent Component
 * 
 * Main content component for experience section
 * 
 * Features:
 * - Timeline display in chronological order
 * - Experience summary with statistics
 * - Skills progression visualization
 * - Visual indicators for different experience types
 * - Responsive layout with proper spacing
 */
export const ExperienceContent: React.FC<ExperienceContentProps> = ({
  experienceData,
  className,
}) => {
  // Sort timeline entries by date (most recent first)
  const sortedTimeline = [...experienceData.timeline].sort((a, b) => {
    // Extract year from date string for sorting
    const getYear = (dateStr: string) => {
      const match = dateStr.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    
    const yearA = getYear(a.date);
    const yearB = getYear(b.date);
    
    // If one is current, it should come first
    if (a.status === 'current' && b.status !== 'current') return -1;
    if (b.status === 'current' && a.status !== 'current') return 1;
    
    // Otherwise sort by year (most recent first)
    return yearB - yearA;
  });

  return (
    <div className={cn('container mx-auto px-4', className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Professional Journey
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive timeline of my educational background, work experience, and key projects
          that have shaped my career in AI and software development.
        </p>
      </motion.div>

      {/* Experience Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <GlassCard variant="medium" className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Experience Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {experienceData.summary.total_experience}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {experienceData.summary.education_years}
              </div>
              <div className="text-sm text-muted-foreground">
                Education
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {experienceData.summary.work_experience}
              </div>
              <div className="text-sm text-muted-foreground">
                Work Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {experienceData.summary.projects_completed}
              </div>
              <div className="text-sm text-muted-foreground">
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ai-amber mb-2">
                {experienceData.summary.certifications}
              </div>
              <div className="text-sm text-muted-foreground">
                Certifications
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-2">
            Career Timeline
          </h3>
          <p className="text-muted-foreground">
            Chronological overview of my educational and professional milestones
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="max-w-4xl mx-auto">
          {sortedTimeline.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === sortedTimeline.length - 1}
            />
          ))}
        </div>
      </motion.div>

      {/* Skills Progression */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <SkillsProgression skillsProgression={experienceData.skills_progression} />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <GlassCard variant="light" className="p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready for New Opportunities
          </h3>
          <p className="text-muted-foreground mb-6">
            I&apos;m always excited to take on new challenges and contribute to innovative projects.
            Let&apos;s discuss how my experience can benefit your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1kMEYOEBtAt9vxFGJMNbqLsJsclJh5gya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
            >
              Download CV
            </a>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ExperienceContent;