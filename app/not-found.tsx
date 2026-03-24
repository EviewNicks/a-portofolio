import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#EAE0CF] flex items-center justify-center px-4">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[rgba(234,88,12,0.06)] blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[rgba(217,119,6,0.05)] blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Glass card */}
        <div
          className="rounded-2xl p-10 md:p-14"
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 4px 24px rgba(33, 52, 72, 0.08)',
          }}
        >
          {/* 404 number */}
          <p
            className="text-[7rem] md:text-[9rem] font-bold leading-none select-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </p>

          {/* Divider */}
          <div className="w-16 h-0.5 mx-auto my-4 rounded-full bg-linear-to-r from-[#ea580c] to-[#d97706]" />

          {/* Heading */}
          <h1
            className="text-2xl md:text-3xl font-semibold text-[#1a2938] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Page Not Found
          </h1>

          {/* Description */}
          <p
            className="text-[#475569] text-base mb-8 leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)',
                boxShadow: '0 2px 12px rgba(234, 88, 12, 0.25)',
              }}
            >
              ← Back to Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium text-[#ea580c] border border-[#ea580c]/30 bg-white/60 transition-all duration-200 hover:bg-white/90 hover:-translate-y-0.5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
