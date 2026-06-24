'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ExperienceEntry } from '@/lib/types/portfolio'

interface TimelineEntryProps {
  entry: ExperienceEntry
  index: number
  isLast?: boolean
  isInView: boolean
  className?: string
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'education':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    case 'work':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    case 'project':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'education':
      return '🎓'
    case 'work':
      return '💼'
    case 'project':
      return '🚀'
    default:
      return '📋'
  }
}

const formatTypeName = (type: string) => {
  switch (type) {
    case 'education':
      return 'Education'
    case 'work':
      return 'Work'
    case 'project':
      return 'Project'
    default:
      return type
  }
}

const expandedVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
}

/**
 * TimelineEntry Component
 *
 * Individual timeline entry with expandable details and editorial styling
 *
 * Features:
 * - Editorial card styling with proper depth
 * - Enhanced hover animations (lift + shadow + border glow)
 * - Expandable content with staggered list animations
 * - Pulsing icon animation
 * - Responsive timeline design
 */
export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  index,
  isLast = false,
  isInView,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn('relative flex items-start space-x-4', className)}
    >
      {/* Timeline Line and Icon */}
      <div className="flex flex-col items-center">
        {/* Timeline Icon with Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.15,
            rotate: 180,
            transition: { duration: 0.4 },
          }}
          className={cn(
            'bg-coral text-paper border-ink/20 flex h-12 w-12 items-center justify-center rounded-full border-4 text-xl shadow-lg'
          )}
        >
          {getTypeIcon(entry.type)}
        </motion.div>

        {/* Timeline Line */}
        {!isLast && <div className="border-bone/20 mt-2 h-16 w-0.5 border-l" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <motion.div
          whileHover={{
            y: -8,
            boxShadow: '0 34px 70px -38px rgba(21, 20, 15, 0.32)',
            borderColor: 'rgba(237, 111, 92, 0.3)',
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 0.28,
            ease: [0.25, 1, 0.5, 1], // --ease-out-quart
          }}
          className="bg-bone/95 border-line-soft hover:shadow-editorial group cursor-pointer rounded-[18px] border p-6 shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="font-editorial-tight text-ink group-hover:text-coral mb-1 text-xl font-bold transition-colors">
                  {entry.title}
                </h3>
                <p className="font-editorial-tight text-coral text-lg font-semibold">
                  {entry.organization}
                </p>
                <p className="font-editorial-body text-ink-soft text-sm">
                  {entry.location}
                </p>
              </div>
              <div className="text-right">
                <p className="font-editorial-tight text-ink mb-2 text-sm font-medium">
                  {entry.date}
                </p>
                <div className="flex flex-col space-y-1">
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      getTypeColor(entry.type)
                    )}
                  >
                    {formatTypeName(entry.type)}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      entry.status === 'current'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {entry.status === 'current' ? 'Current' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="font-editorial-body text-ink-soft leading-relaxed">
              {entry.description}
            </p>
          </div>

          {/* Technologies Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {entry.technologies.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  whileHover={{
                    y: -4,
                    scale: 1.08,
                    backgroundColor: 'var(--coral)',
                    color: '#fff',
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-paper-warm text-ink border-line-soft cursor-pointer rounded-md border px-2 py-1 text-xs"
                >
                  {tech}
                </motion.span>
              ))}
              {entry.technologies.length > 4 && (
                <span className="bg-paper-warm text-ink-faint border-line-soft rounded-md border px-2 py-1 text-xs">
                  +{entry.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-line/50 mt-4 border-t pt-4"
              >
                {/* Details */}
                {entry.details.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-editorial-tight text-ink mb-2 font-semibold">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1">
                      {entry.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          variants={expandedVariants}
                          initial="hidden"
                          animate="visible"
                          custom={detailIndex}
                          className="font-editorial-body text-ink-soft flex items-start text-sm"
                        >
                          <span className="text-coral mr-2">•</span>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {entry.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-editorial-tight text-ink mb-2 font-semibold">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {entry.achievements.map(
                        (achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            variants={expandedVariants}
                            initial="hidden"
                            animate="visible"
                            custom={achievementIndex + entry.details.length}
                            className="font-editorial-body text-ink-soft flex items-start text-sm"
                          >
                            <span className="mr-2 text-green-600">✓</span>
                            {achievement}
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* All Technologies */}
                <div className="mb-4">
                  <h4 className="font-editorial-tight text-ink mb-2 font-semibold">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        variants={expandedVariants}
                        initial="hidden"
                        animate="visible"
                        custom={techIndex}
                        whileHover={{
                          y: -4,
                          scale: 1.08,
                          backgroundColor: 'var(--coral)',
                          color: '#fff',
                        }}
                        transition={{ duration: 0.2 }}
                        className="bg-paper-warm text-ink border-line-soft cursor-pointer rounded-md border px-2 py-1 text-xs"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/Collapse Indicator */}
          <div className="border-line/50 mt-4 flex justify-center border-t pt-4">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-ink-faint"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TimelineEntry
