'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ExperienceSectionData } from '@/lib/types/portfolio'
import { ExperienceContent } from './ExperienceContent'
import experienceData from '@/docs/data/experience-section.json'

interface ExperienceSectionProps {
  className?: string
}

/**
 * ExperienceSection Component
 *
 * Editorial-styled experience section with professional timeline
 *
 * Features:
 * - Dark editorial background with noise texture
 * - Section rule header (Roman numeral VII)
 * - Timeline display in chronological order
 * - Interactive expandable cards
 * - Skills progression visualization
 * - Premium animations with viewport triggers
 * - Responsive layout
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  className,
}) => {
  const { experience } = experienceData as ExperienceSectionData
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="experience"
      ref={ref}
      className={cn('relative mx-16 my-24', className)}
    >
      {/* Editorial Warm Background Container */}
      <div className="bg-paper text-ink relative overflow-hidden rounded-[32px] px-16 py-28">
        {/* Editorial Noise Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>")`,
            backgroundSize: '240px 240px',
          }}
        />

        <div className="relative z-10 container mx-auto">
          {/* Section Rule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="border-line-soft font-editorial-tight text-ink-faint mb-16 flex items-center justify-between border-t pt-4 text-[10.5px] tracking-[0.18em] uppercase"
          >
            <span className="font-editorial-serif text-coral text-sm tracking-normal normal-case italic">
              VII.
            </span>
            <span>Professional Journey · 2023 – Present</span>
            <span>Experience Timeline</span>
          </motion.div>

          {/* Main Experience Content */}
          <ExperienceContent experienceData={experience} isInView={isInView} />
        </div>

        {/* Section Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="container mx-auto mt-16"
        >
          <div className="via-coral/30 h-px w-full bg-linear-to-r from-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
