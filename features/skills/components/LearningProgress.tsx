'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Course } from '@/features/certificates/types'
import { CertificateCard } from '@/features/certificates/components/CertificateCard'
import { CertificateModal } from '@/features/certificates/components/CertificateModal'

interface LearningProgressProps {
  courses: Course[]
  className?: string
}

/* ─────────────────────────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────────────────────────── */
const easeOutExpo = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
}

/* ─────────────────────────────────────────────────────────────
   SECTION RULE — editorial breadcrumb bar
───────────────────────────────────────────────────────────── */
const SectionRule: React.FC<{
  roman: string
  meta: string
  index: string
}> = ({ roman, meta, index }) => (
  <motion.div
    className={cn(
      'border-line mb-12 border-t pt-4.5',
      'flex items-center justify-between',
      'text-ink-faint text-[10.5px] font-(--font-editorial-tight) tracking-[0.18em] uppercase'
    )}
    initial={{ opacity: 0, scaleX: 0.92 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, ease: easeOutExpo }}
  >
    <span
      className="text-coral text-[14px] font-(--font-editorial-serif) tracking-wider normal-case italic"
      style={{ fontFamily: 'var(--font-editorial-serif)' }}
    >
      {roman}
    </span>
    <span className="hidden sm:inline">{meta}</span>
    <span>{index}</span>
  </motion.div>
)

/* ─────────────────────────────────────────────────────────────
   EDITORIAL LABEL — coral eyebrow with dash
───────────────────────────────────────────────────────────── */
const EditorialLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span
    className={cn(
      'mb-5 inline-flex items-center gap-3',
      'text-coral text-[11px] font-semibold tracking-[0.22em] uppercase'
    )}
    style={{ fontFamily: 'var(--font-editorial-tight)' }}
  >
    <span className="bg-coral inline-block h-px w-4.5" aria-hidden="true" />
    {children}
  </span>
)

/* ─────────────────────────────────────────────────────────────
   LEARNING PROGRESS — main export
───────────────────────────────────────────────────────────── */
/**
 * LearningProgress Component
 *
 * Refactored to use Course[] from the database.
 * Splits courses by status:
 *  - in_progress → "Currently Learning" section
 *  - completed   → "Certificates" section
 *
 * Both sections use the same CertificateCard component.
 * Clicking any card opens CertificateModal.
 */
