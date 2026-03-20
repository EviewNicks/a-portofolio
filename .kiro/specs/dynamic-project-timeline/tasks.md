# Implementation Plan: Dynamic Project Management Timeline

## Overview

Implementasi dilakukan secara incremental dalam 6 tahap: setup foundation, core data layer, public pages, admin dashboard, integrations (GitHub + YouTube), dan media upload. Setiap tahap menghasilkan kode yang bisa dijalankan dan diuji.

## Tasks

- [x] 1. Setup foundation: types, Prisma schema, Supabase clients
  - Buat `features/projects/types.ts` dengan semua TypeScript interfaces (DynamicProject, TimelineEntry, SprintGroup, GitHubStats, YouTubePreview, ProjectMedia)
  - Buat `prisma/schema.prisma` — definisi model Project, TimelineEntry, ProjectMedia dengan enums
  - Buat `prisma.config.ts` — konfigurasi Prisma 7 dengan PrismaPg adapter (DATABASE_URL + DIRECT_URL)
  - Buat `prisma/lib/client.ts` — singleton PrismaClient (PrismaPg adapter + DATABASE_URL)
  - Buat `prisma/lib/singleton.ts` — mock singleton untuk unit tests (jest-mock-extended)
  - Buat `prisma/lib/context.ts` — dependency injection context untuk unit tests
  - Buat `lib/supabase/client.ts` (browser) dan `lib/supabase/server.ts` (server) — hanya untuk Storage
  - Jalankan `npx prisma migrate dev --name init` untuk push schema ke Supabase
  - Setup environment variables: DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, GITHUB_TOKEN, YOUTUBE_API_KEY, ADMIN_SECRET_KEY
  - _Requirements: 1.1, 4.1, 8.4_

- [x] 2. Core utility functions dan validasi
  - [x] 2.1 Implementasi `features/projects/services/github/api.ts`
    - Fungsi `extractGitHubOwnerRepo(url: string): { owner: string; repo: string } | null`
    - Fungsi `fetchGitHubPRs(owner: string, repo: string): Promise<PRData[]>`
    - Fungsi `fetchGitHubStats(owner: string, repo: string): Promise<GitHubStats>`
    - _Requirements: 1.2, 5.1, 5.2, 9.1_

  - [x]* 2.2 Write property test untuk GitHub URL extraction
    - **Property 1: GitHub URL Extraction Correctness**
    - **Validates: Requirements 1.2**
    - Test dengan fast-check: generate random owner/repo strings, build URL, verify extraction

  - [x] 2.3 Implementasi `features/projects/services/youtube/api.ts`
    - Fungsi `extractYouTubeVideoId(url: string): string | null`
    - Fungsi `fetchYouTubeMetadata(videoId: string): Promise<YouTubePreview>`
    - _Requirements: 6.1, 6.2_

  - [x]* 2.4 Write property test untuk YouTube URL extraction
    - **Property 13: YouTube URL Video ID Extraction**
    - **Validates: Requirements 6.1, 6.6**
    - Test dengan fast-check: generate valid YouTube URL formats, verify 11-char video_id

  - [x] 2.5 Implementasi `features/projects/utils/timeline.ts`
    - Fungsi `groupEntriesBySprint(entries: TimelineEntry[]): SprintGroup[]`
    - Fungsi `validateProjectInput(data: unknown): ValidationResult`
    - Fungsi `validateTimelineEntryInput(data: unknown): ValidationResult`
    - Fungsi `validateAdminSecret(secret: string): boolean`
    - _Requirements: 1.5, 1.6, 3.4, 4.1, 4.2, 4.3, 8.1, 8.2_

  - [x]* 2.6 Write property tests untuk core utility functions
    - **Property 2: Project Status Validation** — Validates: Requirements 1.5
    - **Property 3: Project Creation Requires Non-Empty Title and Description** — Validates: Requirements 1.6
    - **Property 7: Sprint Grouping Produces Unique, Ascending Sprint Numbers** — Validates: Requirements 3.4
    - **Property 8: Entries Within Sprint Are Sorted by Date Ascending** — Validates: Requirements 4.6
    - **Property 9: Timeline Entry Type Validation** — Validates: Requirements 4.1
    - **Property 10: Timeline Entry Required Fields Validation** — Validates: Requirements 4.2, 4.3
    - **Property 14: Admin Secret Validation Rejects Non-Matching Strings** — Validates: Requirements 8.1, 8.2, 8.3

