'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkillProgression } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';

interface SkillsProgressionProps {
  skillsProgression: SkillProgression[];
  className?: string;
}

/**
 * SkillsProgression Component
 * 
 * Visualizes skills development over time
 * 
 * Features:
 * - Timeline visualization of skill development
 * - Interactive year-by-year progression
 * - Skill tags with animations
 * - Responsive design for different screen sizes
 * - Visual representation of learning journey
 */
export const SkillsProgression: React.FC<SkillsProgressionProps> = ({
  skillsProgression,
  className,
}) => {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h3 className="text-3xl font-bold text-foreground mb-2">
          Skills Development Journey
        </h3>
        <p className="text-muted-foreground">
          Evolution of technical skills and expertise over the years
        </p>
      </motion.div>

      {/* Skills Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Entries */}
        <div className="space-y-8">
          {skillsProgression.map((yearData, index) => (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={cn(
                'relative flex items-center',
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              {/* Year Indicator */}
              <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold border-4 border-background z-10">
                {yearData.year.slice(-2)}
              </div>

              {/* Content */}
              <div className={cn(
                'ml-12 md:ml-0 flex-1',
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              )}>
                <GlassCard
                  variant="light"
                  className="p-6 max-w-md mx-auto md:mx-0"
                >
                  {/* Year Title */}
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-foreground mb-1">
                      {yearData.year}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {yearData.skills.length} new skills acquired
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {yearData.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + skillIndex * 0.05, 
                          duration: 0.3 
                        }}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Skills Count</span>
                      <span className="font-semibold">{yearData.skills.length}</span>
                    </div>
                    <div className="mt-2 w-full bg-muted/30 rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((yearData.skills.length / 8) * 100, 100)}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className="h-1 bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12"
      >
        <GlassCard variant="medium" className="p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
            Learning Journey Summary
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {skillsProgression.length}
              </div>
              <div className="text-sm text-muted-foreground">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {skillsProgression.reduce((total, year) => total + year.skills.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(skillsProgression.reduce((total, year) => total + year.skills.length, 0) / skillsProgression.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg/Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.max(...skillsProgression.map(year => year.skills.length))}
              </div>
              <div className="text-sm text-muted-foreground">Peak Year</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SkillsProgression;