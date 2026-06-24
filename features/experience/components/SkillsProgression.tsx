'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SkillProgression } from '@/lib/types/portfolio'

interface SkillsProgressionProps {
  skillsProgression: SkillProgression[]
  isInView: boolean
  className?: string
}

/**
 * SkillsProgression Component
 *
 * Interactive timeline visualization of skills development with editorial styling
 *
 * Features:
 * - Alternating left/right editorial timeline layout
 * - Interactive year selection (tab-like behavior)
 * - Skill tag hover effects (color shift + scale)
 * - Animated progress bars
 * - Connecting line animations
 * - Responsive design
 */
export const SkillsProgression: React.FC<SkillsProgressionProps> = ({
  skillsProgression,
  isInView,
  className,
}) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  return (
    <div className={cn('space-y-8', className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h3 className="font-editorial-tight text-ink mb-2 text-3xl font-bold">
          Skills Development Journey
        </h3>
        <p className="font-editorial-body text-ink">
          Evolution of technical skills and expertise over the years
        </p>
      </motion.div>

      {/* Skills Timeline */}
      <div className="relative mx-auto max-w-6xl">
        {/* Timeline Line - Vertical center line */}
        <div className="via-coral/40 from-coral/20 to-coral/20 absolute top-0 bottom-0 left-4 w-0.5 bg-linear-to-b md:left-1/2 md:-translate-x-0.5 md:transform" />

        {/* Timeline Entries */}
        <div className="space-y-12">
          {skillsProgression.map((yearData, index) => {
            const isSelected = selectedYear === yearData.year
            const isAnySelected = selectedYear !== null

            return (
              <motion.div
                key={yearData.year}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 50 : -50,
                  y: 20,
                }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="relative"
                onClick={() =>
                  setSelectedYear(isSelected ? null : yearData.year)
                }
              >
                {/* Year Indicator - Always centered with pulse animation */}
                <motion.div
                  animate={
                    isSelected
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isSelected ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.15 }}
                  className={cn(
                    'bg-coral text-ink/25 border-ink/20 absolute left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 text-sm font-bold shadow-lg transition-all md:left-1/2 md:-translate-x-1/2 md:transform',
                    isSelected && 'ring-coral/30 ring-4'
                  )}
                >
                  {yearData.year.includes('-')
                    ? yearData.year.split('-')[0].slice(-2) +
                      '-' +
                      yearData.year.split('-')[1].slice(-2)
                    : yearData.year.slice(-2)}
                </motion.div>

                {/* Content - Alternating left/right */}
                <div
                  className={cn(
                    'ml-16 md:ml-0 md:w-1/2',
                    index % 2 === 0
                      ? 'md:ml-auto md:pl-8'
                      : 'md:mr-auto md:pr-8'
                  )}
                >
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: '0 34px 70px -38px rgba(21, 20, 15, 0.32)',
                    }}
                    transition={{
                      duration: 0.28,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className={cn(
                      'bg-bone/95 border-line-soft max-w-md cursor-pointer rounded-[18px] border p-6 shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] transition-all',
                      index % 2 === 0 ? 'md:ml-0' : 'md:mr-0',
                      isSelected && 'border-coral/30 ring-coral/20 ring-2'
                    )}
                  >
                    {/* Year Title */}
                    <div className="mb-4">
                      <h4 className="font-editorial-tight text-ink mb-1 text-xl font-bold">
                        {yearData.year}
                      </h4>
                      <p className="font-editorial-body text-ink-faint text-sm">
                        {yearData.skills.length} new skill
                        {yearData.skills.length !== 1 ? 's' : ''} acquired
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {yearData.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            isInView
                              ? {
                                  opacity:
                                    isAnySelected && !isSelected ? 0.3 : 1,
                                  scale: isAnySelected && !isSelected ? 0.9 : 1,
                                }
                              : {}
                          }
                          transition={{
                            delay: index * 0.1 + skillIndex * 0.05,
                            duration: 0.3,
                          }}
                          whileHover={{
                            y: -4,
                            scale: 1.08,
                            backgroundColor: 'var(--coral)',
                            color: '#fff',
                          }}
                          className="bg-coral/10 text-coral border-coral/20 hover:bg-coral cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors hover:text-white"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="border-line/50 mt-4 border-t pt-4">
                      <div className="font-editorial-body text-ink-faint flex items-center justify-between text-xs">
                        <span>Skills Count</span>
                        <span className="font-semibold">
                          {yearData.skills.length}
                        </span>
                      </div>
                      <div className="bg-ink-faint/10 mt-2 h-1 w-full rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView
                              ? {
                                  width: `${Math.min((yearData.skills.length / 8) * 100, 100)}%`,
                                }
                              : {}
                          }
                          transition={{
                            delay: index * 0.1 + 0.5,
                            duration: 0.8,
                          }}
                          className="bg-coral h-1 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Connecting Line Animation */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: 0.5,
                  }}
                  className={cn(
                    'bg-coral/30 absolute top-5 hidden h-0.5 w-8 md:block',
                    index % 2 === 0 ? 'left-1/2 ml-5' : 'right-1/2 mr-5'
                  )}
                  style={{
                    transformOrigin: index % 2 === 0 ? 'left' : 'right',
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Interactive hint */}
        {selectedYear && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="font-editorial-body text-bone/60 mt-8 text-center text-sm"
          >
            Click year again to deselect · Viewing: {selectedYear}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SkillsProgression
