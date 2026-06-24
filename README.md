<div align="center">

# 🚀 AI Engineer Portfolio

**A modern, dynamic portfolio website with interactive animations and GitHub integration**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

A modern, feature-rich **portfolio website** developed by **Ardiansyah**, a Computer Science student at **Universitas Negeri Makassar (UNM)**, specializing in AI Engineering and Full-Stack Development.

This project serves as a **professional showcase** of technical skills, academic projects, and development journey through an interactive web platform built with **Next.js 16**, **React 19**, and **TypeScript**. It features sophisticated project management capabilities, GitHub integration, and stunning visual effects.

**Created to**:

- 🎯 Showcase technical expertise and project portfolio
- 💼 Connect with potential employers and collaborators
- 📚 Document learning progress and achievements
- 🚀 Demonstrate proficiency in modern web technologies

Beyond a simple portfolio, this website includes advanced features like dynamic project timelines with sprint tracking, automated GitHub PR synchronization, admin dashboard for content management, and 3D animations—reflecting a commitment to building production-quality applications.

---

## 👨‍💻 About The Developer

**Ardiansyah** | Computer Science Student  
📍 Makassar, Indonesia  
🎓 Universitas Negeri Makassar (UNM)  
💼 Specialization: AI Engineering & Full-Stack Development

**Connect with me:**

