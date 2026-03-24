# Manual Test Checklist: Dynamic Project Management Timeline (v2)

**Feature:** Dynamic Project Management Timeline  
**Spec:** `.kiro/specs/dynamic-project-timeline`  
**Tanggal Test:** ___________  
**Tester:** Ardiansyah  
**Environment:** http://localhost:3000  
**Admin Secret:** `Ardiansy4` (via `?secret=Ardiansy4`)

> **Catatan:** Dokumen ini menggantikan `dynamic-project-timeline.md`.  
> Perubahan utama: Section 2 diperbarui sesuai implementasi terkini (tab system, SprintNode layout, clickable cards, PR Detail Page).

---

## Persiapan

- [x] Aplikasi berjalan di `http://localhost:3000` (`npm run dev`)
- [x] Database Supabase aktif dan terhubung (cek `.env` — `DATABASE_URL`)
- [x] Minimal 1 project sudah ada di database
- [x] Minimal 1 project punya timeline entries (beberapa tipe: PR, milestone, video)
- [x] Minimal 1 PR entry punya `description` berisi markdown (heading, list, code block)
- [x] Browser DevTools siap untuk cek network/console errors

---

## 1. Public — Project List Page (`/projects`)

### 1.1 Halaman Load

- [x] Buka `http://localhost:3000/projects`
- [x] Halaman tampil tanpa error di console
- [x] Judul "Projects" terlihat di halaman
- [x] Subtitle "A timeline of development work..." terlihat
- [x] Grid project cards tampil (jika ada data)
- [x] Loading skeleton tampil sebentar sebelum data muncul (Suspense)

### 1.2 Project Card — Konten

Untuk setiap project card yang tampil:
- [x] Judul project tampil
- [x] Status badge tampil (Active / Maintenance / Archived)
- [x] Short description tampil
- [x] Tech stack tags tampil (maks 4 tag, sisanya "+N")
- [x] Sprint count tampil (misal: "2 Sprints")
- [x] PR count tampil (misal: "5 PRs")
- [x] Link "View Project →" tampil dan bisa diklik

### 1.3 Filter by Status

- [x] Klik tombol "Active" → hanya project berstatus `active` yang tampil
- [x] URL berubah: `?status=active`
- [ ] Klik tombol "Maintenance" → hanya project berstatus `maintenance` yang tampil
- [ ] Klik tombol "Archived" → hanya project berstatus `archived` yang tampil
- [ ] Klik tombol "All" → semua project tampil kembali, URL bersih

### 1.4 Search / Filter by Query

- [x] Ketik kata kunci di search box (misal: nama project atau tech stack)
- [x] URL berubah: `?query=<kata_kunci>`
- [x] Hanya project yang judulnya atau tech_stack-nya mengandung kata kunci tampil
- [x] Search tidak case-sensitive
- [x] Hapus search → semua project tampil kembali

### 1.5 Kombinasi Filter

- [ ] Set status filter + search bersamaan
- [ ] URL mengandung kedua params: `?status=active&query=next`
- [ ] Hasil sesuai kedua filter

### 1.6 Empty State

- [x] Set search dengan kata yang tidak ada (misal: `xyzabc999`)
- [ ] Pesan "No projects found." tampil
- [x] Pesan "Try adjusting your filters." tampil
- [ ] Tidak ada error di console

### 1.7 Navigasi ke Detail

- [x] Klik "View Project →" pada salah satu card
- [x] Redirect ke `/projects/[id]` yang benar

---

## 2. Public — Project Detail Page (`/projects/[id]`)

### 2.1 Halaman Load

- [x] Buka `/projects/[id]` dengan ID project yang valid
- [x] Halaman tampil tanpa error di console
- [x] Link "← Back to Projects" tampil di atas
- [x] Klik "← Back to Projects" → kembali ke `/projects`

### 2.2 Project Header

Header hanya menampilkan informasi ringkas (deskripsi ada di tab Description):

- [x] Judul project tampil besar (h1, font-bold)
- [x] Status badge tampil di samping judul (Active / Maintenance / Archived)
- [x] Tech stack tags tampil semua di bawah judul
- [x] Link "View on GitHub →" tampil jika project punya `github_repo_url`
- [x] Klik link GitHub → buka tab baru ke repo yang benar
- [x]  long description TIDAK tampil di header (ada di tab Description)

### 2.3 GitHub Stats Panel

