# Dynamic Project Management Timeline System

## Overview

Transform the existing static project showcase into a dynamic, evidence-based portfolio system that demonstrates development process, sprint-based progress, and technical journey through PRs, activities, and media integration. This feature provides recruiters, clients, and personal learning users with comprehensive project visibility beyond just deliverables.

**Project**: AI Engineer Portfolio (a-portofolio)
**Owner**: Ardiansyah
**Priority**: High
**Timeline**: Q2 2026

---

## Problem Statement

### Current State
- Projects displayed statically with limited information
- No demonstration of development process
- Missing evidence of technical journey (PRs, commits, activities)
- Limited ability to showcase blog posts, videos, milestones alongside development work
- No progress tracking or sprint visualization

### User Pain Points
- **Recruiters**: Can't assess development process and consistency
- **Clients**: Can't verify progress or project scope evolution
- **Personal**: No systematic tracking of development milestones

---

## Solution Overview

A dynamic project management system with:
1. **GitHub PR Integration**: Auto-fetch merged PRs for evidence of work
2. **Custom Activities**: Manual addition of blog posts, videos, milestones
3. **Preview System**: YouTube URL preview before approval
4. **Sprint-Based Timeline**: Card-based visual timeline with chronological progression
5. **Project Stats**: GitHub-based metrics (stars, forks, contributors)
6. **Admin Dashboard**: Secret URL-based management interface

---

## User Stories & Requirements

### As a Recruiter
**Given** I'm evaluating Ardiansyah's technical capabilities
**When** I visit a project detail page
**Then** I can see:
- Technical journey through PRs and commits
- Sprint-based progress visualization
- Evidence of problem-solving and development process
- Current project status and maintenance

### As a Client
**Given** I'm hiring for freelance work
**When** I review project progress
**Then** I can see:
- Detailed project history
- Sprint-based milestone completion
- Evidence of continuous development
- Media integration (videos, documentation)

### As Ardiansyah
**Given** I'm developing new features
**When** I complete a sprint
**Then** I can:
- Add PR-based timeline entries automatically
- Manually add custom activities (blog, video, milestone)
- Track project progress visually
- Maintain professional portfolio effortlessly

---

## Architecture & Technology

### Backend Stack
```typescript
Supabase (PostgreSQL)
├── projects table          → Project metadata
├── timeline_entries table  → PRs, activities, milestones
├── youtube_preview table   → Previewed YouTube URLs
└── admin_sessions table    → Secret-based auth
```

### Frontend Stack
```typescript
Next.js 16 + React 19
├── /projects/[id]         → Project detail page
├── /admin?secret=*         → Admin dashboard
└── API routes              → Supabase + GitHub API
```

### Integrations
```
GitHub API (Personal Access Token)
├── Fetch merged PRs
├── Get repo statistics
└── Retrieve commit activity

YouTube API
├── Preview videos from URL
└── Extract video metadata

Supabase
├── PostgreSQL database
├── Auth (email/password)
└── Real-time subscriptions
```

---

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] NOT NULL,  -- e.g., ["Next.js", "TypeScript", "Supabase"]
  status TEXT DEFAULT 'active',  -- active, maintenance, archived
  github_repo_url TEXT UNIQUE,
  github_owner TEXT,  -- Extracted from repo URL
  github_repo TEXT,   -- Extracted from repo URL
  last_sync_at TIMESTAMP,  -- Last GitHub API sync
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_github ON projects(github_owner, github_repo);
```

### Timeline Entries Table
```sql
CREATE TYPE entry_type AS ENUM (
  'pr',           -- GitHub Pull Request
  'milestone',    -- Custom milestone
  'blog_post',    -- Blog article
  'video',        -- YouTube video
  'deployment',   -- Deployment event
  'release'       -- Release/Version
);

CREATE TYPE pr_status AS ENUM (
  'merged',
  'closed',
  'open'
);

CREATE TABLE timeline_entries (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  entry_type entry_type NOT NULL,
  date TIMESTAMP NOT NULL,
  sprint_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  external_url TEXT,  -- GitHub PR link, YouTube link, etc.
  external_title TEXT,  -- Auto-extracted or manual
  external_status pr_status DEFAULT 'merged',
  is_featured BOOLEAN DEFAULT FALSE,  -- Highlight this entry
  media_preview TEXT,  -- YouTube video preview data
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- GitHub-specific fields
  github_pr_number INTEGER,
  github_pr_title TEXT,
  github_author TEXT,

  UNIQUE(project_id, sprint_number, date, entry_type)
);

