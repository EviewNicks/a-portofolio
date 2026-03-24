'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, X } from 'lucide-react';
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
  const [showCreatedBanner, setShowCreatedBanner] = useState(false);
  const secret = getSecret();

  useEffect(() => {
    const created = new URLSearchParams(window.location.search).get('created');
    if (created === '1') setShowCreatedBanner(true);
  }, []);

  useEffect(() => {
    params.then(({ id }) => {
      Promise.all([
        fetch(`/api/projects/${id}`).then((r) => (r.ok ? r.json() : null)),
        fetch(`/api/projects/${id}/timeline`).then((r) => (r.ok ? r.json() : { data: [] })),
      ])
        .then(([projRes, entriesRes]) => {
          if (!projRes?.data) {
            setNotFound(true);
          } else {
            setProject(projRes.data);
            const entries = entriesRes?.data ?? entriesRes;
            setTimelineCount(Array.isArray(entries) ? (entries as TimelineEntry[]).length : 0);
          }
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="text-center py-20 text-muted-foreground text-sm">
        Project not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success banner */}
      {showCreatedBanner && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
          <CheckCircle2 size={16} className="shrink-0" />
          <span className="flex-1">Project <strong>{project.title}</strong> berhasil dibuat.</span>
          <button
            onClick={() => setShowCreatedBanner(false)}
            aria-label="Dismiss"
            className="hover:opacity-70 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Page header */}
      <div className="space-y-1">
        <h1
          className="text-3xl font-bold text-foreground"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Project Detail
        </h1>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-poppins)' }}>
          Admin view
        </p>
      </div>

      <AdminProjectDetail
        project={project}
        secret={secret}
        timelineCount={timelineCount}
      />
    </div>
  );
}
