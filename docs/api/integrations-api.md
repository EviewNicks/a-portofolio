# Integrations API Testing Guide

**Feature:** Dynamic Project Management Timeline
**Collection:** `tests/api/integrations.postman_collection.json`
**Sprint:** Task 12.2
**Requirements:** 5.x, 6.x

---

## Overview

Panduan testing untuk Integrations API — GitHub PR sync dan YouTube video preview. Collection ini **bergantung pada `projectId`** dari collection Projects & Timeline. Pastikan sudah menjalankan collection tersebut terlebih dahulu.

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/github/sync` | Required | Sync merged PRs dari GitHub ke timeline |
| POST | `/api/youtube/preview` | No | Preview metadata video YouTube (stateless) |

---

## Prerequisites

### 1. Jalankan Collection Projects Terlebih Dahulu

`projectId` harus sudah tersimpan di collection variable. Pastikan sudah menjalankan:
- `POST /api/projects — create project` dari collection `projects.postman_collection.json`

Project test menggunakan repo `octocat/Hello-World` yang merupakan repo publik GitHub — tidak memerlukan `GITHUB_TOKEN` untuk fetch PRs.

### 2. Start Development Server

```bash
npm run dev
```

### 3. Import Collection ke Postman

1. Buka Postman
2. Click **Import**
3. Pilih file `tests/api/integrations.postman_collection.json`
4. Click **Import**

### 4. Configure Collection Variables

| Variable | Default | Keterangan |
|----------|---------|------------|
| `baseUrl` | `http://localhost:3000` | URL dev server |
| `adminSecret` | `Ardiansy4` | Harus sama dengan `ADMIN_SECRET_KEY` di `.env` |
| `projectId` | _(isi manual)_ | Copy dari collection Projects setelah POST project |

> **Catatan YouTube:** Request preview membutuhkan `YOUTUBE_API_KEY` yang valid di `.env`. Jika tidak dikonfigurasi, response akan `500` — ini expected behavior.

---

## Test Scenarios & Checklist

---

### Scenario 1: GitHub PR Sync

#### 1.1 POST /api/github/sync — Sync PRs (First Run)

```
POST /api/github/sync
x-admin-secret: {{adminSecret}}
Content-Type: application/json

{
  "project_id": "{{projectId}}"
}
```

**Checklist:**
- [x] Status code `200`
- [x] `success === true`
- [x] Response punya field `synced` (total PRs dari GitHub)
- [x] Response punya field `new` (PRs yang baru ditambahkan)
- [x] Response punya field `skipped` (PRs yang sudah ada, di-skip)
- [x] `synced === new + skipped`
- [x] GET /api/projects/:projectId/timeline setelah ini menampilkan entries baru dengan `entry_type === 'pr'`

**Actual Response:**
```json
{
    "success": true,
    "synced": 4,
    "new": 4,
    "skipped": 0
}
```

---

#### 1.2 POST /api/github/sync — Idempotent Check (Second Run)

> Jalankan request yang **sama persis** setelah 1.1 berhasil.

```
POST /api/github/sync
x-admin-secret: {{adminSecret}}

{
  "project_id": "{{projectId}}"
}
```

**Checklist:**
- [x] Status code `200`
- [x] `success === true`
- [ ] `new === 0` — tidak ada PR baru (semua sudah ada)
- [ ] `skipped` sama dengan `synced` dari run pertama
- [ ] Jumlah timeline entries tidak bertambah (tidak ada duplikat)

**Actual Response:**
```json
{
    "success": true,
    "synced": 4,
    "new": 0,
    "skipped": 4
}
```

---

#### 1.3 POST /api/github/sync — 400 Missing project_id

```
POST /api/github/sync
x-admin-secret: {{adminSecret}}

{}
```

**Checklist:**
- [x] Status code `400`
- [x] `error === 'project_id is required'`

**Actual Response:**
```json
{
    "error": "project_id is required"
}
```

---

#### 1.4 POST /api/github/sync — 404 Project Not Found

```
POST /api/github/sync
x-admin-secret: {{adminSecret}}

{
  "project_id": "nonexistent-id-xyz"
}
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

#### 1.5 POST /api/github/sync — 401 No Secret

```
POST /api/github/sync
(tanpa x-admin-secret header)

{
  "project_id": "{{projectId}}"
}
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

### Scenario 2: YouTube Preview

> YouTube preview bersifat **stateless** — tidak menyimpan data ke database. Hanya mengembalikan metadata untuk ditampilkan ke admin sebelum approve.

#### 2.1 POST /api/youtube/preview — Valid URL (watch format)

