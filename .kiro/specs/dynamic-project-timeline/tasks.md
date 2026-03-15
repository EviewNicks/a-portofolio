# Implementation Plan: Dynamic Project Management Timeline

## Overview

Implementasi dilakukan secara incremental dalam 6 tahap: setup foundation, core data layer, public pages, admin dashboard, integrations (GitHub + YouTube), dan media upload. Setiap tahap menghasilkan kode yang bisa dijalankan dan diuji.

## Tasks

- [ ] 1. Setup foundation: types, Supabase clients, dan database schema
  - Buat `lib/types/dynamic-project.ts` dengan semua TypeScript interfaces (DynamicProject, TimelineEntry, SprintGroup, GitHubStats, YouTubePreview, ProjectMedia)
  - Buat `lib/supabase/client.ts` (browser client) dan `lib/supabase/server.ts` (server client)
  - Jalankan SQL schema di Supabase dashboard: tabel projects, timeline_entries, project_media beserta indexes
  - Setup environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, GITHUB_TOKEN, YOUTUBE_API_KEY, ADMIN_SECRET_KEY
  - _Requirements: 1.1, 4.1, 8.4_

- [ ] 2. Core utility functions dan validasi
  - [ ] 2.1 Implementasi `lib/github/api.ts`
    - Fungsi `extractGitHubOwnerRepo(url: string): { owner: string; repo: string } | null`
    - Fungsi `fetchGitHubPRs(owner: string, repo: string): Promise<PRData[]>`
    - Fungsi `fetchGitHubStats(owner: string, repo: string): Promise<GitHubStats>`
    - _Requirements: 1.2, 5.1, 5.2, 9.1_

  - [ ]* 2.2 Write property test untuk GitHub URL extraction
    - **Property 1: GitHub URL Extraction Correctness**
    - **Validates: Requirements 1.2**
    - Test dengan fast-check: generate random owner/repo strings, build URL, verify extraction

  - [ ] 2.3 Implementasi `lib/youtube/api.ts`
    - Fungsi `extractYouTubeVideoId(url: string): string | null`
    - Fungsi `fetchYouTubeMetadata(videoId: string): Promise<YouTubePreview>`
    - _Requirements: 6.1, 6.2_

  - [ ]* 2.4 Write property test untuk YouTube URL extraction
    - **Property 13: YouTube URL Video ID Extraction**
    - **Validates: Requirements 6.1, 6.6**
    - Test dengan fast-check: generate valid YouTube URL formats, verify 11-char video_id

  - [ ] 2.5 Implementasi `lib/utils/timeline.ts`
    - Fungsi `groupEntriesBySprint(entries: TimelineEntry[]): SprintGroup[]`
    - Fungsi `validateProjectInput(data: unknown): ValidationResult`
    - Fungsi `validateTimelineEntryInput(data: unknown): ValidationResult`
    - Fungsi `validateAdminSecret(secret: string): boolean`
    - _Requirements: 1.5, 1.6, 3.4, 4.1, 4.2, 4.3, 8.1, 8.2_

  - [ ]* 2.6 Write property tests untuk core utility functions
    - **Property 2: Project Status Validation** — Validates: Requirements 1.5
    - **Property 3: Project Creation Requires Non-Empty Title and Description** — Validates: Requirements 1.6
    - **Property 7: Sprint Grouping Produces Unique, Ascending Sprint Numbers** — Validates: Requirements 3.4
    - **Property 8: Entries Within Sprint Are Sorted by Date Ascending** — Validates: Requirements 4.6
    - **Property 9: Timeline Entry Type Validation** — Validates: Requirements 4.1
    - **Property 10: Timeline Entry Required Fields Validation** — Validates: Requirements 4.2, 4.3
    - **Property 14: Admin Secret Validation Rejects Non-Matching Strings** — Validates: Requirements 8.1, 8.2, 8.3

- [ ] 3. Checkpoint — Pastikan semua tests pass, tanyakan jika ada pertanyaan.

- [ ] 4. Supabase query functions dan API routes untuk projects
  - [ ] 4.1 Implementasi `lib/supabase/queries/projects.ts`
    - `getAllProjects()`, `getProjectById(id)`, `createProject(data)`, `updateProject(id, data)`, `deleteProject(id)`
    - `searchProjects(query, status?)` — filter by status dan search query
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 2.2, 2.3_

  - [ ] 4.2 Implementasi API routes untuk projects
    - `app/api/projects/route.ts` — GET (list + search), POST (create dengan validasi)
    - `app/api/projects/[id]/route.ts` — GET, PUT, DELETE
    - Semua routes memvalidasi input dan return error yang sesuai
    - _Requirements: 1.1, 1.3, 1.4, 1.6_

  - [ ]* 4.3 Write property tests untuk filter dan search logic
    - **Property 4: Status Filter Returns Only Matching Projects** — Validates: Requirements 2.2
    - **Property 5: Search Filter Returns Only Matching Projects** — Validates: Requirements 2.3

- [ ] 5. Supabase query functions dan API routes untuk timeline entries
  - [ ] 5.1 Implementasi `lib/supabase/queries/timeline.ts`
    - `getTimelineEntriesByProjectId(projectId)`, `createTimelineEntry(data)`, `updateTimelineEntry(id, data)`, `deleteTimelineEntry(id)`
    - _Requirements: 4.2, 4.4, 4.5_

  - [ ] 5.2 Implementasi API routes untuk timeline
    - `app/api/projects/[id]/timeline/route.ts` — GET, POST (dengan validasi)
    - `app/api/projects/[id]/timeline/[entryId]/route.ts` — PUT, DELETE
    - _Requirements: 4.2, 4.3, 4.4_

  - [ ]* 5.3 Write property test untuk GitHub PR to timeline entry mapping
    - **Property 11: GitHub PR to Timeline Entry Mapping** — Validates: Requirements 5.2

