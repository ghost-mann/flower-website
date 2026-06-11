import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { company, navItems, products } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-moss-950 text-cream-100">
      {/* glow accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-moss-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-rose-700/10 blur-3xl" />

      <div className="container-xl relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-moss-600 text-cream-50">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                <circle cx="16" cy="16" r="13" fillOpacity="0.15" />
                <circle cx="16" cy="16" r="4" fill="#c79a48" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold">Karen</span>
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-gold-400">
                Roses
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/70">
            A family-run farm growing premium cut flowers in the Kenyan highlands since{' '}
            {company.founded} — cultivated sustainably and shipped fresh to florists worldwide.
          </p>
          <div className="mt-6 flex gap-3">
            <Social href={company.social.instagram} label="Instagram">
              <InstagramIcon />
            </Social>
            <Social href={company.social.facebook} label="Facebook">
              <FacebookIcon />
            </Social>
            <Social href={company.social.linkedin} label="LinkedIn">
              <LinkedinIcon />
            </Social>
            <Social href={company.social.twitter} label="Twitter">
              <TwitterIcon />
            </Social>
          </div>
        </div>

        <FooterCol title="Explore">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="link-underline text-cream-100/70 hover:text-cream-50">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Our Flowers">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                to="/products"
                className="link-underline text-cream-100/70 hover:text-cream-50"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Get in Touch">
          <li className="flex items-start gap-3 text-cream-100/70">
            <MapPin size={17} className="mt-0.5 shrink-0 text-gold-400" />
            {company.address}
          </li>
          <li>
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-cream-100/70 hover:text-cream-50"
            >
              <Phone size={17} className="shrink-0 text-gold-400" />
              {company.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-3 text-cream-100/70 hover:text-cream-50"
            >
              <Mail size={17} className="shrink-0 text-gold-400" />
              {company.email}
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-xl flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-100/50 sm:flex-row">
          <p>
            © {company.founded}–2026 {company.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <span className="hover:text-cream-100/80">Privacy Policy</span>
            <span className="hover:text-cream-100/80">Terms of Trade</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
        {title}
      </h4>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  )
}

/* Brand glyphs — lucide-react v1 dropped trademarked logos, so we inline them. */
const ICON = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' } as const

function InstagramIcon() {
  return (
    <svg {...ICON} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.48-2.9a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg {...ICON} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg {...ICON} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg {...ICON} aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26L22.85 21.75h-6.66l-5.22-6.82-5.96 6.82H1.69l7.73-8.84L1.15 2.25H7.98l4.72 6.24 5.54-6.24Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z" />
    </svg>
  )
}

function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/15 text-cream-100/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-moss-950"
    >
      {children}
    </a>
  )
}
