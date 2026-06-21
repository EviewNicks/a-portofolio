# 📚 Learning Progress & Certifications - Data & UI Reference

## 📍 Component: `LearningProgress` 
**Lokasi:** `features/skills/components/LearningProgress.tsx`  
**Parent Component:** `SkillsSection` → Skills Page

Component ini menampilkan dua bagian utama:
1. **Currently Learning** - Kursus/materi yang sedang dikerjakan dengan progress indicator
2. **Certifications** - Sertifikat profesional yang telah diraih dengan visual display

---

## 🎯 Struktur Komponen

### **Layout Overview**

```
┌─ LearningProgress Component ─────────────────────────────┐
│                                                          │
│ 📖 CURRENTLY LEARNING SECTION (jika ada data)          │
│ ├─ Header: "Currently Learning"                        │
│ │  └─ Subtitle: "Skills and technologies I'm..."      │
│ │                                                      │
│ └─ Grid Layout (Responsive):                           │
│    ├─ [LearningCard] [LearningCard] [LearningCard]    │
│    └─ (Mobile: 1 col | Tablet: 2 col | Desktop: 3 col)│
│                                                        │
│ 🎓 CERTIFICATIONS SECTION (jika ada data)             │
│ ├─ Header: "Certifications"                           │
│ │  └─ Subtitle: "Professional certifications..."      │
│ │                                                     │
│ └─ Grid Layout (Responsive):                          │
│    ├─ [CertCard] [CertCard] [CertCard]               │
│    └─ (Mobile: 1 col | Tablet: 2 col | Desktop: 3 col)│
│                                                        │
└──────────────────────────────────────────────────────────┘
```

---

## 📦 **Section 1: Currently Learning Cards**

### **Learning Card Anatomy**

Setiap card menampilkan informasi satu item pembelajaran dengan visual progress indicator.

```
╔════════════════════════════════════════╗
║ Learning Item Card                     ║
╠════════════════════════════════════════╣
║                                        ║
║  📌 The AI Engineer Course 2025  ┌──┐ ║
║     [UDEMY] Badge                │06│ ║  ← Badges & Status
║                                  │25│ ║
║                                  └──┘ ║
║                                        ║
║  📊 Progress                      40%  ║
║  ████████░░░░░░░░░░░░░░░░░░░░░░░░░   ║  ← Progress Bar
║                                        ║
║  Complete AI Engineer bootcamp to      ║
║  enhance practical AI development      ║  ← Description
║  skills and master modern AI tools     ║
║                                        ║
║  ─────────────────────────────────────  ║
║  🔗 View Course                        ║  ← Call to Action
║                                        ║
╚════════════════════════════════════════╝
```

---

### **Learning Card - Data Fields & UI Display**

| Field | Tipe Data | Contoh | Fungsi UI | Wajib? |
|-------|-----------|--------|-----------|--------|
| **name** | String | "The AI Engineer Course 2025" | Judul card, bold dan besar | ✅ |
| **platform** | String (Optional) | "Udemy", "Coursera", "YouTube" | Badge dengan background warna di sebelah kanan judul | ⚠️ |
| **target_date** | String (YYYY-MM) | "2025-06" | Status badge di top-right, format "Jun 2025" | ✅ |
| **progress** | Number (0-100) | 40 | Ditampilkan sebagai persentase teks + progress bar animated | ✅ |
| **reason** | String (Markdown) | "Complete AI Engineer bootcamp to enhance..." | Deskripsi pembelajaran dalam paragraph | ✅ |
| **url** | String (URL, Optional) | "https://www.udemy.com/course/..." | Tombol "View Course" dengan link external | ⚠️ |

---

### **Learning Card - Visual Details**

#### **1. Header Section**
```
┌─ NAME & PLATFORM BADGES ─────────────────┐
│                                           │
│  Judul Kursus (text-xl, font-bold)       │
│  [PLATFORM BADGE]                        │
│                                           │
│                         [TARGET DATE]    │
│                                           │
└───────────────────────────────────────────┘
```

**Field Details:**

