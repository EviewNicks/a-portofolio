# 📄 Project Detail Page - Data & UI Reference

## 📍 Halaman: `/projects/[id]` (Project Detail Page)

Halaman ini menampilkan detail lengkap dari sebuah project. Visitor dapat melihat informasi komprehensif, galeri media, dan perkembangan project.

---

## 🎯 Struktur Halaman

Halaman ini terdiri dari beberapa bagian utama:

### 1️⃣ **Back Navigation**
- **Elemen**: Link text "← Back to Projects"
- **Fungsi**: Membawa user kembali ke halaman listing `/projects`
- **Posisi**: Top-left, sebelum main content

---

### 2️⃣ **Success Banner** (Opsional - Admin Only)
- **Tampil jika**: Admin baru saja membuat project baru
- **Isi**: Pesan sukses "Project created successfully"
- **Posisi**: Di bawah back link
- **Note**: Hanya admin yang melihat

---

### 3️⃣ **Admin Action Bar** (Opsional - Admin Only)
- **Tampil jika**: User adalah admin (login dengan secret key)
- **Tombol**:
  - Edit project
  - Delete project
- **Posisi**: Di bawah success banner (jika ada)
- **Note**: Hanya admin yang melihat

---

### 4️⃣ **Project Header**
Menampilkan informasi dasar project di paling atas.

**Konten:**
| Elemen | Deskripsi | Contoh |
|--------|-----------|---------|
| **Judul** | Nama project yang besar dan bold | "Maguru – Sistem Manajemen Penyewaan Pakaian" |
| **Deskripsi Singkat** | Penjelasan singkat project (1-2 baris) | "Maguru adalah full-stack web application berbasis Next.js 15 yang dirancang untuk mengelola bisnis penyewaan pakaian UMKM." |
| **Status Badge** | Warna-warni badge status project | "Active" (hijau), "In Progress" (biru), dll |
| **Created Date** | Tanggal project dibuat | "Created Mar 24, 2026" |

---

### 5️⃣ **GitHub Stats Panel** (Opsional)
Menampilkan statistik GitHub jika project punya repo.

**Konten:**
| Metrik | Deskripsi |
|--------|-----------|
| ⭐ **Stars** | Jumlah bintang di GitHub |
| 🔀 **Forks** | Jumlah fork repository |
| 📝 **Commits** | Jumlah total commit |
| 📊 **Repository Link** | Link ke GitHub repo |

**Note**: Panel ini tidak muncul jika:
- Project tidak punya GitHub repo
- GitHub API tidak accessible

---

### 6️⃣ **Media Gallery**
Galeri menampilkan semua media (gambar/video) project.

**Fitur:**
| Fitur | Deskripsi |
|-------|-----------|
| **Grid Display** | Thumbnail gambar ditampilkan dalam grid |
| **Lightbox/Modal** | Klik gambar → zoom/full screen view |
| **Video Support** | Video dari timeline juga ditampilkan |
| **Empty State** | Pesan "No media yet" jika belum ada upload |

---

### 7️⃣ **Tab Navigation Section** ⭐
Bagian paling penting - 3 tab untuk explore project details.

---

## 🗂️ **3 Tab Navigation**

### **Tab 1️⃣: Description** (Default Tab)

**Fungsi**: Menampilkan penjelasan lengkap project.

**Konten yang ditampilkan:**

| Elemen | Deskripsi | Contoh |
|--------|-----------|---------|
| **Status + Dates** | Status badge + tanggal dibuat + last sync | "Active" · Created Mar 24, 2026 · Last synced Mar 24, 2026 |
| **Tech Stack** | Daftar teknologi dalam bentuk tag/pill | Next.js, TypeScript, Tailwind, Supabase, Clerk, Jest, Playwright |
| **Repository Link** | Link ke GitHub repository | `https://github.com/EviewNicks/rental-baju →` |
| **About Section** | Deskripsi lengkap project (bisa markdown) | Penjelasan detail masalah yang diselesaikan, fitur, teknologi, hasil |

**Visual Hierarchy:**
```
Status Badge | Created Date | Last Sync Date
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tech Stack
[Next.js] [TypeScript] [Tailwind] [Supabase] ...

Repository
https://github.com/EviewNicks/rental-baju →

About
(Long markdown text dengan formatting)
```

---

### **Tab 2️⃣: Features**

**Fungsi**: Menampilkan daftar fitur-fitur project dengan detail.

**Konten yang ditampilkan:**

