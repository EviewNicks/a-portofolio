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