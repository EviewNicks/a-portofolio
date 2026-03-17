'use client';

import { useState, useEffect } from 'react';
import { AdminProjectDetail } from '@/features/admin/components/AdminProjectDetail';
import type { DynamicProject, TimelineEntry } from '@/features/projects/types';

interface PageParams {
  params: Promise<{ id: string }>;
}

function getSecret() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('secret') ?? '';
}

export default function AdminProjectDetailPage({ params }: PageParams) {
  const [project, setProject] = useState<DynamicProject | null>(null);
  const [timelineCount, setTimelineCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const secret = getSecret();

  useEffect(() => {
    params.then(({ id }) => {
      Promise.all([
        fetch(`/api/projects/${id}`).then((r) => (r.ok ? r.json() : null)),
        fetch(`/api/projects/${id}/timeline`).then((r) =>
          r.ok ? r.json() : []
        ),
      ])
        .then(([proj, entries]) => {
          if (!proj) {
            setNotFound(true);
          } else {
            setProject(proj);
            setTimelineCount(
              Array.isArray(entries) ? (entries as TimelineEntry[]).length : 0
            );
          }
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">Loading...</div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">
        Project not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Project Detail</h1>
        <p className="text-gray-400 text-sm mt-1">Admin view</p>
      </div>
      <AdminProjectDetail
        project={project}
        secret={secret}
        timelineCount={timelineCount}
      />
    </div>
  );
}
