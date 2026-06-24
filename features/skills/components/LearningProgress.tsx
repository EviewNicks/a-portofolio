'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LearningItem, Certification } from '@/lib/types/portfolio';
import Image from 'next/image';

interface LearningProgressProps {
  learning: LearningItem[];
  certifications: Certification[];
  className?: string;
}

interface LearningCardProps {
  item: LearningItem;
  index: number;
}

interface CertificationCardProps {
  certification: Certification;
  index: number;
  onOpen: (cert: Certification, idx: number) => void;
}

interface CertModalProps {
  certification: Certification;
  certIndex: number;
  onClose: () => void;
}

/* ─────────────────────────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────────────────────────── */
const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

/* ─────────────────────────────────────────────────────────────
   HELPER
───────────────────────────────────────────────────────────── */
const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) return dateString;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(month) - 1]} ${year}`;
};

/* ─────────────────────────────────────────────────────────────
   SECTION RULE — editorial breadcrumb bar
───────────────────────────────────────────────────────────── */
const SectionRule: React.FC<{
  roman: string;
  meta: string;
  index: string;
}> = ({ roman, meta, index }) => (
  <motion.div
    className={cn(
      'border-t border-line pt-4.5 mb-12',
      'flex justify-between items-center',
      'font-(--font-editorial-tight) text-[10.5px] tracking-[0.18em] uppercase text-ink-faint',
    )}
    initial={{ opacity: 0, scaleX: 0.92 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, ease: easeOutExpo }}
  >
    <span
      className="font-(--font-editorial-serif) italic text-coral text-[14px] tracking-wider normal-case"
      style={{ fontFamily: 'var(--font-editorial-serif)' }}
    >
      {roman}
    </span>
    <span className="hidden sm:inline">{meta}</span>
    <span>{index}</span>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   CERT LABEL — coral eyebrow with dash
───────────────────────────────────────────────────────────── */
const EditorialLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className={cn(
      'inline-flex items-center gap-3 mb-5',
      'text-[11px] font-semibold tracking-[0.22em] uppercase text-coral',
    )}
    style={{ fontFamily: 'var(--font-editorial-tight)' }}
  >
    <span
      className="inline-block w-4.5 h-px bg-coral"
      aria-hidden="true"
    />
    {children}
  </span>
);

/* ─────────────────────────────────────────────────────────────
   LEARNING CARD — currently learning item
───────────────────────────────────────────────────────────── */
const LearningCard: React.FC<LearningCardProps> = ({ item, index }) => {
  const targetDate = new Date(item.target_date);
  const isOverdue = targetDate < new Date();
  const progressPct = Math.min(item.progress, 100);

  const newLocal = "text-[15px] font-bold text-ink";
  const newLocal_1 = 'text-[13px] font-semibold text-coral';
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { delay: index * 0.1, duration: 0.7, ease: easeOutExpo },
        },
      }}
    >
      <motion.div
        className={cn(
          'relative rounded-[18px] overflow-hidden p-8 h-full min-h-70 flex flex-col',
          'bg-bone border border-line-soft',
          'shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)]',
          'cursor-default',
        )}
        whileHover={{ y: -4, borderColor: 'rgba(237,111,92,0.35)' }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1 pr-3">
            <h4
              className="font-bold text-ink text-[20px] mb-2 tracking-[-0.014em] leading-tight"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {item.name}
            </h4>
            {item.platform && (
              <span
                className={cn(
                  'inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold',
                  'tracking-[0.14em] uppercase text-coral',
                  'border border-coral opacity-80',
                )}
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                {item.platform}
              </span>
            )}
          </div>
          <span
            className={cn(
              'shrink-0 px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.08em]',
              'font-(--font-editorial-mono) border whitespace-nowrap',
              isOverdue
                ? 'text-red-600 border-red-200 bg-red-50 dark:text-red-300 dark:border-red-900/40 dark:bg-red-900/20'
                : 'text-ink-faint border-line',
            )}
          >
            {targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Progress Section */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-[11px] font-medium text-ink-faint tracking-[0.16em] uppercase"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              Progress
            </span>
            <span
              className={newLocal}
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {item.progress}%
            </span>
          </div>

          {/* Animated progress bar — whileInView scaleX */}
          <div
            className={cn(
              'w-full rounded-full overflow-hidden h-0.75',
              'bg-line-soft',
            )}
            role="progressbar"
            aria-valuenow={item.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${item.name} progress: ${item.progress}%`}
          >
            <motion.div
              className="h-full rounded-full origin-left"
              style={{
                backgroundColor: isOverdue ? '#ef4444' : 'var(--coral)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: progressPct / 100 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: easeOutExpo }}
            />
          </div>
        </div>

        {/* Description */}
        <p
          className="text-[14px] text-ink-mute leading-relaxed mb-4 flex-1"
          style={{ fontFamily: 'var(--font-editorial-body)' }}
        >
          {item.reason}
        </p>

        {/* Course URL */}
        {item.url && (
          <div className="pt-4 border-t border-line-soft">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2',
                newLocal_1,
                'transition-colors duration-180 hover:text-ink',
              )}
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              View Course
              <svg
                className="w-3.25 h-3.25"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} />
              </svg>
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CERTIFICATION CARD — editorial flat card
───────────────────────────────────────────────────────────── */
const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  index,
  onOpen,
}) => {
  return (
    <motion.div variants={itemVariants}>
      <motion.button
        type="button"
        onClick={() => onOpen(certification, index)}
        className={cn(
          'w-full text-left rounded-[18px] overflow-hidden',
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
        aria-label={`View certificate: ${certification['name-license']}`}
      >
        {/* Certificate media — 4:3 */}
        <div className="relative aspect-4/3 bg-paper-dark border-b border-line-soft overflow-hidden">
          <Image
            src={`/${certification.media}`}
            alt={`${certification['name-license']} Certificate`}
            fill
            className="object-cover saturate-[0.92] contrast-[1.03] transition-transform duration-320 group-hover:scale-[1.035]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const sibling = target.nextElementSibling as HTMLElement | null;
              if (sibling) sibling.style.display = 'flex';
            }}
          />
          {/* Fallback placeholder */}
          <div
            className="hidden absolute inset-0 items-center justify-center bg-paper-dark"
            aria-hidden="true"
          >
            <div className="text-center">
              <svg
                className="mx-auto h-10 w-10 text-ink-faint"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p
                className="mt-2 text-[11px] text-ink-faint tracking-[0.08em]"
                style={{ fontFamily: 'var(--font-editorial-mono)' }}
              >
                Certificate Nº {String(index + 1).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6">
          {/* Org + Status */}
          <div className="flex justify-between items-center gap-3 mb-3.5">
            <span
              className="text-[12px] font-bold tracking-[0.16em] uppercase text-coral"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {certification.organisasi}
            </span>
            <span
              className={cn(
                'text-[10px] tracking-[0.04em] text-ink-faint',
                'border border-line rounded-full px-2.25 py-1.25 whitespace-nowrap',
              )}
              style={{ fontFamily: 'var(--font-editorial-mono)' }}
            >
              Completed
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              'text-[20px] font-extrabold tracking-[-0.018em] leading-[1.12] mb-2.5',
              'text-ink',
              'overflow-hidden',
            )}
            style={{
              fontFamily: 'var(--font-editorial-tight)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {certification['name-license']}
          </h3>

          {/* Cert number */}
          <p
            className="text-[12px] text-ink-mute mb-3.5"
            style={{ fontFamily: 'var(--font-editorial-mono)' }}
          >
            {certification.no}
          </p>

          {/* Description */}
          <p
            className={cn(
              'text-[13.5px] text-ink-mute leading-[1.55]',
              'overflow-hidden',
            )}
            style={{
              fontFamily: 'var(--font-editorial-body)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {certification.deksripsi}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center gap-4 border-t border-line-soft pt-4.5 mt-5">
            <span
              className="text-[11px] tracking-[0.14em] uppercase text-ink-faint"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {formatDate(certification['tanggal-terbit'])}
            </span>
            <span
              className="text-[13px] font-bold text-coral whitespace-nowrap"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              View record
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CERT MODAL — inner content (AnimatePresence lives in parent)
   NOTE: this component always renders when mounted — exit animation
   is handled by <AnimatePresence> in LearningProgress parent.
───────────────────────────────────────────────────────────── */
const CertModal: React.FC<CertModalProps> = ({ certification, certIndex, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus close button on mount, restore on unmount
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    // Delay focus to let animation start
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);
    return () => {
      clearTimeout(focusTimer);
      previousFocus?.focus();
    };
  }, []);

  // Keyboard handler — Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="cert-backdrop"
        className="fixed inset-0 z-120 bg-[rgba(21,20,15,0.56)] backdrop-blur-[4px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel container */}
      <motion.div
        key="cert-panel"
        className="fixed inset-0 z-121 flex items-center justify-center p-6 sm:p-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <motion.article
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className={cn(
            'pointer-events-auto relative w-full max-w-240 max-h-[calc(100dvh-96px)]',
            'overflow-auto rounded-[24px]',
            'bg-paper border border-line',
            'shadow-[0_40px_90px_-34px_rgba(21,20,15,0.42)]',
          )}
          initial={{ y: 20, scale: 0.97, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.28, ease: easeOutExpo }}
        >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close certificate details"
                className={cn(
                  'absolute top-4 right-4 z-10',
                  'w-11 h-11 rounded-full border border-line',
                  'bg-[rgba(247,241,222,0.92)] text-ink',
                  'inline-flex items-center justify-center',
                  'transition-all duration-180',
                  'hover:border-coral hover:bg-coral hover:text-white',
                  'focus-visible:outline-2 focus-visible:outline-coral',
                )}
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              {/* Modal body — responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-12 p-8 md:p-12">
                {/* Image */}
                <div className="relative aspect-4/3 rounded-[18px] overflow-hidden bg-bone border border-line-soft">
                  <Image
                    src={`/${certification.media}`}
                    alt={`${certification['name-license']} certificate`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <EditorialLabel>
                    {certification.organisasi}
                    <span className="text-ink-faint font-normal normal-case tracking-normal" style={{ fontFamily: 'var(--font-editorial-mono)', fontSize: '10px' }}>
                      · Nº {String(certIndex + 1).padStart(2, '0')}
                    </span>
                  </EditorialLabel>

                  <h2
                    id="cert-modal-title"
                    className="text-[clamp(26px,3.5vw,52px)] font-extrabold tracking-[-0.026em] leading-[1.04] mb-6 text-ink"
                    style={{ fontFamily: 'var(--font-editorial-tight)' }}
                  >
                    {certification['name-license']}
                  </h2>

                  {/* Meta list */}
                  <dl className="grid gap-3 mb-8">
                    {[
                      { label: 'Certificate No.', value: certification.no, mono: true },
                      { label: 'Issued', value: formatDate(certification['tanggal-terbit']), mono: true },
                      { label: 'Status', value: 'Completed', mono: false },
                    ].map(({ label, value, mono }) => (
                      <div
                        key={label}
                        className="flex justify-between gap-6 border-t border-line-soft pt-3"
                      >
                        <dt
                          className="text-[11px] font-bold tracking-[0.16em] uppercase text-ink-faint"
                          style={{ fontFamily: 'var(--font-editorial-tight)' }}
                        >
                          {label}
                        </dt>
                        <dd
                          className={cn(
                            'text-[12px] text-ink text-right',
                            mono ? 'font-(--font-editorial-mono)' : 'font-semibold',
                          )}
                          style={mono ? { fontFamily: 'var(--font-editorial-mono)' } : {}}
                        >
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Description */}
                  <p
                    className="text-[15px] leading-[1.65] text-ink-soft flex-1"
                    style={{ fontFamily: 'var(--font-editorial-body)' }}
                  >
                    {certification.deksripsi}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 flex-wrap mt-8">
                    <button
                      type="button"
                      onClick={onClose}
                      className={cn(
                        'inline-flex items-center gap-3 px-4.5 py-3 rounded-full',
                        'border border-[rgba(21,20,15,0.2)] text-ink',
                        'text-[14px] font-medium hover:bg-[rgba(21,20,15,0.04)]',
                        'transition-all duration-180',
                      )}
                      style={{ fontFamily: 'var(--font-editorial-tight)' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
        </motion.article>
      </motion.div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   LEARNING PROGRESS — main export
───────────────────────────────────────────────────────────── */
/**
 * LearningProgress Component
 *
 * Redesigned to match editorial design language from index.html reference (section V).
 *
 * Features:
 * - Editorial sec-rule breadcrumb header with Roman numeral
 * - cert-head 2-column layout (title + CTA)
 * - Flat bone/paper editorial cards (matches design reference palette)
 * - Fixed: animate → whileInView (previously triggered on mount, not viewport)
 * - Stagger container variants for cert-grid
 * - whileInView scaleX animated progress bars
 * - cert-footnote with dashed rule
 * - Full certificate modal with AnimatePresence
 * - Spring-based hover effects on all cards
 */
export const LearningProgress: React.FC<LearningProgressProps> = ({
  learning,
  certifications,
  className,
}) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);

  const handleOpenCert = useCallback((cert: Certification, idx: number) => {
    setSelectedCert(cert);
    setSelectedCertIndex(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseCert = useCallback(() => {
    setSelectedCert(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <div className={cn('container mx-auto px-4 mt-16', className)}>

      {/* ── Currently Learning Section ── */}
      {learning.length > 0 && (
        <div className="mb-20">
          <SectionRule
            roman="IV."
            meta="Labs / Learning Progress · Skills in development"
            index="004 / 008"
          />

          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end mb-12">
            <div>
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <EditorialLabel>
                  Currently Learning <span className="text-ink-faint font-normal" style={{ letterSpacing: 0 }}>· Nº 04</span>
                </EditorialLabel>
                <h2
                  className="text-[clamp(32px,4vw,56px)] font-extrabold tracking-[-0.024em] leading-[1.04] text-ink"
                  style={{ fontFamily: 'var(--font-editorial-tight)' }}
                >
                  Skills and technologies I&apos;m actively{' '}
                  <em
                    className="font-medium text-ink not-italic"
                    style={{ fontFamily: 'var(--font-editorial-serif)', fontStyle: 'italic' }}
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
              <span className="text-coral text-[22px] leading-none mt-1 font-(--font-editorial-tight)">+</span>
              <p
                className="text-[13px] text-ink-soft max-w-[24ch] leading-[1.55]"
                style={{ fontFamily: 'var(--font-editorial-body)' }}
              >
                Active experiments documenting skills in flux — building intelligence through making.
              </p>
            </motion.div>
          </div>

          {/* Learning cards grid — stagger container */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {learning.map((item, index) => (
              <LearningCard key={item.name} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Certificates Section ── */}
      {certifications.length > 0 && (
        <div>
          <SectionRule
            roman="V."
            meta="Certificates / Proof · Verified learning record"
            index="005 / 008"
          />

          {/* cert-head — 2-col layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-start mb-20">
            <div>
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <EditorialLabel>
                  Certificates <span className="text-ink-faint font-normal" style={{ letterSpacing: 0 }}>· Nº 05</span>
                </EditorialLabel>
                <h2
                  className="text-[clamp(36px,4.8vw,72px)] font-extrabold tracking-[-0.024em] leading-[1.02] text-ink"
                  style={{ fontFamily: 'var(--font-editorial-tight)' }}
                >
                  Proof of{' '}
                  <em style={{ fontFamily: 'var(--font-editorial-serif)', fontStyle: 'italic', fontWeight: 500 }}>
                    progress
                  </em>
                  , made{' '}
                  <em style={{ fontFamily: 'var(--font-editorial-serif)', fontStyle: 'italic', fontWeight: 500 }}>
                    verifiable
                  </em>
                  <span className="text-coral">.</span>
                </h2>
                <p
                  className="mt-5 text-[16px] leading-[1.55] text-ink-soft max-w-[36ch]"
                  style={{ fontFamily: 'var(--font-editorial-body)' }}
                >
                  A focused certification section for learning records: course progress, issuing organization, certificate number, issue date, and evidence media in one readable archive.
                </p>
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
                className="text-coral text-[24px] leading-none mt-0.5"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                +
              </span>
              <div>
                <p
                  className="text-[13px] text-ink-soft max-w-[24ch] leading-[1.55] mb-2"
                  style={{ fontFamily: 'var(--font-editorial-body)' }}
                >
                  Click any certificate to inspect the full record.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Cert grid — stagger container */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5.5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert['name-license']}
                certification={cert}
                index={index}
                onOpen={handleOpenCert}
              />
            ))}
          </motion.div>

          {/* cert-footnote — dashed separator */}
          <motion.div
            className={cn(
              'mt-14 flex justify-between items-center',
              'border-t border-dashed border-line pt-6',
              'font-(--font-editorial-tight) text-[11px] tracking-[0.16em] uppercase text-ink-faint',
            )}
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
              Evidence-first learning archive
            </span>
            <span>
              <span
                className="text-coral font-semibold"
              >
                {certifications.length} / {certifications.length} Verified
              </span>
            </span>
          </motion.div>
        </div>
      )}

      {/* Certificate Modal — AnimatePresence here so exit animations work */}
      <AnimatePresence mode="wait">
        {selectedCert && (
          <CertModal
            key="cert-modal"
            certification={selectedCert}
            certIndex={selectedCertIndex}
            onClose={handleCloseCert}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningProgress;