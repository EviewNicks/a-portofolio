// Validation Service
// Business logic for course validation and status determination

import type {
  CourseInput,
  CourseUpdate,
  CourseStatus,
  ValidationError,
  ValidationResult,
} from '../types'

/**
 * Determine course status based on progress and certificate image
 *
 * Rules:
 * - progress >= 100 → completed
 * - progress < 100 → in_progress
 */
export function determineStatus(
  progress: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  certificateImage?: string
): CourseStatus {
  if (progress >= 100) {
    return 'completed'
  }
  return 'in_progress'
}

/**
 * Categorize course for display purposes
 *
 * Returns:
 * - 'certificate' if progress = 100 AND has certificate_image
 * - 'learning' otherwise
 */
export function categorizeForDisplay(course: {
  progress: number
  certificate_image?: string
}): 'learning' | 'certificate' {
  if (course.progress === 100 && course.certificate_image) {
    return 'certificate'
  }
  return 'learning'
}

/**
 * Validate course input data
 */
export function validateCourseInput(data: CourseInput): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Course name is required' })
  } else if (data.name.trim().length > 200) {
    errors.push({
      field: 'name',
      message: 'Course name must be 200 characters or less',
    })
  }

  if (!data.organisation || data.organisation.trim().length === 0) {
    errors.push({ field: 'organisation', message: 'Organisation is required' })
  } else if (data.organisation.trim().length > 200) {
    errors.push({
      field: 'organisation',
      message: 'Organisation must be 200 characters or less',
    })
  }

  if (!data.issue_date) {
    errors.push({ field: 'issue_date', message: 'Issue date is required' })
  } else {
    const date = new Date(data.issue_date)
    if (isNaN(date.getTime())) {
      errors.push({ field: 'issue_date', message: 'Invalid date format' })
    }
  }

  // Progress validation
  if (typeof data.progress !== 'number') {
    errors.push({ field: 'progress', message: 'Progress must be a number' })
  } else if (data.progress < 0 || data.progress > 100) {
    errors.push({
      field: 'progress',
      message: 'Progress must be between 0 and 100',
    })
  }

  // Optional fields validation
  if (data.url && data.url.trim().length > 0) {
    try {
      new URL(data.url)
    } catch {
      errors.push({ field: 'url', message: 'Invalid URL format' })
    }
  }

  if (data.platform && data.platform.trim().length > 200) {
    errors.push({
      field: 'platform',
      message: 'Platform must be 200 characters or less',
    })
  }

  if (data.certificate_image && data.certificate_image.trim().length > 2048) {
    errors.push({
      field: 'certificate_image',
      message: 'Certificate image URL must be 2048 characters or less',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate course update data
 */
export function validateCourseUpdate(data: CourseUpdate): ValidationResult {
  const errors: ValidationError[] = []

  // Validate only fields that are provided
  if (data.name !== undefined) {
    if (data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Course name cannot be empty' })
    } else if (data.name.trim().length > 200) {
      errors.push({
        field: 'name',
        message: 'Course name must be 200 characters or less',
      })
    }
  }

  if (data.organisation !== undefined) {
    if (data.organisation.trim().length === 0) {
      errors.push({
        field: 'organisation',
        message: 'Organisation cannot be empty',
      })
    } else if (data.organisation.trim().length > 200) {
      errors.push({
        field: 'organisation',
        message: 'Organisation must be 200 characters or less',
      })
    }
  }

  if (data.issue_date !== undefined) {
    const date = new Date(data.issue_date)
    if (isNaN(date.getTime())) {
      errors.push({ field: 'issue_date', message: 'Invalid date format' })
    }
  }

  if (data.progress !== undefined) {
    if (typeof data.progress !== 'number') {
      errors.push({ field: 'progress', message: 'Progress must be a number' })
    } else if (data.progress < 0 || data.progress > 100) {
      errors.push({
        field: 'progress',
        message: 'Progress must be between 0 and 100',
      })
    }
  }

  if (data.url !== undefined && data.url.trim().length > 0) {
    try {
      new URL(data.url)
    } catch {
      errors.push({ field: 'url', message: 'Invalid URL format' })
    }
  }

  if (data.platform !== undefined && data.platform.trim().length > 200) {
    errors.push({
      field: 'platform',
      message: 'Platform must be 200 characters or less',
    })
  }

  if (
    data.certificate_image !== undefined &&
    data.certificate_image.trim().length > 2048
  ) {
    errors.push({
      field: 'certificate_image',
      message: 'Certificate image URL must be 2048 characters or less',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
