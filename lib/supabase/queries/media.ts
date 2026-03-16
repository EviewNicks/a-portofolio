import prisma from '@/prisma/lib/client';

/**
 * Get all media records for a project, ordered by created_at ascending.
 * Requirements: 7.4
 */
export async function getMediaByProjectId(projectId: string) {
  return prisma.projectMedia.findMany({
    where: { project_id: projectId },
    orderBy: { created_at: 'asc' },
  });
}

/**
 * Find a single media record by ID. Returns null if not found.
 * Requirements: 7.5
 */
export async function getMediaById(id: string) {
  return prisma.projectMedia.findUnique({ where: { id } });
}

/**
 * Create a new project_media record after successful storage upload.
 * Requirements: 7.1
 */
export async function createMediaRecord(data: {
  project_id: string;
  storage_path: string;
  public_url: string;
  file_name: string;
}) {
  return prisma.projectMedia.create({
    data: {
      project: { connect: { id: data.project_id } },
      storage_path: data.storage_path,
      public_url: data.public_url,
      file_name: data.file_name,
    },
  });
}

/**
 * Delete a project_media record by ID.
 * Requirements: 7.5
 */
export async function deleteMediaRecord(id: string) {
  return prisma.projectMedia.delete({ where: { id } });
}
