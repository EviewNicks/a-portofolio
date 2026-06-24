'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CourseProgressBarProps {
  progress: number // 0-100
  animated?: boolean
  className?: string
  showLabel?: boolean
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const

/**
 * CourseProgressBar
 *
 * Animated progress bar with coral fill.
 * Uses Framer Motion whileInView scaleX animation so it triggers
 * as the card enters the viewport — consistent with LearningProgress.tsx pattern.
 */
export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  progress,
  animated = true,
  className,
  showLabel = false,
}) => {
  const clamped = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between">
          <span
            className="text-ink-faint text-[11px] font-medium tracking-[0.16em] uppercase"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            Progress
          </span>
          <span
            className="text-ink text-[14px] font-bold"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            {clamped}%
          </span>
        </div>
      )}

      {/* Track */}
      <div
        className="bg-line-soft h-0.75 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${clamped}%`}
      >
        {/* Fill */}
        {animated ? (
          <motion.div
            className="bg-coral h-full origin-left rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: clamped / 100 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: easeOutExpo }}
          />
        ) : (
          <div
            className="bg-coral h-full rounded-full"
            style={{ width: `${clamped}%` }}
          />
        )}
      </div>
    </div>
  )
}

export default CourseProgressBar