CREATE INDEX idx_timeline_project ON timeline_entries(project_id);
CREATE INDEX idx_timeline_date ON timeline_entries(date);
CREATE INDEX idx_timeline_type ON timeline_entries(entry_type);
```

### YouTube Preview Table
```sql
CREATE TABLE youtube_previews (
  id TEXT PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  video_id TEXT NOT NULL,
  title TEXT,
  thumbnail_url TEXT,
  view_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
);

CREATE INDEX idx_youtube_preview_url ON youtube_previews(url);
CREATE INDEX idx_youtube_preview_expires ON youtube_previews(expires_at);
```

### Admin Sessions Table
```sql
CREATE TABLE admin_sessions (
  id TEXT PRIMARY KEY,
  secret_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '1 hour'),
  last_accessed TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_admin_sessions_secret ON admin_sessions(secret_key);
CREATE INDEX idx_admin_sessions_expires ON admin_sessions(expires_at);
```

---

## Feature Components

### 1. Project List Page (`/projects`)

**Features**:
- Grid of project cards
- Filter by status (active, maintenance, archived)
- Quick stats: total projects, active projects, months of development
- Search functionality

**Component Structure**:
```
ProjectList/
├── ProjectGrid.tsx         → Grid layout of project cards
├── ProjectCard.tsx         → Individual project summary
├── ProjectFilters.tsx      → Filter controls
├── ProjectStats.tsx        → Dashboard stats
└── index.ts                → Main component
```

**Project Card Display**:
```
┌─────────────────────────────────┐
│ Project Title                   │
│ [Status Badge]                  │
│ Short description               │
│ Tech Stack: [Next.js] [TS]      │
│ Stats: 3 Sprints • 12 PRs       │
│ [View Project →]                │
└─────────────────────────────────┘
```

---

### 2. Project Detail Page (`/projects/[id]`)

**Features**:
- Project header with comprehensive info
- GitHub-based stats
- Media gallery (screenshots, YouTube)
- Sprint-based timeline

**Component Structure**:
```
ProjectDetail/
├── ProjectHeader.tsx           → Project overview
├── ProjectStats.tsx            → GitHub stats
├── MediaGallery.tsx            → Screenshots + YouTube
├── TimelineSection.tsx         → Sprint timeline
├── TimelineEntryCard.tsx       → Individual timeline entry
└── RelatedLinks.tsx            → External links
```

**Project Header**:
```typescript
interface ProjectHeaderProps {
  project: {
    id: string;
    title: string;
    short_description: string;
    long_description?: string;
    tech_stack: string[];
    status: 'active' | 'maintenance' | 'archived';
    github_repo_url?: string;
  };
}
```

**Project Stats (GitHub Auto-fetch)**:
```typescript
interface ProjectStats {
  stars: number;           // GitHub stars
  forks: number;           // GitHub forks
  contributors: number;    // GitHub contributors
  total_prs: number;       // Merged PRs from timeline
  total_sprints: number;   // Timeline sprint entries
  last_commit?: string;    // From GitHub API
  last_updated: Date;      // Database timestamp
}
```

**Media Gallery**:
- Screenshots carousel
- YouTube video embeds
- Link to live demo (if available)

**Timeline Section**:
```
Timeline Layout:
┌──────────────────────────────────────┐
│ SPRINT 1: Backend Foundation         │
│ ┌────────────────────────────────┐  │
│ │ PR #42: Initial setup         │  │
│ │ 2026-02-15 • merged            │  │
│ │ [View PR →]                    │  │
│ └────────────────────────────────┘  │
│ ┌────────────────────────────────┐  │
│ │ Milestone: Database schema     │  │
│ │ 2026-02-20                     │  │
│ │ Completed core database setup  │  │
│ └────────────────────────────────┘  │
├──────────────────────────────────────┤
│ SPRINT 2: API Development           │
│ ...                                  │
└──────────────────────────────────────┘
```

---

### 3. Timeline Entry Types

#### Type A: GitHub PR (Auto-fetch)
**Auto-fetched from GitHub API**:
```typescript
interface PREntry {
  entry_type: 'pr';
  title: string;          // PR title
  description?: string;   // PR body (truncated)
  external_url: string;   // GitHub PR URL
  external_title: string; // "PR #42: Feature XYZ"
  github_pr_number: number;
  github_author: string;
  external_status: 'merged';
  is_featured: boolean;
}
```

**Auto-fetch Logic**:
```typescript
async function fetchGitHubPRs(owner: string, repo: string) {
  // Call GitHub API
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=merged`
  );
  const prs = await response.json();

  // Convert to timeline entries
  return prs.map(pr => ({
    entry_type: 'pr',
    title: pr.title,
    description: pr.body?.substring(0, 200),
    external_url: pr.html_url,
    github_pr_number: pr.number,
    github_author: pr.user.login,
    date: pr.merged_at,
    sprint_number: calculateSprintNumber(pr.merged_at),
    is_featured: pr.labels.some(l => l.name === 'featured')
  }));
}
```

#### Type B: Custom Milestone
**Manual entry**:
```typescript
interface MilestoneEntry {
  entry_type: 'milestone';
  title: string;
  description: string;
  external_url?: string;  // Optional link
  date: Date;
  sprint_number: number;
  is_featured: boolean;
}
```

#### Type C: Blog Post
**Manual entry**:
```typescript
interface BlogEntry {
  entry_type: 'blog_post';
  title: string;
  description: string;
  external_url: string;  // Blog article URL
  date: Date;
  sprint_number: number;
  is_featured: boolean;
}
```

#### Type D: YouTube Video
**Manual entry with preview**:
```typescript
interface VideoEntry {
  entry_type: 'video';
  title: string;
  description: string;
  external_url: string;  // YouTube URL
  video_id: string;      // Extracted from URL
  date: Date;
  sprint_number: number;
  is_featured: boolean;
}
```

**YouTube Preview System**:
1. User enters YouTube URL
2. System extracts video_id and fetches metadata via YouTube Data API
3. Shows preview card with thumbnail, title, view count
4. User approves → saves to timeline
5. User rejects → doesn't save, show error

**Preview Request Flow**:
```typescript
async function previewYouTubeVideo(url: string): Promise<VideoPreview> {
  const videoId = extractVideoId(url);

  // Fetch metadata from YouTube API
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}`
  );
  const data = await response.json();

  return {
    video_id: videoId,
    title: data.items[0].snippet.title,
    thumbnail_url: data.items[0].snippet.thumbnails.maxres?.url,
    view_count: data.items[0].statistics.viewCount,
    duration: data.items[0].contentDetails.duration
  };
}
```

#### Type E: Deployment
**Optional: Auto from CI/CD or manual**:
```typescript
interface DeploymentEntry {
  entry_type: 'deployment';
  title: string;
  description: string;
  external_url: string;  // Deployment URL
  environment: 'production' | 'staging' | 'development';
  date: Date;
  sprint_number: number;
}
```

#### Type F: Release
**Version-based entry**:
```typescript
interface ReleaseEntry {
  entry_type: 'release';
  title: string;           // "v1.2.0"
  description: string;
  version: string;
  external_url?: string;   // Release notes URL
  date: Date;
  sprint_number: number;
  is_featured: boolean;
}
```

---

### 4. Admin Dashboard (`/admin?secret=<SECRET_KEY>/projects`)

**Authentication**: URL-based secret key (no cookies, no sessions)

**Features**:
- Project CRUD operations
- Timeline entry management (add/edit/delete)
- GitHub PR auto-sync
- YouTube preview management
- Batch operations

**Admin Dashboard Structure**:
```
AdminDashboard/
├── AdminLayout.tsx              → Protected layout
├── ProjectManagement.tsx        → Project CRUD
├── TimelineManagement.tsx       → Timeline entry management
├── GitHubSyncPanel.tsx          → PR sync controls
├── YouTubePreviewManager.tsx    → Video preview queue
├── BatchImport.tsx              → Bulk import from JSON
└── index.ts                     → Main dashboard
```

**Authentication Flow**:
```typescript
function validateAdminSecret(secret: string): boolean {
  const validSecret = process.env.ADMIN_SECRET_KEY;
  return secret === validSecret;
}

