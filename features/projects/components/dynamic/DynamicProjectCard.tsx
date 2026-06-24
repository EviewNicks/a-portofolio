'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { DynamicProject } from '@/features/projects/types'

interface DynamicProjectCardProps {
  project: DynamicProject
  index: number
  total: number
  sprintCount?: number
  prCount?: number
}

// Framer Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const, // --ease-out-expo
    },
  },
}

const hoverVariants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function DynamicProjectCard({
  project,
  index,
  total,
  sprintCount = 0,
  prCount = 0,
}: DynamicProjectCardProps) {
  // Determine card type label
  const cardLabel = index === 0 ? 'Featured project' : 'Companion system'
  const indexDisplay = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`

  // Extract year from created_at
  const year = new Date(project.created_at).getFullYear()

  // Determine category from tech stack (simple heuristic)
  const category = project.tech_stack.some(tech =>
    ['React', 'Next.js', 'Vue', 'Angular'].includes(tech)
  )
    ? 'Web'
    : project.tech_stack.some(tech =>
          ['Python', 'TensorFlow', 'PyTorch'].includes(tech)
        )
      ? 'AI'
      : 'Dev'

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.id}`}
        data-testid="project-card-view-link"
        data-project-id={project.id}
        className="block h-full"
      >
        <motion.div
          variants={hoverVariants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          data-testid="project-card"
          className="group border-line-soft bg-bone hover:border-coral/20 relative flex h-full flex-col overflow-hidden rounded-[18px] border p-6 shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] transition-shadow duration-300 hover:shadow-[0_34px_70px_-38px_rgba(21,20,15,0.28)]"
        >
          {/* Label Row */}
          <div className="font-editorial-tight mb-4 flex items-center justify-between text-[10.5px] tracking-[0.14em] uppercase">
            <span className="text-coral">{cardLabel}</span>
            <span className="text-ink-faint">{indexDisplay}</span>
          </div>

          {/* Title */}
          <h3
            data-testid="project-card-title"
            className="font-editorial-tight text-ink group-hover:text-coral mb-3 text-xl leading-tight font-bold tracking-tight transition-colors"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            data-testid="project-card-description"
            className="font-editorial-body text-ink-mute mb-5 line-clamp-3 text-sm leading-relaxed"
          >
            {project.short_description}
          </p>

          {/* Image Placeholder */}
          <div className="border-line-soft bg-paper-dark mb-5 aspect-video w-full overflow-hidden rounded-lg border">
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-editorial-mono text-ink-faint text-xs opacity-40">
                Project {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Meta Row */}
          <div className="border-line-soft font-editorial-tight mt-auto flex items-center justify-between border-t pt-4 text-[11px] tracking-[0.14em] uppercase">
            <span className="text-ink-faint">
              {year} · {category}
            </span>
            <span className="text-coral font-bold">
              {sprintCount > 0
                ? `${sprintCount} Sprint${sprintCount !== 1 ? 's' : ''}`
                : 'NEW'}
            </span>
          </div>

          {/* Hidden stats for testing */}
          <div className="sr-only">
            <span data-testid="project-card-sprint-count">{sprintCount}</span>
            <span data-testid="project-card-pr-count">{prCount}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
