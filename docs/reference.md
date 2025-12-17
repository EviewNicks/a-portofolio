├── app/                # Routing, layout, halaman utama (Next.js App Router)
│   ├── api/            # API Routes (backend logic)
│   └── ...             # Halaman (page.tsx), layout, dsb
├── features/           # Modular Feature (per fitur utama)
│   └── [feature]/      # Contoh: manage-product, auth, kasir
│       ├── components/ # Komponen UI
│       ├── hooks/      # Custom hooks (state, logic)
│       ├── api.ts      # API client/fetcher untuk fitur ini
│       ├── types.ts    # TypeScript types untuk fitur ini
├── prisma/             # Skema database & seed
├── component/          # compoennt install seperti shadcn dan reactbits 
├── public/             # Static files (gambar, dsb)
├── lib/                # Utilitas global
├── styles/             # CSS/SCSS/Tailwind config
└── ...                 # Config, test, dsb




## 6. Contoh Modularisasi Fitur

```
features/
  manage-product/
    components/
      ProductList.tsx
      ProductForm.tsx
    hooks/
      useProduct.ts
    api.ts
    types.ts
  kasir/
    components/
      RentalForm.tsx
      RentalTable.tsx
    hooks/
      useRental.ts
    api.ts
    types.ts
```