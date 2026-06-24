'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SocialLink } from '@/lib/types/portfolio'
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
  BookOpen,
  Code,
  HelpCircle,
} from 'lucide-react'

interface SocialLinksProps {
  links: SocialLink[]
  isInView?: boolean
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  medium: BookOpen,
  dev: Code,
  stackoverflow: HelpCircle,
}

export function SocialLinks({ links, isInView = true }: SocialLinksProps) {
  const publicLinks = links.filter(link => link.isPublic)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <div className="bg-bone border-line-soft editorial-shadow rounded-[18px] border p-6">
      <h4 className="font-editorial-tight text-ink mb-6 text-xl font-bold tracking-tight">
        Connect With Me
      </h4>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-3"
      >
        {publicLinks.map((link, index) => {
          const Icon =
            iconMap[link.platform as keyof typeof iconMap] || ExternalLink

          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                x: 5,
                transition: { duration: 0.18 },
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-paper/30 border-line-faint hover:border-line-soft group flex items-center gap-4 rounded-[14px] border p-4 transition-all duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <motion.div
                className="bg-paper text-ink-mute group-hover:text-coral rounded-lg p-2 transition-colors duration-180"
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  transition: { duration: 0.18 },
                }}
              >
                <Icon size={20} />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-editorial-tight text-ink font-semibold tracking-tight capitalize">
                    {link.platform}
                  </h5>
                  <span className="font-editorial-body text-ink-faint text-xs">
                    @{link.username}
                  </span>
                </div>
                <p className="font-editorial-body text-ink-soft group-hover:text-ink text-sm transition-colors duration-180">
                  {link.description}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
              >
                <ExternalLink
                  size={16}
                  className="text-ink-mute group-hover:text-coral transition-colors"
                />
              </motion.div>
            </motion.a>
          )
        })}
      </motion.div>

      {/* Social Stats or Additional Info */}
      <div className="border-line-faint mt-6 border-t pt-4">
        <p className="font-editorial-body text-ink-mute text-center text-sm">
          Follow me for updates on projects, tech insights, and industry
          discussions
        </p>
      </div>
    </div>
  )
}
