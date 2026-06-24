'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Course } from '../types';
import { useCertificateForm } from '../hooks/useCertificateForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CourseProgressBar } from './CourseProgressBar';

interface AdminCourseFormProps {
  secret: string;
  course?: Course;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const AdminCourseForm: React.FC<AdminCourseFormProps> = ({
  secret,
  course,
}) => {
  const router = useRouter();
  const isEdit = Boolean(course);

  const {
    values,
    errors,
    isLoading,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useCertificateForm({
    initialCourse: course,
    secret,
    onSuccess: (savedCourse) => {
      // On success, redirect to the listing page or detail page
      router.push(`/certificate/${savedCourse.slug}?secret=${secret}`);
      router.refresh();
    },
  });

  // Calculate completeness percentage for the sidebar indicator
  const completeness = useMemo(() => {
    const checks = [
      values.name.trim().length >= 3,
      values.organisation.trim().length >= 2,
      Boolean(values.issue_date),
      isEdit ? true : Boolean(values.file),
      values.description.trim().length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [values.name, values.organisation, values.issue_date, values.file, values.description, isEdit]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      {/* Left: Input Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-line bg-bone text-ink shadow-sm rounded-2xl p-6 sm:p-8 space-y-8"
        noValidate
      >
        {errorMessage && (
          <div className="border border-red-200 bg-red-50 text-red-700 px-5 py-4 rounded-xl text-xs">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {/* Section Title */}
        <div className="border-b border-line-soft pb-6">
          <h2 className="text-xl font-bold tracking-[-0.014em] text-ink" style={{ fontFamily: 'var(--font-editorial-tight)' }}>
            {isEdit ? 'I. Edit Course & Certificate' : 'I. Add New Course / Certificate'}
          </h2>
          <p className="text-ink-mute mt-2 text-xs">
            Provide the verification data, progress status, and documentation details.
          </p>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint flex justify-between">
              <span>Course Name <span className="text-coral">*</span></span>
            </label>
            <Input
              type="text"
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Meta Frontend Developer Professional Certificate"
              className={cn(
                'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 h-12 transition-colors',
                errors.name ? 'border-red-400' : 'border-line-soft'
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Organisation */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
              Organisation / Issuer <span className="text-coral">*</span>
            </label>
            <Input
              type="text"
              value={values.organisation}
              onChange={(e) => handleChange('organisation', e.target.value)}
              placeholder="e.g. Meta"
              className={cn(
                'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 h-12 transition-colors',
                errors.organisation ? 'border-red-400' : 'border-line-soft'
              )}
            />
            {errors.organisation && (
              <p className="text-xs text-red-500 mt-1">{errors.organisation}</p>
            )}
          </div>

          {/* Platform & Issue Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
                Platform
              </label>
              <Input
                type="text"
                value={values.platform}
                onChange={(e) => handleChange('platform', e.target.value)}
                placeholder="e.g. Coursera"
                className="bg-paper text-ink focus-visible:bg-paper-warm border-line-soft rounded-xl px-4 py-3 h-12 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
                Date <span className="text-coral">*</span>
              </label>
              <Input
                type="date"
                value={values.issue_date}
                onChange={(e) => handleChange('issue_date', e.target.value)}
                className={cn(
                  'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 h-12 transition-colors',
                  errors.issue_date ? 'border-red-400' : 'border-line-soft'
                )}
              />
              {errors.issue_date && (
                <p className="text-xs text-red-500 mt-1">{errors.issue_date}</p>
              )}
            </div>
          </div>

          {/* Progress Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
              <span>Progress</span>
              <span className="text-coral font-mono">{values.progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values.progress}
              onChange={(e) => handleChange('progress', parseInt(e.target.value))}
              className="w-full h-1.5 bg-paper rounded-lg appearance-none cursor-pointer accent-coral"
            />
            <p className="text-[10px] text-ink-faint">
              Setting progress to 100% marks the course as Completed.
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
              Certificate Image File {!isEdit && <span className="text-coral">*</span>}
            </label>
            <div className={cn(
              'relative border border-dashed rounded-xl p-6 transition-all duration-180 text-center flex flex-col items-center justify-center cursor-pointer bg-paper hover:bg-paper-warm',
              errors.file ? 'border-red-400 bg-red-50/10' : 'border-line-soft hover:border-coral/40'
            )}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleChange('file', file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <svg className="w-8 h-8 text-ink-faint mb-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {values.file ? (
                <span className="text-xs text-ink font-semibold">{values.file.name}</span>
              ) : (
                <span className="text-xs text-ink-mute">
                  {isEdit ? 'Choose a file to replace existing image (Optional)' : 'Select certificate image file'}
                </span>
              )}
            </div>
            {errors.file && (
              <p className="text-xs text-red-500 mt-1">{errors.file}</p>
            )}
          </div>

          {/* Verification URL */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
              Credential Verification URL (Optional)
            </label>
            <Input
              type="url"
              value={values.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="e.g. https://www.coursera.org/verify/..."
              className={cn(
                'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 h-12 transition-colors',
                errors.url ? 'border-red-400' : 'border-line-soft'
              )}
            />
            {errors.url && (
              <p className="text-xs text-red-500 mt-1">{errors.url}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-faint">
              Syllabus / Details (Optional)
            </label>
            <Textarea
              value={values.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Focus areas, key technologies, and skills developed during the course..."
              rows={5}
              className="bg-paper text-ink focus-visible:bg-paper-warm border-line-soft rounded-xl px-5 py-4 min-h-[140px] transition-colors"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="border-t border-line-soft pt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-line text-ink text-[13px] font-medium transition-all hover:bg-line-soft"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-ink text-paper text-[13px] font-semibold transition-all hover:bg-ink-soft disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              'Save Entry'
            )}
          </button>
        </div>
      </form>

      {/* Right: Inspector Sidebar */}
      <aside className="border border-line bg-bone text-ink shadow-sm rounded-2xl p-6 space-y-6">
        <div className="text-primary mb-4 inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] uppercase text-coral" style={{ fontFamily: 'var(--font-editorial-tight)' }}>
          <span className="bg-coral h-px w-5" />
          Inspector
          <span className="text-ink-faint font-medium">· Live Preview</span>
        </div>

        {/* Completeness bar */}
        <div className="border border-line-soft bg-paper rounded-xl p-4">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.16em] uppercase text-ink-faint mb-2">
            <span>Completeness</span>
            <span className="text-ink">{completeness}%</span>
          </div>
          <div className="w-full bg-bone h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-coral h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completeness}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="border border-line-soft bg-paper rounded-xl p-5 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-ink-faint">
            Course Preview
          </span>
          <div className="space-y-3">
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-coral">
              {values.organisation || 'Organisation Name'}
            </div>
            <h4 className="text-[17px] font-extrabold tracking-[-0.016em] text-ink leading-tight">
              {values.name || 'Course Title Preview'}
            </h4>
            <div className="pt-2">
              <CourseProgressBar progress={values.progress} showLabel />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
