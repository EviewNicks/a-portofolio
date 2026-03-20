# Media Upload API Testing Guide

**Feature:** Dynamic Project Management Timeline
**Collection:** `tests/api/media.postman_collection.json`
**Sprint:** Task 12.2
**Requirements:** 7.x

---

## Overview

Panduan testing untuk Media Upload API — upload screenshot project ke Supabase Storage dan delete media. Collection ini **bergantung pada `projectId`** dari collection Projects & Timeline.

> **Catatan penting:** Upload file di Postman tidak bisa di-automate sepenuhnya — field `file` harus dipilih manual setiap kali menjalankan request upload.

### API Endpoints

| Method | Endpoint            | Auth                  | Description                                |
| --------| ---------------------| -----------------------| --------------------------------------------|
| POST   | `/api/media/upload` | Required (form field) | Upload screenshot ke Supabase Storage      |
| DELETE | `/api/media/[id]`   | Required (header)     | Hapus screenshot dari Storage dan database |

---

## Prerequisites

### 1. Jalankan Collection Projects Terlebih Dahulu

`projectId` harus sudah tersimpan. Pastikan sudah menjalankan:
- `POST /api/projects — create project` dari collection `projects.postman_collection.json`

### 2. Siapkan File Gambar Test

Siapkan file gambar untuk upload:
- Format: **JPEG, PNG, atau WebP**
- Ukuran: **kurang dari 5MB**
- Contoh: screenshot aplikasi, foto, atau gambar apapun yang valid

### 3. Pastikan Supabase Storage Terkonfigurasi

```bash
# Cek .env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Storage bucket `project-media` harus sudah ada di Supabase dashboard.

### 4. Start Development Server

```bash
npm run dev
```

### 5. Import Collection ke Postman

1. Buka Postman
2. Click **Import**
3. Pilih file `tests/api/media.postman_collection.json`
4. Click **Import**

### 6. Configure Collection Variables

| Variable | Default | Keterangan |
|----------|---------|------------|
| `baseUrl` | `http://localhost:3000` | URL dev server |
| `adminSecret` | `Ardiansy4` | Harus sama dengan `ADMIN_SECRET_KEY` di `.env` |
| `projectId` | _(isi manual)_ | Copy dari collection Projects setelah POST project |
| `mediaId` | _(kosong)_ | Diisi **otomatis** setelah POST upload berhasil |

---

## Cara Upload File di Postman

Setiap kali menjalankan request upload, ikuti langkah ini:

1. Buka request `POST /api/media/upload — upload screenshot`
2. Klik tab **Body**
3. Pastikan mode **form-data** dipilih
4. Di baris field `file`:
   - Klik dropdown di kolom **TYPE** → pilih **File**
   - Klik **Select Files**
   - Pilih file gambar JPEG/PNG/WebP (< 5MB)
5. Pastikan field `project_id` terisi `{{projectId}}`
6. Pastikan field `secret` terisi `{{adminSecret}}`
7. Klik **Send**

---

## Test Scenarios & Checklist

---

### Scenario 1: Upload Screenshot

#### 1.1 POST /api/media/upload — Upload Success

```
POST /api/media/upload
Body: form-data
  file       = [pilih file JPEG/PNG/WebP < 5MB]
  project_id = {{projectId}}
  secret     = {{adminSecret}}
```

**Checklist:**
- [x] Status code `201`
- [x] Response punya field `data`
- [x] `data` punya: `id`, `project_id`, `storage_path`, `public_url`, `file_name`, `created_at`
- [x] `data.project_id === projectId`
- [x] `data.public_url` adalah URL yang bisa diakses (format `https://...supabase.co/storage/...`)
- [x] `mediaId` tersimpan otomatis ke collection variable (cek console Postman)
- [x] File bisa diakses via `data.public_url` di browser

**Actual Response:**
```json
{
    "data": {
        "id": "5f96b495-d9eb-405b-8474-fcf5917dd6f0",
        "project_id": "69ead9e0-a49a-45ab-9968-996bae53c97e",
        "storage_path": "69ead9e0-a49a-45ab-9968-996bae53c97e/1773988800518-ai.png",
        "public_url": "https://onrdpcigvqmsuqspnlhd.supabase.co/storage/v1/object/public/project-media/69ead9e0-a49a-45ab-9968-996bae53c97e/1773988800518-ai.png",
        "file_name": "ai.png",
        "created_at": "2026-03-20T06:40:01.079Z"
    }
}
```

