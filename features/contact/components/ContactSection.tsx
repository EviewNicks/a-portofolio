'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ContactSectionData } from '@/lib/types/portfolio'
import { ContactContent } from './ContactContent'

interface ContactSectionProps {
  data: ContactSectionData
  className?: string
}

export function ContactSection({ data, className = '' }: ContactSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative mx-4 my-16 sm:mx-8 lg:mx-16 ${className}`}
    >
      {/* Editorial Dark Background Container */}
      <div className="bg-ink text-paper relative overflow-hidden rounded-[32px]">
        {/* Editorial Noise Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>")`,
            backgroundSize: '240px 240px',
          }}
        />

        <div className="relative z-10 container mx-auto px-8 py-20 sm:px-12 lg:px-16 lg:py-28">
          {/* Section Rule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="border-line-soft font-editorial-tight text-bone/55 mb-12 flex flex-col items-start justify-between gap-3 border-t pt-5 text-[10.5px] tracking-[0.18em] uppercase sm:flex-row sm:items-center lg:mb-16"
          >
            <span className="font-editorial-serif text-coral text-sm tracking-wider normal-case italic">
              VIII.
            </span>
            <span className="hidden sm:inline">
              Get In Touch · Let&apos;s Collaborate
            </span>
            <span className="hidden lg:inline">Available for Projects</span>
          </motion.div>

          {/* Contact Content */}
          <ContactContent data={data.contact} isInView={isInView} />
        </div>

        {/* Section Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="container mx-auto mt-16"
        >
          <div className="via-coral/30 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
