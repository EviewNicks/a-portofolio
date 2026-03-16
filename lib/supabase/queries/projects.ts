import prisma from '@/prisma/lib/client';
import type { Prisma, ProjectStatus } from '@/generated/prisma';

/**
 * Get all projects ordered by created_at descending.
 * Requirements: 1.1, 2.1
 */
export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: { created_at: 'desc' },
  });
}

/**
 * Get a single project by ID. Returns null if not found.
 * Requirements: 1.3
 */
export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

/**
 * Create a new project. Extracts github_owner/github_repo from github_repo_url if provided.
 * Requirements: 1.1
 */
export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({ data });
}

/**
 * Update an existing project by ID.
 * Requirements: 1.3
 */
export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  return prisma.project.update({ where: { id }, data });
}

/**
 * Delete a project by ID. Cascades to timeline_entries and project_media.
 * Requirements: 1.4
 */
export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } });
}

/**
 * Search projects by query string (title or short_description, case-insensitive).
 * Optionally filter by status.
 * Requirements: 2.2, 2.3
 */
export async function searchProjects(query: string, status?: string) {
  const where: Prisma.ProjectWhereInput = {};

  if (status) {
    where.status = status as ProjectStatus;
  }

  if (query.trim()) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { short_description: { contains: query, mode: 'insensitive' } },
    ];
  }

  return prisma.project.findMany({
    where,
    orderBy: { created_at: 'desc' },
  });
}
