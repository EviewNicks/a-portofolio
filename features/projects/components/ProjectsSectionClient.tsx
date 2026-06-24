'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { DynamicProjectCard } from './dynamic/DynamicProjectCard'
import type { DynamicProject } from '@/features/projects/types'

interface ProjectsSectionClientProps {
  projects: DynamicProject[]
  stats: Record<string, { sprintCount: number; prCount: number }>
  totalProjects: number
  maxProjects: number
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const, // --ease-out-expo
    },
  },
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
}

export function ProjectsSectionClient({
  projects,
  stats,
  totalProjects,
  maxProjects,
}: ProjectsSectionClientProps) {
  return (
    <>
      {/* Section Rule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="border-line-faint font-editorial-tight text-paper/55 mb-12 flex flex-col items-start justify-between gap-3 border-t pt-5 text-[10.5px] tracking-[0.18em] uppercase sm:flex-row sm:items-center lg:mb-16"
      >
        <span className="font-editorial-serif text-coral text-sm tracking-wider normal-case italic">
          V.
        </span>
        <span className="hidden sm:inline">Selected Work · 2026 Catalog</span>
        <span className="hidden lg:inline">Curated by Ardiansyah</span>
      </motion.div>

      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 lg:mb-16"
      >
        <motion.span
          variants={itemVariants}
          className="editorial-label mb-7 inline-flex"
        >
          Selected work
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="font-editorial-tight text-paper mb-6 text-4xl leading-none font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Projects that turn{' '}
          <em className="font-editorial-serif font-medium italic">ideas</em>{' '}
          into{' '}
          <em className="font-editorial-serif font-medium italic">shippable</em>{' '}
          products
          <span className="text-coral">.</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="font-editorial-body text-paper/80 max-w-2xl text-base leading-relaxed lg:text-lg"
        >
          A showcase of development work, sprints, and technical progress — from
          concept to deployment.
        </motion.p>
      </motion.div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="text-paper/60 py-16 text-center">
          <p className="font-editorial-body">
            No projects yet. Add some from the admin panel.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, idx) => (
            <motion.div key={project.id} variants={itemVariants}>
              <DynamicProjectCard
                project={project}
                index={idx}
                total={projects.length}
                sprintCount={stats[project.id]?.sprintCount}
                prCount={stats[project.id]?.prCount}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* View All CTA */}
      {totalProjects > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-line-faint mt-12 border-t pt-6 lg:mt-16"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="font-editorial-tight text-paper/55 text-[10.5px] tracking-[0.18em] uppercase"
            >
              <span className="inline-flex items-center gap-3">
                <span className="border-paper/30 h-5 w-5 rounded-full border border-dashed" />
                Showing {Math.min(maxProjects, totalProjects)} of{' '}
                {totalProjects} projects
              </span>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/projects"
                className="group bg-coral font-editorial-tight hover:bg-coral-soft inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight text-white shadow-lg transition-all hover:shadow-xl"
              >
                View All Projects
                <motion.div
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 4 },
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  )
}