- [x] 3. Checkpoint — Pastikan semua tests pass, tanyakan jika ada pertanyaan.

- [x] 4. Prisma query functions dan API routes untuk projects
  - [x] 4.1 Implementasi `lib/supabase/queries/projects.ts` menggunakan Prisma Client
    - `getAllProjects()`, `getProjectById(id)`, `createProject(data)`, `updateProject(id, data)`, `deleteProject(id)`
    - `searchProjects(query, status?)` — filter by status dan search query menggunakan Prisma `where`
    - Import `prisma` dari `@/prisma/lib/client`
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 2.2, 2.3_

  - [x] 4.2 Implementasi API routes untuk projects
    - `app/api/projects/route.ts` — GET (list + search), POST (create dengan validasi)
    - `app/api/projects/[id]/route.ts` — GET, PUT, DELETE
    - Semua routes memvalidasi input dan return error yang sesuai
    - _Requirements: 1.1, 1.3, 1.4, 1.6_

  - [x]* 4.3 Write property tests untuk filter dan search logic
    - **Property 4: Status Filter Returns Only Matching Projects** — Validates: Requirements 2.2
    - **Property 5: Search Filter Returns Only Matching Projects** — Validates: Requirements 2.3
    - Gunakan `prismaMock` dari `prisma/lib/singleton` atau `createMockContext` dari `prisma/lib/context` untuk mock database calls

- [x] 5. Prisma query functions dan API routes untuk timeline entries
  - [x] 5.1 Implementasi `lib/supabase/queries/timeline.ts` menggunakan Prisma Client
    - `getTimelineEntriesByProjectId(projectId)`, `createTimelineEntry(data)`, `updateTimelineEntry(id, data)`, `deleteTimelineEntry(id)`
    - Import `prisma` dari `@/prisma/lib/client`
    - _Requirements: 4.2, 4.4, 4.5_

  - [x] 5.2 Implementasi API routes untuk timeline
    - `app/api/projects/[id]/timeline/route.ts` — GET, POST (dengan validasi)
    - `app/api/projects/[id]/timeline/[entryId]/route.ts` — PUT, DELETE
    - _Requirements: 4.2, 4.3, 4.4_

  - [x]* 5.3 Write property test untuk GitHub PR to timeline entry mapping
    - **Property 11: GitHub PR to Timeline Entry Mapping** — Validates: Requirements 5.2
    - Gunakan `prismaMock` dari `prisma/lib/singleton` atau `createMockContext` dari `prisma/lib/context` untuk mock upsert calls

- [x] 6. Public pages: Project List dan Project Detail
  - [x] 6.1 Implementasi komponen `features/projects-dynamic/components/`
    - `ProjectCard.tsx` — card dengan title, status badge, short_description, tech_stack, sprint count, PR count
    - `ProjectGrid.tsx` — grid layout dari ProjectCard
    - `ProjectFilters.tsx` — filter by status + search input
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x]* 6.2 Write property test untuk project card rendering
    - **Property 6: Project Card Renders All Required Fields** — Validates: Requirements 2.4

  - [x] 6.3 Implementasi `app/projects/page.tsx`
    - SSR: fetch projects dari Supabase server-side
    - Render ProjectFilters + ProjectGrid
    - Handle empty state
    - _Requirements: 2.1, 2.5_

  - [x] 6.4 Implementasi komponen timeline untuk project detail
    - `TimelineEntryCard.tsx` — card dengan icon, title, date, sprint number, external link, PR status badge, YouTube thumbnail
    - `SprintCard.tsx` — sprint header dengan number + entry count, list of TimelineEntryCard
    - `TimelineSection.tsx` — render semua SprintCard, handle empty state
    - _Requirements: 4.5, 4.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [x]* 6.5 Write property tests untuk timeline rendering
    - **Property 15: Timeline Entry Card Renders Required Fields** — Validates: Requirements 10.3
    - **Property 16: Sprint Card Renders Sprint Number and Entry Count** — Validates: Requirements 10.2

  - [x] 6.6 Implementasi komponen project detail
    - `ProjectHeader.tsx` — title, long_description, tech_stack, status, GitHub link
    - `GitHubStats.tsx` — stars, forks, contributors, last commit, timestamp cache
    - `MediaGallery.tsx` — screenshots carousel + YouTube thumbnails
    - _Requirements: 3.1, 3.2, 3.3, 9.1, 9.3, 9.4_

  - [x] 6.7 Implementasi `app/projects/[id]/page.tsx`
    - SSR: fetch project, timeline entries, GitHub stats, media
    - Handle 404 via `notFound()`
    - Render semua komponen detail
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_

