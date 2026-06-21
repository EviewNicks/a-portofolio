# Evaluasi Flow System Feature

## 1. YouTube URL dan Demo URL

### Pemahaman flow
`YouTube URL` dan `Demo URL` saat ini dianggap sebagai sumber/demo yang sama.

Flow yang diinginkan:

1. Admin mengupload video cara kerja feature ke YouTube.
2. Link YouTube tersebut dipakai sebagai demo feature.
3. Di web public, link tersebut ditampilkan sebagai demo/walkthrough feature.

Dengan demikian, secara UX admin tidak perlu mengisi dua field yang berbeda untuk hal yang sama.

### Evaluasi kondisi sekarang
Saat ini form masih memiliki dua field:

- `Live demo URL` → payload `demo_url`
- `YouTube URL` → payload `youtube_url`

Padahal jika demo yang ditampilkan adalah video YouTube, maka kedua field ini redundant.

### Rekomendasi
Pilih salah satu pendekatan:

#### Opsi A — Direkomendasikan
Hapus field `Live demo URL` dari form feature.

Yang tersisa:

```txt
YouTube demo URL
```

Payload tetap dikirim sebagai:

```ts
youtube_url
```

Di public page, field `youtube_url` dipakai untuk embed YouTube dan juga dianggap sebagai demo link.

#### Opsi B — Kompatibel
Tetap simpan `demo_url` di backend, tetapi form hanya punya satu field.

Saat save:

```ts
youtube_url = input.youtubeDemoUrl
demo_url = input.youtubeDemoUrl
```

Namun opsi ini masih menyimpan duplikasi data, jadi kurang ideal.

### Kesimpulan
Untuk flow saat ini, sebaiknya:

```txt
Demo = YouTube video walkthrough
```

Jadi field admin cukup satu: **YouTube Demo URL**.

---

## 2. Tech Stack di Feature Form

### Pemahaman flow
Tech stack seharusnya tidak perlu ditambahkan lagi di level feature, karena tech stack sudah ada di project detail.

Artinya:

```txt
Project = punya tech_stack global
Feature = fokus ke problem, cara kerja, hasil, media, dan narrative
```

### Evaluasi kondisi sekarang
Saat ini form masih punya field:

```txt
Tech stack chips
```

Payload yang dikirim:

```ts
tech_stack
```

Schema Prisma juga masih punya field di `ProjectFeature`:

```prisma
tech_stack String[] @default([])
```

### Rekomendasi
Untuk feature showcase, tech stack sebaiknya dihapus dari flow admin feature.

Yang perlu dihapus/dinonaktifkan:

- UI chip input tech stack di `FeatureForm.tsx`
- State `techStack` di `FeatureForm.tsx`
- Payload `tech_stack` ke API
- Validasi `tech_stack`
- Field `tech_stack` dari form docs
- Jika memang tidak dipakai sama sekali, hapus juga dari schema `ProjectFeature`

### Catatan penting
Jika menghapus `tech_stack` dari schema, perlu dipertimbangkan:

- migration database
- query yang masih membaca `tech_stack`
- response type `ProjectFeature`
- seed/test data
- komponen public yang mungkin masih menampilkan tech stack feature

### Kesimpulan
Secara konsep, tech stack di feature form sebaiknya dihilangkan agar tidak duplikat dengan project detail.

---

## 3. Short Description di Schema Prisma

### Pemahaman flow
Feature perlu punya `short_description` tersendiri.

Fungsinya:

- ringkasan singkat untuk card/listing
- ringkasan di bagian atas feature detail
- teks yang lebih terkontrol dibanding Markdown implementation note
- panjang dibatasi maksimal `200` karakter

### Evaluasi kondisi sekarang
Schema `ProjectFeature` saat ini:

```prisma
model ProjectFeature {
  id            String   @id @default(dbgenerated("gen_random_uuid()::text"))
  project_id    String
  title         String   @db.VarChar(200)
  description   String?  @db.Text
  youtube_url   String?  @db.VarChar(2048)
  tech_stack    String[] @default([])
  display_order Int      @default(0)
  is_featured   Boolean  @default(false)
  demo_url      String?  @db.VarChar(2048)
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
}
```

Saat ini `description` dipakai sebagai text utama/Markdown note, sehingga tidak ideal jika juga dijadikan short description.

### Rekomendasi schema
Tambahkan field:

```prisma
short_description String? @db.VarChar(200)
```

Jika ingin aman untuk existing data dan migration:

```prisma
short_description String? @db.VarChar(200)
```

Jika ingin wajib diisi di level schema:

```prisma
short_description String @db.VarChar(200) @default("")
```

Rekomendasi paling aman:

```prisma
short_description String? @db.VarChar(200)
```

Lalu validasi admin memastikan field ini wajib diisi saat create/update.

### Rekomendasi form
Form admin sebaiknya punya field khusus:

```txt
Short description
Max 200 characters
```

Lalu field terpisah:

```txt
Markdown implementation notes
```

Jadi pemisahan datanya menjadi:

| Field | Fungsi |
|---|---|
| `short_description` | Ringkasan singkat untuk card/detail header, max 200 karakter |
| `description` | Markdown implementation notes |
| `youtube_url` | Link YouTube demo/walkthrough |
| `demo_url` | Sebaiknya dihapus atau disamakan dengan `youtube_url` |
| `tech_stack` | Sebaiknya dihapus dari feature karena sudah ada di project |

### Kesimpulan
Schema perlu menambahkan `short_description` dengan batas `200` karakter agar form, database, dan public display punya model data yang lebih jelas.

---

# Ringkasan Keputusan Evaluasi

1. `YouTube URL` dan `Demo URL` adalah konsep yang sama dalam flow ini.
   - Sebaiknya form hanya punya satu field: `YouTube Demo URL`.
   - Public page memakai `youtube_url` sebagai demo/walkthrough.

2. Tech stack tidak perlu ada di feature form.
   - Tech stack sudah ada di project detail.
   - Feature form sebaiknya fokus ke narrative, short description, YouTube demo, media, dan implementation notes.

3. Schema `ProjectFeature` perlu menambahkan `short_description`.
   - Batas ideal: `@db.VarChar(200)`.
   - Form admin wajib menampilkan char counter.
   - `description` sebaiknya dikembalikan sebagai Markdown implementation notes, bukan short description.
