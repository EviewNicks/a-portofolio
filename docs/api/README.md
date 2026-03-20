# API Testing Guide — Dynamic Project Timeline

Panduan lengkap untuk menjalankan API testing menggunakan Postman collections.

---

## Setup

### 1. Jalankan dev server

```bash
npm run dev
```

Server harus berjalan di `http://localhost:3000` sebelum menjalankan collection apapun.

### 2. Import collections ke Postman

Import ketiga file berikut via **File → Import** di Postman:

| File | Isi |
|------|-----|
| `projects.postman_collection.json` | CRUD projects + timeline entries |
| `integrations.postman_collection.json` | GitHub sync + YouTube preview |
| `media.postman_collection.json` | Upload + delete screenshot |

### 3. Verifikasi collection variables

Setiap collection sudah memiliki default variables. Pastikan nilainya benar:

| Variable | Default | Keterangan |
|----------|---------|------------|
| `baseUrl` | `http://localhost:3000` | URL dev server |
| `adminSecret` | `Ardiansy4` | Harus sama dengan `ADMIN_SECRET_KEY` di `.env` |
| `projectId` | _(kosong)_ | Diisi otomatis setelah POST project |
| `entryId` | _(kosong)_ | Diisi otomatis setelah POST timeline entry |
| `mediaId` | _(kosong)_ | Diisi otomatis setelah POST media upload |

---

## Urutan Eksekusi

### Tahap 1 — Projects & Timeline (wajib pertama)

Jalankan collection **"Projects & Timeline"** secara berurutan dari atas ke bawah:

```
1. GET /api/projects                          → list semua projects (boleh kosong)
2. POST /api/projects                         → CREATE project baru
                                                ↳ projectId tersimpan otomatis ke variable
3. GET /api/projects?status=active            → filter by status
4. GET /api/projects?query=next               → search by keyword
5. GET /api/projects/:projectId               → get project yang baru dibuat
6. PUT /api/projects/:projectId               → update project
7. POST /api/projects/:projectId/timeline     → CREATE timeline entry (PR)
                                                ↳ entryId tersimpan otomatis ke variable
8. POST /api/projects/:projectId/timeline     → CREATE timeline entry (milestone)
9. GET /api/projects/:projectId/timeline      → list semua entries
10. PUT /api/projects/:projectId/timeline/:entryId  → update entry
11. DELETE /api/projects/:projectId/timeline/:entryId → delete entry
```

> Jangan jalankan `DELETE /api/projects/:projectId` dulu — projectId masih dibutuhkan oleh collection lain.

---

### Tahap 2 — Integrations (butuh projectId dari Tahap 1)

Pastikan `projectId` sudah terisi di collection variables, lalu jalankan collection **"Integrations"**:

```
GitHub Sync:
1. POST /api/github/sync                      → sync PRs dari GitHub
                                                ↳ response: { synced, new, skipped }
2. POST /api/github/sync (ulang)              → idempotent check: new harus 0

YouTube Preview:
3. POST /api/youtube/preview (watch URL)      → preview video YouTube
4. POST /api/youtube/preview (youtu.be URL)   → format URL alternatif
```

> Catatan: GitHub sync membutuhkan project yang punya `github_repo_url`. Project yang dibuat di Tahap 1 sudah menggunakan `https://github.com/octocat/Hello-World`.

> Catatan: YouTube preview membutuhkan `YOUTUBE_API_KEY` yang valid di `.env`.

---

### Tahap 3 — Media Upload (butuh projectId dari Tahap 1)

Jalankan collection **"Media Upload"**:

```
1. POST /api/media/upload                     → upload screenshot
                                                ↳ PILIH FILE dulu di field 'file'
                                                ↳ mediaId tersimpan otomatis ke variable
2. DELETE /api/media/:mediaId                 → delete screenshot yang baru diupload
```

**Cara upload file di Postman:**
1. Buka request `POST /api/media/upload`
2. Klik tab **Body** → pilih **form-data**
3. Di field `file`, klik dropdown type → pilih **File**
4. Klik **Select Files** → pilih gambar JPEG/PNG/WebP (< 5MB)
5. Send

---

### Tahap 4 — Cleanup

Setelah semua testing selesai, hapus project test:

```
DELETE /api/projects/:projectId               → ada di bagian bawah collection Projects
```

Ini akan cascade delete semua timeline entries yang terkait.

---

## Error Cases yang Dicakup

Setiap collection sudah menyertakan request untuk error scenarios:

| Request | Expected Status | Keterangan |
|---------|----------------|------------|
| POST project tanpa secret | `401` | Auth gagal |
| POST project dengan title kosong | `400` | Validasi gagal |
| GET project dengan id tidak ada | `404` | Not found |
| POST timeline dengan sprint_number = 0 | `400` | Validasi sprint |
| POST github/sync tanpa project_id | `400` | Missing field |
| POST github/sync dengan project tidak ada | `404` | Not found |
| POST youtube/preview dengan URL bukan YouTube | `400` | Format invalid |
| POST media/upload tanpa secret | `401` | Auth gagal |
| DELETE media dengan id tidak ada | `404` | Not found |

---

## Tips

- **Auto-save variables**: Request POST yang membuat resource baru sudah dilengkapi test script yang otomatis menyimpan `id` ke collection variable. Tidak perlu copy-paste manual.
- **Urutan penting**: Collection `integrations` dan `media` bergantung pada `projectId` dari collection `projects`. Selalu jalankan `projects` dulu.
- **GitHub sync**: Jika project tidak punya `github_owner`/`github_repo`, sync akan return `400`. Project test di collection ini sudah menggunakan repo `octocat/Hello-World` yang valid.
- **YouTube API key**: Jika `YOUTUBE_API_KEY` tidak dikonfigurasi di `.env`, request preview akan return `500`. Ini expected behavior.
- **Media upload**: Postman tidak bisa auto-attach file — harus pilih file manual setiap kali menjalankan request upload.
