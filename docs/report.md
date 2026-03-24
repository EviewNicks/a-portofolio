# Admin Dashboard UI Improvement Plan

## Scope
Perbaikan UI pada `app/admin/layout.tsx` dan `app/admin/page.tsx`.

## Changes

### 1. Sidebar — Collapsible Icon-Only (semua ukuran layar)
- Ganti implementasi manual dengan shadcn `Sheet` untuk overlay mobile
- Desktop: sidebar collapsible antara full (w-64) dan icon-only (w-16)
- Bubble toggle button (floating, pojok kiri atas) untuk buka/tutup di semua ukuran
- State collapse persist via `localStorage`
- Ganti semua warna hardcode (`gray-950`, `gray-900`) ke CSS variables (`bg-background`, `bg-sidebar`, dll)

### 2. Light/Dark Mode
- Hapus hardcode dark colors dari `AdminLayout`
- Gunakan CSS variables yang sudah ada di `globals.css`
- Tambah theme toggle button di topbar admin (reuse pattern dari `ProjectsNavbar.tsx`)
- Ikut global `ThemeProvider` yang sudah ada di `app/layout.tsx`

### 3. Recent Projects → Project Cards
- Buat `AdminProjectCard` component baru di `features/admin/components/`
- Reuse styling dari `DynamicProjectCard` tapi dengan dua action:
  - Klik card → `/admin/projects/[id]?secret=...` (admin detail)
  - Link "View Project →" → `/projects/[id]` (public detail, buka tab baru)
- Fetch `sprintCount` dan `prCount` per project di `app/admin/page.tsx`
- Tampilkan max 5 project terbaru dalam grid cards

## Files to Modify
- `features/admin/components/AdminLayout.tsx`
- `app/admin/page.tsx`

## Files to Create
- `features/admin/components/AdminProjectCard.tsx`
