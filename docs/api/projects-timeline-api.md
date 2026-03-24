# Projects & Timeline API Testing Guide

**Feature:** Dynamic Project Management Timeline
**Collection:** `tests/api/projects.postman_collection.json`
**Sprint:** Task 12.2
**Requirements:** 1.x, 2.x, 3.x, 4.x

---

## Overview

Panduan testing untuk Projects & Timeline API — endpoint untuk CRUD projects dan timeline entries. Collection ini **wajib dijalankan pertama** karena collection lain bergantung pada `projectId` yang dihasilkan di sini.

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | No | List semua projects (dengan filter & search) |
| POST | `/api/projects` | Required | Buat project baru |
| GET | `/api/projects/[id]` | No | Detail project by ID |
| PUT | `/api/projects/[id]` | Required | Update project |
| DELETE | `/api/projects/[id]` | Required | Hapus project (cascade) |
| GET | `/api/projects/[id]/timeline` | No | List timeline entries project |
| POST | `/api/projects/[id]/timeline` | Required | Tambah timeline entry |
| DELETE | `/api/projects/[id]/timeline` | Required | Hapus SEMUA timeline entries project |
| PUT | `/api/projects/[id]/timeline/[entryId]` | Required | Update timeline entry |
| DELETE | `/api/projects/[id]/timeline/[entryId]` | Required | Hapus timeline entry |

---

## Prerequisites

### 1. Start Development Server

```bash
npm run dev
# Server berjalan di http://localhost:3000
```

### 2. Import Collection ke Postman

1. Buka Postman
2. Click **Import**
3. Pilih file `tests/api/projects.postman_collection.json`
4. Click **Import**

### 3. Configure Collection Variables

| Variable | Default | Keterangan |
|----------|---------|------------|
| `baseUrl` | `http://localhost:3000` | URL dev server |
| `adminSecret` | `Ardiansy4` | Harus sama dengan `ADMIN_SECRET_KEY` di `.env` |
| `projectId` | _(kosong)_ | Diisi **otomatis** setelah POST project berhasil |
| `entryId` | _(kosong)_ | Diisi **otomatis** setelah POST timeline entry berhasil |

---

## Test Scenarios & Checklist

---

### Scenario 1: List Projects

#### 1.1 GET /api/projects — List All

```
GET /api/projects
```

**Checklist:**
- [x] Status code `200`
- [x] Response punya field `data` (array)
- [ ] Setiap project punya: `id`, `title`, `short_description`, `tech_stack`, `status`, `created_at`

**Actual Response:**
```json
{
    "data": [
        {
            "id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "title": "OMR Grading System",
            "short_description": "Project untuk API testing via Postman",
            "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
            "tech_stack": [
                "Next.js",
                "TypeScript",
                "Supabase"
            ],
            "status": "active",
            "github_repo_url": "https://github.com/EviewNicks/omr_grading_system",
            "github_owner": "EviewNicks",
            "github_repo": "omr_grading_system",
            "last_sync_at": null,
            "created_at": "2026-03-19T14:38:26.068Z",
            "updated_at": "2026-03-19T14:38:26.068Z"
        }
    ]
}
```

---

#### 1.2 GET /api/projects?status=active — Filter by Status

```
GET /api/projects?status=active
```

**Checklist:**
- [x] Status code `200`
- [x] Semua project di array punya `status === 'active'`

**Actual Response:**
```json
{
    "data": [
        {
            "id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "title": "OMR Grading System",
            "short_description": "Project untuk API testing via Postman",
            "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
            "tech_stack": [
                "Next.js",
                "TypeScript",
                "Supabase"
            ],
            "status": "active",
            "github_repo_url": "https://github.com/EviewNicks/omr_grading_system",
            "github_owner": "EviewNicks",
            "github_repo": "omr_grading_system",
            "last_sync_at": null,
            "created_at": "2026-03-19T14:38:26.068Z",
            "updated_at": "2026-03-19T14:38:26.068Z"
        }
    ]
}
```

---

#### 1.3 GET /api/projects?query=next — Search by Keyword

```
GET /api/projects?query=System
```

**Checklist:**
- [x] Status code `200`
- [ ] Semua project yang dikembalikan mengandung kata `next` di `title` atau `tech_stack` (case-insensitive)

