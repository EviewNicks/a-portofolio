# Rencana Adopsi Desain Create Project

## Tujuan

Mengadopsi arah visual dan UX dari `.open-design/create-project.html` ke halaman Create/Edit Project admin tanpa mengubah alur API yang sudah ada. Fokus utama adalah membuat form terasa seperti editorial project editor, bukan form admin generik.

## Cakupan implementasi

### 1. Halaman New/Edit Project

- Tambahkan breadcrumb: Home → Projects → New Project / Edit Project.
- Tambahkan header editorial dengan label `Admin / Project`, headline, lead text, tombol back, dan CTA ke form.
- Tambahkan brief panel berisi required fields.
- Gunakan layout dua kolom: form utama + inspector kanan.
- Sesuaikan copy untuk mode create dan edit.

### 2. AdminProjectForm

- Ubah form menjadi section-based:
  - Basic information
  - Long description
  - Technical details
- Tambahkan inspector kanan:
  - project preview
  - status badge
  - completeness progress
  - action buttons
- Tambahkan validation per field, bukan hanya global error.
- Tambahkan field helper text dan required indicator.
- Tambahkan markdown preview sederhana untuk long description.
- Tambahkan status segmented control sesuai design.
- Tambahkan char counter untuk short description dan long description.
- Tambahkan error recovery dengan anchor ke section/field yang bermasalah.
- Pertahankan backward compatibility test IDs utama.

## Batasan karena data model saat ini

- `DynamicProject.status` masih hanya `active | maintenance | archived`, sehingga segmented status dibuat sesuai model saat ini.
- Media upload belum diimplementasi karena `ProjectMedia` dan API project media belum terhubung ke create/update project flow.
- GitHub URL tetap optional mengikuti model saat ini, tetapi helper text menjelaskan bahwa URL akan digunakan sebagai repository link.
- Long description dan tech stack tetap optional secara API, tetapi completeness akan mendorong user mengisinya agar project story lebih lengkap.

## Validasi

- Pastikan TypeScript compile tanpa error.
- Pastikan route create/edit masih bisa membuka form.
- Pastikan submit create/edit tetap mengirim payload yang sama.
- Pastikan test IDs utama tetap ada untuk compatibility.
