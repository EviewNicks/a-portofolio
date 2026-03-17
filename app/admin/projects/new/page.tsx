'use client';

import { AdminProjectForm } from '@/features/admin/components/AdminProjectForm';

function getSecret() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('secret') ?? '';
}

export default function NewProjectPage() {
  const secret = getSecret();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <p className="text-gray-400 text-sm mt-1">
          Create a new portfolio project
        </p>
      </div>
      <AdminProjectForm secret={secret} />
    </div>
  );
}