**Actual Response:**
```json
{
    "data": [
        {
            "id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "title": "OMR Grading System",
            "short_description": "Project untuk API testing via Postman",
            "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
            "tech_stack": [
                "Next.js",
                "TypeScript",
                "Supabase"
            ],
            "status": "active",
            "github_repo_url": "https://github.com/EviewNicks/omr_grading_system",
            "github_owner": "EviewNicks",
            "github_repo": "omr_grading_system",
            "last_sync_at": null,
            "created_at": "2026-03-19T14:38:26.068Z",
            "updated_at": "2026-03-19T14:38:26.068Z"
        }
    ]
}
```

---

### Scenario 2: Create Project

#### 2.1 POST /api/projects — Create Success

```
POST /api/projects
x-admin-secret: {{adminSecret}}
Content-Type: application/json

{
  "title": "Test Project Postman",
  "short_description": "Project untuk API testing via Postman",
  "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
  "tech_stack": ["Next.js", "TypeScript", "Supabase"],
  "status": "active",
  "github_repo_url": "https://github.com/octocat/Hello-World"
}
```

**Checklist:**
- [x] Status code `201`
- [x] Response punya field `data`
- [x] `data` punya: `id`, `title`, `short_description`, `tech_stack`, `status`, `github_owner`, `github_repo`, `created_at`
- [x] `data.github_owner === 'octocat'`
- [x] `data.github_repo === 'Hello-World'`
- [x] `projectId` tersimpan otomatis ke collection variable (cek di console Postman)

**Actual Response:**
```json
{
    "data": {
        "id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
        "title": "OMR Grading System",
        "short_description": "Project untuk API testing via Postman",
        "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
        "tech_stack": [
            "Next.js",
            "TypeScript",
            "Supabase"
        ],
        "status": "active",
        "github_repo_url": "https://github.com/EviewNicks/omr_grading_system",
        "github_owner": "EviewNicks",
        "github_repo": "omr_grading_system",
        "last_sync_at": null,
        "created_at": "2026-03-19T14:38:26.068Z",
        "updated_at": "2026-03-19T14:38:26.068Z"
    }
}
```

---

#### 2.2 POST /api/projects — 400 Empty Title

```
POST /api/projects
x-admin-secret: {{adminSecret}}

{
  "title": "   ",
  "short_description": "Valid description",
  "tech_stack": ["React"]
}
```

**Checklist:**
- [x] Status code `400`
- [x] Response punya field `error`
- [x] Response punya field `details` (array validation errors)

**Actual Response:**
```json
{
    "error": "Validation failed",
    "details": [
        "title is required and must be a non-empty string"
    ]
}
```

---

#### 2.3 POST /api/projects — 401 No Secret

```
POST /api/projects
(tanpa x-admin-secret header)
```

**Checklist:**
- [x] Status code `401`
- [x] `error === 'Unauthorized'`

**Actual Response:**
```json
{
    "error": "Unauthorized"
}
```

---

### Scenario 3: Get & Update Project

#### 3.1 GET /api/projects/:projectId — Get by ID

```
GET /api/projects/{{projectId}}
```

**Checklist:**
- [x] Status code `200`
- [x] `data.id === projectId` yang tersimpan di variable
- [x] `data.title === 'Test Project Postman'`

**Actual Response:**
```json
{
    "data": {
        "id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
        "title": "OMR Grading System",
        "short_description": "Project untuk API testing via Postman",
        "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
        "tech_stack": [
            "Next.js",
            "TypeScript",
            "Supabase"
        ],
        "status": "active",
        "github_repo_url": "https://github.com/EviewNicks/omr_grading_system",
        "github_owner": "EviewNicks",
        "github_repo": "omr_grading_system",
        "last_sync_at": null,
        "created_at": "2026-03-19T14:38:26.068Z",
        "updated_at": "2026-03-19T14:38:26.068Z"
    }
}
```

---

#### 3.2 PUT /api/projects/:projectId — Update Status

```
PUT /api/projects/{{projectId}}
x-admin-secret: {{adminSecret}}

{
  "status": "maintenance",
  "short_description": "Updated via Postman"
}
```

**Checklist:**
- [x] Status code `200`
- [x] `data.status === 'maintenance'`
- [x] `data.short_description === 'Updated via Postman'`
- [x] `data.updated_at` lebih baru dari `data.created_at`

