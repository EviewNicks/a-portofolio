import prisma from '@/prisma/lib/client';
import type { Prisma } from '@/generated/prisma';

/**
 * Get all timeline entries for a project, sorted by sprint_number asc then date asc.
 * Requirements: 4.4, 4.6
 */
export async function getTimelineEntriesByProjectId(projectId: string) {
  return prisma.timelineEntry.findMany({
    where: { project_id: projectId },
    orderBy: [{ sprint_number: 'asc' }, { date: 'asc' }],
  });
}

/**
 * Create a new timeline entry.
 * Requirements: 4.2, 4.3
 */
export async function createTimelineEntry(data: Prisma.TimelineEntryCreateInput) {
  return prisma.timelineEntry.create({ data });
}

/**
 * Update a timeline entry by ID.
 * Requirements: 4.5
 */
export async function updateTimelineEntry(id: string, data: Prisma.TimelineEntryUpdateInput) {
  return prisma.timelineEntry.update({ where: { id }, data });
}

/**
 * Delete a timeline entry by ID.
 * Requirements: 4.4
 */
export async function deleteTimelineEntry(id: string) {
  return prisma.timelineEntry.delete({ where: { id } });
}

/**
 * Upsert a timeline entry by project_id + github_pr_number (for GitHub sync deduplication).
 * Requirements: 5.3
 */
export async function upsertTimelineEntryByPR(
  projectId: string,
  prNumber: number,
  data: Prisma.TimelineEntryCreateInput
) {
  return prisma.timelineEntry.upsert({
    where: {
      project_id_github_pr_number: {
        project_id: projectId,
        github_pr_number: prNumber,
      },
    },
    create: data,
    update: {}, // skip update if already exists
  });
}