// Middleware for protected routes
export function withAdminAuth(req: NextApiRequest): boolean {
  const { secret } = req.query;
  return validateAdminSecret(secret as string);
}
```

**Project Management**:
```
Create Project Form:
├── Project Title
├── Short Description
├── Long Description (textarea)
├── Tech Stack (tags input)
├── GitHub Repo URL (auto-detect owner/repo)
├── Status (dropdown)
└── [Save Project]
```

**Timeline Management**:
```
Add Entry Form:
├── Entry Type (dropdown)
│   ├── GitHub PR (auto-fetch from linked repo)
│   ├── Milestone (manual)
│   ├── Blog Post
│   ├── YouTube Video (with preview)
│   └── Release
├── Date
├── Sprint Number
├── Title
├── Description
├── External URL (manual or auto-extracted)
└── [Add Entry]
```

**GitHub Sync Panel**:
```
GitHub PR Sync:
├── Repository Owner/Repo
├── Last Sync: 2026-02-20 14:30
├── [Sync Now Button]
├── Sync History:
│   ├── 2026-02-20: Added 5 PRs
│   └── 2026-02-15: Added 3 PRs
└── Settings: Auto-sync frequency
```

**YouTube Preview Queue**:
```
Preview Queue:
┌─────────────────────────────────────┐
│ [Pending Previews] (3)              │
├─────────────────────────────────────┤
│ Video #1                            │
│ ┌─────────────────────────────────┐ │
│ │ [Thumbnail] Video Title         │ │
│ │ Preview Button                  │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Video #2                            │
│ ...                                 │
└─────────────────────────────────────┘
```

---

### 5. GitHub Integration

**Personal Access Token (PAT) Setup**:
```bash
# Create PAT with these scopes:
- repo (full repository access)
- read:user
- user:email