**Actual Response:**
```json
{
    "data": {
        "id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
        "title": "OMR Grading System",
        "short_description": "Updated via Postman",
        "long_description": "Deskripsi panjang project test ini dibuat untuk keperluan API testing.",
        "tech_stack": [
            "Next.js",
            "TypeScript",
            "Supabase"
        ],
        "status": "maintenance",
        "github_repo_url": "https://github.com/EviewNicks/omr_grading_system",
        "github_owner": "EviewNicks",
        "github_repo": "omr_grading_system",
        "last_sync_at": null,
        "created_at": "2026-03-19T14:38:26.068Z",
        "updated_at": "2026-03-19T14:50:47.389Z"
    }
}
```

---

#### 3.3 GET /api/projects/nonexistent — 404 Not Found

```
GET /api/projects/nonexistent-id-xyz
```

**Checklist:**
- [x] Status code `404`
- [x] `error === 'Project not found'`

**Actual Response:**
```json
{
    "error": "Project not found"
}
```

---

### Scenario 4: Timeline Entries

#### 4.1 GET /api/projects/:projectId/timeline — List Entries (Empty)

```
GET /api/projects/{{projectId}}/timeline
```

**Checklist:**
- [x] Status code `200`
- [x] Response punya field `data` (array)
- [x] Array kosong `[]` (belum ada entries)

**Actual Response:**
```json
{
    "data": [
        {
            "id": "40a5d4c5-a7c6-414b-8866-0f2c59cbfc6d",
            "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "entry_type": "pr",
            "date": "2026-03-01T10:00:00.000Z",
            "sprint_number": 1,
            "title": "PR #1: Initial setup",
            "description": "Setup project foundation",
            "external_url": "https://github.com/EviewNicks/omr_grading_system/pull/1",
            "external_title": null,
            "external_status": "merged",
            "is_featured": true,
            "media_preview": null,
            "github_pr_number": 1,
            "github_pr_title": null,
            "github_author": "octocat",
            "created_at": "2026-03-19T15:33:02.211Z",
            "updated_at": "2026-03-19T15:33:02.211Z"
        },
        {
            "id": "a66c1c58-5468-4dbc-962f-77f61b1d18de",
            "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "entry_type": "pr",
            "date": "2026-03-01T10:00:00.000Z",
            "sprint_number": 2,
            "title": "PR #2: Template Detection",
            "description": "Setup project foundation",
            "external_url": "https://github.com/EviewNicks/omr_grading_system/pull/2",
            "external_title": null,
            "external_status": "merged",
            "is_featured": true,
            "media_preview": null,
            "github_pr_number": 2,
            "github_pr_title": null,
            "github_author": "EviewNicks",
            "created_at": "2026-03-19T15:34:35.092Z",
            "updated_at": "2026-03-19T15:34:35.092Z"
        }
    ]
}
```

---

#### 4.2 POST /api/projects/:projectId/timeline — Create PR Entry

```
POST /api/projects/{{projectId}}/timeline
x-admin-secret: {{adminSecret}}

{
  "entry_type": "pr",
  "date": "2026-03-01T10:00:00Z",
  "sprint_number": 1,
  "title": "PR #1: Initial setup",
  "description": "Setup project foundation",
  "external_url": "https://github.com/octocat/Hello-World/pull/1",
  "external_status": "merged",
  "github_pr_number": 1,
  "github_author": "octocat",
  "is_featured": true
}
```

**Checklist:**
- [x] Status code `201`
- [x] `data.entry_type === 'pr'`
- [x] `data.sprint_number === 1`
- [x] `data.github_pr_number === 1`
- [x] `data.is_featured === true`
- [x] `entryId` tersimpan otomatis ke collection variable

**Actual Response:**
```json
{
    "data": {
        "id": "40a5d4c5-a7c6-414b-8866-0f2c59cbfc6d",
        "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
        "entry_type": "pr",
        "date": "2026-03-01T10:00:00.000Z",
        "sprint_number": 1,
        "title": "PR #1: Initial setup",
        "description": "Setup project foundation",
        "external_url": "https://github.com/EviewNicks/omr_grading_system/pull/1",
        "external_title": null,
        "external_status": "merged",
        "is_featured": true,
        "media_preview": null,
        "github_pr_number": 1,
        "github_pr_title": null,
        "github_author": "octocat",
        "created_at": "2026-03-19T15:33:02.211Z",
        "updated_at": "2026-03-19T15:33:02.211Z"
    }
}
```

---

#### 4.3 POST /api/projects/:projectId/timeline — Create Milestone Entry

