'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ExperienceData } from '@/lib/types/portfolio'
import { TimelineEntry } from './TimelineEntry'
import { SkillsProgression } from './SkillsProgression'

interface ExperienceContentProps {
  experienceData: ExperienceData
  isInView: boolean
  className?: string
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const, // --ease-out-expo
    },
  },
}

/**
 * ExperienceContent Component
 *
 * Main content component for experience section with editorial styling
 *
 * Features:
 * - Editorial typography and spacing
 * - Animated stats with counter effect
 * - Timeline display with stagger animations
 * - Skills progression visualization
 * - Viewport-triggered animations
 */
export const ExperienceContent: React.FC<ExperienceContentProps> = ({
  experienceData,
  isInView,
  className,
}) => {
  // Sort timeline entries by date (most recent first)
  const sortedTimeline = [...experienceData.timeline].sort((a, b) => {
    const getYear = (dateStr: string) => {
      const match = dateStr.match(/(\d{4})/)
      return match ? parseInt(match[1]) : 0
    }

    const yearA = getYear(a.date)
    const yearB = getYear(b.date)

    if (a.status === 'current' && b.status !== 'current') return -1
    if (b.status === 'current' && a.status !== 'current') return 1

    return yearB - yearA
  })

  // Counter animation for stats
  const [projectsCount, setProjectsCount] = useState(0)
  const targetProjects = 8

  useEffect(() => {
    if (!isInView) return

    const duration = 1200
    const startTime = Date.now()

    const counter = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      setProjectsCount(Math.floor(progress * targetProjects))

      if (progress < 1) {
        requestAnimationFrame(counter)
      }
    }

    requestAnimationFrame(counter)
  }, [isInView])

  return (
    <div className={cn('', className)}>
      {/* Section Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-16"
      >
        <motion.span
          variants={itemVariants}
          className="editorial-label text-coral mb-8 inline-flex"
        >
          Professional experience
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="font-editorial-tight text-ink mb-6 text-[clamp(40px,4.8vw,64px)] leading-none font-bold tracking-tight"
        >
          A journey of continuous{' '}
          <em className="font-editorial-serif font-medium italic">learning</em>{' '}
          and{' '}
          <em className="font-editorial-serif font-medium italic">growth</em>
          <span className="text-coral">.</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="font-editorial-body text-ink-soft max-w-2xl text-base leading-relaxed"
        >
          From academic foundations to hands-on projects, each experience has
          shaped my approach to building intelligent, scalable solutions.
        </motion.p>
      </motion.div>

      {/* Experience Summary - Editorial Stats Rings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-20"
      >
        <div className="bg-bone/95 border-line-soft rounded-[18px] border p-8 shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)]">
          <h3 className="font-editorial-tight text-ink mb-6 text-center text-2xl font-bold">
            Experience Overview
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {/* Total Experience */}
            <div className="text-center">
              <div className="border-ink mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed">
                <span className="font-editorial-tight text-coral text-sm font-bold">
                  3+
                </span>
              </div>
              <div className="font-editorial-tight text-ink-faint text-[10.5px] tracking-[0.14em] uppercase">
                Years Learning
              </div>
            </div>

            {/* Education */}
            <div className="text-center">
              <div className="border-coral mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2">
                <span className="font-editorial-tight text-coral text-sm font-bold">
                  6th
                </span>
              </div>
              <div className="font-editorial-tight text-ink-faint text-[10.5px] tracking-[0.14em] uppercase">
                Semester
              </div>
            </div>

            {/* Work Experience */}
            <div className="text-center">
              <div className="border-ink mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2">
                <span className="font-editorial-tight text-ink text-sm font-bold">
                  2026
                </span>
              </div>
              <div className="font-editorial-tight text-ink-faint text-[10.5px] tracking-[0.14em] uppercase">
                Active
              </div>
            </div>

            {/* Projects */}
            <div className="text-center">
              <div className="border-coral mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed">
                <motion.span
                  key={projectsCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-editorial-tight text-coral text-sm font-bold"
                >
                  {projectsCount}+
                </motion.span>
              </div>
              <div className="font-editorial-tight text-ink-faint text-[10.5px] tracking-[0.14em] uppercase">
                Projects
              </div>
            </div>

            {/* Certifications */}
            <div className="text-center">
              <div className="border-ink mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2">
                <span className="font-editorial-tight text-ink text-sm font-bold">
                  •
                </span>
              </div>
              <div className="font-editorial-tight text-ink-faint text-[10.5px] tracking-[0.14em] uppercase">
                In Progress
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-20"
      >
        <div className="mb-12 text-center">
          <h3 className="font-editorial-tight text-ink mb-2 text-3xl font-bold">
            Career Timeline
          </h3>
          <p className="font-editorial-body text-ink-mute">
            Chronological overview of educational and professional milestones
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="mx-auto max-w-4xl">
          {sortedTimeline.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === sortedTimeline.length - 1}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>

      {/* Skills Progression */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-20"
      >
        <SkillsProgression
          skillsProgression={experienceData.skills_progression}
          isInView={isInView}
        />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center"
      >
        <div className="bg-bone/95 border-line-soft mx-auto max-w-2xl rounded-[18px] border p-8 shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)]">
          <h3 className="font-editorial-tight text-ink mb-4 text-2xl font-bold">
            Ready for New Opportunities
          </h3>
          <p className="font-editorial-body text-ink-soft mb-6">
            I&apos;m always excited to take on new challenges and contribute to
            innovative projects. Let&apos;s discuss how my experience can
            benefit your team.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-coral hover:bg-coral-soft font-editorial-tight rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1kMEYOEBtAt9vxFGJMNbqLsJsclJh5gya"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-line font-editorial-tight hover:bg-ink-faint/5 text-ink rounded-full border px-6 py-3 font-semibold transition-all"
            >
              Download CV
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ExperienceContent
