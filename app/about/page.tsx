'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AboutSectionData } from '@/lib/types/portfolio'
import aboutData from '@/docs/data/about-section.json'

export default function AboutPage() {
  const { about } = aboutData as AboutSectionData

  const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASE_OUT_EXPO,
      },
    },
  }

  return (
    <div className="bg-paper text-ink selection:bg-coral/20 font-editorial-body min-h-screen pb-24">
      {/* 1. PAGE HEADER */}
      <section className="border-line border-b pt-24 pb-16 md:pt-32">
        <div className="container mx-auto max-w-340 px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="text-ink-faint font-editorial-tight mb-10 flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase"
          >
            <Link href="/" className="hover:text-coral transition-colors">
              Home
            </Link>
            <span className="text-coral">·</span>
            <span className="text-ink">About</span>
          </motion.div>

          {/* Section Rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="border-line font-editorial-tight text-ink-faint mb-16 flex origin-left items-center justify-between border-t pt-4 text-[10.5px] tracking-[0.18em] uppercase"
          >
            <span className="font-editorial-serif text-coral text-sm font-medium italic">
              I.
            </span>
            <span className="flex items-center gap-2">
              <span>About / Profile</span>
              <span className="text-coral">·</span>
              <span>Ardiansyah / Extended Profile</span>
            </span>
            <span>001 / 004</span>
          </motion.div>

          <div className="max-w-250 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="font-editorial-tight text-ink text-5xl leading-none font-extrabold tracking-[-0.028em] md:text-7xl lg:text-8xl"
            >
              The{' '}
              <em className="font-editorial-serif font-medium tracking-[-0.018em] italic">
                precision
              </em>{' '}
              architect<span className="text-coral">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
              className="text-ink-soft max-w-[56ch] text-lg leading-[1.6] font-light md:text-xl lg:text-2xl"
            >
              {about.personal.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-ink-faint font-editorial-tight flex flex-wrap items-center gap-4 pt-4 text-xs tracking-[0.18em] uppercase"
            >
              <span className="text-coral font-semibold">
                Available for engagement
              </span>
              <span>·</span>
              <span>{about.personal.location}</span>
              <span>·</span>
              <span>{about.personal.timezone}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BIO & PORTRAIT SECTION */}
      <section className="border-line border-b py-20 lg:py-32">
        <div className="container mx-auto max-w-340 px-6">
          <div className="border-line font-editorial-tight text-ink-faint mb-16 flex items-center justify-between border-t pt-4 text-[10.5px] tracking-[0.18em] uppercase">
            <span className="font-editorial-serif text-coral text-sm font-medium italic">
              II.
            </span>
            <span className="flex items-center gap-2">
              <span>Bio / Background</span>
              <span className="text-coral">·</span>
              <span>Research · Engineering</span>
            </span>
            <span>002 / 004</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left - Narrative Bio */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-6 lg:col-span-7"
            >
              <motion.span
                variants={itemVariants}
                className="font-editorial-tight text-coral before:bg-coral inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-4.5 before:content-['']"
              >
                Background
                <span className="text-ink-faint font-normal">· 01</span>
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="font-editorial-tight text-ink text-3xl leading-[1.1] font-bold tracking-[-0.022em] md:text-5xl"
              >
                Connecting research depth with
                <em className="font-editorial-serif font-medium italic">
                  practical execution
                </em>
                <span className="text-coral">.</span>
              </motion.h2>
              <motion.div
                variants={itemVariants}
                className="text-ink-soft space-y-6 text-base leading-[1.65]"
              >
                <p>
                  As a Computer Engineering student at Universitas Negeri
                  Makassar, my academic journey is centered on understanding the
                  foundational pillars of hardware-software co-design, machine
                  learning pipelines, and system architectures.
                </p>
                <p>
                  I spend my time exploring State-of-the-Art (SOTA) computer
                  vision architectures, OMR assessment logic, and recommendation
                  models. The focus is always on translating complex algorithms
                  into functional code, ensuring optimal memory limits, speed,
                  and real-world system performance.
                </p>
                <p>
                  My development philosophy is rooted in Swiss Minimalism: zero
                  complexity debt, high coherence, and clean layouts that value
                  content above all. Let&apos;s make systems clean, and make
                  them scale.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="pt-6">
                <Link
                  href="/#contact"
                  className="font-editorial-tight border-ink/20 hover:border-coral hover:text-coral text-ink inline-flex items-center gap-3 rounded-full border px-6 py-4 text-sm font-semibold transition-all"
                >
                  Start a conversation
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 fill-none stroke-current stroke-[1.6]"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Portrait Frame */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="relative lg:col-span-5"
            >
              <div className="bg-bone border-line-soft group relative aspect-3/4 w-full overflow-hidden rounded-2xl border shadow-lg">
                <Image
                  src="/images/profile/ardiansyah-professional - 2.png"
                  alt="Ardiansyah — Precision Architect"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />

                {/* Visual Corner Markers */}
                <div className="border-ink-faint/30 pointer-events-none absolute top-0 left-0 m-3 h-6 w-6 border-t border-l" />
                <div className="border-ink-faint/30 pointer-events-none absolute top-0 right-0 m-3 h-6 w-6 border-t border-r" />
                <div className="border-ink-faint/30 pointer-events-none absolute bottom-0 left-0 m-3 h-6 w-6 border-b border-l" />
                <div className="border-ink-faint/30 pointer-events-none absolute right-0 bottom-0 m-3 h-6 w-6 border-r border-b" />

                {/* Decorative Annotations */}
                <div className="text-ink-faint/80 font-editorial-mono pointer-events-none absolute top-4 left-10 text-[9px] font-medium tracking-widest uppercase">
                  FIG. 02 / ARDI-02
                </div>
                <div className="text-ink-faint/80 font-editorial-mono pointer-events-none absolute right-10 bottom-4 text-[9px] font-medium tracking-widest uppercase">
                  MMXXVI
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EDUCATION & ACHIEVEMENTS */}
      <section className="border-line border-b py-20 lg:py-32">
        <div className="container mx-auto max-w-340 px-6">
          <div className="border-line font-editorial-tight text-ink-faint mb-16 flex items-center justify-between border-t pt-4 text-[10.5px] tracking-[0.18em] uppercase">
            <span className="font-editorial-serif text-coral text-sm font-medium italic">
              III.
            </span>
            <span className="flex items-center gap-2">
              <span>Education & Milestones</span>
              <span className="text-coral">·</span>
              <span>Universitas Negeri Makassar</span>
            </span>
            <span>003 / 004</span>
          </div>

          <div className="mx-auto max-w-215 space-y-16">
            {/* Header Block at the Top */}
            <div className="space-y-6">
              <span className="font-editorial-tight text-coral before:bg-coral inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-4.5 before:content-['']">
                Academic & Milestones
                <span className="text-ink-faint font-normal">· 02</span>
              </span>
              <h2 className="font-editorial-tight text-ink text-3xl leading-[1.1] font-bold tracking-[-0.022em] md:text-5xl">
                Foundations &{' '}
                <em className="font-editorial-serif font-medium italic">
                  practical milestones
                </em>
                <span className="text-coral">.</span>
              </h2>
              <p className="text-ink-soft max-w-[56ch] text-base leading-relaxed">
                Bridging theoretical study at Universitas Negeri Makassar with
                AI engineering research, automated evaluation tools, and
                practical project builds.
              </p>
            </div>

            {/* Combined Timeline Block below */}
            <div className="before:bg-line-soft relative space-y-10 pl-4 before:absolute before:top-4 before:bottom-4 before:left-0 before:w-px before:content-[''] sm:pl-8">
              {/* Primary Education Card Node */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                className="group relative"
              >
                {/* Timeline Dot */}
                <div className="bg-coral border-paper absolute top-1.5 -left-5 h-3 w-3 rounded-full border-4 shadow-sm transition-transform duration-300 group-hover:scale-125 sm:-left-10" />

                <div className="bg-bone border-line-soft space-y-6 rounded-2xl border p-6 transition-all duration-300 hover:shadow-md sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="text-ink-faint mb-1 block text-[10px] font-bold tracking-widest uppercase">
                        Academic Program
                      </span>
                      <h4 className="font-editorial-tight text-ink text-xl leading-tight font-bold md:text-2xl">
                        {about.education.current.degree}
                      </h4>
                      <p className="text-coral font-editorial-tight mt-1 text-sm font-medium tracking-wider uppercase">
                        {about.education.current.institution}
                      </p>
                    </div>
                    <span className="text-ink-faint font-editorial-tight bg-paper border-line-soft rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase">
                      {about.education.current.period}
                    </span>
                  </div>

                  <div className="border-line-soft font-editorial-tight flex items-center justify-between border-t pt-4">
                    <span className="text-ink-soft text-xs tracking-wider uppercase">
                      Cumulative Performance
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-ink-faint font-editorial-tight mr-1 text-xs font-bold uppercase">
                        GPA:
                      </span>
                      <span className="font-editorial-serif text-coral text-3xl leading-none font-bold italic">
                        {about.education.current.gpa}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Achievements & Milestones List */}
              {about.education.achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative pl-2"
                >
                  {/* Timeline Dot */}
                  <div className="bg-ink-faint border-paper group-hover:bg-coral absolute top-1.5 -left-7.25 h-3 w-3 rounded-full border-4 shadow-sm transition-all duration-300 group-hover:scale-125 sm:-left-12" />

                  <div className="bg-bone/40 hover:bg-bone border-line-soft/60 hover:border-line-soft rounded-2xl border p-6 transition-all duration-300 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h4 className="font-editorial-tight text-ink group-hover:text-coral text-lg font-bold transition-colors">
                        {achievement.title}
                      </h4>
                      <span className="text-ink-faint font-editorial-tight text-[10.5px] tracking-widest uppercase">
                        {achievement.period}
                      </span>
                    </div>
                    <p className="text-ink-soft mt-3 max-w-[62ch] text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAREER OBJECTIVES & INTERESTS */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-340 px-6">
          <div className="border-line font-editorial-tight text-ink-faint mb-16 flex items-center justify-between border-t pt-4 text-[10.5px] tracking-[0.18em] uppercase">
            <span className="font-editorial-serif text-coral text-sm font-medium italic">
              IV.
            </span>
            <span className="flex items-center gap-2">
              <span>Objectives / Focus</span>
              <span className="text-coral">·</span>
              <span>Personal Interests</span>
            </span>
            <span>004 / 004</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            {/* Left - Objectives */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="font-editorial-tight text-coral before:bg-coral inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-4.5 before:content-['']">
                  Career Directions
                  <span className="text-ink-faint font-normal">· 04</span>
                </span>
                <h3 className="font-editorial-tight text-ink text-3xl leading-tight font-bold tracking-[-0.022em]">
                  Aspirations & objectives<span className="text-coral">.</span>
                </h3>
              </div>
              <div className="divide-line-soft border-line-soft divide-y border-t border-b">
                {about.career_objectives.map((objective, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group flex items-start gap-6 py-5 transition-all duration-300 hover:pl-2"
                  >
                    <span className="font-editorial-mono text-coral mt-1 text-[10px] font-medium tracking-wider">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-ink-soft group-hover:text-ink text-sm leading-relaxed transition-colors md:text-base">
                      {objective}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Interests */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="font-editorial-tight text-coral before:bg-coral inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-4.5 before:content-['']">
                  Research Spheres
                  <span className="text-ink-faint font-normal">· 05</span>
                </span>
                <h3 className="font-editorial-tight text-ink text-3xl leading-tight font-bold tracking-[-0.022em]">
                  Curiosity & focus<span className="text-coral">.</span>
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {about.personal.interests.map((interest, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-bone border-line-soft hover:border-coral/40 hover:bg-paper text-ink-soft hover:text-coral group flex cursor-default items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium transition-all select-none hover:shadow-sm"
                  >
                    <span className="bg-coral/30 group-hover:bg-coral h-1.5 w-1.5 rounded-full transition-colors duration-300" />
                    <span>{interest}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
