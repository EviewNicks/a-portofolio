# Manual Test Checklist: Dynamic Project Management Timeline

**Feature:** Dynamic Project Management Timeline  
**Spec:** `.kiro/specs/dynamic-project-timeline`  
**Tanggal Test:** ___________  
**Tester:** Ardiansyah  
**Environment:** http://localhost:3000  
**Admin Secret:** `Ardiansy4` (via `?secret=Ardiansy4`)

---

## Persiapan

- [x] Aplikasi berjalan di `http://localhost:3000` (`npm run dev`)
- [x] Database Supabase aktif dan terhubung (cek `.env` — `DATABASE_URL`)
- [x] Minimal 1 project sudah ada di database (buat via admin jika belum)
- [x] Minimal 1 project punya timeline entries (buat via admin jika belum)
- [ ] Browser DevTools siap untuk cek network/console errors

---

## 1. Public — Project List Page (`/projects`)

### 1.1 Halaman Load

- [ ] Buka `http://localhost:3000/projects`
- [ ] Halaman tampil tanpa error di console
- [ ] Judul "Projects" terlihat di halaman
- [ ] Subtitle "A timeline of development work..." terlihat
- [ ] Grid project cards tampil (jika ada data)
- [ ] Loading skeleton tampil sebentar sebelum data muncul (Suspense)

### 1.2 Project Card — Konten

Untuk setiap project card yang tampil:
- [ ] Judul project tampil
- [ ] Status badge tampil (Active / Maintenance / Archived)
- [ ] Short description tampil
- [ ] Tech stack tags tampil (maks 4 tag, sisanya "+N")
- [ ] Sprint count tampil (misal: "2 Sprints")
- [ ] PR count tampil (misal: "5 PRs")
- [ ] Link "View Project →" tampil dan bisa diklik

### 1.3 Filter by Status

- [ ] Klik tombol "Active" → hanya project berstatus `active` yang tampil
- [ ] URL berubah: `?status=active`
- [ ] Klik tombol "Maintenance" → hanya project berstatus `maintenance` yang tampil
- [ ] Klik tombol "Archived" → hanya project berstatus `archived` yang tampil
- [ ] Klik tombol "All" → semua project tampil kembali, URL bersih

### 1.4 Search / Filter by Query

- [ ] Ketik kata kunci di search box (misal: nama project atau tech stack)
- [ ] URL berubah: `?query=<kata_kunci>`
- [ ] Hanya project yang judulnya atau tech_stack-nya mengandung kata kunci tampil
- [ ] Search tidak case-sensitive (coba huruf kecil semua)
- [ ] Hapus search → semua project tampil kembali

### 1.5 Kombinasi Filter

- [ ] Set status filter + search bersamaan
- [ ] URL mengandung kedua params: `?status=active&query=next`
- [ ] Hasil sesuai kedua filter

### 1.6 Empty State

- [ ] Set search dengan kata yang tidak ada (misal: `xyzabc999`)
- [ ] Pesan "No projects found." tampil
- [ ] Pesan "Try adjusting your filters." tampil
- [ ] Tidak ada error di console

### 1.7 Navigasi ke Detail

- [ ] Klik "View Project →" pada salah satu card
- [ ] Redirect ke `/projects/[id]` yang benar

---

## 2. Public — Project Detail Page (`/projects/[id]`)

### 2.1 Halaman Load

- [ ] Buka `/projects/[id]` dengan ID project yang valid
- [ ] Halaman tampil tanpa error
- [ ] Link "← Back to Projects" tampil di atas
- [ ] Klik "← Back to Projects" → kembali ke `/projects`

### 2.2 Project Header

- [ ] Judul project tampil besar di atas
- [ ] Status badge tampil (Active / Maintenance / Archived)
- [ ] Short description tampil
- [ ] Long description tampil (jika ada)
- [ ] Tech stack tags tampil semua
- [ ] Link ke GitHub repo tampil (jika project punya `github_repo_url`)
- [ ] Klik link GitHub → buka tab baru ke repo yang benar

### 2.3 GitHub Stats Panel

