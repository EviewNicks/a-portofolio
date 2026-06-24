'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CertificateActionBarProps {
  courseId?: string;
  secret: string;
  mode: 'listing' | 'detail';
  onDeleteClick?: () => void;
  className?: string;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/**
 * CertificateActionBar
 *
 * Amber-tinted floating admin bar. Shows different actions depending on `mode`:
 * - 'listing': "+ Create Course" button
 * - 'detail': "Edit" and "Delete" buttons
 *
 * Design mirrors the admin indicator pattern referenced in design.md.
 */
export const CertificateActionBar: React.FC<CertificateActionBarProps> = ({
  courseId,
  secret,
  mode,
  onDeleteClick,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'flex items-center justify-between gap-4 mb-8 px-5 py-3.5 rounded-2xl',
        'border border-amber-500/30 bg-amber-500/4',
        'backdrop-blur-[12px]',
        className,
      )}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      {/* Admin mode indicator */}
      <div className="flex items-center gap-2.5">
        {/* Pulsing amber dot */}
        <span
          className="relative inline-flex h-2 w-2"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
        </span>
        <span
          className="text-[11px] font-semibold tracking-[0.18em] uppercase text-amber-700 dark:text-amber-400"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          Admin Mode
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        {mode === 'listing' && (
          <Link
            href={`/admin/certificate/new?secret=${secret}`}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full',
              'bg-ink text-paper text-[13px] font-medium',
              'transition-all duration-180 hover:bg-ink-soft',
              'focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2',
            )}
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Course
          </Link>
        )}

        {mode === 'detail' && courseId && (
          <>
            <Link
              href={`/admin/certificate/${courseId}/edit?secret=${secret}`}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                'border border-line bg-transparent text-ink text-[13px] font-medium',
                'transition-all duration-180 hover:bg-line-soft',
                'focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2',
              )}
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z"
                />
              </svg>
              Edit
            </Link>

            <button
              type="button"
              onClick={onDeleteClick}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                'border border-red-200 bg-transparent text-red-600 text-[13px] font-medium',
                'transition-all duration-180 hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-900/20',
                'focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2',
              )}
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateActionBar;
