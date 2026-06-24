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
    <div className="min-h-screen bg-paper text-ink selection:bg-coral/20 pb-24 font-editorial-body">
      {/* 1. PAGE HEADER */}
      <section className="pt-24 md:pt-32 pb-16 border-b border-line">
        <div className="container mx-auto px-6 max-w-[1360px]">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-ink-faint mb-10 font-editorial-tight"
          >
            <Link href="/" className="hover:text-coral transition-colors">Home</Link>
            <span className="text-coral">·</span>
            <span className="text-ink">About</span>
          </motion.div>

          {/* Section Rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="border-t border-line pt-4 mb-16 flex justify-between items-center font-editorial-tight text-[10.5px] tracking-[0.18em] uppercase text-ink-faint origin-left"
          >
            <span className="font-editorial-serif italic text-coral text-sm font-medium">I.</span>
            <span className="flex items-center gap-2">
              <span>About / Profile</span>
              <span className="text-coral">·</span>
              <span>Ardiansyah / Extended Profile</span>
            </span>
            <span>001 / 004</span>
          </motion.div>

          <div className="max-w-[1000px] space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="font-editorial-tight font-extrabold tracking-[-0.028em] text-5xl md:text-7xl lg:text-8xl leading-[1.0] text-ink"
            >
              The <em className="font-editorial-serif italic font-medium tracking-[-0.018em]">precision</em> architect<span className="text-coral">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
              className="text-lg md:text-xl lg:text-2xl leading-[1.6] text-ink-soft max-w-[56ch] font-light"
            >
              {about.personal.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 text-xs tracking-[0.18em] uppercase text-ink-faint pt-4 font-editorial-tight"
            >
              <span className="text-coral font-semibold">Available for engagement</span>
              <span>·</span>
              <span>{about.personal.location}</span>
              <span>·</span>
              <span>{about.personal.timezone}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BIO & PORTRAIT SECTION */}
      <section className="py-20 lg:py-32 border-b border-line">
        <div className="container mx-auto px-6 max-w-[1360px]">
          <div className="border-t border-line pt-4 mb-16 flex justify-between items-center font-editorial-tight text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            <span className="font-editorial-serif italic text-coral text-sm font-medium">II.</span>
            <span className="flex items-center gap-2">
              <span>Bio / Background</span>
              <span className="text-coral">·</span>
              <span>Research · Engineering</span>
            </span>
            <span>002 / 004</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left - Narrative Bio */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-7 space-y-6"
            >
              <motion.span
                variants={itemVariants}
                className="font-editorial-tight text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-3 before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral"
              >
                Background<span className="text-ink-faint font-normal">· 01</span>
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="font-editorial-tight font-bold tracking-[-0.022em] text-3xl md:text-5xl leading-[1.1] text-ink"
              >
                Connecting research depth with <em className="font-editorial-serif italic font-medium">practical execution</em><span className="text-coral">.</span>
              </motion.h2>
              <motion.div variants={itemVariants} className="space-y-6 text-base text-ink-soft leading-[1.65]">
                <p>
                  As a Computer Engineering student at Universitas Negeri Makassar, my academic journey is centered on understanding the foundational pillars of hardware-software co-design, machine learning pipelines, and system architectures.
                </p>
                <p>
                  I spend my time exploring State-of-the-Art (SOTA) computer vision architectures, OMR assessment logic, and recommendation models. The focus is always on translating complex algorithms into functional code, ensuring optimal memory limits, speed, and real-world system performance.
                </p>
                <p>
                  My development philosophy is rooted in Swiss Minimalism: zero complexity debt, high coherence, and clean layouts that value content above all. Let's make systems clean, and make them scale.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="pt-6">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-full font-editorial-tight text-sm font-semibold border border-ink/20 hover:border-coral hover:text-coral transition-all text-ink"
                >
                  Start a conversation
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
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
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-bone border border-line-soft relative shadow-lg group">
                <Image
                  src="/images/profile/ardiansyah-professional - 2.png"
                  alt="Ardiansyah — Precision Architect"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_20%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  priority
                />
                
                {/* Visual Corner Markers */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-ink-faint/30 m-3 pointer-events-none" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-ink-faint/30 m-3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-ink-faint/30 m-3 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-ink-faint/30 m-3 pointer-events-none" />

                {/* Decorative Annotations */}
                <div className="absolute top-4 left-10 text-[9px] tracking-widest text-ink-faint/80 uppercase font-editorial-mono font-medium pointer-events-none">
                  FIG. 02 / ARDI-02
                </div>
                <div className="absolute bottom-4 right-10 text-[9px] tracking-widest text-ink-faint/80 uppercase font-editorial-mono font-medium pointer-events-none">
                  MMXXVI
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EDUCATION & ACHIEVEMENTS */}
      <section className="py-20 lg:py-32 border-b border-line">
        <div className="container mx-auto px-6 max-w-[1360px]">
          <div className="border-t border-line pt-4 mb-16 flex justify-between items-center font-editorial-tight text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            <span className="font-editorial-serif italic text-coral text-sm font-medium">III.</span>
            <span className="flex items-center gap-2">
              <span>Education & Milestones</span>
              <span className="text-coral">·</span>
              <span>Universitas Negeri Makassar</span>
            </span>
            <span>003 / 004</span>
          </div>

          <div className="max-w-[860px] mx-auto space-y-16">
            {/* Header Block at the Top */}
            <div className="space-y-6">
              <span className="font-editorial-tight text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-3 before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral">
                Academic & Milestones<span className="text-ink-faint font-normal">· 02</span>
              </span>
              <h2 className="font-editorial-tight font-bold tracking-[-0.022em] text-3xl md:text-5xl leading-[1.1] text-ink">
                Foundations & <em className="font-editorial-serif italic font-medium">practical milestones</em><span className="text-coral">.</span>
              </h2>
              <p className="text-base text-ink-soft leading-relaxed max-w-[56ch]">
                Bridging theoretical study at Universitas Negeri Makassar with AI engineering research, automated evaluation tools, and practical project builds.
              </p>
            </div>

            {/* Combined Timeline Block below */}
            <div className="space-y-10 relative pl-4 sm:pl-8 before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[1px] before:bg-line-soft">
              {/* Primary Education Card Node */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[21px] sm:-left-[41px] top-1.5 w-3 h-3 rounded-full bg-coral border-4 border-paper group-hover:scale-125 transition-transform duration-300 shadow-sm" />
                
                <div className="p-6 sm:p-8 rounded-2xl bg-bone border border-line-soft space-y-6 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] tracking-widest text-ink-faint uppercase font-bold block mb-1">Academic Program</span>
                      <h4 className="font-editorial-tight font-bold text-xl md:text-2xl text-ink leading-tight">
                        {about.education.current.degree}
                      </h4>
                      <p className="text-coral font-medium text-sm font-editorial-tight tracking-wider uppercase mt-1">
                        {about.education.current.institution}
                      </p>
                    </div>
                    <span className="text-[11px] tracking-widest text-ink-faint uppercase font-editorial-tight bg-paper px-3 py-1.5 rounded-full border border-line-soft">
                      {about.education.current.period}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-line-soft pt-4 font-editorial-tight">
                    <span className="text-xs text-ink-soft tracking-wider uppercase">Cumulative Performance</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-ink-faint uppercase font-bold mr-1 font-editorial-tight">GPA:</span>
                      <span className="text-3xl font-editorial-serif italic font-bold text-coral leading-none">{about.education.current.gpa}</span>
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
                  className="relative group pl-2"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[29px] sm:-left-[49px] top-1.5 w-3 h-3 rounded-full bg-ink-faint border-4 border-paper group-hover:bg-coral group-hover:scale-125 transition-all duration-300 shadow-sm" />
                  
                  <div className="p-6 sm:p-8 rounded-2xl bg-bone/40 hover:bg-bone border border-line-soft/60 hover:border-line-soft transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <h4 className="font-editorial-tight font-bold text-lg text-ink group-hover:text-coral transition-colors">
                        {achievement.title}
                      </h4>
                      <span className="text-[10.5px] tracking-widest text-ink-faint uppercase font-editorial-tight">
                        {achievement.period}
                      </span>
                    </div>
                    <p className="text-sm text-ink-soft mt-3 leading-relaxed max-w-[62ch]">
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
        <div className="container mx-auto px-6 max-w-[1360px]">
          <div className="border-t border-line pt-4 mb-16 flex justify-between items-center font-editorial-tight text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            <span className="font-editorial-serif italic text-coral text-sm font-medium">IV.</span>
            <span className="flex items-center gap-2">
              <span>Objectives / Focus</span>
              <span className="text-coral">·</span>
              <span>Personal Interests</span>
            </span>
            <span>004 / 004</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Objectives */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="font-editorial-tight text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-3 before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral">
                  Career Directions<span className="text-ink-faint font-normal">· 04</span>
                </span>
                <h3 className="font-editorial-tight font-bold tracking-[-0.022em] text-3xl leading-tight text-ink">
                  Aspirations & objectives<span className="text-coral">.</span>
                </h3>
              </div>
              <div className="divide-y divide-line-soft border-t border-b border-line-soft">
                {about.career_objectives.map((objective, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="py-5 flex items-start gap-6 group hover:pl-2 transition-all duration-300"
                  >
                    <span className="font-editorial-mono text-[10px] tracking-wider text-coral font-medium mt-1">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base text-ink-soft group-hover:text-ink transition-colors leading-relaxed">
                      {objective}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Interests */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="font-editorial-tight text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-3 before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral">
                  Research Spheres<span className="text-ink-faint font-normal">· 05</span>
                </span>
                <h3 className="font-editorial-tight font-bold tracking-[-0.022em] text-3xl leading-tight text-ink">
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
                    className="px-5 py-3 bg-bone border border-line-soft hover:border-coral/40 hover:bg-paper hover:shadow-sm text-ink-soft hover:text-coral transition-all rounded-xl text-sm font-medium cursor-default select-none flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral/30 group-hover:bg-coral transition-colors duration-300" />
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