- [x] 7. Checkpoint — Pastikan semua tests pass, tanyakan jika ada pertanyaan.

- [x] 8. GitHub sync integration
  - [x] 8.1 Implementasi `app/api/github/sync/route.ts`
    - POST: validasi secret, fetch PRs dari GitHub API, upsert ke timeline_entries (skip duplicates), update last_sync_at
    - Handle GitHub API errors (rate limit, unavailable)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x]* 8.2 Write property test untuk GitHub sync idempotence
    - **Property 12: GitHub Sync Idempotence** — Validates: Requirements 5.3

- [x] 9. YouTube preview integration
  - [x] 9.1 Implementasi `app/api/youtube/preview/route.ts`
    - POST: validasi URL format, extract video_id, fetch metadata dari YouTube API, return preview data
    - Handle invalid URL (400), video not found (404), API error (500)
    - _Requirements: 6.1, 6.2, 6.3, 6.6, 6.7_

- [x] 10. Media upload (screenshots)
  - [x] 10.1 Implementasi `app/api/media/upload/route.ts`
    - POST: validasi secret, validasi file type (JPEG/PNG/WebP) dan size (≤5MB), upload ke Supabase Storage, simpan record ke project_media
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 10.2 Implementasi `app/api/media/[id]/route.ts`
    - DELETE: validasi secret, hapus dari Supabase Storage, hapus record dari project_media
    - _Requirements: 7.5_

  - [x]* 10.3 Write property test untuk file type validation
    - **Property 17: Image File Type Validation** — Validates: Requirements 7.2, 7.3

