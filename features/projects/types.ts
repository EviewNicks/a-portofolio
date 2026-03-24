// Dynamic Project Management Timeline - Type Definitions

export type ProjectStatus = 'active' | 'maintenance' | 'archived';

export type EntryType =
  | 'pr'
  | 'milestone'
  | 'blog_post'
  | 'video'
  | 'deployment'
  | 'release';

export type PRStatus = 'merged' | 'closed' | 'open';

export interface DynamicProject {
  id: string;
  title: string;
  short_description: string;
  long_description?: string;
  tech_stack: string[];
  status: ProjectStatus;
  github_repo_url?: string;
  github_owner?: string;
  github_repo?: string;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TimelineEntry {
  id: string;
  project_id: string;
  entry_type: EntryType;
  date: string;
  sprint_number: number;
  title: string;
  description?: string;
  external_url?: string;
  external_title?: string;
  external_status?: PRStatus;
  is_featured: boolean;
  media_preview?: string;
  github_pr_number?: number;
  github_pr_title?: string;
  github_author?: string;
  created_at: string;
  updated_at: string;
}

export interface SprintGroup {
  number: number;
  entries: TimelineEntry[];
}

export interface GitHubStats {
  stars: number;
  forks: number;
  contributors: number;
  last_commit_date?: string;
  fetched_at: string;
}

export interface YouTubePreview {
  video_id: string;
  title: string;
  thumbnail_url: string;
  view_count: string;
  url: string;
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  storage_path: string;
  public_url: string;
  file_name: string;
  created_at: string;
}

// Validation result type used by utility functions
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Raw GitHub PR data from API response
export interface GitHubPRData {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  merged_at: string;
  user: {
    login: string;
  };
  labels: Array<{ name: string }>;
}

// Input types for creating/updating records
export type CreateProjectInput = Omit<
  DynamicProject,
  'id' | 'created_at' | 'updated_at' | 'last_sync_at'
>;

export type UpdateProjectInput = Partial<CreateProjectInput>;

export type CreateTimelineEntryInput = Omit<
  TimelineEntry,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdateTimelineEntryInput = Partial<
  Omit<CreateTimelineEntryInput, 'project_id'>
>;
