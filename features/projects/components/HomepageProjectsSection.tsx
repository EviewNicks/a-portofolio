import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllProjects } from '@/lib/supabase/queries/projects';
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline';
import { DynamicProjectCard } from './dynamic/DynamicProjectCard';
import type { DynamicProject, ProjectStatus } from '@/features/projects/types';

const MAX_HOMEPAGE_PROJECTS = 6;

export async function HomepageProjectsSection() {
  const rawProjects = await getAllProjects();

  const projects: DynamicProject[] = rawProjects.slice(0, MAX_HOMEPAGE_PROJECTS).map((p) => ({
    id: p.id,
    title: p.title,
    short_description: p.short_description,
    long_description: p.long_description ?? undefined,
    tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
    status: p.status as ProjectStatus,
    github_repo_url: p.github_repo_url ?? undefined,
    github_owner: p.github_owner ?? undefined,
    github_repo: p.github_repo ?? undefined,
    last_sync_at: p.last_sync_at?.toISOString() ?? undefined,
    created_at: p.created_at.toISOString(),
    updated_at: p.updated_at.toISOString(),
  }));

  const statsEntries = await Promise.all(
    projects.map(async (p) => {
      const entries = await getTimelineEntriesByProjectId(p.id);
      const sprintSet = new Set(entries.map((e) => e.sprint_number));
      const prCount = entries.filter((e) => e.entry_type === 'pr').length;
      return [p.id, { sprintCount: sprintSet.size, prCount }] as const;
    })
  );
  const stats = Object.fromEntries(statsEntries);

  return (
    <section id="projects" className="relative py-16 lg:py-24">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #d97706 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins)' }}>
            A showcase of development work, sprints, and technical progress.
          </p>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No projects yet. Add some from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <DynamicProjectCard
                key={project.id}
                project={project}
                sprintCount={stats[project.id]?.sprintCount}
                prCount={stats[project.id]?.prCount}
              />
            ))}
          </div>
        )}

        {/* View All */}
        {rawProjects.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              View All Projects
              <ArrowRight size={15} />
            </Link>
            {rawProjects.length > MAX_HOMEPAGE_PROJECTS && (
              <p className="text-xs text-muted-foreground mt-3">
                Showing {MAX_HOMEPAGE_PROJECTS} of {rawProjects.length} projects
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