# Store in environment variables:
- GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

**GitHub API Endpoints**:

1. **Fetch Merged PRs**:
```typescript
GET /repos/{owner}/{repo}/pulls?state=merged&sort=merged_at&direction=desc
```

2. **Fetch Repo Statistics**:
```typescript
GET /repos/{owner}/{repo}
```
Response includes:
- stargazers_count
- forks_count
- subscribers_count
- open_issues_count
- latest_commit (via commits API)

3. **Fetch Contributors**:
```typescript
GET /repos/{owner}/{repo}/contributors
```

**Auto-fetch Strategy**:
```
Frequency: Every 24 hours
Cache Duration: 12 hours
Fallback: Manual entry if API fails
```

**Sync Process**:
```typescript
async function syncProjectGitHubData(projectId: string) {
  const project = await getProjectById(projectId);

  if (!project.github_repo_url) return;

  // Fetch merged PRs
  const prs = await fetchGitHubPRs(
    project.github_owner,
    project.github_repo
  );

  // Fetch repo stats
  const stats = await fetchGitHubRepoStats(
    project.github_owner,
    project.github_repo
  );

  // Update project
  await updateProject(projectId, {
    last_sync_at: new Date(),
    github_stars: stats.stargazers_count,
    github_forks: stats.forks_count,
    github_contributors: stats.subscribers_count
  });

  // Create timeline entries from PRs
  for (const pr of prs) {
    await createTimelineEntry({
      project_id: projectId,
      entry_type: 'pr',
      ...pr
    });
  }
}
```

---

### 6. YouTube Integration

**API Key Setup**:
```bash
# Get API key from Google Cloud Console
# Enable YouTube Data API v3

# Store in environment variables:
- YOUTUBE_API_KEY=AIzaSyxxxxxxxxxxxx
```

**YouTube Data API v3 Endpoints**:

1. **Fetch Video Metadata**:
```typescript
GET https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={videoId}
```

2. **Extract Video ID from URL**:
```typescript
function extractVideoId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
```

**Preview Request Flow**:
```
1. User enters YouTube URL in admin
2. System extracts video_id
3. Fetch metadata from YouTube API
4. Show preview card with thumbnail, title, view count
5. User clicks [Approve] or [Reject]
6. If approved:
   - Create timeline entry
   - Clear from preview queue
7. If rejected:
   - Show error message
   - Keep URL in queue
```

