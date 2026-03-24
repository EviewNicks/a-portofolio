import { Suspense } from 'react';
import { getAllProjects, searchProjects } from '@/lib/supabase/queries/projects';
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline';
import { DynamicProjectGrid } from '@/features/projects/components/dynamic/DynamicProjectGrid';
import { DynamicProjectFilters } from '@/features/projects/components/dynamic/DynamicProjectFilters';
import type { DynamicProject, ProjectStatus } from '@/features/projects/types';

interface PageProps {
  searchParams: Promise<{ status?: string; query?: string }>;
}

async function ProjectsData({ status, query }: { status?: string; query?: string }) {
  const rawProjects = (query || status)
    ? await searchProjects(query ?? '', status)
    : await getAllProjects();

  // Cast Prisma result to DynamicProject (dates → strings)
  const projects: DynamicProject[] = rawProjects.map((p) => ({
    id: p.id,
    title: p.title,
    short_description: p.short_description,
    long_description: p.long_description ?? undefined,
    tech_stack: p.tech_stack,
    status: p.status as ProjectStatus,
    github_repo_url: p.github_repo_url ?? undefined,
    github_owner: p.github_owner ?? undefined,
    github_repo: p.github_repo ?? undefined,
    last_sync_at: p.last_sync_at?.toISOString() ?? undefined,
    created_at: p.created_at.toISOString(),
    updated_at: p.updated_at.toISOString(),
  }));

  // Fetch sprint/PR counts per project
  const statsEntries = await Promise.all(
    projects.map(async (p) => {
      const entries = await getTimelineEntriesByProjectId(p.id);
      const sprintSet = new Set(entries.map((e) => e.sprint_number));
      const prCount = entries.filter((e) => e.entry_type === 'pr').length;
      return [p.id, { sprintCount: sprintSet.size, prCount }] as const;
    })
  );
  const stats = Object.fromEntries(statsEntries);

  return <DynamicProjectGrid projects={projects} stats={stats} />;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { status, query } = await searchParams;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 projects-bg-gradient" />
      {/* Subtle warm accent blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full -z-10 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full -z-10 opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d97706 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground font-display mb-2">Projects</h1>
          <p className="text-muted-foreground">A timeline of development work, sprints, and technical progress.</p>
        </div>

        <Suspense fallback={null}>
          <DynamicProjectFilters />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 rounded-xl bg-foreground/5 animate-pulse" />
              ))}
            </div>
          }
        >
          <ProjectsData status={status} query={query} />
        </Suspense>
      </div>
    </main>
  );
}
