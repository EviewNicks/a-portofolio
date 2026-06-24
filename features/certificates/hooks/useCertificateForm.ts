'use client';

import { useState, useCallback } from 'react';
import { Course, CourseInput, CourseUpdate } from '../types';

interface FormValues {
  name: string;
  organisation: string;
  issue_date: string;
  description: string;
  progress: number;
  certificate_image: string;
  platform: string;
  url: string;
}

interface FormErrors {
  name?: string;
  organisation?: string;
  issue_date?: string;
  progress?: string;
  url?: string;
}

interface UseCertificateFormOptions {
  /** Existing course — pass when editing */
  initialCourse?: Course;
  secret: string;
  onSuccess?: (course: Course) => void;
  onError?: (message: string) => void;
}

interface UseCertificateFormReturn {
  values: FormValues;
  errors: FormErrors;
  isLoading: boolean;
  isDirty: boolean;
  errorMessage: string | null;
  handleChange: (field: keyof FormValues, value: string | number) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const DEFAULT_VALUES: FormValues = {
  name: '',
  organisation: '',
  issue_date: '',
  description: '',
  progress: 0,
  certificate_image: '',
  platform: '',
  url: '',
};

const toFormValues = (course: Course): FormValues => ({
  name: course.name,
  organisation: course.organisation,
  // Convert ISO date → YYYY-MM-DD for <input type="date">
  issue_date: course.issue_date.split('T')[0] ?? course.issue_date,
  description: course.description ?? '',
  progress: course.progress,
  certificate_image: course.certificate_image ?? '',
  platform: course.platform ?? '',
  url: course.url ?? '',
});

/** Validate form values, return an error map */
const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Course name is required.';
  }
  if (!values.organisation.trim()) {
    errors.organisation = 'Organisation is required.';
  }
  if (!values.issue_date) {
    errors.issue_date = 'Issue date is required.';
  }
  if (values.progress < 0 || values.progress > 100) {
    errors.progress = 'Progress must be between 0 and 100.';
  }
  if (values.url && !/^https?:\/\/.+/.test(values.url.trim())) {
    errors.url = 'URL must start with http:// or https://';
  }

  return errors;
};

/**
 * useCertificateForm
 *
 * Custom hook for managing the Create/Edit course form state.
 * Handles validation, API calls (POST for create, PUT for edit),
 * loading and error states.
 *
 * Usage:
 *   const form = useCertificateForm({ secret, initialCourse, onSuccess })
 */
export function useCertificateForm({
  initialCourse,
  secret,
  onSuccess,
  onError,
}: UseCertificateFormOptions): UseCertificateFormReturn {
  const [values, setValues] = useState<FormValues>(
    initialCourse ? toFormValues(initialCourse) : DEFAULT_VALUES,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof FormValues, value: string | number) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);
      // Clear field error on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setErrorMessage(null);
    },
    [],
  );

  const resetForm = useCallback(() => {
    setValues(initialCourse ? toFormValues(initialCourse) : DEFAULT_VALUES);
    setErrors({});
    setIsDirty(false);
    setErrorMessage(null);
  }, [initialCourse]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Validate
      const newErrors = validate(values);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const isEdit = Boolean(initialCourse);
        const url = isEdit
          ? `/api/certificates/${initialCourse!.id}?secret=${secret}`
          : `/api/certificates?secret=${secret}`;

        const payload: CourseInput | CourseUpdate = {
          name: values.name.trim(),
          organisation: values.organisation.trim(),
          issue_date: values.issue_date,
          description: values.description.trim() || undefined,
          progress: Number(values.progress),
          certificate_image: values.certificate_image.trim() || undefined,
          platform: values.platform.trim() || undefined,
          url: values.url.trim() || undefined,
        };

        const res = await fetch(url, {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const msg = body?.error ?? `Server error: ${res.status}`;
          setErrorMessage(msg);
          onError?.(msg);
          return;
        }

        const { data } = await res.json();
        setIsDirty(false);
        onSuccess?.(data as Course);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Network error occurred.';
        setErrorMessage(msg);
        onError?.(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [values, initialCourse, secret, onSuccess, onError],
  );

  return {
    values,
    errors,
    isLoading,
    isDirty,
    errorMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