**Preview Storage**:
```typescript
interface VideoPreview {
  id: string;           // UUID
  url: string;          // Original YouTube URL
  video_id: string;
  title: string;
  thumbnail_url: string;
  view_count: string;
  created_at: Date;
  expires_at: Date;     // 24 hours
}

// Store in youtube_previews table
await insertVideoPreview(VideoPreview);

// Cleanup old previews
await deleteExpiredPreviews();
```

---

## Component Specifications

### ProjectList.tsx
```typescript
interface ProjectListProps {
  initialProjects?: Project[];
  filterStatus?: 'active' | 'maintenance' | 'archived';
}

export function ProjectList({ initialProjects, filterStatus }: ProjectListProps) {
  // Fetch projects from Supabase
  // Filter by status if provided
  // Render ProjectGrid

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectFilters statusFilter={filterStatus} />
      <ProjectStats />
      <ProjectGrid projects={projects} />
    </div>
  );
}
```

### ProjectDetail.tsx
```typescript
interface ProjectDetailProps {
  params: { id: string };
  searchParams?: { [key: string]: string };
}

export default async function ProjectDetail({ params, searchParams }: ProjectDetailProps) {
  // Fetch project data
  const project = await getProjectById(params.id);

  // Fetch timeline entries
  const entries = await getTimelineEntriesByProjectId(params.id);

  // Fetch GitHub stats
  const stats = await fetchProjectStats(project);

  // Fetch media (screenshots, YouTube)
  const media = await getProjectMedia(params.id);

  return (
    <div>
      <ProjectHeader project={project} />
      <ProjectStats stats={stats} />
      <MediaGallery media={media} />
      <TimelineSection entries={entries} project={project} />
      <RelatedLinks project={project} />
    </div>
  );
}
```

### TimelineSection.tsx
```typescript
interface TimelineSectionProps {
  entries: TimelineEntry[];
  project: Project;
}

export function TimelineSection({ entries, project }: TimelineSectionProps) {
  // Group entries by sprint
  const sprints = groupEntriesBySprint(entries);

  return (
    <section className="py-16">
      <h2>Development Timeline</h2>
      <div className="space-y-8">
        {sprints.map(sprint => (
          <SprintCard key={sprint.number} sprint={sprint} />
        ))}
      </div>
    </section>
  );
}
```

### SprintCard.tsx
```typescript
interface SprintCardProps {
  sprint: {
    number: number;
    entries: TimelineEntry[];
  };
}

export function SprintCard({ sprint }: SprintCardProps) {
  return (
    <div className="sprint-card glass-effect">
      <div className="sprint-header">
        <h3>Sprint {sprint.number}</h3>
        <div className="sprint-stats">
          {sprint.entries.length} entries
        </div>
      </div>
      <div className="sprint-entries">
        {sprint.entries.map(entry => (
          <TimelineEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
```

### TimelineEntryCard.tsx
```typescript
interface TimelineEntryCardProps {
  entry: TimelineEntry;
  project: Project;
}

export function TimelineEntryCard({ entry, project }: TimelineEntryCardProps) {
  const typeStyles = {
    pr: { color: 'text-green-500', icon: '🔗' },
    milestone: { color: 'text-blue-500', icon: '🎯' },
    blog_post: { color: 'text-purple-500', icon: '📝' },
    video: { color: 'text-red-500', icon: '▶️' },
    deployment: { color: 'text-cyan-500', icon: '🚀' },
    release: { color: 'text-yellow-500', icon: '📦' }
  };

  const style = typeStyles[entry.entry_type];

  return (
    <div className="timeline-entry glass-effect p-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{style.icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold">{entry.title}</h4>
          {entry.description && (
            <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
          )}
          {entry.external_url && (
            <a
              href={entry.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline mt-2 inline-block"
            >
              {entry.entry_type === 'pr' ? 'View PR' :
               entry.entry_type === 'video' ? 'Watch Video' :
               'View Link'} →
            </a>
          )}
          <div className="text-xs text-gray-500 mt-2">
            {formatDate(entry.date)} • Sprint {entry.sprint_number}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### AdminDashboard.tsx
```typescript
interface AdminDashboardProps {
  searchParams?: { secret: string };
}

