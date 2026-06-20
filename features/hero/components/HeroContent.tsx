'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HeroData } from '@/lib/types/portfolio'
import Image from 'next/image'

interface HeroContentProps {
  heroData: HeroData
}

/**
 * HeroContent Component - Editorial Magazine Style
 *
 * Redesigned content layout with:
 * - 60-40 asymmetric split
 * - Mixed typography (regular + italic + bold)
 * - Editorial visual composition (collage-inspired)
 * - Numbered navigation system
 * - Feature badges instead of list
 * - Print-inspired animations
 */
export const HeroContent: React.FC<HeroContentProps> = ({ heroData }) => {
  // Animation variants - More subtle, editorial style
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  const itemTransition = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
      >
        {/* Left Column - Text Content (60%) */}
        <div className="space-y-8 lg:col-span-7">
          {/* Overline / Category */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="flex items-center gap-4"
          >
            <div className="bg-primary h-px w-12" />
            <span className="font-code text-muted-foreground text-xs tracking-wider uppercase">
              AI Engineer Portfolio
            </span>
          </motion.div>

          {/* Hero Headline - Mixed Typography */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="space-y-3"
          >
            <h1 className="font-display text-foreground text-4xl leading-tight font-normal md:text-5xl lg:text-6xl xl:text-7xl">
              Designing{' '}
              <span className="text-primary italic">intelligence</span> with
              <br />
              <span className="font-bold">skills</span>,{' '}
              <span className="font-light italic">taste</span>, and
              <br />
              <span className="font-code text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                code
              </span>
              <span className="text-primary">.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="max-w-xl"
          >
            <p className="font-body text-muted-foreground text-base leading-relaxed md:text-lg">
              {heroData.description}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 font-medium"
              onClick={() => {
                if (heroData.cta.primary.link.startsWith('#')) {
                  const element = document.querySelector(
                    heroData.cta.primary.link
                  )
                  element?.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.open(heroData.cta.primary.link, '_blank')
                }
              }}
            >
              {heroData.cta.primary.text}
              <span className="ml-2">→</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-foreground/20 hover:border-primary hover:bg-primary/5 hover:text-primary border-2 px-8 py-6 font-medium"
              onClick={() => {
                if (heroData.cta.secondary.link.startsWith('#')) {
                  const element = document.querySelector(
                    heroData.cta.secondary.link
                  )
                  element?.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.open(heroData.cta.secondary.link, '_blank')
                }
              }}
            >
              {heroData.cta.secondary.text}
              <span className="ml-2">⊕</span>
            </Button>
          </motion.div>

          {/* Feature Badges - Editorial Style */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="flex flex-wrap gap-4 pt-4"
          >
            <div className="border-foreground/10 flex items-center gap-2 rounded-full border px-4 py-2">
              <div className="bg-primary h-2 w-2 rounded-full" />
              <span className="font-code text-foreground/70 text-xs tracking-wide uppercase">
                AI Engineering
              </span>
            </div>
            <div className="border-foreground/10 flex items-center gap-2 rounded-full border px-4 py-2">
              <div className="bg-accent h-2 w-2 rounded-full" />
              <span className="font-code text-foreground/70 text-xs tracking-wide uppercase">
                Data-Centric
              </span>
            </div>
            <div className="border-foreground/10 flex items-center gap-2 rounded-full border px-4 py-2">
              <div className="bg-secondary h-2 w-2 rounded-full" />
              <span className="font-code text-foreground/70 text-xs tracking-wide uppercase">
                LLM Development
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Visual Composition (40%) */}
        <div className="relative lg:col-span-5">
          {/* Visual Collage Area */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="relative h-[500px] md:h-[600px] lg:h-[650px]"
          >
            {/* Main Image with Editorial Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="border-background absolute top-1/4 left-0 z-10 h-64 w-64 overflow-hidden rounded-lg border-4 shadow-2xl md:h-80 md:w-80"
            >
              <Image
                src={heroData.avatar.url}
                alt={heroData.avatar.alt}
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </motion.div>

            {/* Geometric Circle Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="bg-primary/20 absolute top-0 right-0 h-96 w-96 rounded-full"
            />

            {/* Floating Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="border-foreground/10 bg-background/90 absolute right-0 bottom-20 z-20 w-48 rounded-lg border p-4 shadow-lg backdrop-blur-sm"
            >
              <div className="space-y-2">
                <div className="font-display text-primary text-2xl font-bold">
                  05
                </div>
                <div className="font-body text-foreground/70 text-sm">
                  Semester Teknik Informatika
                </div>
              </div>
            </motion.div>

            {/* Numbered Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute top-1/3 right-0 space-y-3"
            >
              {['01', '02', '03', '04'].map((num, index) => (
                <div
                  key={num}
                  className="font-code text-foreground/40 flex items-center gap-2 text-xs"
                >
                  <span>{num}</span>
                  <div
                    className={`h-px w-8 ${index === 0 ? 'bg-primary' : 'bg-foreground/20'}`}
                  />
                </div>
              ))}
            </motion.div>

            {/* Label Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-4 left-4 space-y-1"
            >
              <div className="font-code text-primary text-xs tracking-wider uppercase">
                Detect
              </div>
              <div className="font-code text-accent text-xs tracking-wider uppercase">
                Discover
              </div>
              <div className="font-code text-foreground/50 text-xs tracking-wider uppercase">
                Direct
              </div>
              <div className="font-code text-secondary text-xs tracking-wider uppercase">
                Deliver
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Meta Info - Editorial Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="border-foreground/10 text-muted-foreground mt-16 flex flex-wrap items-center justify-between border-t pt-6 text-xs"
      >
        <div className="font-code tracking-wider uppercase">
          Portfolio Vol. 01 / Issue Nº 24
        </div>
        <div className="flex gap-6">
          <span>
            Status: <span className="text-primary">Active Internship</span>
          </span>
          <span className="hidden md:inline">Location: Indonesia</span>
        </div>
      </motion.div>
    </div>
  )
}