Jika project punya GitHub repo yang valid:
- [ ] Section GitHub stats tampil
- [ ] Stars count tampil
- [ ] Forks count tampil
- [ ] Contributors count tampil
- [ ] Last commit date tampil
- [ ] Timestamp "last fetched" tampil

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
- [ ] Section media tidak tampil atau tampil empty state

### 2.5 Timeline Section

- [ ] Heading "Development Timeline" tampil
- [ ] Sprint cards tampil dikelompokkan per sprint number (ascending)
- [ ] Setiap sprint card menampilkan: "Sprint N" dan jumlah entries

### 2.6 Sprint Card — Konten

Untuk setiap sprint card:
- [ ] Header sprint tampil: "Sprint 1", "Sprint 2", dst.
- [ ] Jumlah entries tampil di kanan header (misal: "3 entries")
- [ ] Semua timeline entry cards tampil di dalam sprint

### 2.7 Timeline Entry Card — Konten

Untuk setiap entry card:
- [ ] Icon entry type tampil (🔗 PR, 🎯 Milestone, 📝 Blog, ▶️ Video, 🚀 Deploy, 📦 Release)
- [ ] Label type tampil (Pull Request, Milestone, dll.)
- [ ] Judul entry tampil
- [ ] Tanggal tampil (format: "Feb 15, 2026")
- [ ] Sprint number tampil (misal: "Sprint 1")
- [ ] Description tampil (jika ada)

### 2.8 Entry Type Spesifik

**PR entry:**
- [ ] PR status badge tampil (merged / open / closed) dengan warna yang sesuai
- [ ] Link "View PR →" tampil jika ada `external_url`
- [ ] Klik link → buka tab baru ke GitHub PR

**Video entry:**
- [ ] YouTube thumbnail tampil (jika ada `media_preview`)
- [ ] Link "Watch Video →" tampil
- [ ] Klik link → buka tab baru ke YouTube

**Featured entry:**
- [ ] Border dan background berbeda (highlight primary color)
- [ ] Badge "Featured" tampil

### 2.9 Empty Timeline

- [ ] Buka project yang tidak punya timeline entries
- [ ] Pesan "No timeline entries yet." tampil di dalam section timeline

### 2.10 404 Page

- [ ] Buka `/projects/id-yang-tidak-ada`
- [ ] Next.js 404 page tampil
- [ ] Tidak ada error 500

---

## 3. Admin — Authentication

### 3.1 Akses Valid

- [ ] Buka `http://localhost:3000/admin?secret=Ardiansy4`
- [ ] Admin dashboard tampil (bukan halaman unauthorized)
- [ ] Sidebar navigasi tampil

### 3.2 Akses Invalid

- [ ] Buka `http://localhost:3000/admin?secret=salah`
- [ ] Halaman unauthorized tampil
- [ ] Tidak ada hint tentang secret yang benar
- [ ] Tidak ada error 500

### 3.3 Akses Tanpa Secret

- [ ] Buka `http://localhost:3000/admin` (tanpa query param)
- [ ] Redirect ke halaman unauthorized atau 401

### 3.4 Secret Passthrough di Navigasi

- [ ] Di admin dashboard, klik link "Projects" di sidebar
- [ ] URL baru tetap mengandung `?secret=Ardiansy4`
- [ ] Halaman tujuan tampil (bukan unauthorized)

---

## 4. Admin — Project CRUD

### 4.1 Project List (`/admin/projects?secret=Ardiansy4`)

- [ ] Tabel semua projects tampil
- [ ] Kolom: Project (title + desc), Status, Last Sync, Actions
- [ ] Setiap row punya tombol: View (👁), Edit (✏️), Timeline (🌿), Delete (🗑)
- [ ] Tombol "New Project" tampil di atas

### 4.2 Create Project (`/admin/projects/new?secret=Ardiansy4`)

- [ ] Form tampil dengan field: Title, Short Description, Long Description, Tech Stack, GitHub URL, Status
- [ ] Isi semua field wajib (Title + Short Desc)
- [ ] Tambah tech stack: ketik nama tech → tekan Enter → tag muncul
- [ ] Hapus tech stack tag: klik X pada tag
- [ ] Isi GitHub URL: `https://github.com/owner/repo`
- [ ] Pilih status dari dropdown
- [ ] Klik "Create Project"
- [ ] Loading state tampil: "Saving..."
- [ ] Redirect ke `/admin/projects/[new-id]?secret=Ardiansy4`
- [ ] Project baru tampil di halaman detail

