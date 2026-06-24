'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Course } from '../types';
import { CourseProgressBar } from './CourseProgressBar';
import { CertificateDeleteModal } from './CertificateDeleteModal';

interface CertificateModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  isAdmin?: boolean;
  secret?: string;
  certIndex?: number;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const formatDate = (isoString: string): string => {
  if (!isoString) return '';
  // Support DD/MM/YYYY format if passed from portfolio json
  if (isoString.includes('/')) {
    const [day, month, year] = isoString.split('/');
    if (!day || !month || !year) return isoString;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[Number(month) - 1]} ${year}`;
  }
  
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  course,
  onClose,
  isAdmin = false,
  secret = '',
  certIndex = 0,
}) => {
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement as HTMLElement;
      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = '';
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  // Keyboard: Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDeleteConfirm = async () => {
    if (!course) return;
    setIsDeleting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/certificates/${course.id}?secret=${secret}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }

      setDeleteModalOpen(false);
      onClose();
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to delete certificate.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!course) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cert-backdrop"
            className="fixed inset-0 z-[120] bg-[rgba(21,20,15,0.56)] backdrop-blur-[4px]"
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
            className="pointer-events-none fixed inset-0 z-[121] flex items-center justify-center p-6 sm:p-12"
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
                'pointer-events-auto relative max-h-[calc(100dvh-96px)] w-full max-w-2xl',
                'overflow-auto rounded-[24px]',
                'bg-paper border-line border',
                'shadow-[0_40px_90px_-34px_rgba(21,20,15,0.42)]'
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
                  'border-line h-11 w-11 rounded-full border',
                  'text-ink bg-[rgba(247,241,222,0.92)]',
                  'inline-flex items-center justify-center',
                  'transition-all duration-180',
                  'hover:border-coral hover:bg-coral hover:text-white',
                  'focus-visible:outline-coral focus-visible:outline-2'
                )}
              >
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              {/* Modal body — Stacked Column layout */}
              <div className="flex flex-col p-6 sm:p-10 space-y-6">
                {/* Image at Top */}
                {course.certificate_image && (
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[18px] bg-bone border border-line-soft shadow-inner">
                    <Image
                      src={course.certificate_image}
                      alt={`${course.name} certificate`}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Content details at bottom */}
                <div className="flex flex-col">
                  {/* Eyebrow / Organisation */}
                  <span
                    className="inline-flex items-center gap-3 mb-3 text-coral text-[11px] font-semibold tracking-[0.22em] uppercase"
                    style={{ fontFamily: 'var(--font-editorial-tight)' }}
                  >
                    <span className="bg-coral inline-block h-px w-4.5" aria-hidden="true" />
                    {course.organisation}
                    <span
                      className="text-ink-faint font-normal tracking-normal normal-case"
                      style={{
                        fontFamily: 'var(--font-editorial-mono)',
                        fontSize: '10px',
                      }}
                    >
                      · Nº {String(certIndex + 1).padStart(2, '0')}
                    </span>
                  </span>

                  {/* Title */}
                  <h2
                    id="cert-modal-title"
                    className="text-ink mb-6 text-[24px] sm:text-[32px] leading-[1.1] font-extrabold tracking-[-0.02em]"
                    style={{ fontFamily: 'var(--font-editorial-tight)' }}
                  >
                    {course.name}
                  </h2>

                  {/* Error banner */}
                  {errorMsg && (
                    <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-xs mb-4">
                      {errorMsg}
                    </div>
                  )}

                  {/* Meta list */}
                  <dl className="mb-6 grid gap-2.5">
                    {[
                      course.platform && {
                        label: 'Platform',
                        value: course.platform,
                        mono: false,
                      },
                      {
                        label: 'Issued',
                        value: formatDate(course.issue_date),
                        mono: true,
                      },
                      {
                        label: 'Status',
                        value: course.status === 'completed' ? 'Completed' : 'In Progress',
                        mono: false,
                        highlight: true,
                      },
                    ]
                      .filter(Boolean)
                      .map((item) => {
                        if (!item) return null;
                        const { label, value, mono, highlight } = item;
                        return (
                          <div
                            key={label}
                            className="border-line-soft flex justify-between gap-6 border-t pt-2.5"
                          >
                            <dt
                              className="text-ink-faint text-[10.5px] font-bold tracking-[0.16em] uppercase"
                              style={{ fontFamily: 'var(--font-editorial-tight)' }}
                            >
                              {label}
                            </dt>
                            <dd
                              className={cn(
                                'text-ink text-right text-[12px]',
                                mono ? 'font-(--font-editorial-mono)' : 'font-semibold',
                                highlight && (course.status === 'completed' ? 'text-emerald-600' : 'text-amber-600')
                              )}
                              style={
                                mono ? { fontFamily: 'var(--font-editorial-mono)' } : {}
                              }
                            >
                              {value}
                            </dd>
                          </div>
                        );
                      })}
                  </dl>

                  {/* Progress bar for in-progress */}
                  {course.status === 'in_progress' && (
                    <div className="mb-6 bg-paper border border-line-soft rounded-xl p-4">
                      <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-ink-faint mb-2">
                        Learning Progress
                      </div>
                      <CourseProgressBar progress={course.progress} showLabel />
                    </div>
                  )}

                  {/* Description */}
                  {course.description && (
                    <p
                      className="text-ink-soft text-[14.5px] leading-[1.6] mb-6 whitespace-pre-wrap"
                      style={{ fontFamily: 'var(--font-editorial-body)' }}
                    >
                      {course.description}
                    </p>
                  )}

                  {/* Footer actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-6 mt-2">
                    <div className="flex gap-2">
                      {course.url && (
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'inline-flex items-center gap-2 px-5 py-2.5 rounded-full',
                            'bg-ink text-paper hover:bg-ink-soft',
                            'text-[12px] font-semibold tracking-wider uppercase',
                            'transition-all duration-180'
                          )}
                          style={{ fontFamily: 'var(--font-editorial-tight)' }}
                        >
                          Verify Certificate
                        </a>
                      )}
                    </div>

                    {/* Admin options */}
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/certificate/${course.id}/edit?secret=${encodeURIComponent(secret)}`}
                          onClick={onClose}
                          className={cn(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                            'border border-line bg-transparent text-ink text-[12px] font-medium transition-all hover:bg-line-soft'
                          )}
                          style={{ fontFamily: 'var(--font-editorial-tight)' }}
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteModalOpen(true)}
                          className={cn(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                            'border border-red-200 bg-transparent text-red-600 text-[12px] font-medium transition-all hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-900/20'
                          )}
                          style={{ fontFamily: 'var(--font-editorial-tight)' }}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>

          {/* Delete Confirm Modal inside */}
          <CertificateDeleteModal
            isOpen={deleteModalOpen}
            courseName={course.name}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteModalOpen(false)}
            isDeleting={isDeleting}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
