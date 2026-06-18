import prisma from '@/prisma/lib/client'
import type { Prisma } from '@/generated/prisma'

/**
 * Get all features for a project, ordered by display_order ascending.
 * Includes media records, also ordered by display_order ascending.
 * Requirements: 2.11, 2.12, 4.2, 5.8
 */
export async function getFeaturesByProjectId(projectId: string) {
  // Check if project exists first
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    return []
  }

  return prisma.projectFeature.findMany({
    where: { project_id: projectId },
    orderBy: { display_order: 'asc' },
    include: {
      media: {
        orderBy: { display_order: 'asc' },
      },
    },
  })
}

/**
 * Get a single feature by ID with all associated media ordered by display_order ascending.
 * Returns null if not found.
 * Requirements: 2.13, 2.14, 6.3
 */
export async function getFeatureById(featureId: string) {
  return prisma.projectFeature.findUnique({
    where: { id: featureId },
    include: {
      media: {
        orderBy: { display_order: 'asc' },
      },
    },
  })
}

/**
 * Create a new project feature.
 * Requirements: 2.5, 2.6
 */
export async function createFeature(
  data:
    | Prisma.ProjectFeatureUncheckedCreateInput
    | Prisma.ProjectFeatureCreateInput
) {
  return prisma.projectFeature.create({
    data,
  })
}

/**
 * Update an existing project feature.
 * Requirements: 2.7, 2.9
 */
export async function updateFeature(
  id: string,
  data: Prisma.ProjectFeatureUpdateInput
) {
  return prisma.projectFeature.update({
    where: { id },
    data,
  })
}

/**
 * Delete a project feature by ID.
 * Database cascade constraints will handle the deletion of associated media records.
 * Requirements: 2.10
 */
export async function deleteFeature(id: string) {
  return prisma.projectFeature.delete({
    where: { id },
  })
}

/**
 * Bulk updates display_order values for features in a transaction.
 * Rollback occurs automatically on failure.
 * Requirements: 4.9, 9.3
 */
export async function updateFeatureDisplayOrder(
  updates: Array<{ id: string; display_order: number }>
) {
  return prisma.$transaction(
    updates.map(update =>
      prisma.projectFeature.update({
        where: { id: update.id },
        data: { display_order: update.display_order },
      })
    )
  )
}

/**
 * Get all media records for a feature, ordered by display_order ascending.
 * Requirements: 3.4
 */
export async function getFeatureMedia(featureId: string) {
  return prisma.projectFeatureMedia.findMany({
    where: { feature_id: featureId },
    orderBy: { display_order: 'asc' },
  })
}

/**
 * Create a new feature media record.
 * Requirements: 3.4, 3.8
 */
export async function createFeatureMedia(
  data:
    | Prisma.ProjectFeatureMediaUncheckedCreateInput
    | Prisma.ProjectFeatureMediaCreateInput
) {
  return prisma.projectFeatureMedia.create({
    data,
  })
}

/**
 * Delete a feature media record by ID.
 * Requirements: 3.7
 */
export async function deleteFeatureMedia(id: string) {
  return prisma.projectFeatureMedia.delete({
    where: { id },
  })
}
