'use client'

import { motion } from 'framer-motion'
import { ContactData } from '@/lib/types/portfolio'
import { ContactInfo } from './ContactInfo'
import { SocialLinks } from './SocialLinks'
import { ContactForm } from './ContactForm'

interface ContactContentProps {
  data: ContactData
  isInView: boolean
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

// Asymmetric column entrance
const leftColumnVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const rightColumnVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
}

export function ContactContent({ data, isInView }: ContactContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="space-y-16"
    >
      {/* Section Header */}
      <div className="space-y-8">
        <motion.span
          variants={itemVariants}
          className="editorial-label text-coral inline-flex"
        >
          Let&apos;s connect
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="font-editorial-tight text-bone text-[clamp(40px,5vw,68px)] leading-none font-bold tracking-tight"
        >
          Ready to build something{' '}
          <em className="font-editorial-serif font-medium italic">amazing</em>{' '}
          together
          <span className="text-coral">?</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="font-editorial-body text-bone/70 max-w-2xl text-base leading-relaxed"
        >
          {data.cta.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row"
        >
          {data.cta.buttons.map((button, index) => (
            <motion.button
              key={index}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`font-editorial-tight inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight shadow-lg transition-all hover:shadow-xl ${
                button.variant === 'primary'
                  ? 'bg-coral hover:bg-coral-soft text-white'
                  : 'border-line-soft bg-bone/10 text-bone hover:bg-bone/20 border'
              }`}
              onClick={() => {
                if (button.action === 'scroll-to-form') {
                  document
                    .getElementById('contact-form')
                    ?.scrollIntoView({ behavior: 'smooth' })
                } else if (button.action === 'download' && button.url) {
                  window.open(button.url, '_blank')
                }
              }}
            >
              {button.text}
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                variants={{
                  initial: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={{ duration: 0.18 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Main Content Grid - Asymmetric Entrance */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Column - Contact Info & Social */}
        <motion.div variants={leftColumnVariants} className="space-y-8">
          <ContactInfo info={data.info} isInView={isInView} />
          <SocialLinks links={data.social_links} isInView={isInView} />
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div variants={rightColumnVariants}>
          <ContactForm form={data.form} isInView={isInView} />
        </motion.div>
      </div>
    </motion.div>
  )
}
