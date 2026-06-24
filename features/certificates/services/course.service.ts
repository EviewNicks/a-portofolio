// Course Service
// Data access layer for course CRUD operations

import prisma from '@/prisma/lib/client'
import type { Course, CourseInput, CourseUpdate, CourseStatus } from '../types'
import type { Prisma, Course as DbCourse } from '@/generated/prisma'
import { generateSlug } from './slug.service'
import { determineStatus } from './validation.service'

function mapCourse(course: DbCourse): Course {
  return {
    id: course.id,
    name: course.name,
    slug: course.slug,
    organisation: course.organisation,
    issue_date: course.issue_date.toISOString(),
    description: course.description ?? undefined,
    progress: course.progress,
    certificate_image: course.certificate_image ?? undefined,
    platform: course.platform ?? undefined,
    url: course.url ?? undefined,
    status: course.status as CourseStatus, // Cast from generated Prisma enum to app CourseStatus
    deleted_at: course.deleted_at?.toISOString(),
    created_at: course.created_at.toISOString(),
    updated_at: course.updated_at.toISOString(),
  }
}

/**
 * Get all non-deleted courses sorted by creation date
 *
 * @returns Array of courses
 */
export async function getAllCourses(): Promise<Course[]> {
  const courses = await prisma.course.findMany({
    where: {
      deleted_at: null,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return courses.map(mapCourse)
}

/**
 * Get a single course by slug
 *
 * @param slug - Course slug
 * @returns Course or null if not found
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = await prisma.course.findUnique({
    where: {
      slug,
      deleted_at: null,
    },
  })

  if (!course) {
    return null
  }

  return mapCourse(course)
}

/**
 * Get a single course by ID
 *
 * @param id - Course ID
 * @returns Course or null if not found
 */
export async function getCourseById(id: string): Promise<Course | null> {
  const course = await prisma.course.findUnique({
    where: {
      id,
      deleted_at: null,
    },
  })

  if (!course) {
    return null
  }

  return mapCourse(course)
}

/**
 * Create a new course
 *
 * @param input - Course input data
 * @returns Created course
 */
export async function createCourse(input: CourseInput): Promise<Course> {
  // Generate slug from name
  const slug = generateSlug(input.name)

  // Determine status based on progress
  const status = determineStatus(input.progress, input.certificate_image)

  const course = await prisma.course.create({
    data: {
      name: input.name.trim(),
      slug,
      organisation: input.organisation.trim(),
      issue_date: new Date(input.issue_date),
      description: input.description?.trim(),
      progress: input.progress,
      certificate_image: input.certificate_image?.trim(),
      platform: input.platform?.trim(),
      url: input.url?.trim(),
      status,
    },
  })

  return mapCourse(course)
}

/**
 * Update an existing course
 *
 * @param id - Course ID
 * @param update - Course update data
 * @returns Updated course
 */
export async function updateCourse(
  id: string,
  update: CourseUpdate
): Promise<Course> {
  // Prepare update data
  const updateData: Prisma.CourseUpdateInput = {}

  if (update.name !== undefined) {
    updateData.name = update.name.trim()
    updateData.slug = generateSlug(update.name)
  }

  if (update.organisation !== undefined) {
    updateData.organisation = update.organisation.trim()
  }

  if (update.issue_date !== undefined) {
    updateData.issue_date = new Date(update.issue_date)
  }

  if (update.description !== undefined) {
    updateData.description = update.description?.trim()
  }

  if (update.progress !== undefined) {
    updateData.progress = update.progress
  }

  if (update.certificate_image !== undefined) {
    updateData.certificate_image = update.certificate_image?.trim()
  }

  if (update.platform !== undefined) {
    updateData.platform = update.platform?.trim()
  }

  if (update.url !== undefined) {
    updateData.url = update.url?.trim()
  }

  // Determine new status if progress or certificate_image changed
  if (update.progress !== undefined || update.certificate_image !== undefined) {
    const existingCourse = await prisma.course.findUnique({ where: { id } })
    const progress = update.progress ?? existingCourse?.progress ?? 0
    const certificateImage =
      update.certificate_image ?? existingCourse?.certificate_image ?? undefined
    updateData.status = determineStatus(progress, certificateImage)
  }

  const course = await prisma.course.update({
    where: { id },
    data: updateData,
  })

  return mapCourse(course)
}

/**
 * Soft delete a course by setting deleted_at timestamp
 *
 * @param id - Course ID
 * @returns void
 */
export async function softDeleteCourse(id: string): Promise<void> {
  await prisma.course.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  })
}

/**
 * Check if a slug already exists
 *
 * @param slug - Slug to check
 * @param excludeId - Course ID to exclude from check (for updates)
 * @returns true if slug exists, false otherwise
 */
export async function slugExists(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const course = await prisma.course.findFirst({
    where: {
      slug,
      ...(excludeId && { id: { not: excludeId } }),
    },
  })

  return course !== null
}
