# Design Document: Dynamic Project Management Timeline

## Overview

Sistem ini mengubah portfolio statis menjadi platform portfolio dinamis berbasis bukti kerja. Arsitektur menggunakan Next.js App Router dengan Supabase sebagai backend, GitHub API untuk auto-sync PR, YouTube Data API v3 untuk preview video, dan Supabase Storage untuk screenshot. Admin dashboard dilindungi oleh secret key via URL parameter.

Stack yang digunakan sesuai dengan codebase yang sudah ada: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, dan Lucide React.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│                                                         │
│  /projects                  → ProjectListPage (SSR)     │
│  /projects/[id]             → ProjectDetailPage (SSR)   │
│                                                         │
│  /admin                     → Admin Overview (protected)│
│  /admin/projects            → Project List (protected)  │
│  /admin/projects/new        → Create Project (protected)│
│  /admin/projects/[id]       → Project Detail (protected)│
│  /admin/projects/[id]/edit  → Edit Project (protected)  │
│  /admin/projects/[id]/timeline → Timeline Mgmt (protect)│
│                                                         │
│  /api/projects      → Projects API Routes               │
│  /api/timeline      → Timeline API Routes               │
│  /api/github        → GitHub Sync API Routes            │
│  /api/youtube       → YouTube Preview API Routes        │
│  /api/media         → Media Upload API Routes           │
└──────────────┬──────────────────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
  ┌────▼─────┐   ┌──────▼──────┐
  │ Supabase │   │ External APIs│
  │          │   │             │
  │ projects │   │ GitHub API  │
  │ timeline │   │ YouTube API │
  │ storage  │   └─────────────┘
  └──────────┘
```

### Data Flow

1. **Public pages** (SSR): Fetch dari Supabase server-side, render HTML lengkap untuk SEO
2. **Admin dashboard** (Client): Fetch via API routes yang divalidasi secret key
3. **GitHub sync**: Triggered manual oleh admin → API route → GitHub API → Supabase upsert
4. **YouTube preview**: Admin input URL → API route → YouTube API → preview card → approve/reject → Supabase insert
5. **Media upload**: Admin upload file → API route → Supabase Storage → URL disimpan ke project record

---

## Components and Interfaces

### Public Pages & Admin Pages

```
app/
├── projects/
│   ├── page.tsx                         → ProjectListPage (SSR)
│   └── [id]/
│       └── page.tsx                     → ProjectDetailPage (SSR)
└── admin/
    ├── layout.tsx                       → AdminLayout (auth middleware wrapper)
    ├── page.tsx                         → Admin Overview / Dashboard
    └── projects/
        ├── page.tsx                     → Admin Project List
        ├── new/
        │   └── page.tsx                 → Create Project Form
        └── [id]/
            ├── page.tsx                 → Project Detail (admin view)
            ├── edit/
            │   └── page.tsx             → Edit Project Form
            └── timeline/
                └── page.tsx             → Timeline Management

features/
├── projects/
│   ├── components/
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectFilters.tsx
│   │   ├── ProjectHeader.tsx
│   │   ├── GitHubStats.tsx
│   │   ├── MediaGallery.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── SprintCard.tsx
│   │   └── TimelineEntryCard.tsx
│   ├── services/
│   │   ├── github/
│   │   │   └── api.ts              → GitHub API functions
│   │   └── youtube/
│   │       └── api.ts              → YouTube API functions
│   ├── utils/
│   │   └── timeline.ts             → Timeline utility functions
│   ├── types.ts                    → Type definitions
│   └── index.ts
└── admin/
    ├── components/
    │   ├── AdminLayout.tsx              → Sidebar nav + secret passthrough
    │   ├── AdminProjectList.tsx         → Table list of all projects
    │   ├── AdminProjectForm.tsx         → Reusable create/edit form
    │   ├── AdminProjectDetail.tsx       → Project overview + quick actions
    │   ├── TimelineManagement.tsx       → Add/edit/delete timeline entries
    │   ├── GitHubSyncPanel.tsx          → Sync button + last_sync_at
    │   ├── YouTubePreviewManager.tsx    → URL input + preview card
    │   └── MediaUploadPanel.tsx         → Screenshot upload + gallery
    └── index.ts

