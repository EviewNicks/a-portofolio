'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HeroData } from '@/lib/types/portfolio'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroContentProps {
  heroData: HeroData
}

/**
 * HeroContent Component - Editorial Magazine Style
 * 
 * Re-designed hero layout with:
 * - 12-column asymmetric grid for top content (7/12 copy, 5/12 avatar frame)
 * - Section rule (`sec-rule`) at the top
 * - Mixed display typography (Playfair serif italic + sans-serif)
 * - Full-width custom circular stats with rings (outside the grid)
 * - Full-width coordinates & metadata footer (outside the grid)
 * - Editorial image frame with corner decorators and vertical side ribbon
 * - Staggered Framer Motion entrance transitions
 */
export const HeroContent: React.FC<HeroContentProps> = ({ heroData }) => {
  const easeOutExpo = [0.22, 1, 0.36, 1] as [number, number, number, number]

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 28 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOutExpo,
      },
    },
  }

  const avatarVariants = {
    initial: { opacity: 0, scale: 0.96, y: 15 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOutExpo,
      },
    },
  }

  return (
    <div className="container mx-auto px-6 md:px-8 lg:px-16 w-full flex flex-col justify-between py-4">
      {/* 1. Section Header Rule */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, ease: easeOutExpo }}
        className="w-full border-t border-line pt-[18px] mb-12 flex justify-between items-center text-[10.5px] tracking-[0.18em] uppercase text-ink-faint font-sans origin-left"
      >
        <span className="roman font-serif italic text-coral text-sm"></span>
        <span className="flex items-center gap-[26px]">
          <span>Precision Architect</span>
          <span className="text-coral">·</span>
          <span>{heroData.name} / Volume 01</span>
        </span>
        <span>001 / 008</span>
      </motion.div>

      {/* 2. Parent Stagger Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-12"
      >
        {/* 2.1 Main Content Grid (Left Copy / Right Avatar) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column - Copy (7/12) */}
          <div className="space-y-8 lg:col-span-7">
            {/* Overline Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral flex items-center gap-3">
                <span className="inline-block w-[18px] h-[1px] bg-coral" />
                {heroData.label}
                <span className="font-medium text-ink-faint ml-1">{heroData.labelIx}</span>
              </span>
            </motion.div>

            {/* Editorial Display Heading */}
            <motion.h1 
              variants={itemVariants} 
              className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-[1.0] text-[clamp(44px,5.2vw,88px)]"
            >
              {heroData.heading}{' '}
              <em className="font-serif italic font-medium tracking-[-0.018em]">
                {heroData.headingEm}
              </em>
              <span className="text-coral">{heroData.headingDot}</span>
            </motion.h1>

            {/* Lead Description */}
            <motion.p 
              variants={itemVariants} 
              className="font-body text-base leading-[1.55] text-ink-soft max-w-[52ch]"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                size="lg"
                className="bg-coral text-white border border-transparent shadow-[0_14px_26px_-16px_rgba(237,111,92,1)] hover:-translate-y-[1px] hover:bg-[#e25e4a] hover:shadow-[0_18px_32px_-12px_rgba(237,111,92,1.2)] active:scale-[0.98] rounded-full px-[22px] py-[14px] font-sans font-medium text-sm flex items-center gap-[12px] transition-all duration-200 cursor-pointer h-auto"
                onClick={() => {
                  const element = document.querySelector(heroData.cta.primary.link)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {heroData.cta.primary.text}
                <span className="inline-flex w-4 h-4 items-center justify-center">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.6] transition-transform duration-200 group-hover:translate-x-1"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>
                </span>
              </Button>

              <Button
                variant="ghost"
                className="bg-transparent text-ink border border-[rgba(21,20,15,0.2)] hover:bg-[rgba(21,20,15,0.04)] rounded-full px-[22px] py-[14px] font-sans font-medium text-sm flex items-center gap-[12px] transition-all duration-200 cursor-pointer h-auto"
                onClick={() => {
                  window.open(heroData.cta.secondary.link, '_blank')
                }}
              >
                {heroData.cta.secondary.text}
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Avatar Visual Container (5/12) */}
          <div className="relative lg:col-span-5 flex items-center justify-center lg:justify-end">
            {/* Subtle Decorative Circle behind Avatar */}
            <div className="absolute top-[10%] right-[10%] -z-10 h-72 w-72 rounded-full bg-coral/5 blur-3xl" />

            {/* Editorial Frame Container with Corner Markers */}
            <motion.div 
              variants={avatarVariants}
              className="relative aspect-square w-full max-w-[420px]"
            >
              {/* Corner Decorators */}
              <div className="absolute w-[22px] h-[22px] border-t border-l border-line top-0 left-0" />
              <div className="absolute w-[22px] h-[22px] border-t border-r border-line top-0 right-0" />
              <div className="absolute w-[22px] h-[22px] border-b border-l border-line bottom-0 left-0" />
              <div className="absolute w-[22px] h-[22px] border-b border-r border-line bottom-0 right-0" />
              
              {/* Vertical Editorial Ribbon */}
              <span className="absolute right-[-42px] top-[40%] font-sans text-[10.5px] tracking-[0.42em] uppercase text-ink-faint [writing-mode:vertical-rl] rotate-180 whitespace-nowrap select-none hidden sm:block">
                <b className="text-coral">ARDI</b> &nbsp;·&nbsp; AI SYSTEM ARCHITECT &nbsp;·&nbsp; MMXXVI
              </span>
              
              {/* Main Avatar Card Frame */}
              <motion.div
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="w-full h-full p-[14px] bg-bone border border-line-soft rounded-[18px] shadow-lg flex flex-col justify-between select-none"
              >
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden border border-line-soft bg-paper-dark">
                  <Image
                    src={heroData.avatar.url}
                    alt={heroData.avatar.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-out scale-[1.01]"
                  />
                </div>
                <div className="flex justify-between items-center mt-3 text-[11px] tracking-wider uppercase font-sans text-ink-faint font-semibold">
                  <span>Plate Nº 01 · Avatar</span>
                  <span className="text-coral">Active Internship</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* 2.2 Stats Cards (Full Width) */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
        >
          {heroData.stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-[10px] whitespace-nowrap"
            >
              <span
                className={cn(
                  "w-[34px] h-[34px] rounded-full flex items-center justify-center font-sans text-[11px] font-bold shrink-0 border",
                  stat.ringType === 'solid' 
                    ? "border-solid border-ink text-ink" 
                    : "border-dashed border-coral text-coral"
                )}
              >
                {stat.value}
              </span>
              <span className="font-sans text-[11px] leading-[1.25] text-ink-soft tracking-wider uppercase">
                <b className="block font-bold text-ink text-[12px]">{stat.label}</b>
                {stat.labelDetails}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* 2.3 Coordinates & Bottom Meta Footer (Full Width) */}
        <motion.div 
          variants={itemVariants}
          className="pt-[22px] border-t border-line flex items-center justify-between gap-6"
        >
          <span className="font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            {heroData.bottomMeta}
          </span>
          <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">
            {heroData.coordinates}
          </span>
        </motion.div>

      </motion.div>
    </div>
  )
}