- [x] 11. Admin dashboard (multi-page)
  - [x] 11.1 Implementasi admin auth middleware dan layout
    - `middleware.ts` — protect semua route `/admin/*`, validate secret query param, redirect ke `/admin?error=unauthorized` jika invalid
    - `app/admin/layout.tsx` — AdminLayout: sidebar navigation dengan secret passthrough ke semua links
    - `features/admin/components/AdminLayout.tsx` — sidebar dengan links ke: Overview, Projects, dan back ke portfolio
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 11.2 Implementasi `app/admin/page.tsx` — Admin Overview
    - Validasi secret server-side
    - Tampilkan stats ringkas: total projects, total timeline entries, last sync
    - Quick links ke `/admin/projects` dan `/admin/projects/new`
    - _Requirements: 8.1, 8.2_

  - [x] 11.3 Implementasi `app/admin/projects/page.tsx` — Project List
    - `features/admin/components/AdminProjectList.tsx` — table dengan kolom: title, status, sprint count, PR count, last_sync_at, actions (View, Edit, Delete)
    - Tombol "New Project" → navigate ke `/admin/projects/new`
    - Delete project dengan konfirmasi
    - _Requirements: 1.3, 1.4, 2.1_

  - [x] 11.4 Implementasi `app/admin/projects/new/page.tsx` — Create Project
    - `features/admin/components/AdminProjectForm.tsx` — reusable form: title, short_description, long_description, tech_stack (tags input), github_repo_url (auto-extract owner/repo), status dropdown
    - Submit → POST `/api/projects` → redirect ke `/admin/projects/[id]`
    - _Requirements: 1.1, 1.2, 1.6_

  - [x] 11.5 Implementasi `app/admin/projects/[id]/page.tsx` — Project Detail (admin view)
    - `features/admin/components/AdminProjectDetail.tsx` — tampilkan semua field project + GitHub stats
    - Quick action buttons: Edit Project, Manage Timeline, Delete Project
    - _Requirements: 1.3_

  - [x] 11.6 Implementasi `app/admin/projects/[id]/edit/page.tsx` — Edit Project
    - Reuse `AdminProjectForm.tsx` dengan data pre-filled
    - Submit → PUT `/api/projects/[id]` → redirect ke `/admin/projects/[id]`
    - _Requirements: 1.3_

  - [x] 11.7 Implementasi `features/admin/components/TimelineManagement.tsx` + halaman
    - Form add/edit entry: entry_type dropdown, date picker, sprint_number input, title, description, external_url, is_featured toggle
    - List semua entries project dengan tombol Edit dan Delete (dengan konfirmasi)
    - Submit add → POST `/api/projects/[id]/timeline`; submit edit → PUT `/api/projects/[id]/timeline/[entryId]`
    - Delete → DELETE `/api/projects/[id]/timeline/[entryId]`
    - `app/admin/projects/[id]/timeline/page.tsx` — render TimelineManagement + panel lainnya (11.8–11.10)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 11.8 Implementasi `features/admin/components/GitHubSyncPanel.tsx`
    - Tampilkan `last_sync_at` project (format relative time, misal "2 hours ago")
    - Tombol "Sync Now" → POST `/api/github/sync` dengan project_id + secret
    - Loading state saat sync berjalan, feedback sukses (jumlah PR baru) atau error (pesan dari API)
    - _Requirements: 5.1, 5.4, 5.5_

  - [x] 11.9 Implementasi `features/admin/components/YouTubePreviewManager.tsx`
    - Input URL YouTube + tombol "Preview"
    - Fetch ke POST `/api/youtube/preview` → tampilkan preview card: thumbnail, title, view count
    - Tombol "Approve" → POST `/api/projects/[id]/timeline` dengan entry_type 'video' + metadata
    - Tombol "Reject" → clear preview tanpa menyimpan
    - Handle error: URL invalid (400), video not found (404), API error (500)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [x] 11.10 Implementasi `features/admin/components/MediaUploadPanel.tsx`
    - File input dengan validasi client-side: JPEG/PNG/WebP only, max 5MB
    - Upload → POST `/api/media/upload` dengan FormData (file + project_id + secret)
    - Gallery grid tampilkan semua screenshot project dengan tombol Delete per item
    - Delete → DELETE `/api/media/[id]` dengan konfirmasi
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [-] 12. Final checkpoint — API testing (Postman) + E2E testing (Playwright)
  - [x] 12.2 Buat 3 Postman collections di `tests/api/`
    - `projects.postman_collection.json` — CRUD projects + timeline entries (self-contained: POST dulu, simpan id ke variable, lalu GET/PUT/DELETE)
    - `integrations.postman_collection.json` — GitHub sync + YouTube preview (butuh projectId dari collection projects)
    - `media.postman_collection.json` — upload screenshot + delete (butuh projectId, gunakan FormData)
    - Auth via `x-admin-secret` header di semua protected endpoints
    - Collection variables: `baseUrl=http://localhost:3000`, `adminSecret=Ardiansy4`, `projectId`, `entryId`, `mediaId`
    - Setiap POST menyimpan id ke collection variable via test script
    - Buat `tests/api/README.md` — panduan lengkap: urutan eksekusi, setup variables, cara import, flow testing
    - _Requirements: 1.1, 1.3, 1.4, 4.2, 4.4, 5.1, 6.1, 7.1, 7.5_

  - [ ] 12.3 Install Playwright dan buat `playwright.config.ts`
    - `npm install -D @playwright/test`
    - Config: baseURL `http://localhost:3000`, browser chromium, timeout 30s
    - _Requirements: semua_

  - [ ] 12.4 Playwright E2E tests untuk public pages `tests/e2e/public.spec.ts`
    - `/projects` — halaman load, project cards tampil, filter by status bekerja
    - `/projects/[id]` — detail page load, timeline section tampil
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 4.5_

  - [ ] 12.5 Playwright E2E tests untuk admin dashboard `tests/e2e/admin.spec.ts`
    - Full CRUD flow: create project → add timeline entry → edit project → delete timeline entry → delete project
    - Auth via `?secret=Ardiansy4` query param
    - Cleanup setelah setiap test (delete created data)
    - _Requirements: 8.1, 8.2, 8.3, 1.1, 1.3, 1.4, 4.2, 4.4_

  - [ ] 12.6 Verifikasi akhir
    - Jalankan seed script, import Postman collection, jalankan Playwright tests
    - Konfirmasi semua pass

## Notes

- Tasks bertanda `*` adalah opsional dan bisa di-skip untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk traceability
- Property tests menggunakan Jest + fast-check dengan minimum 100 iterasi
- Admin secret divalidasi server-side, tidak pernah dikirim ke client