lib/
├── supabase/
│   ├── client.ts                   → Browser Supabase client (Storage only)
│   ├── server.ts                   → Server Supabase client (Storage only)
│   └── queries/
│       ├── projects.ts             → Project query functions (via Prisma)
│       └── timeline.ts             → Timeline query functions (via Prisma)

prisma/
├── schema.prisma                   → Sumber kebenaran schema database
└── lib/
    ├── client.ts                   → Singleton PrismaClient (PrismaPg + DATABASE_URL)
    ├── singleton.ts                → Mock singleton untuk unit tests (jest-mock-extended)
    └── context.ts                  → Dependency injection context untuk unit tests
```

### API Routes

```
app/api/
├── projects/
│   ├── route.ts                    → GET (list), POST (create)
│   └── [id]/
│       ├── route.ts                → GET, PUT, DELETE
│       └── timeline/
│           ├── route.ts            → GET (list), POST (create)
│           └── [entryId]/
│               └── route.ts        → PUT, DELETE
├── github/
│   └── sync/
│       └── route.ts                → POST (trigger sync)
├── youtube/
│   └── preview/
│       └── route.ts                → POST (preview URL)
└── media/
    ├── upload/
    │   └── route.ts                → POST (upload screenshot)
    └── [id]/
        └── route.ts                → DELETE (remove screenshot)
```

---

## Data Models

### TypeScript Types

```typescript
// features/projects/types.ts

export type ProjectStatus = 'active' | 'maintenance' | 'archived';

export type EntryType = 'pr' | 'milestone' | 'blog_post' | 'video' | 'deployment' | 'release';

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
```

### Database Schema (Prisma)

Schema dikelola via `prisma/schema.prisma`. Migrasi dijalankan dengan `npx prisma migrate dev`.
`DATABASE_URL` (port 6543, PgBouncer) dipakai untuk runtime queries.
`DIRECT_URL` (port 5432) dipakai khusus untuk `prisma migrate`.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  // url dan directUrl dikonfigurasi di prisma.config.ts
}

enum ProjectStatus { active maintenance archived }
enum EntryType     { pr milestone blog_post video deployment release }
enum PRStatus      { merged closed open }

model Project {
  id                String        @id @default(dbgenerated("gen_random_uuid()::text"))
  title             String
  short_description String
  long_description  String?
  tech_stack        String[]      @default([])
  status            ProjectStatus @default(active)
  github_repo_url   String?       @unique
  github_owner      String?
  github_repo       String?
  last_sync_at      DateTime?
  created_at        DateTime      @default(now())
  updated_at        DateTime      @updatedAt
  timeline_entries  TimelineEntry[]
  project_media     ProjectMedia[]
  @@map("projects")
}

model TimelineEntry {
  id               String    @id @default(dbgenerated("gen_random_uuid()::text"))
  project_id       String
  entry_type       EntryType
  date             DateTime
  sprint_number    Int
  title            String
  // ... (lihat prisma/schema.prisma untuk field lengkap)
  @@unique([project_id, github_pr_number])
  @@map("timeline_entries")
}

model ProjectMedia {
  id           String   @id @default(dbgenerated("gen_random_uuid()::text"))
  project_id   String
  storage_path String
  public_url   String
  file_name    String
  created_at   DateTime @default(now())
  @@map("project_media")
}
```

---

## Key Design Decisions

### Sprint Number: Manual Assignment
Sprint number ditentukan manual oleh admin saat membuat timeline entry. Ini memberikan fleksibilitas penuh — admin bisa mengatur sprint sesuai konteks proyek tanpa terikat kalender.

### GitHub Sync: Upsert dengan Deduplication
Sync menggunakan `UNIQUE(project_id, github_pr_number)` constraint. Saat sync, kita lakukan upsert — jika PR sudah ada, skip. Ini mencegah duplikasi tanpa perlu query terpisah.

