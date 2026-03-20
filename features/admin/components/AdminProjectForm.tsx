'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';

interface AdminProjectFormProps {
  secret: string;
  /** If provided, form is in edit mode */
  project?: DynamicProject;
}

const STATUS_OPTIONS = ['active', 'maintenance', 'archived'] as const;

export function AdminProjectForm({ secret, project }: AdminProjectFormProps) {
  const router = useRouter();
  const isEdit = !!project;

  const [title, setTitle] = useState(project?.title ?? '');
  const [shortDesc, setShortDesc] = useState(project?.short_description ?? '');
  const [longDesc, setLongDesc] = useState(project?.long_description ?? '');
  const [githubUrl, setGithubUrl] = useState(project?.github_repo_url ?? '');
  const [status, setStatus] = useState<string>(project?.status ?? 'active');
  const [techStack, setTechStack] = useState<string[]>(project?.tech_stack ?? []);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !techStack.includes(tag)) {
      setTechStack((prev) => [...prev, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTechStack((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !shortDesc.trim()) {
      setError('Title and short description are required.');
      return;
    }

    setSaving(true);
    try {
      const body = {
        title: title.trim(),
        short_description: shortDesc.trim(),
        long_description: longDesc.trim() || undefined,
        github_repo_url: githubUrl.trim() || undefined,
        status,
        tech_stack: techStack,
      };

      const url = isEdit
        ? `/api/projects/${project!.id}?secret=${secret}`
        : `/api/projects?secret=${secret}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Failed to save project.');
        return;
      }

      const saved = await res.json();
      router.push(`/admin/projects/${saved.id}?secret=${secret}`);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form data-testid="project-form" onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div data-testid="form-error" className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Project"
          data-testid="input-title"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Short description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">
          Short Description <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="One-line summary of the project"
          data-testid="input-short-desc"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Long description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">
          Long Description
        </label>
        <textarea
          value={longDesc}
          onChange={(e) => setLongDesc(e.target.value)}
          placeholder="Detailed description of the project..."
          rows={5}
          data-testid="input-long-desc"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-y"
        />
      </div>

      {/* Tech stack */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Tech Stack</label>
        <div data-testid="tech-stack-tags" className="flex flex-wrap gap-2 mb-2">
          {techStack.map((tag) => (
            <span
              key={tag}
              data-testid="tech-stack-tag"
              className="flex items-center gap-1 px-2 py-0.5 bg-blue-600/20 text-blue-300 text-xs rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-white"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Next.js, TypeScript... (Enter to add)"
            data-testid="input-tech-tag"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addTag}
            data-testid="btn-add-tag"
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* GitHub URL */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">
          GitHub Repo URL
        </label>
        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          data-testid="input-github-url"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <p className="text-xs text-gray-500">
          Owner and repo will be extracted automatically.
        </p>
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          data-testid="select-status"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          data-testid="btn-submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          data-testid="btn-cancel"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
