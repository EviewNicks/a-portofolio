import { headers } from 'next/headers';
import Link from 'next/link';
import { AdminCourseForm } from '@/features/certificates/components/AdminCourseForm';

interface NewCertificatePageProps {
  searchParams: Promise<{
    secret?: string;
  }>;
}

export default async function NewCertificatePage({ searchParams }: NewCertificatePageProps) {
  const headersList = await headers();
  const { secret: querySecret } = await searchParams;
  const secret = headersList.get('x-admin-secret') ?? querySecret ?? '';

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(251,146,60,0.08),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(96,165,250,0.06),transparent_32%)]" />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <div className="text-ink-faint mb-7 flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ fontFamily: 'var(--font-editorial-tight)' }}>
            <Link
              href={`/admin?secret=${encodeURIComponent(secret)}`}
              className="hover:text-coral transition-colors"
            >
              Home
            </Link>
            <span className="text-coral">·</span>
            <Link
              href={`/certificate?secret=${encodeURIComponent(secret)}`}
              className="hover:text-coral transition-colors"
            >
              Certificates
            </Link>
            <span className="text-coral">·</span>
            <span className="text-ink">New Course</span>
          </div>

          {/* Title Header */}
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start mb-12">
            <div>
              <div className="text-coral mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: 'var(--font-editorial-tight)' }}>
                <span className="bg-coral h-px w-5" />
                Admin / Certificate
                <span className="text-ink-faint font-medium">· New entry</span>
              </div>
              <h1 className="text-ink max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-editorial-tight)' }}>
                Register a new{' '}
                <em className="font-medium tracking-[-0.02em] italic text-ink" style={{ fontFamily: 'var(--font-editorial-serif)' }}>
                  learning milestone
                </em>
                <span className="text-coral">.</span>
              </h1>
              <p className="text-ink-soft mt-6 max-w-3xl text-sm leading-relaxed" style={{ fontFamily: 'var(--font-editorial-body)' }}>
                Record continuous progress or log a completed certification. Upload documentation images, log the organization, and specify verification URLs.
              </p>
            </div>
          </div>

          {/* Form */}
          <AdminCourseForm secret={secret} />
        </div>
      </section>
    </div>
  );
}