| Elemen | Deskripsi |
|--------|-----------|
| **Feature List** | Daftar semua fitur project |
| **Feature Counter** | Badge menunjukkan jumlah total fitur | 
| **Per Feature Info** | Untuk setiap fitur ditampilkan: |
| | - Nama fitur (Title) |
| | - Deskripsi singkat |
| | - Media preview (screenshot) |
| | - Status |
| **Empty State** | "No features added yet" jika kosong |

**Contoh Data Fitur:**
```
Feature 1: Role-Based Access Control
└─ Description: Three-tier access (Owner, Producer, Kasir)
└─ Media: Screenshot form login
└─ Status: Completed

Feature 2: Product Management
└─ Description: Manage product categories, colors, status
└─ Media: Screenshot dashboard produk
└─ Status: Completed

Feature 3: Payment Integration
└─ Description: Integrated payment gateway
└─ Media: Screenshot payment page
└─ Status: In Progress
```

---

### **Tab 3️⃣: Development Timeline**

**Fungsi**: Menampilkan progression/journey project dari awal hingga sekarang.

**Konten yang ditampilkan:**

| Elemen | Deskripsi |
|--------|-----------|
| **Timeline Entries** | Daftar semua milestone/event perkembangan |
| **Entry Counter** | Badge menunjukkan jumlah total entries |
| **Per Entry Info** | Untuk setiap entry ditampilkan: |
| | - Tanggal (Date) |
| | - Tipe entry (Sprint, PR, Release, dll) |
| | - Judul/Title |
| | - Deskripsi singkat |
| | - Link eksternal (jika ada) |
| | - GitHub PR info (jika PR) |
| | - Featured badge (jika disorot) |
| **Chronological Order** | Diurutkan dari yang terakhir ke terdahulu |
| **Empty State** | "No timeline entries yet" jika kosong |

**Contoh Data Timeline:**
```
Timeline Entry 1: Sprint 5 Completed
├─ Date: Mar 24, 2026
├─ Type: Sprint
├─ Title: Final Testing & Deployment
└─ Description: Completed E2E tests and deployed to production

Timeline Entry 2: PR Merged - Auth System
├─ Date: Mar 20, 2026
├─ Type: PR
├─ Title: Implement Clerk Role-based Auth
├─ GitHub PR: #45 by @developer
└─ Status: Merged

Timeline Entry 3: Sprint 4 Started
├─ Date: Mar 15, 2026
├─ Type: Sprint
├─ Title: Payment Integration
└─ Description: Integrating Stripe payment gateway
```

---

## 📊 **Data Structure Reference**

Berikut adalah struktur data yang ditampilkan di halaman:

```json
{
  "project": {
    "id": "UUID",
    "title": "string",
    "short_description": "string",
    "long_description": "string (markdown)",
    "tech_stack": ["string"],
    "status": "active | in-progress | completed | archived",
    "github_repo_url": "URL",
    "github_owner": "string",
    "github_repo": "string",
    "last_sync_at": "ISO date",
    "created_at": "ISO date",
    "updated_at": "ISO date"
  },
  "media": [
    {
      "id": "UUID",
      "file_name": "string",
      "storage_path": "string",
      "public_url": "URL to image/video"
    }
  ],
  "entries": [
    {
      "id": "UUID",
      "entry_type": "sprint | pr | release | milestone",
      "date": "ISO date",
      "title": "string",
      "description": "string",
      "is_featured": "boolean",
      "github_pr_number": "number (optional)",
      "github_pr_title": "string (optional)",
      "external_url": "URL (optional)"
    }
  ],
  "features": [
    {
      "id": "UUID",
      "title": "string",
      "description": "string",
      "media_preview": "URL (optional)",
      "status": "planned | in-progress | completed"
    }
  ]
}
```

---

## 🎨 **UI States & Interactions**

### **Loading States**
- Gallery media loading → Skeleton shimmer
- Tab content loading → Spinner atau skeleton
- GitHub stats loading → Skeleton cards

### **Empty States**
- No media → "No media uploaded yet"
- No features → "No features added yet"
- No timeline → "No timeline entries yet"

### **Error Handling**
- Project not found → 404 page
- GitHub API error → Stats panel tidak ditampilkan (graceful degradation)
- Media load error → Placeholder image

---

## 🔐 **Admin-Only Features**

Admin (authenticated dengan secret key) mendapat akses tambahan:

| Feature | Deskripsi |
|---------|-----------|
| **Success Banner** | Notifikasi setelah create/edit project |
| **Admin Action Bar** | Tombol Edit & Delete project |
| **Edit Page** | Bisa mengubah project details |
| **Delete Function** | Bisa menghapus project |

---

## 📱 **Responsive Design**

