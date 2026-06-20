import { ArrowRight, Mail } from 'lucide-react'

const contactEmail = 'diansyahardi139@gmail.com'

export function ProjectDetailCta() {
  return (
    <section aria-label="Start a conversation" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <span className="editorial-meta">Contact / Conversation</span>
          <span className="text-coral font-editorial-serif italic">Start a dialogue</span>
          <span className="editorial-meta">005 / 006</span>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-bone p-8 shadow-2xl sm:p-12 lg:p-20">
          <div className="grid gap-10 lg:items-end lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="editorial-label mb-8">
                Start a conversation
                <span className="ix">· Contact</span>
              </span>
              <h2 className="editorial-display max-w-4xl text-4xl leading-[1] sm:text-5xl lg:text-6xl">
                Let&apos;s build something <em>essential</em> and <em>precise</em>
                <span className="dot">.</span>
              </h2>
              <p className="editorial-lead mt-6 max-w-2xl">
                The future is not just AI. It is AI and web systems engineered with precision. Connect for a technical audit, collaboration, or project discussion.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-coral px-6 py-4 font-editorial-tight text-sm font-semibold text-white shadow-lg shadow-coral/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
              >
                Connect for audit
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-line bg-paper px-6 py-4 font-editorial-mono text-xs font-medium text-ink-soft transition-colors hover:border-coral hover:bg-coral/5 hover:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
              >
                <Mail size={14} aria-hidden="true" />
                {contactEmail}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-line pt-6 font-editorial-tight text-[0.68rem] uppercase tracking-[0.18em] text-ink-faint">
            <span className="font-semibold text-coral">Available for engagement</span>
            <span>MMXXVI</span>
            <span>AI · Web · Systems</span>
          </div>
        </div>
      </div>
    </section>
  )
}