### Admin Auth: Server-side Validation
Secret key divalidasi di server (API routes dan Server Components). Nilai secret tidak pernah dikirim ke client. Middleware Next.js digunakan untuk melindungi semua route `/admin/*`. Secret key diteruskan sebagai query param `?secret=xxx` di setiap navigasi antar halaman admin.

### Admin Navigation: Multi-Page dengan Secret Passthrough
Admin dashboard menggunakan multi-page routing (`/admin/projects`, `/admin/projects/[id]`, dll) untuk UX yang lebih baik. Secret key diteruskan sebagai query param di setiap link navigasi internal admin. `AdminLayout` bertanggung jawab menyuntikkan secret ke semua link navigasi secara otomatis.

**Admin Page Structure**:
```
/admin?secret=xxx                        → Overview: stats ringkas + quick links
/admin/projects?secret=xxx               → List semua projects (table view)
/admin/projects/new?secret=xxx           → Form create project baru
/admin/projects/[id]?secret=xxx          → Detail project: info + quick actions
/admin/projects/[id]/edit?secret=xxx     → Form edit project
/admin/projects/[id]/timeline?secret=xxx → Manage timeline entries + GitHub sync + YouTube + Media
```

### GitHub Stats: Cache di Memory + Timestamp
Stats GitHub di-cache dengan `next: { revalidate: 43200 }` (12 jam) menggunakan Next.js fetch cache. Timestamp `fetched_at` disimpan bersama data untuk ditampilkan ke visitor.

### YouTube Preview: Stateless Flow
Preview YouTube tidak disimpan ke database. Flow-nya stateless: admin input URL → server fetch metadata → tampilkan preview → admin approve → baru simpan ke `timeline_entries`. Tidak ada tabel `youtube_previews` yang diperlukan karena preview bersifat sementara dalam satu request cycle.

---

## Error Handling

| Scenario | Behavior |
|---|---|
| GitHub API rate limit (403/429) | Tampilkan pesan error ke admin, jangan modifikasi data |
| GitHub API unavailable | Tampilkan cached stats dengan timestamp, atau hide section jika belum ada cache |
| YouTube API video not found | Tampilkan error "Video tidak ditemukan" tanpa menyimpan data |
| YouTube URL format invalid | Validasi client-side sebelum API call, return 400 |
| Supabase connection error | Return 500 dengan pesan generic, log error server-side |
| File upload > 5MB | Reject di client sebelum upload, tampilkan pesan ukuran file |
| Invalid admin secret | Return 401, render halaman unauthorized tanpa hint secret |
| Project ID not found | Return 404 page via Next.js notFound() |

---

## Testing Strategy

### Testing Framework
- **Unit & Property tests**: Jest + fast-check (property-based testing library untuk TypeScript)
- **Test location**: Co-located dengan source files menggunakan `.test.ts` suffix

### Dual Testing Approach
- **Unit tests**: Verifikasi contoh spesifik, edge cases, dan error conditions
- **Property tests**: Verifikasi properti universal menggunakan fast-check dengan minimum 100 iterasi per property

### Property-Based Testing Configuration
```typescript
// Setiap property test menggunakan fast-check dengan Jest
import * as fc from 'fast-check';

// Minimum 100 runs per property
// Tag format: Feature: dynamic-project-timeline, Property N: <property_text>
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: GitHub URL Extraction Correctness
*For any* valid GitHub repository URL in formats `https://github.com/{owner}/{repo}` or `https://github.com/{owner}/{repo}.git`, extracting owner and repo should return the correct owner string and repo string without trailing slashes or `.git` suffix.
**Validates: Requirements 1.2**

### Property 2: Project Status Validation
*For any* string that is not one of `['active', 'maintenance', 'archived']`, submitting it as a project status should be rejected with a validation error. Conversely, for any of the three valid values, submission should succeed.
**Validates: Requirements 1.5**