| Element | Tampilan | Kondisi |
|---------|----------|---------|
| **Judul (name)** | 20px font, bold, color: foreground | Always |
| **Platform Badge** | Inline pill dengan background primary/10, text primary | Jika `platform` ada |
| **Target Date** | Format: "Jun 2025" (short month + year) | Always |
| **Date Status Color** | 🔴 Merah jika tanggal sudah lewat (overdue) | Overdue check: `targetDate < today()` |
| | 🔵 Biru jika masih on-track (belum lewat) | On-track check: `targetDate >= today()` |

---

#### **2. Progress Section**
```
┌─ PROGRESS INDICATOR ──────────────┐
│                                   │
│  Progress              40%        │
│  ████████░░░░░░░░░░░░░░░░░░░░░  │  ← Color depends on overdue status
│                                   │
└───────────────────────────────────┘
```

**Field Details:**

| Element | Tampilan | Kondisi |
|---------|----------|---------|
| **Label** | "Progress" (muted gray text) | Always |
| **Percentage** | "40%" (large, bold, right-aligned) | Always |
| **Progress Bar** | Animated fill dari 0 ke progress value | Always |
| **Bar Color** | 🔴 Red (#ef4444) jika overdue | Jika overdue |
| | 🔵 Blue (#3b82f6) jika on-track | Jika on-track |
| **Bar Animation** | Smooth fill animation | On page load + hover |

---

#### **3. Description Section**
```
┌─ REASON / MOTIVATION ────────────────────┐
│                                          │
│  Complete AI Engineer bootcamp to        │
│  enhance practical AI development        │
│  skills and master modern AI tools       │
│  using industry-standard frameworks      │
│                                          │
└──────────────────────────────────────────┘
```

**Field Details:**

| Element | Tampilan | Kondisi |
|---------|----------|---------|
| **Text** | Paragraph dengan muted foreground color, normal weight | Always |
| **Line Height** | Relaxed spacing untuk readability | Always |
| **Truncate** | Tidak ada truncate, full text ditampilkan | Always |

---

#### **4. Footer Section (Optional)**
```
┌─ CALL TO ACTION ─────────────────┐
│                                  │
│  ─ Separator Line ─              │  ← Hanya jika ada URL
│                                  │
│  🔗 View Course →                │
│     (text-primary, hover underline)
│                                  │
└──────────────────────────────────┘
```

**Field Details:**

| Element | Tampilan | Kondisi |
|---------|----------|---------|
| **Separator** | Thin border-top, subtle opacity | Jika `url` ada |
| **Link Text** | "View Course" dengan inline icon | Jika `url` ada |
| **Link Style** | text-primary, hover berubah lighter | Jika `url` ada |
| **Link Behavior** | Opens URL di tab baru (target="_blank") | Jika `url` ada |

---

### **Learning Card - States & Interactions**

| State | Visual Change | Trigger |
|-------|---------------|---------|
| **Default** | Normal shadow, scale 1.0 | Initial render |
| **Hover** | Scale naik 1.02, shadow lebih prominent | Mouse hover |
| **On-Track** | Progress bar biru (#3b82f6) | `target_date >= today()` |
| **Overdue** | Progress bar & date badge merah (#ef4444) | `target_date < today()` |

---

## 🎓 **Section 2: Certification Cards**

### **Certification Card Anatomy**

Setiap card menampilkan satu sertifikat dengan image dan detail informasi.

```
╔════════════════════════════════════════╗
║ Certification Card                     ║
╠════════════════════════════════════════╣
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │                                  │ ║
║  │     [Certificate Image]          │ ║  ← Image dengan aspect ratio
║  │     (hover: scale up)            │ ║
║  │                                  │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║  Belajar Dasar Visualisasi Data       ║
║                                        ║
║  dicoding          [✓ Completed]      ║  ← Org + Status Badge
║                                        ║
║  Certificate No: 98XW5K5L9PM3         ║
║  Issued: February 2023                ║  ← Metadata
║                                        ║
║  ─────────────────────────────────────  ║
║                                        ║
║  Materi yang dipelajari:               ║
║  Pendahuluan tentang visualisasi       ║
║  data, tools, dan best practices...    ║  ← Description (truncated)
║                                        ║
╚════════════════════════════════════════╝
```

---

### **Certification Card - Data Fields & UI Display**

| Field | Tipe Data | Contoh | Fungsi UI | Wajib? |
|-------|-----------|--------|-----------|--------|
| **name-license** | String | "Belajar Dasar Visualisasi Data" | Judul certificate bold, max 2 lines dengan ellipsis | ✅ |
| **organisasi** | String | "dicoding" | Nama organisasi penerbit sertifikat | ✅ |
| **tanggal-terbit** | String (DD/MM/YYYY) | "01/02/2023" | Dikonversi ke "February 2023" format | ✅ |
| **no** | String | "98XW5K5L9PM3" | Nomor unik sertifikat, monospace font | ✅ |
| **deksripsi** | String (Markdown) | "Materi yang dipelajari: ..." | Deskripsi konten pembelajaran, max 4 lines | ✅ |
| **media** | String (Path) | "images/certificate/visualise-data.png" | Gambar sertifikat dengan fallback placeholder | ✅ |

---



---

## 📊 **Data Structure & JSON Format**

### **Learning Item - JSON Structure**

```json
{
  "name": "The AI Engineer Course 2025",
  "progress": 40,
  "target_date": "2025-06",
  "reason": "Complete AI Engineer bootcamp to enhance practical AI development skills",
  "platform": "Udemy",
  "url": "https://www.udemy.com/course/the-ai-engineer-course-complete-ai-engineer-bootcamp/"
}
```

**Field Specifications:**

```
┌─ FIELD SPECIFICATIONS ──────────────────────────────────┐
│                                                         │
│ name: String                                            │
│   └─ Required, 1-100 chars                             │
│   └─ Tampil sebagai judul card                         │
│                                                         │
│ progress: Number (0-100)                               │
│   └─ Required, integer                                 │
│   └─ Tampil sebagai percentage + progress bar          │
│                                                         │
│ target_date: String (YYYY-MM format)                   │
│   └─ Required, format: "2025-06"                       │
│   └─ Digunakan untuk: status color logic + display     │
│   └─ Jika lewat hari ini → merah, else → biru         │
│                                                         │
│ reason: String                                          │
│   └─ Required, max 300 chars                           │
│   └─ Tampil sebagai description paragraph              │
│                                                         │
│ platform: String (Optional)                            │
│   └─ Optional, 1-50 chars                              │
│   └─ Contoh: "Udemy", "Coursera", "LinkedIn Learning" │
│   └─ Tampil sebagai badge di header                    │
│                                                         │
│ url: String (URL, Optional)                            │
│   └─ Optional, valid URL format                        │
│   └─ Jika ada → tampil tombol "View Course"            │
│   └─ Jika tidak ada → footer section tidak muncul      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### **Certification - JSON Structure**

```json
{
  "name-license": "Belajar Dasar Visualisasi Data",
  "organisasi": "dicoding",
  "tanggal-terbit": "01/02/2023",
  "no": "98XW5K5L9PM3",
  "deksripsi": "Materi yang dipelajari: Pendahuluan tentang visualisasi data...",
  "media": "images/certificate/visualise-data.png"
}
```

**Field Specifications:**

```
┌─ FIELD SPECIFICATIONS ──────────────────────────────────┐
│                                                         │
│ name-license: String                                    │
│   └─ Required, 1-150 chars                             │
│   └─ Tampil sebagai judul certificate (max 2 lines)   │
│                                                         │
│ organisasi: String                                      │
│   └─ Required, 1-50 chars                              │
│   └─ Contoh: "dicoding", "Udemy", "Google", "AWS"      │
│   └─ Tampil sebagai organization name di card          │
│                                                         │
│ tanggal-terbit: String (DD/MM/YYYY)                    │
│   └─ Required, format: "01/02/2023"                    │
│   └─ Dikonversi ke: "February 2023" untuk display      │
│   └─ Tampil di metadata section                        │
│                                                         │
│ no: String                                              │
│   └─ Required, unique certificate number               │
│   └─ Tampil dengan monospace font                      │
│   └─ Tampil di metadata section                        │
│                                                         │
│ deksripsi: String (Plain text atau Markdown)           │
│   └─ Required, max 500 chars                           │
│   └─ Tampil sebagai description (max 4 lines truncate) │
│                                                         │
│ media: String (Image path)                              │
│   └─ Required, path format: "images/certificate/..."   │
│   └─ Image ditampilkan di top card (400x300px)         │
│   └─ Jika path invalid → show fallback placeholder     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```


---

## 📝 **Example Data Sets**

### **Example 1: Learning Item (Complete)**

```json
{
  "name": "The AI Engineer Course 2025",
  "progress": 40,
  "target_date": "2025-06",
  "reason": "Complete AI Engineer bootcamp to enhance practical AI development skills and master modern AI frameworks",
  "platform": "Udemy",
  "url": "https://www.udemy.com/course/the-ai-engineer-course-complete-ai-engineer-bootcamp/"
}
```

**Visual Result:**
- Card menampilkan: Title + Udemy badge + "Jun 2025" status (blue)
- Progress bar: 40% filled dengan warna biru
- Description: Full text terlihat
- Footer: Tombol "View Course" muncul

---


---

## 🔄 **User Journey**

```
1. User masuk Skills section
   ↓
2. Lihat "Currently Learning" section
   └─ Card cards appear dengan stagger animation
   └─ Lihat progress bars, platform badges, target dates
   └─ Optional: Klik "View Course" → open di tab baru
   ↓
3. Scroll ke bawah
   ↓
4. Lihat "Certifications" section
   └─ Certification cards appear dengan stagger animation
   └─ Lihat gambar sertifikat, metadata, deskripsi
   ↓
5. Hover card:
   └─ Card scale up smoothly
   └─ Jika certificate image → image zoom sedikit
   ↓
6. Continue scroll → next section (footer, contact, dsb)
```

---

## 🎯 **Key Design Principles**

✅ **Visual Hierarchy** - Judul > Badge > Progress > Description  
✅ **Status Indicator** - Color (Blue/Red) untuk quick understanding  
✅ **Responsive** - Works perfect di mobile (1 col) → desktop (3 cols)  
✅ **Progressive Enhancement** - Platform badge & URL optional  
✅ **Graceful Degradation** - Image error → show placeholder  
✅ **Information Density** - Max truncation untuk card compactness  
✅ **Accessibility** - Alt text, ARIA labels, semantic HTML  
✅ **Micro Interactions** - Hover, animations, smooth transitions  

---

## 🚀 **Implementation Checklist for UI/UX Designer**

### **Learning Cards**
- [ ] Design card with gradient background (glassmorphism effect)
- [ ] Create progress bar (blue for on-track, red for overdue)
- [ ] Design platform badge (pill-shaped with primary color)
- [ ] Design target date status badge
- [ ] Create "View Course" button link style
- [ ] Define hover state (scale + shadow)
- [ ] Test responsive grid (1/2/3 columns)
- [ ] Check color contrast WCAG AA minimum

### **Certification Cards**
- [ ] Design card with image container (400x300px aspect)
- [ ] Create fallback placeholder for image error
- [ ] Design organization name + status badge layout
- [ ] Design certificate number metadata display
- [ ] Design date display (convert format)
- [ ] Create description truncation (4 lines max)
- [ ] Define image hover zoom effect
- [ ] Test responsive grid (1/2/3 columns)

### **General**
- [ ] Define animation timing & easing
- [ ] Set grid gaps & spacing
- [ ] Color palette: Primary, Red, Blue, Gray
- [ ] Font sizes & weights hierarchy
- [ ] Dark mode support (ensure contrast)
- [ ] Mobile touch targets (min 44x44px)

---

## 📚 **Related Files**

| File | Fungsi |
|------|--------|
| `features/skills/components/LearningProgress.tsx` | Main component code |
| `features/skills/components/ProgressBar.tsx` | Reusable progress bar component |
| `lib/types/portfolio.ts` | TypeScript interface definitions |
| `docs/data/skills-section.json` | Data source (learning items + certifications) |
| `features/skills/components/SkillsSection.tsx` | Parent component |

---

Dokumentasi ini lengkap untuk UI/UX Designer dalam merancang Learning Progress & Certifications section! 🎉