**Validasi:**
- [ ] Submit form dengan Title kosong → error "Title and short description are required."
- [ ] Submit form dengan Short Desc kosong → error yang sama
- [ ] Klik "Cancel" → kembali ke halaman sebelumnya

### 4.3 Edit Project (`/admin/projects/[id]/edit?secret=Ardiansy4`)

- [ ] Form tampil dengan data project yang sudah ada (pre-filled)
- [ ] Ubah title → klik "Save Changes"
- [ ] Redirect ke `/admin/projects/[id]?secret=Ardiansy4`
- [ ] Perubahan tersimpan dan tampil

### 4.4 Delete Project

- [ ] Di project list, klik tombol Delete (🗑) pada salah satu project
- [ ] Modal konfirmasi muncul: "Delete Project?"
- [ ] Klik "Cancel" → modal tutup, project tidak terhapus
- [ ] Klik "Delete" → loading state "Deleting..."
- [ ] Project hilang dari list
- [ ] Semua timeline entries project tersebut juga terhapus (cascade)

---

## 5. Admin — Timeline Management (`/admin/projects/[id]/timeline?secret=Ardiansy4`)

### 5.1 Halaman Load

- [ ] Halaman tampil dengan daftar timeline entries project
- [ ] Jumlah entries tampil di header: "Timeline Entries (N)"
- [ ] Tombol "Add Entry" tampil

### 5.2 Add Timeline Entry

- [ ] Klik "Add Entry" → modal form muncul
- [ ] Form punya field: Type (dropdown), Sprint #, Date, Title, Description, External URL, Featured checkbox
- [ ] Pilih type "milestone"
- [ ] Isi Sprint # = 1
- [ ] Isi Date
- [ ] Isi Title = "Test Milestone"
- [ ] Klik "Save"
- [ ] Modal tutup
- [ ] Entry baru muncul di list

**Validasi:**
- [ ] Submit tanpa Title → error "Title is required."
- [ ] Submit dengan Sprint # = 0 → error "Sprint number must be ≥ 1."
- [ ] Klik "Cancel" → modal tutup tanpa menyimpan

### 5.3 Edit Timeline Entry

- [ ] Klik tombol Edit (✏️) pada salah satu entry
- [ ] Modal form muncul dengan data entry yang sudah ada (pre-filled)
- [ ] Ubah title → klik "Save"
- [ ] Entry di list terupdate

### 5.4 Delete Timeline Entry

- [ ] Klik tombol Delete (🗑) pada salah satu entry
- [ ] Modal konfirmasi muncul: "Delete Entry?"
- [ ] Klik "Cancel" → modal tutup, entry tidak terhapus
- [ ] Klik "Delete" → entry hilang dari list

### 5.5 Featured Entry

- [ ] Add entry baru dengan "Featured entry" checkbox dicentang
- [ ] Entry tersimpan
- [ ] Di public page `/projects/[id]`, entry tersebut tampil dengan highlight dan badge "Featured"

---

## 6. Admin — GitHub Sync

### 6.1 Sync Panel

- [ ] Di halaman `/admin/projects/[id]/timeline?secret=Ardiansy4`
- [ ] Panel "GitHub Sync" tampil (jika project punya `github_repo_url`)
- [ ] `last_sync_at` tampil (atau "Never synced" jika belum pernah)
- [ ] Tombol "Sync Now" tampil

### 6.2 Sync Berhasil

- [ ] Klik "Sync Now"
- [ ] Loading state tampil di tombol
- [ ] Setelah selesai: pesan sukses tampil (misal: "Synced 3 new PRs")
- [ ] `last_sync_at` terupdate
- [ ] PR entries baru muncul di timeline list

### 6.3 Sync Idempotent

- [ ] Klik "Sync Now" lagi (kedua kali)
- [ ] Pesan sukses tampil dengan "0 new PRs" (tidak ada duplikat)
- [ ] Jumlah entries di list tidak bertambah