Jika project punya GitHub repo yang valid:
- [x] Section GitHub stats tampil di bawah header
- [x] Stars count tampil
- [x] Forks count tampil
- [x] Contributors count tampil
- [x] Last commit date tampil

Jika project tidak punya GitHub repo:
- [ ] Section GitHub stats tidak tampil sama sekali

### 2.4 Media Gallery

Jika project punya screenshots:
- [ ] Screenshots tampil dalam gallery
- [ ] Gambar bisa dilihat

Jika project punya video entries:
- [ ] YouTube thumbnail tampil
- [ ] Link ke video tersedia

Jika tidak ada media:
- [ ] Section media tidak tampil

### 2.5 Tab System

- [x] Tab bar tampil dengan dua tab: "Description" dan "Development Timeline"
- [x] Tab "Development Timeline" menampilkan badge count jumlah entries (misal: `3`)
- [x] Default tab aktif adalah "Description"
- [x] Tab aktif punya border-bottom primary color dan teks foreground
- [ ] Tab tidak aktif punya teks muted-foreground
- [x] Klik tab "Development Timeline" → konten timeline tampil, tab aktif berubah
- [x] Klik tab "Description" → konten description tampil kembali

### 2.6 Tab: Description

Saat tab "Description" aktif:
- [x] Status badge tampil (Active / Maintenance / Archived)
- [x] Created date tampil (format: "Jan 1, 2025")
- [x] Last synced date tampil jika ada `last_sync_at`
- [x] Section "Tech Stack" tampil dengan semua tags
- [x] Section "Repository" tampil dengan link GitHub (jika ada)
- [x] Section "About" tampil dengan konten deskripsi di-render sebagai markdown
- [x] Jika project punya `long_description`, itu yang tampil; jika tidak, `short_description`

### 2.7 Tab: Development Timeline — Layout

Saat tab "Development Timeline" aktif:
- [x] Timeline tampil sebagai alternating left/right layout (bukan list vertikal biasa)
- [x] Sprint ganjil (index 0, 2, 4...) tampil di sisi KIRI dari garis tengah
- [x] Sprint genap (index 1, 3, 5...) tampil di sisi KANAN dari garis tengah
- [x] Garis vertikal (spine) tampil di tengah sebagai penghubung antar sprint
- [x] Setiap sprint punya dot (lingkaran kecil) di garis tengah
- [x] Sprint label (misal: "Sprint 1") tampil di atas kumpulan entry-nya

### 2.8 Tab: Development Timeline — Sprint Node

Untuk setiap sprint node:
- [x] Sprint label tampil sebagai pill: "● Sprint N"
- [x] Sprint di sisi kiri: label rata kanan, cards di bawahnya
- [x] Sprint di sisi kanan: label rata kiri, cards di bawahnya
- [x] Semua timeline entry cards tampil di dalam sprint node-nya

### 2.9 Timeline Entry Card — Konten

Untuk setiap entry card:
- [ ] Icon entry type tampil (🔗 PR, 🎯 Milestone, 📝 Blog, ▶️ Video, 🚀 Deploy, 📦 Release)
- [ ] Label type tampil dengan warna sesuai tipe
- [ ] Judul entry tampil (font-semibold)
- [ ] Description tampil (jika ada, max 2 baris dengan line-clamp)
- [ ] Tanggal tampil (format: "Feb 15, 2026")
- [ ] Sprint number tampil (misal: "· Sprint 1")

### 2.10 Timeline Entry Card — Interaksi

- [x] Hover pada card → border berubah ke primary/30, background sedikit berubah
- [x] Klik di mana saja pada card → navigasi ke `/projects/[id]/timeline/[entryId]`
- [x] Card TIDAK memiliki tombol "View Details →" (sudah dihapus)
- [x] Keyboard: fokus ke card → tekan Enter atau Space → navigasi ke detail page

### 2.11 Entry Type Spesifik

**PR entry:**
- [x] PR status badge tampil (merged / open / closed) dengan warna yang sesuai
  - merged: ungu
  - open: hijau
  - closed: merah
- [x] Link "View PR →" tampil jika ada `external_url`
- [x] Klik "View PR →" → buka tab baru ke GitHub PR (TIDAK navigasi ke detail page)
- [x] Klik area lain pada card → navigasi ke detail page

