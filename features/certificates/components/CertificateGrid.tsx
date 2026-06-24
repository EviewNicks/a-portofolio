'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Course } from '../types';
import { CertificateCard } from './CertificateCard';

interface CertificateGridProps {
  courses: Course[];
  emptyMessage: string;
  secret?: string;
  isAdmin?: boolean;
  className?: string;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

/**
 * CertificateGrid
 *
 * Responsive stagger grid for a collection of courses.
 * Empty state is shown when courses array is empty.
 */
export const CertificateGrid: React.FC<CertificateGridProps> = ({
  courses,
  emptyMessage,
  secret,
  isAdmin = false,
  className,
}) => {
  return (
    <div className={cn('mb-24', className)}>
      {/* Cards or empty state */}
      {courses.length === 0 ? (
        <motion.div
          className="border border-dashed border-line rounded-[18px] py-16 text-center"
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <p
            className="text-[13px] text-ink-faint tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            {emptyMessage}
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {courses.map((course, i) => (
            <CertificateCard
              key={course.id}
              course={course}
              index={i}
              total={courses.length}
              secret={secret}
              isAdmin={isAdmin}
            />
          ))}
        </motion.div>
      )}

      {/* Footnote — dashed rule */}
      {courses.length > 0 && (
        <motion.div
          className={cn(
            'mt-12 flex justify-between items-center',
            'border-t border-dashed border-line pt-5',
            'text-[11px] tracking-[0.16em] uppercase text-ink-faint',
          )}
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <span className="inline-flex items-center gap-3">
            <span
              className="w-5 h-5 rounded-full border border-dashed border-ink-faint inline-block"
              aria-hidden="true"
            />
            Archive
          </span>
          <span>
            <span className="text-coral font-semibold">{courses.length}</span>
            {' '}/ {courses.length} records
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default CertificateGrid;
