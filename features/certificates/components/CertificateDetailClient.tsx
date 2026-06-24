'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Course } from '../types';
import { CertificateImage } from './CertificateImage';
import { CourseProgressBar } from './CourseProgressBar';
import { CertificateActionBar } from './CertificateActionBar';
import { CertificateDeleteModal } from './CertificateDeleteModal';

interface CertificateDetailClientProps {
  course: Course;
  isAdmin?: boolean;
  secret?: string;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/** Format ISO date → "Jun 2024" */
const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const CertificateDetailClient: React.FC<CertificateDetailClientProps> = ({
  course,
  isAdmin = false,
  secret = '',
}) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
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
      router.push(secret ? `/certificate?secret=${secret}` : '/certificate');
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to delete certificate.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-[1200px] py-24">
      {/* Breadcrumb section rule */}
      <motion.div
        className={cn(
          'border-t border-line pt-4 mb-12',
          'flex justify-between items-center',
          'text-[10.5px] tracking-[0.18em] uppercase text-ink-faint',
        )}
        style={{ fontFamily: 'var(--font-editorial-tight)' }}
        initial={{ opacity: 0, scaleX: 0.95 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      >
        <span
          className="font-medium italic text-coral text-[14px] tracking-wider normal-case"
          style={{ fontFamily: 'var(--font-editorial-serif)' }}
        >
          VI.
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span>·</span>
          <Link
            href={secret ? `/certificate?secret=${secret}` : '/certificate'}
            className="hover:text-ink transition-colors"
          >
            Certificates
          </Link>
          <span>·</span>
          <span className="text-ink font-semibold">{course.name}</span>
        </div>
        <span>006 / 008</span>
      </motion.div>

      {/* Floating admin action bar */}
      {isAdmin && secret && (
        <CertificateActionBar
          courseId={course.id}
          secret={secret}
          mode="detail"
          onDeleteClick={() => setDeleteModalOpen(true)}
          className="mb-12"
        />
      )}

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="border border-red-200 bg-red-50 text-red-700 px-5 py-4 rounded-2xl mb-8 text-[13px] leading-relaxed">
          <strong>Error deleting course:</strong> {errorMsg}
        </div>
      )}

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
        {/* Column 1: Image container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {course.certificate_image ? (
            <div className="relative aspect-4/3 rounded-2xl bg-paper-dark border border-line-soft overflow-hidden shadow-[0_40px_80px_-40px_rgba(21,20,15,0.22)]">
              <CertificateImage
                src={course.certificate_image}
                alt={`${course.name} certificate`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-4/3 rounded-2xl bg-bone border border-dashed border-line flex flex-col items-center justify-center text-center p-8">
              <svg
                className="w-12 h-12 text-ink-faint mb-4 opacity-60"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p
                className="text-[11px] text-ink-faint uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                No document image uploaded
              </p>
            </div>
          )}
        </motion.div>

        {/* Column 2: Detailed Text info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
        >
          <div>
            {/* Eyebrow label */}
            <div
              className="flex items-center gap-3 mb-4 text-[11px] font-bold tracking-[0.18em] uppercase text-coral"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              <span>{course.organisation}</span>
              {course.platform && (
                <>
                  <span className="w-1 h-1 rounded-full bg-coral/50" />
                  <span className="opacity-75">{course.platform}</span>
                </>
              )}
            </div>

            {/* Main Display Title */}
            <h1
              className="text-[clamp(32px,3.8vw,56px)] font-extrabold tracking-[-0.024em] leading-[1.04] text-ink mb-6"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {course.name}
            </h1>

            {/* Badges & meta metadata */}
            <div className="flex items-center gap-4 flex-wrap">
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.06em] uppercase border',
                  course.status === 'completed'
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                    : 'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400',
                )}
                style={{ fontFamily: 'var(--font-editorial-mono)' }}
              >
                {course.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>

              <span
                className="text-[11px] tracking-[0.14em] uppercase text-ink-faint"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                {course.status === 'completed' ? 'Date Completed:' : 'Date Enrolled:'}{' '}
                {formatDate(course.issue_date)}
              </span>
            </div>
          </div>

          {/* Progress Section (If in progress) */}
          {course.status === 'in_progress' && (
            <div className="border-t border-line-soft pt-6">
              <h4
                className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint mb-3"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                Learning Progress
              </h4>
              <CourseProgressBar progress={course.progress} showLabel animated />
            </div>
          )}

          {/* Description Section */}
          {course.description && (
            <div className="border-t border-line-soft pt-6">
              <h4
                className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint mb-3"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                Syllabus & Focus Areas
              </h4>
              <p
                className="text-[15px] text-ink-soft leading-[1.65] whitespace-pre-wrap"
                style={{ fontFamily: 'var(--font-editorial-body)' }}
              >
                {course.description}
              </p>
            </div>
          )}

          {/* Action button */}
          {course.url && (
            <div className="border-t border-line-soft pt-6">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper text-[13px] font-semibold tracking-wider uppercase transition-colors hover:bg-ink-soft"
                style={{ fontFamily: 'var(--font-editorial-tight)' }}
              >
                Verify Certificate
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          )}
        </motion.div>
      </div>

      {/* Delete confirmation modal */}
      <CertificateDeleteModal
        isOpen={deleteModalOpen}
        courseName={course.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CertificateDetailClient;
