'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Course } from '../types';
import { categorizeForDisplay } from '../services/validation.service';
import { CourseProgressBar } from './CourseProgressBar';
import { CertificateImage } from './CertificateImage';

interface CertificateCardProps {
  course: Course;
  index: number;
  total: number;
  secret?: string;
  isAdmin?: boolean;
  onOpen: (course: Course) => void;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/** Format ISO date → "Jun 2024" */
const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/* ─────────────────────────────────────────────────────────────
   LEARNING CARD — in-progress courses
───────────────────────────────────────────────────────────── */
const LearningVariant: React.FC<{ course: Course }> = ({ course }) => (
  <div className="flex flex-col h-full">
    {/* Thumbnail */}
    {course.certificate_image && (
      <div className="relative aspect-4/3 bg-paper-dark border-b border-line-soft overflow-hidden">
        <CertificateImage
          src={course.certificate_image}
          alt={`${course.name} certificate`}
          className="rounded-none border-none aspect-auto absolute inset-0"
        />
      </div>
    )}

    {/* Card body */}
    <div className="p-6 flex flex-col flex-1">
      {/* Header row — org + platform badge */}
      <div className="flex justify-between items-start gap-3 mb-4">
        <span
          className="text-[11px] font-bold tracking-[0.18em] uppercase text-coral"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          {course.organisation}
        </span>
        {course.platform && (
          <span
            className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase text-coral border border-coral opacity-75"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            {course.platform}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-[19px] font-extrabold tracking-[-0.016em] leading-[1.12] mb-3 text-ink flex-1 overflow-hidden"
        style={{
          fontFamily: 'var(--font-editorial-tight)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {course.name}
      </h3>

      {/* Description */}
      {course.description && (
        <p
          className="text-[13px] text-ink-mute leading-[1.55] mb-4 overflow-hidden"
          style={{
            fontFamily: 'var(--font-editorial-body)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {course.description}
        </p>
      )}

      {/* Progress bar */}
      <div className="mb-4">
        <CourseProgressBar progress={course.progress} showLabel animated />
      </div>

      {/* Footer — date */}
      <div className="flex justify-between items-center gap-4 border-t border-line-soft pt-4 mt-auto">
        <span
          className="text-[11px] tracking-[0.14em] uppercase text-ink-faint"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          {formatDate(course.issue_date)}
        </span>
        <span
          className="text-[13px] font-bold text-coral whitespace-nowrap"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          In Progress →
        </span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   CERTIFICATE CARD — completed courses
───────────────────────────────────────────────────────────── */
const CertificateVariant: React.FC<{ course: Course }> = ({ course }) => (
  <div className="flex flex-col h-full">
    {/* Thumbnail */}
    {course.certificate_image && (
      <div className="relative aspect-4/3 bg-paper-dark border-b border-line-soft overflow-hidden">
        <CertificateImage
          src={course.certificate_image}
          alt={`${course.name} certificate`}
          className="rounded-none border-none aspect-auto absolute inset-0"
        />
      </div>
    )}

    {/* Card body */}
    <div className="p-6 flex flex-col flex-1">
      {/* Org + status */}
      <div className="flex justify-between items-center gap-3 mb-3">
        <span
          className="text-[11px] font-bold tracking-[0.18em] uppercase text-coral"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          {course.organisation}
        </span>
        <span
          className="text-[10px] tracking-[0.04em] text-ink-faint border border-line rounded-full px-2 py-1 whitespace-nowrap"
          style={{ fontFamily: 'var(--font-editorial-mono)' }}
        >
          Completed
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[19px] font-extrabold tracking-[-0.016em] leading-[1.12] mb-2 text-ink flex-1 overflow-hidden"
        style={{
          fontFamily: 'var(--font-editorial-tight)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {course.name}
      </h3>

      {/* Description */}
      {course.description && (
        <p
          className="text-[13px] text-ink-mute leading-[1.55] mb-4 overflow-hidden"
          style={{
            fontFamily: 'var(--font-editorial-body)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {course.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center gap-4 border-t border-line-soft pt-4 mt-auto">
        <span
          className="text-[11px] tracking-[0.14em] uppercase text-ink-faint"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          {formatDate(course.issue_date)}
        </span>
        <span
          className="text-[13px] font-bold text-coral whitespace-nowrap"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          View record →
        </span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   CERTIFICATE CARD — main export
───────────────────────────────────────────────────────────── */
export const CertificateCard: React.FC<CertificateCardProps> = ({
  course,
  index,
  isAdmin = false,
  onOpen,
}) => {
  const displayType = categorizeForDisplay(course);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, delay: index * 0.05, ease: easeOutExpo },
        },
      }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(course)}
        className={cn(
          'group relative w-full rounded-[18px] overflow-hidden h-full text-left',
          'bg-bone border border-line-soft',
          'shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)]',
          'transition-[border-color] duration-280',
          'focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-4',
        )}
        whileHover={{
          y: -4,
          borderColor: 'rgba(237,111,92,0.35)',
          boxShadow: '0 34px 70px -38px rgba(21,20,15,0.28)',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        aria-label={`View certificate: ${course.name}`}
      >
        {/* Admin badge */}
        {isAdmin && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-amber-400/90 text-amber-900 rounded-full">
              Admin
            </span>
          </div>
        )}

        {displayType === 'learning' ? (
          <LearningVariant course={course} />
        ) : (
          <CertificateVariant course={course} />
        )}
      </motion.button>
    </motion.div>
  );
};

export default CertificateCard;
