'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { AdminProjectList } from '@/features/admin/components/AdminProjectList';
import type { DynamicProject } from '@/features/projects/types';

function getSecret() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('secret') ?? '';
}

// Next.js v16: use client component with window.location.search for secret passthrough
export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<DynamicProject[]>([]);
  const [loading, setLoading] = useState(true);
  const secret = getSecret();

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href={`/admin/projects/new?secret=${secret}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          Loading projects...
        </div>
      ) : (
        <AdminProjectList
          projects={projects}
          secret={secret}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