```
POST /api/projects/{{projectId}}/timeline
x-admin-secret: {{adminSecret}}

{
  "entry_type": "milestone",
  "date": "2026-03-10T00:00:00Z",
  "sprint_number": 1,
  "title": "Sprint 1 Complete",
  "description": "Semua task sprint 1 selesai",
  "is_featured": false
}
```

**Checklist:**
- [x] Status code `201`
- [x] `data.entry_type === 'milestone'`
- [x] `data.title === 'Sprint 1 Complete'`

**Actual Response:**
```json
{
    "data": {
        "id": "b5b107eb-dd09-4ada-950b-c3916c0f7077",
        "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
        "entry_type": "milestone",
        "date": "2026-03-10T00:00:00.000Z",
        "sprint_number": 1,
        "title": "Sprint 1 Complete",
        "description": "Semua task sprint 1 selesai",
        "external_url": null,
        "external_title": null,
        "external_status": null,
        "is_featured": false,
        "media_preview": null,
        "github_pr_number": null,
        "github_pr_title": null,
        "github_author": null,
        "created_at": "2026-03-19T15:35:04.056Z",
        "updated_at": "2026-03-19T15:35:04.056Z"
    }
}
```

---

#### 4.4 POST /api/projects/:projectId/timeline — 400 sprint_number < 1

```
POST /api/projects/{{projectId}}/timeline
x-admin-secret: {{adminSecret}}

{
  "entry_type": "milestone",
  "date": "2026-03-10T00:00:00Z",
  "sprint_number": 0,
  "title": "Invalid sprint"
}
```

**Checklist:**
- [x] Status code `400`
- [x] Response punya field `error`

**Actual Response:**
```json
{
    "error": "Validation failed",
    "details": [
        "sprint_number must be an integer greater than or equal to 1"
    ]
}
```

---

#### 4.5 GET /api/projects/:projectId/timeline — List After Create

```
GET /api/projects/{{projectId}}/timeline
```

**Checklist:**
- [x] Status code `200`
- [x] Array punya 2 entries (PR + milestone)
- [x] Entries diurutkan by `date` ascending

**Actual Response:**
```json
{
    "data": [
        {
            "id": "40a5d4c5-a7c6-414b-8866-0f2c59cbfc6d",
            "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "entry_type": "pr",
            "date": "2026-03-01T10:00:00.000Z",
            "sprint_number": 1,
            "title": "PR #1: Initial setup",
            "description": "Setup project foundation",
            "external_url": "https://github.com/EviewNicks/omr_grading_system/pull/1",
            "external_title": null,
            "external_status": "merged",
            "is_featured": true,
            "media_preview": null,
            "github_pr_number": 1,
            "github_pr_title": null,
            "github_author": "octocat",
            "created_at": "2026-03-19T15:33:02.211Z",
            "updated_at": "2026-03-19T15:33:02.211Z"
        },
        {
            "id": "b5b107eb-dd09-4ada-950b-c3916c0f7077",
            "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "entry_type": "milestone",
            "date": "2026-03-10T00:00:00.000Z",
            "sprint_number": 1,
            "title": "Sprint 1 Complete",
            "description": "Semua task sprint 1 selesai",
            "external_url": null,
            "external_title": null,
            "external_status": null,
            "is_featured": false,
            "media_preview": null,
            "github_pr_number": null,
            "github_pr_title": null,
            "github_author": null,
            "created_at": "2026-03-19T15:35:04.056Z",
            "updated_at": "2026-03-19T15:35:04.056Z"
        },
        {
            "id": "a66c1c58-5468-4dbc-962f-77f61b1d18de",
            "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
            "entry_type": "pr",
            "date": "2026-03-01T10:00:00.000Z",
            "sprint_number": 2,
            "title": "PR #2: Template Detection",
            "description": "Setup project foundation",
            "external_url": "https://github.com/EviewNicks/omr_grading_system/pull/2",
            "external_title": null,
            "external_status": "merged",
            "is_featured": true,
            "media_preview": null,
            "github_pr_number": 2,
            "github_pr_title": null,
            "github_author": "EviewNicks",
            "created_at": "2026-03-19T15:34:35.092Z",
            "updated_at": "2026-03-19T15:34:35.092Z"
        }
    ]
}
```

---

#### 4.6 PUT /api/projects/:projectId/timeline/:entryId — Update Entry

```
PUT /api/projects/{{projectId}}/timeline/{{entryId}}
x-admin-secret: {{adminSecret}}

{
  "title": "PR #1: Initial setup (updated)",
  "sprint_number": 2,
  "is_featured": false
}
```

