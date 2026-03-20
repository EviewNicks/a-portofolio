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
 * Delete ALL timeline entries for a project (bulk reset before re-sync).
 * Returns the count of deleted entries.
 */
export async function deleteAllTimelineEntriesByProjectId(projectId: string): Promise<number> {
  const result = await prisma.timelineEntry.deleteMany({ where: { project_id: projectId } });
  return result.count;
}

/**
 * Upsert a timeline entry by project_id + github_pr_number (for GitHub sync deduplication).
 * Returns the entry and a boolean indicating whether it was newly created.
 * Requirements: 5.3
 */
export async function upsertTimelineEntryByPR(
  projectId: string,
  prNumber: number,
  data: Prisma.TimelineEntryCreateInput
): Promise<{ entry: Awaited<ReturnType<typeof prisma.timelineEntry.create>>; isNew: boolean }> {
  const existing = await prisma.timelineEntry.findUnique({
    where: {
      project_id_github_pr_number: {
        project_id: projectId,
        github_pr_number: prNumber,
      },
    },
  });

  if (existing) {
    return { entry: existing, isNew: false };
  }

  const entry = await prisma.timelineEntry.create({ data });
  return { entry, isNew: true };
}