### Property 3: Project Creation Requires Non-Empty Title and Description
*For any* string composed entirely of whitespace characters (or empty string) used as title or short_description, the project creation should be rejected. For any non-whitespace string, creation should proceed.
**Validates: Requirements 1.6**

### Property 4: Status Filter Returns Only Matching Projects
*For any* list of projects with mixed statuses and any valid status filter value, the filtered result should contain only projects whose status exactly matches the filter value, and no projects with a different status.
**Validates: Requirements 2.2**

### Property 5: Search Filter Returns Only Matching Projects
*For any* list of projects and any non-empty search query string, the search result should contain only projects where the title or at least one tech_stack item contains the query string (case-insensitive). No project in the result should fail to match.
**Validates: Requirements 2.3**

### Property 6: Project Card Renders All Required Fields
*For any* valid DynamicProject object, the rendered project card should contain the project's title, status, short_description, and at least one tech_stack tag.
**Validates: Requirements 2.4**

### Property 7: Sprint Grouping Produces Unique, Ascending Sprint Numbers
*For any* list of timeline entries with arbitrary sprint_numbers, `groupEntriesBySprint` should return groups where: (a) each sprint_number appears exactly once as a group key, (b) groups are ordered by sprint_number ascending, and (c) every entry from the input appears in exactly one group.
**Validates: Requirements 3.4**

### Property 8: Entries Within Sprint Are Sorted by Date Ascending
*For any* sprint group produced by `groupEntriesBySprint`, the entries array within each group should be sorted by date in ascending order (earlier dates first).
**Validates: Requirements 4.6**

### Property 9: Timeline Entry Type Validation
*For any* string that is not one of `['pr', 'milestone', 'blog_post', 'video', 'deployment', 'release']`, submitting it as entry_type should be rejected. For any of the six valid values, submission should succeed.
**Validates: Requirements 4.1**

### Property 10: Timeline Entry Required Fields Validation
*For any* timeline entry object missing one or more of the required fields (project_id, entry_type, date, sprint_number, title), submission should be rejected with a validation error identifying the missing field.
**Validates: Requirements 4.2, 4.3**

### Property 11: GitHub PR to Timeline Entry Mapping
*For any* GitHub PR object returned by the API, the resulting timeline entry should have: entry_type = 'pr', title = pr.title, github_pr_number = pr.number, github_author = pr.user.login, external_url = pr.html_url, and date = pr.merged_at.
**Validates: Requirements 5.2**

### Property 12: GitHub Sync Idempotence
*For any* project and any set of PRs, syncing the same PRs twice should produce the same set of timeline entries as syncing once — no duplicate entries should be created for the same github_pr_number within the same project.
**Validates: Requirements 5.3**

### Property 13: YouTube URL Video ID Extraction
*For any* valid YouTube URL in standard formats (youtube.com/watch?v=, youtu.be/, youtube.com/embed/), extracting the video_id should return an 11-character alphanumeric string. For any URL that does not match a known YouTube URL pattern, extraction should return null or empty string.
**Validates: Requirements 6.1, 6.6**

### Property 14: Admin Secret Validation Rejects Non-Matching Strings
*For any* string that is not equal to the configured ADMIN_SECRET_KEY, the admin authentication check should return false (unauthorized). Only the exact matching string should return true.
**Validates: Requirements 8.1, 8.2, 8.3**

### Property 15: Timeline Entry Card Renders Required Fields
*For any* valid TimelineEntry object, the rendered entry card should contain the entry's title, a representation of the date, and the sprint number. If external_url is present, the card should contain a link element pointing to that URL.
**Validates: Requirements 10.3**

### Property 16: Sprint Card Renders Sprint Number and Entry Count
*For any* SprintGroup object, the rendered sprint card should display the sprint number and a count equal to the number of entries in the group.
**Validates: Requirements 10.2**

### Property 17: Image File Type Validation
*For any* file with a MIME type not in `['image/jpeg', 'image/png', 'image/webp']`, the upload should be rejected. For any file with a valid MIME type and size ≤ 5MB, the upload should be accepted.
**Validates: Requirements 7.2, 7.3**
