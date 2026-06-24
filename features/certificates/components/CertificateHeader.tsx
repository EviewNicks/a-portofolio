'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CertificateHeaderProps {
  totalCount?: number;
  className?: string;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

/**
 * CertificateHeader
 *
 * Editorial page header for the /certificate route.
 * Matches the section header pattern from LearningProgress.tsx —
 * Roman numeral rule, coral eyebrow label, large display title with serif italic accent.
 */
export const CertificateHeader: React.FC<CertificateHeaderProps> = ({
  totalCount,
  className,
}) => {
  return (
    <div className={cn('mb-16', className)}>
      {/* Section rule — editorial breadcrumb bar */}
      <motion.div
        className={cn(
          'border-t border-line pt-4 mb-12',
          'flex justify-between items-center',
          'text-[10.5px] tracking-[0.18em] uppercase text-ink-faint',
        )}
        style={{ fontFamily: 'var(--font-editorial-tight)' }}
        initial={{ opacity: 0, scaleX: 0.92 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      >
        <span
          className="font-medium italic text-coral text-[14px] tracking-wider normal-case"
          style={{ fontFamily: 'var(--font-editorial-serif)' }}
        >
          VI.
        </span>
        <span className="hidden sm:inline">
          Learning &amp; Certificates · Continuous development
        </span>
        {totalCount !== undefined ? (
          <span>{String(totalCount).padStart(3, '0')} / records</span>
        ) : (
          <span>006 / 008</span>
        )}
      </motion.div>

      {/* Header — 2-column editorial layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
        {/* Left: label + title */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Eyebrow label */}
          <span
            className={cn(
              'inline-flex items-center gap-3 mb-5',
              'text-[11px] font-semibold tracking-[0.22em] uppercase text-coral',
            )}
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            <span className="inline-block w-4 h-px bg-coral" aria-hidden="true" />
            Learning
            <span className="text-ink-faint font-normal" style={{ letterSpacing: 0 }}>
              · Nº 06
            </span>
          </span>

          {/* Display title */}
          <h1
            className="text-[clamp(36px,5vw,72px)] font-extrabold tracking-[-0.03em] leading-[1.02] text-ink"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            Courses that turn progress into{' '}
            <em
              style={{
                fontFamily: 'var(--font-editorial-serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              achievements
            </em>
            <span className="text-coral">.</span>
          </h1>
        </motion.div>

        {/* Right: description */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.12 }}
        >
          <p
            className="text-[15px] text-ink-soft leading-[1.6] max-w-[36ch]"
            style={{ fontFamily: 'var(--font-editorial-body)' }}
          >
            A curated archive of continuous learning — from active courses in progress to
            completed certificates, all verified and documented.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateHeader;