**Video entry:**
- [ ] YouTube thumbnail tampil (jika ada `media_preview`)
- [ ] Link "Watch Video →" tampil
- [ ] Klik "Watch Video →" → buka tab baru ke YouTube

**Featured entry:**
- [ ] Border dan background berbeda (highlight primary color)
- [ ] Badge "Featured" tampil di samping label type

### 2.12 Empty Timeline

- [ ] Buka project yang tidak punya timeline entries
- [ ] Saat tab "Development Timeline" aktif: pesan "No timeline entries yet." tampil
- [ ] Pesan tampil di dalam border rounded, centered

### 2.13 404 Page

- [x] Buka `/projects/id-yang-tidak-ada`
- [x] Next.js 404 page tampil
- [x] Tidak ada error 500

---

## 3. Public — PR Detail Page (`/projects/[id]/timeline/[entryId]`)

### 3.1 Navigasi ke Detail Page

- [x] Dari timeline, klik salah satu entry card
- [x] URL berubah ke `/projects/[id]/timeline/[entryId]`
- [x] Halaman tampil tanpa error di console
- [x] Tidak ada 404

### 3.2 Back Link

- [x] Link "← Back to [Project Title]" tampil di atas halaman
- [x] Judul project yang benar tampil di link (bukan hardcoded)
- [x] Klik link → kembali ke `/projects/[id]`

### 3.3 Header — Badges & Meta

- [x] Icon entry type tampil (emoji sesuai tipe)
- [x] Label type tampil dengan warna sesuai (misal: "Pull Request" hijau)
- [x] PR status badge tampil jika entry adalah PR (merged/open/closed dengan warna sesuai)
- [x] Badge "Featured" tampil jika `is_featured = true`

### 3.4 Header — Judul

- [x] Judul entry tampil sebagai h1 (text-2xl, font-bold)

### 3.5 Header — Meta Row

- [x] Sprint number tampil (misal: "Sprint 3")
- [x] Tanggal tampil (format panjang: "February 15, 2026")
- [x] Author tampil jika ada `github_author` (misal: "by ardiansyah")
- [x] PR number tampil jika ada `github_pr_number` (misal: "PR #42")
- [x] Tombol "↗ View on GitHub" tampil sebagai pill button jika ada `external_url` dan tipe PR
- [ ] Tombol "▶ Watch Video" tampil jika tipe video
- [ ] Klik tombol → buka tab baru ke URL yang benar

### 3.6 Konten — Markdown Rendering

Jika entry punya `description` berisi markdown:
- [x] Konten tampil di dalam box dengan border dan background subtle
- [x] Heading H1 tampil besar (1.75rem) dengan border-bottom
- [x] Heading H2 tampil lebih kecil (1.35rem) dengan border-bottom
- [x] Heading H3 tampil (1.1rem) tanpa border-bottom
- [x] Paragraf tampil dengan warna muted-foreground
- [x] Bullet list tampil dengan marker disc
- [x] Ordered list tampil dengan marker angka
- [x] Bold text tampil dengan warna foreground (bukan muted)
- [x] Link tampil dengan warna primary, hover underline
- [x] Blockquote tampil dengan border-left primary dan background subtle
- [x] Horizontal rule tampil sebagai garis tipis

### 3.7 Konten — Code Blocks

- [x] Fenced code block (``` ``` ```) tampil sebagai block code dengan background gelap (github-dark theme)
- [x] Fenced code block dengan bahasa (misal: ` ```typescript `) tampil dengan syntax highlighting
- [x] Language label tampil di pojok kanan atas code block (misal: "TYPESCRIPT")
- [x] Inline code (`` `code` ``) tampil dengan background pink/merah muda dan font mono
- [x] Inline code TIDAK tampil dengan background gelap seperti block code

### 3.8 Konten — Video Thumbnail

Jika entry adalah tipe video dan punya `media_preview`:
- [ ] Thumbnail gambar tampil di bawah description
- [ ] Gambar rounded-xl, full width

### 3.9 Entry Tanpa Description

- [x] Buka detail page entry yang tidak punya `description`
- [x] Tidak ada box description yang tampil
- [x] Halaman tetap tampil normal tanpa error

### 3.10 404 — Entry Tidak Ditemukan

- [x] Buka `/projects/[id]/timeline/id-entry-yang-tidak-ada`
- [x] Next.js 404 page tampil
- [x] Tidak ada error 500

### 3.11 404 — Entry Bukan Milik Project