- 🌐 Portfolio: [Live Demo](https://ardia-portfolio.netlify.app)
- 🐙 GitHub: [@yourusername](https://github.com/Eviewnicks)
- 💼 LinkedIn: [Your Name](https://linkedin.com/in/ardiansyah)
- 📧 Email: diansyahardi139@example.com

---

## 🏆 Project Highlights

| Metric            | Value                                |
| -------------------| --------------------------------------|
| **Tech Stack**    | 20+ Modern Technologies              |
| **Code Quality**  | ESLint + Prettier + TypeScript       |
| **Testing**       | Jest (Unit) + Playwright (E2E)       |
| **Performance**   | Optimized with Next.js 16 App Router |
| **Accessibility** | WCAG Compliant                       |
| **Animations**    | Framer Motion + GSAP + Three.js      |
| **Database**      | PostgreSQL + Prisma ORM              |
| **Deployment**    | Vercel with CI/CD                    |

### ✨ Key Features

- 🎨 **Interactive UI** - Glassmorphism effects, parallax scrolling, and 3D animations
- 📊 **Dynamic Project Timeline** - Sprint-based project tracking with visual timelines
- 🔄 **GitHub Integration** - Auto-sync merged PRs to project timelines
- 🎯 **Admin Dashboard** - Full CRUD operations for projects and timeline entries
- 🌓 **Dark/Light Mode** - Seamless theme switching with next-themes
- 📱 **Fully Responsive** - Optimized for all device sizes
- ♿ **Accessible** - WCAG compliant with keyboard navigation support
- 🧪 **Well Tested** - Unit tests (Jest) and E2E tests (Playwright)

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **3D Graphics**: [Three.js](https://threejs.org/), [OGL](https://github.com/oframe/ogl)

### Backend & Database

- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Supabase)
- **ORM**: [Prisma 6](https://www.prisma.io/)
- **Auth & Storage**: [Supabase](https://supabase.com/)

### Testing & Quality

- **Unit Testing**: [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Property-Based Testing**: [fast-check](https://fast-check.dev/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm** or **bun**
- **PostgreSQL** database (or Supabase account)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd a-portofolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

   # Admin Authentication
   ADMIN_SECRET="your-admin-secret-key"

   # GitHub (Optional - for PR sync)
   GITHUB_TOKEN="your-github-personal-access-token"
   ```

4. **Setup database**

   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed database
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run app
   # or
   yarn app
   # or
   pnpm app
   # or
   bun app
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command                   | Description                         |
| ------------------------- | ----------------------------------- |
| `npm run app`             | Start development server            |
| `npm run build`           | Build for production                |
| `npm start`               | Start production server             |
| `npm run lint`            | Run ESLint (max warnings: 0)        |
| `npm run lint:fix`        | Auto-fix linting issues             |
| `npm run type-check`      | Run TypeScript type checking        |
| `npm test`                | Run all tests                       |
| `npm run test:watch`      | Run tests in watch mode             |
| `npm run test:unit`       | Run unit tests for projects feature |
| `npm run test:unit:all`   | Run all unit tests                  |
| `npm run test:e2e`        | Run E2E tests with Playwright       |
| `npm run test:e2e:ui`     | Run E2E tests with UI mode          |
| `npm run test:e2e:report` | Show E2E test report                |

---

## 📁 Project Structure

```
a-portofolio/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin dashboard pages
│   ├── api/                 # API routes
│   ├── projects/            # Public project pages
│   └── page.tsx             # Homepage
├── features/                # Feature-based modules
│   ├── hero/               # Hero section
│   ├── about/              # About section
│   ├── skills/             # Skills section
│   ├── projects/           # Projects feature
│   ├── experience/         # Experience section
│   └── contact/            # Contact section
├── components/             # Shared components
│   ├── layout/            # Layout components
│   └── ui/                # UI primitives
├── lib/                   # Utilities & helpers
│   ├── supabase/         # Supabase client & queries
│   └── types/            # TypeScript types
├── prisma/               # Database schema
│   └── schema.prisma    # Prisma schema definition
├── docs/                # Documentation & data
│   └── data/           # JSON content files
├── public/             # Static assets
└── generated/          # Generated files (Prisma client)
```

---

## 🎯 Core Features

### 1. **Portfolio Sections**

- **Hero Section** - Animated introduction with parallax effects
- **About Section** - Personal info, education, values, and statistics
- **Skills Section** - Technical skills showcase
- **Projects Section** - Filterable project showcase with categories
- **Experience Section** - Professional timeline
- **Contact Section** - Contact information and links

### 2. **Project Management System**

- Create, read, update, delete projects
- Rich project details (title, description, tech stack, status)
- GitHub repository linking
- Project media gallery
- Timeline entries with multiple types:
  - Pull Requests
  - Milestones
  - Blog Posts
  - Videos
  - Deployments
  - Releases

### 3. **GitHub Integration**

- Automatic PR synchronization
- Extract PR metadata (title, description, author)
- Auto-create timeline entries from merged PRs
- Featured PR detection via labels
- Track last sync timestamp

### 4. **Admin Dashboard**

- Secure admin authentication
- Project CRUD operations
- Timeline entry management
- Media upload and management
- Sprint-based organization

---

## 🔌 API Routes

### Projects

- `GET /api/projects` - Fetch all projects (supports `?query=` and `?status=`)
- `POST /api/projects` - Create new project (requires admin auth)
- `GET /api/projects/[id]` - Get project by ID
- `PUT /api/projects/[id]` - Update project (requires admin auth)
- `DELETE /api/projects/[id]` - Delete project (requires admin auth)

### Timeline

- `GET /api/projects/[id]/timeline` - Get project timeline entries
- `POST /api/projects/[id]/timeline` - Create timeline entry (requires admin auth)
- `PUT /api/projects/[id]/timeline/[entryId]` - Update entry (requires admin auth)
- `DELETE /api/projects/[id]/timeline/[entryId]` - Delete entry (requires admin auth)

### GitHub Integration

- `POST /api/github/sync` - Sync GitHub PRs to timeline (requires admin auth)

### Media

- `GET /api/media` - List project media
- `POST /api/media/upload` - Upload media file (requires admin auth)
- `GET /api/media/[id]` - Get media by ID
- `DELETE /api/media/[id]` - Delete media (requires admin auth)

**Authentication**: Admin endpoints require `x-admin-secret` header or `?secret=` query parameter.

---

## 🧪 Testing

### Run Unit Tests

```bash
npm test                    # Run all tests
npm run test:unit          # Test projects feature
npm run test:unit:all      # Test all features
npm run test:watch         # Watch mode
```

### Run E2E Tests

```bash
npm run test:e2e           # Run Playwright tests
npm run test:e2e:ui        # Run with UI mode
npm run test:e2e:report    # View test report
```

---

## 🎨 Design System

- **Colors**: AI-themed gradient palette
- **Typography**: Geist font family (optimized with next/font)
- **Effects**: Glassmorphism, backdrop blur, parallax
- **Animations**: Framer Motion, GSAP, CSS animations
- **3D Elements**: Three.js neural networks and particles

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Supabase](https://supabase.com/) - Backend as a Service
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

<div align="center">

**Built with ❤️ using Next.js and TypeScript**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>