export default function AdminDashboard({ searchParams }: AdminDashboardProps) {
  // Validate secret
  if (!isValidAdminSecret(searchParams?.secret)) {
    return <UnauthorizedAccess />;
  }

  return (
    <div>
      <AdminLayout>
        <ProjectManagement />
        <TimelineManagement />
        <GitHubSyncPanel />
        <YouTubePreviewManager />
      </AdminLayout>
    </div>
  );
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Supabase project and tables
- [ ] Create environment variables
- [ ] Implement GitHub API integration
- [ ] Create Project CRUD endpoints
- [ ] Build ProjectList component
- [ ] Build ProjectDetail component (without timeline)

### Phase 2: Timeline System (Week 2)
- [ ] Create timeline_entries table
- [ ] Implement timeline entry CRUD
- [ ] Build TimelineSection and SprintCard components
- [ ] Implement GitHub PR auto-fetch
- [ ] Create sprint number calculation logic
- [ ] Build TimelineEntryCard component

### Phase 3: Media & Stats (Week 3)
- [ ] Implement YouTube preview system
- [ ] Create MediaGallery component
- [ ] Build ProjectStats component
- [ ] Implement GitHub stats auto-fetch
- [ ] Add screenshot upload functionality
- [ ] Implement media gallery UI

### Phase 4: Admin Dashboard (Week 4)
- [ ] Create URL-based authentication
- [ ] Build ProjectManagement panel
- [ ] Build TimelineManagement panel
- [ ] Create GitHubSyncPanel
- [ ] Build YouTubePreviewManager
- [ ] Add batch import functionality

### Phase 5: Testing & Polish (Week 5)
- [ ] Test all entry types
- [ ] Test GitHub sync process
- [ ] Test YouTube preview
- [ ] Test admin authentication
- [ ] Performance optimization
- [ ] Add error handling
- [ ] Write documentation

---

## API Endpoints

### Projects Endpoints
```
GET    /api/projects          → List all projects
GET    /api/projects/[id]     → Get single project
POST   /api/projects          → Create project
PUT    /api/projects/[id]     → Update project
DELETE /api/projects/[id]     → Delete project
```

### Timeline Endpoints
```
GET    /api/projects/[id]/timeline → Get timeline entries
POST   /api/projects/[id]/timeline → Add timeline entry
PUT    /api/projects/[id]/timeline/[entryId] → Update entry
DELETE /api/projects/[id]/timeline/[entryId] → Delete entry
```

### GitHub Endpoints
```
POST   /api/github/sync      → Sync PRs for project
GET    /api/github/[owner]/[repo]/stats → Get repo stats
GET    /api/github/[owner]/[repo]/prs   → Get merged PRs
```

### YouTube Endpoints
```
POST   /api/youtube/preview   → Preview video URL
GET    /api/youtube/queue     → Get pending previews
DELETE /api/youtube/queue/[id] → Remove from queue
```

### Admin Endpoints
```
GET    /api/admin/projects?secret=<KEY>  → Get all projects (protected)
POST   /api/admin/projects?secret=<KEY>  → Create project (protected)
POST   /api/admin/timeline?secret=<KEY>  → Add entry (protected)
DELETE /api/admin/timeline?secret=<KEY>  → Delete entry (protected)
```

---

## Security Considerations

### GitHub Token Security
- Store PAT in environment variables only
- Never commit to git
- Use PAT with minimal scopes (repo access)
- Rotate tokens regularly

### Admin Authentication
- URL-based secret (not secure for production)
- Invalidate after 1 hour
- No cookies or sessions
- Re-authenticate on each access
- **Recommendation**: Add IP restriction in production

### YouTube API
- Use API key in environment variables
- Rate limiting (10,000 units/day)
- Cache responses (12 hours)
- No sensitive data in storage

### Supabase Security
- Enable Row Level Security (RLS)
- Use environment variables for connection strings
- Enable database backups
- Use direct URL for admin only

---

## Performance Optimization

### Caching Strategy
```typescript
// API Response Cache
- Projects: 5 minutes
- Timeline entries: 10 minutes
- GitHub stats: 12 hours
- YouTube previews: 6 hours

// Frontend Cache
- Project list: 2 minutes
- Project detail: 5 minutes
- Timeline section: 10 minutes
```

### Image Optimization
```typescript
// Use next/image for all images
import Image from 'next/image';

// Responsive breakpoints
- Screenshots: 640px, 1024px, 1280px, 1920px
- Thumbnails: 320px, 480px, 640px
```

### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX idx_timeline_project_date ON timeline_entries(project_id, date DESC);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_github ON projects(github_owner, github_repo);
```

---

## Testing Strategy

### Unit Tests
```typescript
// Test timeline entry grouping
test('should group entries by sprint', () => {
  const entries = [
    { sprint_number: 1, date: '2026-02-15' },
    { sprint_number: 1, date: '2026-02-18' },
    { sprint_number: 2, date: '2026-02-20' }
  ];
  const grouped = groupEntriesBySprint(entries);
  expect(grouped).toHaveLength(2);
  expect(grouped[0].number).toBe(1);
  expect(grouped[1].number).toBe(2);
});
```

### Integration Tests
```typescript
// Test GitHub PR sync
test('should sync merged PRs from GitHub', async () => {
  const prs = await fetchGitHubPRs('ardiansyah', 'portfolio');
  expect(prs).toHaveLengthGreaterThan(0);
  expect(prs[0].entry_type).toBe('pr');
});
```

### E2E Tests
```typescript
// Test project detail page
test('should display project timeline', async () => {
  const project = await createProject({
    title: 'Test Project',
    github_repo_url: 'https://github.com/ardiansyah/test'
  });

  const response = await fetch(`/projects/${project.id}`);
  expect(response.status).toBe(200);

  const html = await response.text();
  expect(html).toContain('Development Timeline');
});
```

---

## Future Enhancements

### Short-term
- [ ] Add project filtering (by tech stack)
- [ ] Add project search functionality
- [ ] Add contribution graph visualization
- [ ] Add project categorization

### Medium-term
- [ ] Add CI/CD integration for deployment entries
- [ ] Add version release notes
- [ ] Add comment system for timeline entries
- [ ] Add PDF export of project details

### Long-term
- [ ] Add team collaboration features
- [ ] Add project analytics dashboard
- [ ] Add project comparison tool
- [ ] Add mobile optimization improvements

---

## Success Criteria

### Functional Requirements
- ✅ Project list displays all projects with basic info
- ✅ Project detail page shows complete project info
- ✅ GitHub stats auto-fetch and display
- ✅ Timeline shows all entry types (PR, milestone, blog, video, etc.)
- ✅ Admin dashboard allows full CRUD operations
- ✅ URL-based authentication works correctly
- ✅ YouTube preview system works end-to-end

### Non-Functional Requirements
- ✅ Page loads under 3 seconds
- ✅ Timeline renders with 60fps
- ✅ API responses under 500ms (cached data)
- ✅ 95%+ test coverage
- ✅ Accessible (WCAG 2.1 AA)

### User Experience
- ✅ Clear visual hierarchy
- ✅ Easy project discovery
- ✅ Intuitive admin interface
- ✅ Smooth animations
- ✅ Mobile-responsive

---

## Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "next": "^16.0.10",
    "react": "^19.2.1",
    "@supabase/supabase-js": "^2.39.0",
    "date-fns": "^3.3.1",
    "framer-motion": "^12.23.26"
  }
}
```

### Backend Dependencies (Supabase)
- PostgreSQL 14+
- Supabase SDK
- YouTube Data API v3
- GitHub REST API v3

---

## Documentation

### User Documentation
- Project list usage
- Project detail page guide
- Admin dashboard tutorial
- GitHub sync process
- Timeline entry management

### Developer Documentation
- API documentation
- Database schema guide
- Component architecture
- Testing guide
- Deployment guide

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-20 | Initial feature specification |

---

## Notes

- This feature is designed to be incremental - can be built in phases
- GitHub PR auto-fetch is optional - manual entry always available
- YouTube preview requires API key - manual entry works without it
- Admin authentication is simple URL-based - consider adding IP restriction for production
- Timeline visual style is flexible - can adjust to match portfolio aesthetic