- [x] Buka `/projects/[id-project-A]/timeline/[entryId-dari-project-B]`
- [x] Next.js 404 page tampil (karena `raw.project_id !== id`)

---

## 4. Admin — Authentication

### 4.1 Akses Valid

- [x] Buka `http://localhost:3000/admin?secret=Ardiansy4`
- [x] Admin dashboard tampil (bukan halaman unauthorized)
- [x] Sidebar navigasi tampil

### 4.2 Akses Invalid

- [ ] Buka `http://localhost:3000/admin?secret=salah`
- [ ] Halaman unauthorized tampil
- [ ] Tidak ada hint tentang secret yang benar
- [ ] Tidak ada error 500

### 4.3 Akses Tanpa Secret

- [ ] Buka `http://localhost:3000/admin` (tanpa query param)
- [ ] Redirect ke halaman unauthorized atau 401

### 4.4 Secret Passthrough di Navigasi

- [ ] Di admin dashboard, klik link "Projects" di sidebar
- [ ] URL baru tetap mengandung `?secret=Ardiansy4`
- [ ] Halaman tujuan tampil (bukan unauthorized)

---

## 5. Admin — Project CRUD

### 5.1 Project List (`/admin/projects?secret=Ardiansy4`)

- [ ] Tabel semua projects tampil
- [ ] Kolom: Project (title + desc), Status, Last Sync, Actions
- [ ] Setiap row punya tombol: View (👁), Edit (✏️), Timeline (🌿), Delete (🗑)
- [ ] Tombol "New Project" tampil di atas

### 5.2 Create Project

- [ ] Form tampil dengan field: Title, Short Description, Long Description, Tech Stack, GitHub URL, Status
- [ ] Isi semua field wajib (Title + Short Desc)
- [ ] Tambah tech stack: ketik nama tech → tekan Enter → tag muncul
- [ ] Hapus tech stack tag: klik X pada tag
- [ ] Klik "Create Project" → loading state "Saving..."
- [ ] Redirect ke project detail admin
- [ ] Project baru tampil

**Validasi:**
- [ ] Submit form dengan Title kosong → error "Title and short description are required."
- [ ] Submit form dengan Short Desc kosong → error yang sama
- [ ] Klik "Cancel" → kembali ke halaman sebelumnya

### 5.3 Edit Project

- [ ] Form tampil dengan data project yang sudah ada (pre-filled)
- [ ] Ubah title → klik "Save Changes"
- [ ] Redirect ke project detail admin
- [ ] Perubahan tersimpan dan tampil

### 5.4 Delete Project

- [ ] Klik tombol Delete (🗑) pada salah satu project
- [ ] Modal konfirmasi muncul: "Delete Project?"
- [ ] Klik "Cancel" → modal tutup, project tidak terhapus
- [ ] Klik "Delete" → loading state "Deleting..."
- [ ] Project hilang dari list
- [ ] Semua timeline entries project tersebut juga terhapus (cascade)

---

## 6. Admin — Timeline Management (`/admin/projects/[id]/timeline?secret=Ardiansy4`)

### 6.1 Halaman Load

- [ ] Halaman tampil dengan daftar timeline entries project
- [ ] Jumlah entries tampil di header: "Timeline Entries (N)"
- [ ] Tombol "Add Entry" tampil

### 6.2 Add Timeline Entry

- [ ] Klik "Add Entry" → modal form muncul
- [ ] Form punya field: Type, Sprint #, Date, Title, Description, External URL, Featured checkbox
- [ ] Isi semua field → klik "Save"
- [ ] Modal tutup, entry baru muncul di list

**Validasi:**
- [ ] Submit tanpa Title → error "Title is required."
- [ ] Submit dengan Sprint # = 0 → error "Sprint number must be ≥ 1."
- [ ] Klik "Cancel" → modal tutup tanpa menyimpan

### 6.3 Edit Timeline Entry

- [ ] Klik tombol Edit (✏️) pada salah satu entry
- [ ] Modal form muncul dengan data entry yang sudah ada (pre-filled)
- [ ] Ubah title → klik "Save"
- [ ] Entry di list terupdate

### 6.4 Delete Timeline Entry

- [ ] Klik tombol Delete (🗑) pada salah satu entry
- [ ] Modal konfirmasi muncul
- [ ] Klik "Cancel" → modal tutup, entry tidak terhapus
- [ ] Klik "Delete" → entry hilang dari list

### 6.5 Featured Entry