export const LearningProgress: React.FC<LearningProgressProps> = ({
  courses,
  className,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Split by status
  const learningCourses = useMemo(
    () => courses.filter((c) => c.status === 'in_progress'),
    [courses]
  )
  const completedCourses = useMemo(
    () => courses.filter((c) => c.status === 'completed'),
    [courses]
  )

  const handleOpen = useCallback(
    (course: Course) => {
      const pool = course.status === 'in_progress' ? learningCourses : completedCourses
      const idx = pool.findIndex((c) => c.id === course.id)
      setSelectedIndex(idx >= 0 ? idx : 0)
      setSelectedCourse(course)
    },
    [learningCourses, completedCourses]
  )

  const handleClose = useCallback(() => {
    setSelectedCourse(null)
  }, [])

  return (
    <div className={cn('container mx-auto mt-16 px-4', className)}>

      {/* ── Currently Learning Section ── */}
      {learningCourses.length > 0 && (
        <div className="mb-20">
          <SectionRule
            roman="IV."
            meta="Labs / Learning Progress · Skills in development"
            index="004 / 008"
          />

          {/* Section header */}
          <div className="mb-12 grid grid-cols-1 items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <EditorialLabel>
                  Currently Learning{' '}
                  <span
                    className="text-ink-faint font-normal"
                    style={{ letterSpacing: 0 }}
                  >
                    · Nº 04
                  </span>
                </EditorialLabel>
                <h2
                  className="text-ink text-[clamp(32px,4vw,56px)] leading-[1.04] font-extrabold tracking-[-0.024em]"
                  style={{ fontFamily: 'var(--font-editorial-tight)' }}
                >
                  Skills and technologies I&apos;m actively{' '}
                  <em
                    className="text-ink font-medium not-italic"
                    style={{
                      fontFamily: 'var(--font-editorial-serif)',
                      fontStyle: 'italic',
                    }}
                  >
                    developing
                  </em>
                  <span className="text-coral">.</span>
                </h2>
              </motion.div>
            </div>

            <motion.div
              className="flex items-start gap-3 pt-2 md:pt-0"
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-coral mt-1 text-[22px] leading-none font-(--font-editorial-tight)">
                +
              </span>
              <p
                className="text-ink-soft max-w-[24ch] text-[13px] leading-[1.55]"
                style={{ fontFamily: 'var(--font-editorial-body)' }}
              >
                Active experiments documenting skills in flux — building
                intelligence through making.
              </p>
            </motion.div>
          </div>

          {/* Learning cards grid */}
          <motion.div
            className="grid grid-cols-1 gap-5.5 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {learningCourses.map((course, index) => (
              <CertificateCard
                key={course.id}
                course={course}
                index={index}
                total={learningCourses.length}
                onOpen={handleOpen}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Certificates Section ── */}
      {completedCourses.length > 0 && (
        <div>
          <SectionRule
            roman="V."
            meta="Certificates / Proof · Verified learning record"
            index="005 / 008"
          />

          {/* cert-head — 2-col layout */}
          <div className="mb-20 grid grid-cols-1 items-start gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <EditorialLabel>
                  Certificates{' '}
                  <span
                    className="text-ink-faint font-normal"
                    style={{ letterSpacing: 0 }}
                  >
                    · Nº 05
                  </span>
                </EditorialLabel>
                <h2
                  className="text-ink text-[clamp(36px,4.8vw,72px)] leading-[1.02] font-extrabold tracking-[-0.024em]"
                  style={{ fontFamily: 'var(--font-editorial-tight)' }}
                >
                  Proof of{' '}
                  <em
                    style={{
                      fontFamily: 'var(--font-editorial-serif)',
                      fontStyle: 'italic',
                      fontWeight: 500,
                    }}
                  >
                    progress
                  </em>
                  , made{' '}
                  <em
                    style={{
                      fontFamily: 'var(--font-editorial-serif)',
                      fontStyle: 'italic',
                      fontWeight: 500,
                    }}
                  >
                    verifiable
                  </em>
                  <span className="text-coral">.</span>
                </h2>
              </motion.div>
            </div>

            {/* Right CTA col */}
            <motion.div
              className="flex items-start gap-3 pt-0 md:pt-4"
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.12 }}
            >
              <span
                className="text-coral mt-0.5 text-[24px] leading-none"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                +
              </span>
              <div>
                <p
                  className="text-ink-soft mb-2 max-w-[24ch] text-[13px] leading-[1.55]"
                  style={{ fontFamily: 'var(--font-editorial-body)' }}
                >
                  Click any certificate to inspect the full record.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Cert grid */}
          <motion.div
            className="grid grid-cols-1 gap-5.5 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {completedCourses.map((course, index) => (
              <CertificateCard
                key={course.id}
                course={course}
                index={index}
                total={completedCourses.length}
                onOpen={handleOpen}
              />
            ))}
          </motion.div>

          {/* cert-footnote — dashed separator */}
          <motion.div
            className={cn(
              'mt-14 flex items-center justify-between',
              'border-line border-t border-dashed pt-6',
              'text-ink-faint text-[11px] font-(--font-editorial-tight) tracking-[0.16em] uppercase'
            )}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <span className="inline-flex items-center gap-3">
              <span
                className="border-ink-faint inline-block h-5 w-5 rounded-full border border-dashed"
                aria-hidden="true"
              />
              Evidence-first learning archive
            </span>
            <span>
              <span className="text-coral font-semibold">
                {completedCourses.length} / {completedCourses.length} Verified
              </span>
            </span>
          </motion.div>

          {/* CTA — View All Certificates */}
          <motion.div
            className="mt-10 flex justify-center"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/certificate"
              className={cn(
                'group inline-flex items-center gap-3',
                'rounded-full px-7 py-3.5',
                'border-ink text-ink border bg-transparent',
                'text-[12px] font-(--font-editorial-tight) font-semibold tracking-[0.18em] uppercase',
                'transition-all duration-300',
                'hover:bg-ink hover:text-paper'
              )}
            >
              <span>View All Certificates</span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={Boolean(selectedCourse)}
        course={selectedCourse}
        certIndex={selectedIndex}
        onClose={handleClose}
      />
    </div>
  )
}

export default LearningProgress