- [ ] 6. Public pages: Project List dan Project Detail
  - [ ] 6.1 Implementasi komponen `features/projects-dynamic/components/`
    - `ProjectCard.tsx` — card dengan title, status badge, short_description, tech_stack, sprint count, PR count
    - `ProjectGrid.tsx` — grid layout dari ProjectCard
    - `ProjectFilters.tsx` — filter by status + search input
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 6.2 Write property test untuk project card rendering
    - **Property 6: Project Card Renders All Required Fields** — Validates: Requirements 2.4

  - [ ] 6.3 Implementasi `app/projects/page.tsx`
    - SSR: fetch projects dari Supabase server-side
    - Render ProjectFilters + ProjectGrid
    - Handle empty state
    - _Requirements: 2.1, 2.5_

  - [ ] 6.4 Implementasi komponen timeline untuk project detail
    - `TimelineEntryCard.tsx` — card dengan icon, title, date, sprint number, external link, PR status badge, YouTube thumbnail
    - `SprintCard.tsx` — sprint header dengan number + entry count, list of TimelineEntryCard
    - `TimelineSection.tsx` — render semua SprintCard, handle empty state
    - _Requirements: 4.5, 4.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ]* 6.5 Write property tests untuk timeline rendering
    - **Property 15: Timeline Entry Card Renders Required Fields** — Validates: Requirements 10.3
    - **Property 16: Sprint Card Renders Sprint Number and Entry Count** — Validates: Requirements 10.2

  - [ ] 6.6 Implementasi komponen project detail
    - `ProjectHeader.tsx` — title, long_description, tech_stack, status, GitHub link
    - `GitHubStats.tsx` — stars, forks, contributors, last commit, timestamp cache
    - `MediaGallery.tsx` — screenshots carousel + YouTube thumbnails
    - _Requirements: 3.1, 3.2, 3.3, 9.1, 9.3, 9.4_

  - [ ] 6.7 Implementasi `app/projects/[id]/page.tsx`
    - SSR: fetch project, timeline entries, GitHub stats, media
    - Handle 404 via `notFound()`
    - Render semua komponen detail
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_

- [ ] 7. Checkpoint — Pastikan semua tests pass, tanyakan jika ada pertanyaan.

- [ ] 8. GitHub sync integration
  - [ ] 8.1 Implementasi `app/api/github/sync/route.ts`
    - POST: validasi secret, fetch PRs dari GitHub API, upsert ke timeline_entries (skip duplicates), update last_sync_at
    - Handle GitHub API errors (rate limit, unavailable)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 8.2 Write property test untuk GitHub sync idempotence
    - **Property 12: GitHub Sync Idempotence** — Validates: Requirements 5.3

- [ ] 9. YouTube preview integration
  - [ ] 9.1 Implementasi `app/api/youtube/preview/route.ts`
    - POST: validasi URL format, extract video_id, fetch metadata dari YouTube API, return preview data
    - Handle invalid URL (400), video not found (404), API error (500)
    - _Requirements: 6.1, 6.2, 6.3, 6.6, 6.7_

- [ ] 10. Media upload (screenshots)
  - [ ] 10.1 Implementasi `app/api/media/upload/route.ts`
    - POST: validasi secret, validasi file type (JPEG/PNG/WebP) dan size (≤5MB), upload ke Supabase Storage, simpan record ke project_media
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 10.2 Implementasi `app/api/media/[id]/route.ts`
    - DELETE: validasi secret, hapus dari Supabase Storage, hapus record dari project_media
    - _Requirements: 7.5_

  - [ ]* 10.3 Write property test untuk file type validation
    - **Property 17: Image File Type Validation** — Validates: Requirements 7.2, 7.3

- [ ] 11. Admin dashboard
  - [ ] 11.1 Implementasi admin auth middleware
    - `middleware.ts` — protect `/admin` routes, validate secret query param
    - `features/admin/components/AdminLayout.tsx` — layout dengan navigation
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 11.2 Implementasi `features/admin/components/ProjectManagement.tsx`
    - Form create/edit project: title, short_description, long_description, tech_stack (tags input), github_repo_url, status
    - List projects dengan edit/delete actions
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6_

  - [ ] 11.3 Implementasi `features/admin/components/TimelineManagement.tsx`
    - Form add/edit timeline entry: entry_type dropdown, date, sprint_number, title, description, external_url, is_featured
    - List entries per project dengan delete action
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ] 11.4 Implementasi `features/admin/components/GitHubSyncPanel.tsx`
    - Tampilkan last_sync_at, tombol "Sync Now", feedback sukses/error
    - _Requirements: 5.1, 5.4, 5.5_

  - [ ] 11.5 Implementasi `features/admin/components/YouTubePreviewManager.tsx`
    - Input YouTube URL, tampilkan preview card (thumbnail, title, view count), tombol Approve/Reject
    - Approve → POST ke timeline API, Reject → clear form
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ] 11.6 Implementasi `app/admin/page.tsx`
    - Validasi secret server-side, render AdminLayout dengan semua panels
    - _Requirements: 8.1, 8.2_

- [ ] 12. Final checkpoint — Pastikan semua tests pass, tanyakan jika ada pertanyaan.

## Notes

- Tasks bertanda `*` adalah opsional dan bisa di-skip untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk traceability
- Property tests menggunakan Vitest + fast-check dengan minimum 100 iterasi
- Admin secret divalidasi server-side, tidak pernah dikirim ke client
