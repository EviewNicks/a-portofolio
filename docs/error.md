# Analisis UI/UX Update: Landing Page & Halaman About (Revisi)

Berdasarkan masukan Anda, berikut adalah rancangan analisis yang diperbarui untuk restrukturisasi halaman About dan implementasi Framer Motion:

---

## 1. Restrukturisasi Halaman & Konten About

### A. Landing Page (Manifesto Section)
* **File Target**: [AboutSection.tsx](file:///d:/2-Project/a-portofolio/features/about/components/AboutSection.tsx)
* **Konsep**: Menyajikan pesan utama (manifesto) yang bersih dan minimalis (Swiss Minimalism).
* **Perubahan**:
  * Mengambil gaya visual dari `index.html` (Baris 603-624).
  * **Manifesto**: *"In an era of technical noise, I build clarity."*
  * **Lead Paragraph**: Penjelasan singkat tentang integrasi AI Research & Web Engineering.
  * **Philosophy**: Diintegrasikan di sini sebagai landasan Manifesto.
  * **Navigasi**: Tombol utama *"Read full profile →"* mengarahkan user ke halaman baru `/about`.

### B. Halaman Baru `/about` (Profil Terperinci)
* **File Target**: [app/about/page.tsx](file:///d:/2-Project/a-portofolio/app/about/page.tsx)
* **Konsep**: Berfokus sepenuhnya tentang data pribadi Anda ("tentang saya"), menggunakan gaya visual (font, grid, border, layout editorial) dari `about.html` sebagai referensi gaya.
* **Elemen Konten yang Ditampilkan**:
  1. **Page Header / Hero**: Judul editorial *"The precision architect."* dengan detail lokasi/waktu saat ini.
  2. **Personal Information & Bio**: Biodata ringkas, lokasi, zona waktu, serta deskripsi naratif diri Anda.
  3. **Education & Achievements**: Menampilkan riwayat pendidikan formal beserta pencapaian/penghargaan terperinci dengan timeline bergaya minimalis.
  4. **Career Objectives**: Target dan arah karir profesional.
  5. **Interests**: Minat dan hobi pribadi dalam bentuk tag/pills yang interaktif.
* **Catatan Penting**: **TIDAK** menyertakan *Core Values / Tenets* dan *Skill Matrix* di halaman ini karena sudah dijelaskan secara lengkap di landing page.

---

## 2. Rencana Animasi Menggunakan Framer Motion

Untuk memberikan impresi premium dan dinamis pada halaman utama:

* **Text Reveal Animation**: Menggunakan staggered animation pada tajuk utama (*h1* dan *h2*) agar muncul kata-per-kata atau baris-per-baris secara halus menggunakan bezier curve `[0.22, 1, 0.36, 1]` (sesuai transisi CSS `[data-reveal]`).
* **Scroll-Triggered Reveal**: Mengimplementasikan wrapper component berbasis `framer-motion` (menggunakan `useInView` atau dynamic variant trigger) untuk menggantikan logika CSS `[data-reveal]` agar transisi lebih smooth dan andal di berbagai browser.
* **Interactive Hover Effects**:
  * Hover pada tombol/badge dengan sedikit scale dan transisi translate untuk panah.
  * Efek glassmorphism yang merespon posisi cursor (optional) atau pergantian opacity border yang lembut saat disentuh.
  * Micro-interaction pada stats counter (angka naik secara dinamis saat bagian statistik terscroll ke layar).
* **Parallax Background**: Pergerakan ambient glow circle di background secara asinkronus dan lambat untuk menambah kedalaman ruang (depth) tanpa memperlambat rendering halaman.