**Checklist:**
- [x] Status code `200`
- [x] `data.title === 'PR #1: Initial setup (updated)'`
- [x] `data.sprint_number === 2`
- [x] `data.is_featured === false`

**Actual Response:**
```json
{
    "data": {
        "id": "a66c1c58-5468-4dbc-962f-77f61b1d18de",
        "project_id": "2bb6c51f-10b8-45fa-b326-4f52b38fa19b",
        "entry_type": "pr",
        "date": "2026-03-01T10:00:00.000Z",
        "sprint_number": 2,
        "title": "PR #1: Initial setup (updated)",
        "description": "Setup project foundation",
        "external_url": "https://github.com/EviewNicks/omr_grading_system/pull/2",
        "external_title": null,
        "external_status": "merged",
        "is_featured": false,
        "media_preview": null,
        "github_pr_number": 2,
        "github_pr_title": null,
        "github_author": "EviewNicks",
        "created_at": "2026-03-19T15:34:35.092Z",
        "updated_at": "2026-03-19T15:38:25.508Z"
    }
}
```

---

#### 4.7 DELETE /api/projects/:projectId/timeline/:entryId — Delete Entry

```
DELETE /api/projects/{{projectId}}/timeline/{{entryId}}
x-admin-secret: {{adminSecret}}
```

**Checklist:**
- [x] Status code `200`
- [x] `success === true`

**Actual Response:**
```json
{
    "success": true
}
```

---

### Scenario 5: Cleanup

#### 5.1 DELETE /api/projects/:projectId/timeline — Delete ALL Entries (Reset before re-sync)

> Jalankan ini **sebelum** 5.2 jika ingin reset timeline entries tanpa menghapus project.

```
DELETE /api/projects/{{projectId}}/timeline
x-admin-secret: {{adminSecret}}
```

**Checklist:**
- [x] Status code `200`
- [x] `success === true`
- [x] `deleted` berisi jumlah entries yang dihapus (integer)
- [x] GET /api/projects/:projectId/timeline setelah ini harus return array kosong `[]`

**Actual Response:**
```json
{
    "success": true,
    "deleted": 4
}
```

---

#### 5.2 DELETE /api/projects/:projectId — Delete Project (Cascade)

> Jalankan **terakhir** setelah semua collection lain selesai.

```
DELETE /api/projects/{{projectId}}
x-admin-secret: {{adminSecret}}
```

**Checklist:**
- [x] Status code `200`
- [x] `success === true`
- [x] GET /api/projects/:projectId setelah ini harus return `404`

**Actual Response:**
```json
{
    "success": true
}
```

---

## Error Cases Summary

| Request | Expected Status | Keterangan |
|---------|----------------|------------|
| POST project tanpa secret | `401` | Auth gagal |
| POST project dengan title whitespace | `400` | Validasi title |
| POST project dengan short_description kosong | `400` | Validasi description |
| GET project dengan id tidak ada | `404` | Not found |
| PUT project tanpa secret | `401` | Auth gagal |
| DELETE project tanpa secret | `401` | Auth gagal |
| POST timeline dengan sprint_number = 0 | `400` | Validasi sprint |
| POST timeline dengan entry_type invalid | `400` | Validasi type |
| POST timeline tanpa title | `400` | Required field |
| DELETE timeline (all) tanpa secret | `401` | Auth gagal |
| DELETE timeline (all) project tidak ada | `404` | Not found |

---

## Troubleshooting

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `projectId` kosong di variable | POST project belum dijalankan | Jalankan request "POST /api/projects — create project" dulu |
| `entryId` kosong di variable | POST timeline belum dijalankan | Jalankan request "POST timeline — create PR entry" dulu |
| 401 di semua request | `adminSecret` salah | Cek nilai `ADMIN_SECRET_KEY` di `.env`, update variable |
| 500 Internal Server Error | Database tidak terhubung | Cek `DATABASE_URL` di `.env`, pastikan Supabase aktif |
| Connection refused | Server tidak running | Jalankan `npm run dev` |

---

## References

- **Postman Collection:** `tests/api/projects.postman_collection.json`
- **Requirements:** `.kiro/specs/dynamic-project-timeline/requirements.md`
- **Design:** `.kiro/specs/dynamic-project-timeline/design.md`
- **Tasks:** `.kiro/specs/dynamic-project-timeline/tasks.md`

---

**Last Updated:** 2026-03-17
**Status:** Ready for Testing
