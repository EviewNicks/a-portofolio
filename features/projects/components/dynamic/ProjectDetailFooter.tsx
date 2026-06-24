import Link from 'next/link'

const email = 'diansyahardi139@gmail.com'
const github = 'https://github.com/EviewNicks'
const linkedin = 'https://www.linkedin.com/in/ardi-ansyah-421708325/'

export function ProjectDetailFooter() {
  return (
    <footer className="border-line border-t px-4 pt-16 pb-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 pb-16 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-editorial-tight text-ink mb-5 inline-flex items-center gap-3 text-lg font-bold tracking-[-0.01em]"
            >
              <span className="border-ink font-editorial-serif inline-flex h-10 w-10 items-center justify-center rounded-full border text-base italic">
                A
              </span>
              Ardiansyah
            </Link>
            <p className="font-editorial-body text-ink-mute max-w-sm text-sm leading-relaxed">
              Precision AI & Web solutions. Engineering the essential — from
              deep AI research to production-grade web systems.
            </p>
          </div>

          <FooterColumn
            title="Studio"
            links={[
              { label: 'About', href: '/' },
              { label: 'Capabilities', href: '/#capabilities' },
              { label: 'Labs', href: '/projects' },
              { label: 'Method', href: '/projects' },
            ]}
          />

          <FooterColumn
            title="Work"
            links={[
              { label: 'All projects', href: '/projects' },
              { label: 'AI / Research', href: '/projects' },
              { label: 'Web / System', href: '/projects' },
            ]}
          />

          <FooterColumn
            title="Connect"
            links={[
              { label: 'Email', href: `mailto:${email}` },
              { label: 'LinkedIn', href: linkedin },
              { label: 'GitHub', href: github },
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              { label: 'Resume', href: '/' },
              { label: 'PDF Portfolio', href: '/projects' },
              { label: 'Blog', href: '/' },
            ]}
          />
        </div>

        <div className="border-line font-editorial-tight text-ink-faint flex flex-col gap-4 border-t pt-6 text-[0.68rem] tracking-[0.16em] uppercase sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <span
              className="editorial-pulse bg-coral inline-block h-1.5 w-1.5 rounded-full p-0"
              aria-hidden="true"
            />
            © MMXXVI Ardiansyah. Engineering the Essential.
          </span>
          <span className="inline-flex flex-wrap gap-6">
            <span>Apache-2.0</span>
            <span>v1.0.0</span>
          </span>
        </div>

        <div className="border-line mt-16 overflow-hidden border-t pt-10 pb-3">
          <div className="font-editorial-tight text-ink text-[12rem] leading-[1.05] font-black tracking-[-0.04em] whitespace-nowrap">
            <em className="font-editorial-serif text-coral font-medium italic">
              Ardiansyah
            </em>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<{ label: string; href: string }>
}) {
  return (
    <div>
      <h5 className="font-editorial-tight text-ink mb-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase">
        {title}
      </h5>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={`${title}-${index}-${link.href}`}>
            <Link
              href={link.href}
              className="font-editorial-body text-ink-soft hover:text-coral focus-visible:ring-coral/40 text-sm transition-colors focus:outline-none focus-visible:ring-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