- **Desktop (lg)**: 3-4 kolom gallery, full tabs
- **Tablet (md)**: 2 kolom gallery, stacked tabs jika perlu
- **Mobile (sm)**: 1 kolom gallery, tabs tetap horizontal dengan scroll

---

## ✨ **Example User Journey**

```
1. User masuk ke /projects
   ↓
2. Melihat grid project cards
   ↓
3. Klik card "Maguru"
   ↓
4. Masuk ke /projects/[id]
   ↓
5. Melihat Project Header + GitHub Stats
   ↓
6. Scroll down lihat Media Gallery
   ↓
7. Explore 3 Tabs:
   ├─ Tab "Description" → Baca info project
   ├─ Tab "Features" → Lihat fitur-fitur
   └─ Tab "Development Timeline" → Lihat progression
   ↓
8. Klik Back → Kembali ke /projects
```

---

## 🎯 **Key Points for UI/UX Designer**

✅ **Visual Hierarchy**: Header → Stats → Gallery → Tabs  
✅ **Clear Navigation**: Back link prominent, tab buttons jelas  
✅ **Empty States**: Semua bagian punya empty state message  
✅ **Responsive**: Works pada mobile, tablet, desktop  
✅ **Admin Features**: Hidden by default, visible untuk admin  
✅ **Loading Experience**: Skeleton screens untuk better UX  
✅ **Graceful Degradation**: GitHub stats tidak required  

---

example Data JSON 

{
    "data": {
        "id": "f242882b-7e20-4d03-816c-243a1f79d257",
        "title": "Maguru – Sistem Manajemen Penyewaan Pakaian",
        "short_description": "Maguru adalah full-stack web application berbasis Next.js 15 yang dirancang untuk mengelola bisnis penyewaan pakaian (rental baju) UMKM. Sistem ini menyediakan role-based access control (Owner, Producer, Kasir) dengan fitur manajemen produk, transaksi, pelanggan, dan pembayaran yang terintegrasi secara modern dan scalable.",
        "long_description": "Maguru merupakan proyek full-stack yang saya kembangkan sebagai solusi manajemen penyewaan pakaian untuk UMKM pada tahun 2025. Aplikasi ini dibangun dengan pendekatan feature-first modular monolith menggunakan Next.js 15, bertujuan menciptakan sistem yang efisien, aman, dan mudah dikembangkan lebih lanjut.\n\nMasalah yang diselesaikan\nBisnis rental baju UMKM sering menghadapi tantangan dalam mengelola stok produk, transaksi penyewaan, pelacakan status barang, serta pemisahan akses antar peran (pemilik, penanggung jawab produksi, dan kasir). Maguru menyelesaikan masalah tersebut dengan menyediakan sistem terintegrasi yang mendukung workflow operasional harian secara real-time dan aman.\n\nFitur utama\n- Role-based access control dengan tiga peran: Owner (full access), Producer (manajemen produk), dan Kasir (transaksi)\n- Manajemen produk lengkap (kategori, warna, status: Available, Rented, Maintenance)\n- Sistem transaksi penyewaan dengan manajemen penyewa, item sewa, pembayaran, dan audit trail aktivitas\n- Dashboard analitik bersama yang dapat diakses sesuai role\n- Autentikasi dan otorisasi berbasis Clerk dengan middleware protection\n- Upload file dan penyimpanan aset melalui Supabase Storage\n- Desain responsif dengan Tailwind CSS dan komponen modern\n\nTeknologi yang digunakan\nProject ini dibangun dengan arsitektur 3-tier (Presentation → Business Logic → Data Access) yang sangat terstruktur, didukung oleh testing komprehensif (unit, integration, E2E) dengan target coverage ≥80%.\nHasil / manfaat\nMaguru berhasil menghasilkan sistem manajemen rental yang modular, type-safe, dan siap produksi. Melalui project ini, saya mendemonstrasikan kemampuan dalam merancang arsitektur scalable, menerapkan role-based authorization yang aman, serta mengintegrasikan teknologi modern untuk mendukung operasional UMKM. Sistem ini juga mencakup best practices testing (TDD/BDD) dan error handling yang robust.",
        "tech_stack": [
            "Next.js",
            "typescript",
            "tailwind",
            "shadnc",
            "Prisma",
            "Supabase",
            "Clerk",
            "Jest",
            "Playwright",
            "Git & Github"
        ],
        "status": "active",
        "github_repo_url": "https://github.com/EviewNicks/rental-baju",
        "github_owner": "EviewNicks",
        "github_repo": "rental-baju",
        "last_sync_at": "2026-03-24T13:24:55.746Z",
        "created_at": "2026-03-24T13:02:05.202Z",
        "updated_at": "2026-03-24T13:24:55.746Z"
    }
}
