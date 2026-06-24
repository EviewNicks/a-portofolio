'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AboutSectionData } from '@/lib/types/portfolio'
import { AboutContent } from './AboutContent'
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
        'relative py-20 lg:py-32 overflow-hidden',
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
          className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-coral/5 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 max-w-[1360px]">
        {/* Section Rule */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-line pt-4 mb-16 flex justify-between items-center font-editorial-tight text-[10.5px] tracking-[0.18em] uppercase text-ink-faint"
        >
          <span className="font-editorial-serif italic text-coral text-sm font-medium">II.</span>
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
            className="font-editorial-tight text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-3 before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral"
          >
            About the studio<span className="text-ink-faint font-normal">· Nº 02</span>
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-editorial-tight font-extrabold tracking-[-0.028em] text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
          >
            In an era of technical <em className="font-editorial-serif italic font-medium tracking-[-0.018em]">noise</em>, I build <em className="font-editorial-serif italic font-medium tracking-[-0.018em]">clarity</em><span className="text-coral">.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-editorial-body text-base md:text-lg lg:text-xl leading-[1.65] text-ink-soft max-w-[72ch]"
          >
            I bridge the gap between cutting-edge <code className="font-editorial-mono text-sm bg-bone/80 border border-line-soft px-1.5 py-0.5 rounded text-coral">AI research</code> and scalable, production-ready web systems.
            Not a service provider — a <em className="font-editorial-serif italic font-medium">Precision Architect</em> who eliminates complexity and delivers what actually matters.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-editorial-body text-sm md:text-base leading-[1.6] text-ink-mute max-w-[72ch] italic"
          >
            "{about.personal.philosophy}"
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full font-editorial-tight text-sm font-semibold border border-ink/20 hover:border-coral hover:text-coral transition-all text-ink bg-transparent"
            >
              Read full profile
              <span className="transition-transform group-hover:translate-x-1">
                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Footer Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between border-t border-line pt-6 mt-16 text-[10.5px] tracking-[0.18em] uppercase text-ink-faint gap-4"
          >
            <span className="font-editorial-serif italic text-2xl text-ink font-extrabold">A</span>
            <span>Research · Precision · Engineering</span>
            <span className="text-right text-[10px] leading-relaxed">
              <span className="block text-ink font-semibold">Studio practice</span>
              <span>Est. MMXXVI</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection;