```
POST /api/youtube/preview
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Checklist:**
- [x] Status code `200`
- [x] Response punya field `data`
- [x] `data` punya: `video_id`, `title`, `thumbnail_url`, `view_count`, `url`
- [x] `data.video_id === 'dQw4w9WgXcQ'`
- [x] `data.video_id` panjangnya 11 karakter

**Actual Response:**
```json
{
    "data": {
        "video_id": "-SV28fET7WI",
        "title": "implementasi yolov7 padaMata Kuliah COMVIS Modul1",
        "thumbnail_url": "https://i.ytimg.com/vi/-SV28fET7WI/maxresdefault.jpg",
        "view_count": "1",
        "url": "https://www.youtube.com/watch?v=-SV28fET7WI"
    }
}
```

---

#### 2.2 POST /api/youtube/preview — Valid URL (youtu.be short format)

```
POST /api/youtube/preview

{
  "url": "https://youtu.be/dQw4w9WgXcQ"
}
```

**Checklist:**
- [ ] Status code `200`
- [ ] `data.video_id === 'dQw4w9WgXcQ'` (sama dengan 2.1 — video yang sama)
- [ ] Response identik dengan 2.1

**Actual Response:**
```json
{
    "data": {
        "video_id": "cmW8qJvQs6c",
        "title": "My best Claude Code tips pt 1",
        "thumbnail_url": "https://i.ytimg.com/vi/cmW8qJvQs6c/maxresdefault.jpg",
        "view_count": "231975",
        "url": "https://www.youtube.com/watch?v=cmW8qJvQs6c"
    }
}
```

---

#### 2.3 POST /api/youtube/preview — 400 Invalid URL Format (bukan YouTube)

```
POST /api/youtube/preview

{
  "url": "https://vimeo.com/123456"
}
```

**Checklist:**
- [x] Status code `400`
- [x] Response punya field `error`
- [x] `error` menyebutkan format URL yang didukung

**Actual Response:**
```json
{
    "error": "Invalid YouTube URL format. Supported formats: youtube.com/watch?v=, youtu.be/, youtube.com/embed/"
}
```

---

#### 2.4 POST /api/youtube/preview — 400 Empty URL

```
POST /api/youtube/preview

{
  "url": ""
}
```

**Checklist:**
- [x] Status code `400`
- [x] `error === 'url is required'`

**Actual Response:**
```json
{
    "error": "url is required"
}
```

---

#### 2.5 POST /api/youtube/preview — 400 Missing url Field

```
POST /api/youtube/preview

{}
```

**Checklist:**
- [x] Status code `400`
- [x] `error === 'url is required'`

**Actual Response:**
```json
{
    "error": "url is required"
}
```

---

## Error Cases Summary

| Request | Expected Status | Keterangan |
|---------|----------------|------------|
| POST github/sync tanpa secret | `401` | Auth gagal |
| POST github/sync tanpa project_id | `400` | Missing required field |
| POST github/sync dengan project tidak ada | `404` | Project not found |
| POST github/sync project tanpa GitHub repo | `400` | Project tidak punya github_owner/repo |
| POST youtube/preview URL bukan YouTube | `400` | Format URL tidak dikenali |
| POST youtube/preview URL kosong | `400` | Required field |
| POST youtube/preview tanpa field url | `400` | Required field |
| POST youtube/preview video tidak ada | `404` | Video ID valid tapi tidak ditemukan di YouTube |
| POST youtube/preview tanpa API key | `500` | YOUTUBE_API_KEY tidak dikonfigurasi |

---

## Troubleshooting

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `projectId` kosong | Collection Projects belum dijalankan | Jalankan POST project di collection projects dulu, copy `projectId` |
| `400` pada sync — "no GitHub repo" | Project tidak punya `github_repo_url` | Pastikan project dibuat dengan `github_repo_url` yang valid |
| `502` pada sync | GitHub API tidak bisa diakses | Cek koneksi internet, atau GitHub API sedang down |
| `500` pada YouTube preview | `YOUTUBE_API_KEY` tidak ada di `.env` | Tambahkan `YOUTUBE_API_KEY` di `.env`, restart server |
| `404` pada YouTube preview | Video ID valid tapi video tidak ada/private | Gunakan video ID yang valid dan publik |
| Connection refused | Server tidak running | Jalankan `npm run dev` |

---

## References

- **Postman Collection:** `tests/api/integrations.postman_collection.json`
- **Requirements:** `.kiro/specs/dynamic-project-timeline/requirements.md` (Req 5.x, 6.x)
- **Design:** `.kiro/specs/dynamic-project-timeline/design.md`
- **Tasks:** `.kiro/specs/dynamic-project-timeline/tasks.md`

---

**Last Updated:** 2026-03-17
**Status:** Ready for Testing
