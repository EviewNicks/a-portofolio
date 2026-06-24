'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AboutSectionData } from '@/lib/types/portfolio'
// import { AboutValues } from './AboutValues';
import aboutData from '@/docs/data/about-section.json'

interface AboutSectionProps {
  className?: string
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
  const { about } = aboutData as AboutSectionData

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <section
      id="about"
      className={cn(
        'relative overflow-hidden py-20 lg:py-32',
        'bg-paper text-ink',
        className
      )}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="bg-coral/5 absolute top-1/4 right-1/4 h-100 w-100 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-340 px-6">
        {/* Section Rule */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-line font-editorial-tight text-ink-faint mb-16 flex items-center justify-between border-t pt-4 text-[10.5px] tracking-[0.18em] uppercase"
        >
          <span className="font-editorial-serif text-coral text-sm font-medium italic">
            II.
          </span>
          <span className="flex items-center gap-2">
            <span>About / Manifesto</span>
            <span className="text-coral">·</span>
            <span>Ardiansyah / Volume 01</span>
          </span>
          <span>002 / 008</span>
        </motion.div>

        {/* Manifesto Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-full space-y-8"
        >
          <motion.span
            variants={itemVariants}
            className="font-editorial-tight text-coral before:bg-coral inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-4.5 before:content-['']"
          >
            About the studio
            <span className="text-ink-faint font-normal">· Nº 02</span>
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-editorial-tight text-ink text-4xl leading-[1.1] font-extrabold tracking-[-0.028em] md:text-5xl lg:text-6xl"
          >
            In an era of technical{' '}
            <em className="font-editorial-serif font-medium tracking-[-0.018em] italic">
              noise
            </em>
            , I build{' '}
            <em className="font-editorial-serif font-medium tracking-[-0.018em] italic">
              clarity
            </em>
            <span className="text-coral">.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-editorial-body text-ink-soft max-w-[72ch] text-base leading-[1.65] md:text-lg lg:text-xl"
          >
            I bridge the gap between cutting-edge{' '}
            <code className="font-editorial-mono bg-bone/80 border-line-soft text-coral rounded border px-1.5 py-0.5 text-sm">
              AI research
            </code>{' '}
            and scalable, production-ready web systems. Not a service provider —
            a{' '}
            <em className="font-editorial-serif font-medium italic">
              Precision Architect
            </em>{' '}
            who eliminates complexity and delivers what actually matters.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-editorial-body text-ink-mute max-w-[72ch] text-sm leading-[1.6] italic md:text-base"
          >
            &ldquo;{about.personal.philosophy}&rdquo;
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <Link
              href="/about"
              className="font-editorial-tight border-ink/20 hover:border-coral hover:text-coral text-ink inline-flex items-center gap-3 rounded-full border bg-transparent px-6 py-4 text-sm font-semibold transition-all"
            >
              Read full profile
              <span className="transition-transform group-hover:translate-x-1">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 fill-none stroke-current stroke-[1.6]"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Footer Row */}
          <motion.div
            variants={itemVariants}
            className="border-line text-ink-faint mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[10.5px] tracking-[0.18em] uppercase"
          >
            <span className="font-editorial-serif text-ink text-2xl font-extrabold italic">
              A
            </span>
            <span>Research · Precision · Engineering</span>
            <span className="text-right text-[10px] leading-relaxed">
              <span className="text-ink block font-semibold">
                Studio practice
              </span>
              <span>Est. MMXXVI</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