---

#### 1.2 POST /api/media/upload — 400 Missing project_id

```
POST /api/media/upload
Body: form-data
  file   = [pilih file gambar]
  secret = {{adminSecret}}
  (tanpa project_id)
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

#### 1.3 POST /api/media/upload — 401 No Secret

```
POST /api/media/upload
Body: form-data
  file       = [pilih file gambar]
  project_id = {{projectId}}
  (tanpa secret field)
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

#### 1.4 POST /api/media/upload — 400 Invalid File Type

```
POST /api/media/upload
Body: form-data
  file       = [pilih file .pdf atau .txt]
  project_id = {{projectId}}
  secret     = {{adminSecret}}
```

**Checklist:**
- [x] Status code `400`
- [x] Response punya field `error`
- [x] `error` menyebutkan format yang diterima (JPEG, PNG, WebP)

**Actual Response:**
```json
{
    "error": "Invalid file type. Allowed: image/jpeg, image/png, image/webp"
}
```

---

### Scenario 2: Delete Media

#### 2.1 DELETE /api/media/:mediaId — Delete Success

> Jalankan **setelah** 1.1 berhasil dan `mediaId` tersimpan di variable.

```
DELETE /api/media/{{mediaId}}
x-admin-secret: {{adminSecret}}
```

**Checklist:**
- [x] Status code `200`
- [x] `success === true`
- [x] File tidak lagi bisa diakses via URL yang sebelumnya valid (opsional: cek di browser)

**Actual Response:**
```json
{
    "success": true
}
```

---

#### 2.2 DELETE /api/media/:mediaId — 404 Not Found

```
DELETE /api/media/nonexistent-media-id
x-admin-secret: {{adminSecret}}
```

**Checklist:**
- [x] Status code `404`
- [x] `error === 'Media not found'`

**Actual Response:**
```json
{
    "error": "Media not found"
}
```

---

#### 2.3 DELETE /api/media/:mediaId — 401 No Secret

```
DELETE /api/media/{{mediaId}}
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

## Error Cases Summary

| Request | Expected Status | Keterangan |
|---------|----------------|------------|
| POST upload tanpa secret | `401` | Auth gagal |
| POST upload tanpa project_id | `400` | Missing required field |
| POST upload tanpa file | `400` | Missing required field |
| POST upload file > 5MB | `400` | File terlalu besar |
| POST upload file .pdf / .txt / .gif | `400` | Format tidak didukung |
| POST upload project tidak ada | `404` | Project not found |
| DELETE media tanpa secret | `401` | Auth gagal |
| DELETE media dengan id tidak ada | `404` | Media not found |

---

## Troubleshooting

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `projectId` kosong | Collection Projects belum dijalankan | Jalankan POST project dulu, copy `projectId` ke variable |
| `mediaId` kosong setelah upload | Upload gagal atau test script tidak jalan | Cek response upload, pastikan status `201` |
| `500` pada upload | Supabase Storage tidak terkonfigurasi | Cek `SUPABASE_SERVICE_ROLE_KEY` di `.env`, cek bucket `project-media` ada di Supabase |
| `400` file type error | File yang dipilih bukan JPEG/PNG/WebP | Pilih file gambar yang valid |
| `400` file size error | File lebih dari 5MB | Gunakan file yang lebih kecil |
| File tidak bisa diakses via URL | Bucket tidak public | Set bucket `project-media` ke public di Supabase Storage settings |
| Connection refused | Server tidak running | Jalankan `npm run dev` |

---

## References

- **Postman Collection:** `tests/api/media.postman_collection.json`
- **Requirements:** `.kiro/specs/dynamic-project-timeline/requirements.md` (Req 7.x)
- **Design:** `.kiro/specs/dynamic-project-timeline/design.md`
- **Tasks:** `.kiro/specs/dynamic-project-timeline/tasks.md`

---

**Last Updated:** 2026-03-17
**Status:** Ready for Testing
