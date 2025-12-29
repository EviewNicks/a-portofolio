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
      <div className="relative max-w-6xl mx-auto">
        {/* Timeline Line - Vertical center line */}
        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

        {/* Timeline Entries */}
        <div className="space-y-12">
          {skillsProgression.map((yearData, index) => (
            <motion.div
              key={yearData.year}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? 50 : -50, // Slide from right for odd, left for even
                y: 20 
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Year Indicator - Always centered */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold border-4 border-background z-10 shadow-lg">
                {yearData.year.includes('-') ? yearData.year.split('-')[0].slice(-2) + '-' + yearData.year.split('-')[1].slice(-2) : yearData.year.slice(-2)}
              </div>

              {/* Content - Alternating left/right */}
              <div className={cn(
                'ml-16 md:ml-0 md:w-1/2',
                // Ganjil (0, 2, 4) = kanan, Genap (1, 3, 5) = kiri
                index % 2 === 0 
                  ? 'md:ml-auto md:pl-8' // Kanan
                  : 'md:mr-auto md:pr-8' // Kiri
              )}>
                <GlassCard
                  variant="light"
                  className={cn(
                    "p-6 max-w-md",
                    // Animation direction based on position
                    index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'
                  )}
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

              {/* Connecting Line Animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className={cn(
                  "hidden md:block absolute top-5 w-8 h-0.5 bg-primary/30",
                  index % 2 === 0 
                    ? "left-1/2 ml-5" // Kanan - line dari center ke kanan
                    : "right-1/2 mr-5" // Kiri - line dari center ke kiri
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SkillsProgression;