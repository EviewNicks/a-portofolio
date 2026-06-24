'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CertificateDeleteModalProps {
  isOpen: boolean;
  courseName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/**
 * CertificateDeleteModal
 *
 * Confirmation modal that requires the user to type "delete" before
 * the confirm button becomes active. Uses the same AnimatePresence
 * + backdrop blur pattern from CertModal in LearningProgress.tsx.
 */
export const CertificateDeleteModal: React.FC<CertificateDeleteModalProps> = ({
  isOpen,
  courseName,
  onConfirm,
  onCancel,
  isDeleting,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const isConfirmed = confirmText === 'delete';

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setConfirmText('');
    }
  }

  // Keyboard: Escape to cancel
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="delete-backdrop"
            className="fixed inset-0 z-[120] bg-[rgba(21,20,15,0.56)] backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="delete-panel"
            className="fixed inset-0 z-[121] flex items-center justify-center p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              aria-describedby="delete-modal-desc"
              className={cn(
                'pointer-events-auto relative w-full max-w-lg',
                'rounded-[24px] bg-paper border border-line',
                'shadow-[0_40px_90px_-34px_rgba(21,20,15,0.42)]',
                'p-8',
              )}
              initial={{ y: 20, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.28, ease: easeOutExpo }}
            >
              {/* Close button */}
              <button
                ref={cancelRef}
                type="button"
                onClick={onCancel}
                disabled={isDeleting}
                aria-label="Close delete confirmation"
                className={cn(
                  'absolute top-4 right-4 w-10 h-10 rounded-full border border-line',
                  'bg-[rgba(247,241,222,0.92)] text-ink',
                  'inline-flex items-center justify-center',
                  'transition-all duration-180',
                  'hover:border-line hover:bg-paper-dark',
                  'focus-visible:outline-2 focus-visible:outline-coral',
                  'disabled:opacity-50',
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              {/* Warning icon */}
              <div className="mb-5 w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2
                id="delete-modal-title"
                className="text-[22px] font-extrabold tracking-[-0.018em] text-ink mb-2"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                Delete this course?
              </h2>

              {/* Description */}
              <p
                id="delete-modal-desc"
                className="text-[14px] text-ink-mute leading-[1.6] mb-6"
                style={{ fontFamily: 'var(--font-editorial-body)' }}
              >
                You are about to delete{' '}
                <span className="font-semibold text-ink">&ldquo;{courseName}&rdquo;</span>.
                This action cannot be undone. To confirm, type{' '}
                <span
                  className="font-mono text-[12px] px-1.5 py-0.5 rounded bg-bone border border-line-soft text-ink-mute"
                  style={{ fontFamily: 'var(--font-editorial-mono)' }}
                >
                  delete
                </span>{' '}
                in the field below.
              </p>

              {/* Confirmation input */}
              <div className="mb-6">
                <input
                  ref={inputRef}
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  disabled={isDeleting}
                  placeholder='Type "delete" to confirm'
                  aria-label="Type delete to confirm"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl',
                    'border bg-bone text-ink text-[14px]',
                    'placeholder:text-ink-faint',
                    'transition-all duration-180',
                    'focus:outline-none focus:ring-2 focus:ring-red-400/50',
                    'disabled:opacity-50',
                    isConfirmed
                      ? 'border-red-400 dark:border-red-600'
                      : 'border-line-soft',
                  )}
                  style={{ fontFamily: 'var(--font-editorial-mono)' }}
                  onPaste={(e) => e.preventDefault()}
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isDeleting}
                  className={cn(
                    'px-4 py-2.5 rounded-full text-[13px] font-medium',
                    'border border-line text-ink',
                    'transition-all duration-180 hover:bg-line-soft',
                    'disabled:opacity-50',
                  )}
                  style={{ fontFamily: 'var(--font-editorial-tight)' }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={!isConfirmed || isDeleting}
                  className={cn(
                    'px-4 py-2.5 rounded-full text-[13px] font-medium',
                    'bg-red-600 text-white',
                    'transition-all duration-180',
                    'hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed',
                    'focus-visible:outline-2 focus-visible:outline-red-500',
                  )}
                  style={{ fontFamily: 'var(--font-editorial-tight)' }}
                >
                  {isDeleting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Deleting…
                    </span>
                  ) : (
                    'Confirm Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateDeleteModal;
