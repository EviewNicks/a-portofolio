'use client';

import { useState, useEffect } from 'react';
import { TimelineManagement } from '@/features/admin/components/TimelineManagement';
import { GitHubSyncPanel } from '@/features/admin/components/GitHubSyncPanel';
import { YouTubePreviewManager } from '@/features/admin/components/YouTubePreviewManager';
import { MediaUploadPanel } from '@/features/admin/components/MediaUploadPanel';
import type { DynamicProject, TimelineEntry, ProjectMedia } from '@/features/projects/types';

interface PageParams {
  params: Promise<{ id: string }>;
}

function getSecret() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('secret') ?? '';
}

export default function TimelineManagementPage({ params }: PageParams) {
  const [project, setProject] = useState<DynamicProject | null>(null);
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState('');
  const secret = getSecret();

  useEffect(() => {
    params.then(({ id }) => {
      setProjectId(id);
      Promise.all([
        fetch(`/api/projects/${id}`).then((r) => (r.ok ? r.json() : null)),
        fetch(`/api/projects/${id}/timeline`).then((r) => (r.ok ? r.json() : [])),
        fetch(`/api/media?project_id=${id}`).then((r) => (r.ok ? r.json() : [])),
      ])
        .then(([proj, ents, med]) => {
          setProject(proj);
          setEntries(Array.isArray(ents) ? ents : []);
          setMedia(Array.isArray(med) ? med : []);
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  if (loading) {
    return <div className="text-center py-16 text-gray-500 text-sm">Loading...</div>;
  }

  if (!project) {
    return <div className="text-center py-16 text-gray-500 text-sm">Project not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Timeline Management</h1>
        <p className="text-gray-400 text-sm mt-1">{project.title}</p>
      </div>

      <TimelineManagement
        projectId={projectId}
        secret={secret}
        initialEntries={entries}
      />

      <hr className="border-gray-800" />

      <GitHubSyncPanel
        project={project}
        secret={secret}
        onSyncComplete={(newProject) => setProject(newProject)}
      />

      <hr className="border-gray-800" />

      <YouTubePreviewManager
        projectId={projectId}
        secret={secret}
      />

      <hr className="border-gray-800" />

      <MediaUploadPanel
        projectId={projectId}
        secret={secret}
        initialMedia={media}
      />
    </div>
  );
}