- [ ] Add entry baru dengan "Featured entry" checkbox dicentang
- [ ] Di public timeline, entry tampil dengan highlight border primary dan badge "Featured"

---

## 7. Admin — GitHub Sync

### 7.1 Sync Panel

- [ ] Panel "GitHub Sync" tampil jika project punya `github_repo_url`
- [ ] `last_sync_at` tampil (atau "Never synced" jika belum pernah)
- [ ] Tombol "Sync Now" tampil

### 7.2 Sync Berhasil

- [ ] Klik "Sync Now" → loading state tampil
- [ ] Setelah selesai: pesan sukses tampil (misal: "Synced 3 new PRs")
- [ ] `last_sync_at` terupdate
- [ ] PR entries baru muncul di timeline list

### 7.3 Sync Idempotent

- [ ] Klik "Sync Now" lagi (kedua kali)
- [ ] Pesan sukses tampil dengan "0 new PRs" (tidak ada duplikat)

### 7.4 Error Handling

- [ ] Jika GitHub token tidak valid: pesan error tampil
- [ ] Data yang sudah ada tidak berubah

---

## 8. Admin — YouTube Preview

### 8.1 Preview Valid

- [ ] Masukkan URL YouTube yang valid → klik "Preview"
- [ ] Preview card muncul: thumbnail, judul video, view count
- [ ] Tombol "Approve" dan "Reject" tampil

### 8.2 Approve Video

- [ ] Klik "Approve"
- [ ] Entry baru dengan type "video" muncul di timeline list

### 8.3 Reject Video

- [ ] Klik "Reject" → preview card hilang, tidak ada entry baru

### 8.4 URL Invalid

- [ ] Masukkan URL bukan YouTube → klik "Preview"
- [ ] Error validasi tampil, tidak ada API call

### 8.5 Video Not Found

- [ ] Masukkan URL YouTube dengan video ID tidak ada → klik "Preview"
- [ ] Error "Video tidak ditemukan" tampil

---

## 9. Admin — Media Upload

### 9.1 Upload Screenshot Berhasil

- [ ] Pilih file JPEG/PNG/WebP ≤ 5MB → upload berjalan
- [ ] Screenshot baru muncul di gallery
- [ ] Screenshot tampil di public page media gallery

### 9.2 Validasi File Type

- [ ] Coba upload file `.pdf` atau `.gif` → error file type tidak didukung

### 9.3 Validasi File Size

- [ ] Coba upload file gambar > 5MB → error file terlalu besar

### 9.4 Delete Screenshot

- [ ] Klik Delete pada screenshot → konfirmasi → screenshot hilang dari gallery dan public page

---

## 10. Full CRUD Flow (End-to-End)

- [ ] **Step 1:** Buka `/admin/projects/new?secret=Ardiansy4`
- [ ] **Step 2:** Isi form: Title="E2E Test Project", Short Desc="Test description", Tech Stack="Next.js", Status="active"
- [ ] **Step 3:** Submit → redirect ke project detail admin
- [ ] **Step 4:** Buka `/admin/projects/[new-id]/timeline?secret=Ardiansy4`
- [ ] **Step 5:** Klik "Add Entry" → isi: Type=milestone, Sprint=1, Title="First Milestone", Date=today
- [ ] **Step 6:** Submit → entry muncul di list
- [ ] **Step 7:** Buka `/projects/[new-id]` → verifikasi header, tab system, dan timeline tampil
- [ ] **Step 8:** Klik tab "Development Timeline" → verifikasi SprintNode layout tampil
- [ ] **Step 9:** Klik entry card → verifikasi navigasi ke `/projects/[id]/timeline/[entryId]`
- [ ] **Step 10:** Verifikasi PR Detail Page: back link, header, meta row tampil
- [ ] **Step 11:** Kembali ke admin → edit project title menjadi "E2E Test Project Updated"
- [ ] **Step 12:** Verifikasi perubahan tampil di public page
- [ ] **Step 13:** Delete timeline entry → verifikasi hilang dari public timeline
- [ ] **Step 14:** Delete project → verifikasi hilang dari project list

---

## Catatan Test

| No    | Temuan | Severity | Status |
| -------| --------| ----------| --------|
| ----- | ----   |          |        |

| **Hasil---- | ---han:** ⬜ Pass / ⬜ Partial / ⬜ Fail |
| -------------| ---------------------------------------|