### 6.4 Error Handling

- [ ] Jika GitHub token tidak valid atau rate limit: pesan error tampil
- [ ] Data yang sudah ada tidak berubah

---

## 7. Admin — YouTube Preview

### 7.1 Preview Panel

- [ ] Di halaman timeline management, panel YouTube Preview tampil
- [ ] Input URL tersedia
- [ ] Tombol "Preview" tersedia

### 7.2 Preview Valid

- [ ] Masukkan URL YouTube yang valid (misal: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
- [ ] Klik "Preview"
- [ ] Loading state tampil
- [ ] Preview card muncul: thumbnail, judul video, view count
- [ ] Tombol "Approve" dan "Reject" tampil

### 7.3 Approve Video

- [ ] Klik "Approve"
- [ ] Entry baru dengan type "video" muncul di timeline list
- [ ] Preview card hilang

### 7.4 Reject Video

- [ ] Masukkan URL YouTube lain → Preview
- [ ] Klik "Reject"
- [ ] Preview card hilang
- [ ] Tidak ada entry baru di timeline

### 7.5 URL Invalid

- [ ] Masukkan URL bukan YouTube (misal: `https://google.com`)
- [ ] Klik "Preview"
- [ ] Error tampil: validasi URL format
- [ ] Tidak ada API call ke YouTube

### 7.6 Video Not Found

- [ ] Masukkan URL YouTube dengan video ID yang tidak ada
- [ ] Klik "Preview"
- [ ] Error tampil: "Video tidak ditemukan"

---

## 8. Admin — Media Upload

### 8.1 Upload Panel

- [ ] Di halaman timeline management, panel Media Upload tampil
- [ ] File input tersedia
- [ ] Gallery screenshots tampil (jika sudah ada)

### 8.2 Upload Screenshot Berhasil

- [ ] Klik file input → pilih file JPEG/PNG/WebP ≤ 5MB
- [ ] Upload berjalan
- [ ] Screenshot baru muncul di gallery
- [ ] Screenshot juga tampil di public page `/projects/[id]` media gallery

### 8.3 Validasi File Type

- [ ] Coba upload file `.pdf` atau `.gif`
- [ ] Error tampil: file type tidak didukung
- [ ] File tidak terupload

### 8.4 Validasi File Size

- [ ] Coba upload file gambar > 5MB
- [ ] Error tampil: file terlalu besar
- [ ] File tidak terupload

### 8.5 Delete Screenshot

- [ ] Klik tombol Delete pada salah satu screenshot di gallery
- [ ] Konfirmasi muncul
- [ ] Klik konfirmasi → screenshot hilang dari gallery
- [ ] Screenshot juga hilang dari public page

---

## 9. Full CRUD Flow (End-to-End)

Ini adalah flow lengkap yang akan direplikasi oleh Playwright E2E test:

- [ ] **Step 1:** Buka `/admin/projects/new?secret=Ardiansy4`
- [ ] **Step 2:** Isi form: Title="E2E Test Project", Short Desc="Test description", Tech Stack="Next.js", Status="active"
- [ ] **Step 3:** Submit → redirect ke project detail admin
- [ ] **Step 4:** Buka `/admin/projects/[new-id]/timeline?secret=Ardiansy4`
- [ ] **Step 5:** Klik "Add Entry" → isi: Type=milestone, Sprint=1, Title="First Milestone", Date=today
- [ ] **Step 6:** Submit → entry muncul di list
- [ ] **Step 7:** Buka `/projects/[new-id]` (public page) → verifikasi project dan timeline tampil
- [ ] **Step 8:** Kembali ke admin → edit project title menjadi "E2E Test Project Updated"
- [ ] **Step 9:** Verifikasi perubahan tampil di public page
- [ ] **Step 10:** Delete timeline entry → verifikasi hilang dari public page
- [ ] **Step 11:** Delete project → verifikasi hilang dari project list

---

## Catatan Test

| No | Temuan | Severity | Status |
|----|--------|----------|--------|
|    |        |          |        |

**Hasil Keseluruhan:** ⬜ Pass / ⬜ Partial / ⬜ Fail
