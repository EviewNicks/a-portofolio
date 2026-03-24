'use client';

import { AdminProjectForm } from '@/features/admin/components/AdminProjectForm';

function getSecret() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('secret') ?? '';
}

export default function NewProjectPage() {
  const secret = getSecret();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
          New Project
        </h1>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-poppins)' }}>
          Create a new portfolio project
        </p>
      </div>

      <AdminProjectForm secret={secret} />
    </div>
  );
}
