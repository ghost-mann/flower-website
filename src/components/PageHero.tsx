import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; to?: string }

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  image: string
  crumbs: Crumb[]
}

export default function PageHero({ eyebrow, title, subtitle, image, crumbs }: Props) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-28">
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover animate-ken-burns"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-950/55 to-moss-950/25" />
      </div>

      <div className="container-xl relative pb-16">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-1.5 text-sm text-cream-100/70"
        >
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="hover:text-cream-50">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gold-400">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <ChevronRight size={14} className="opacity-50" />}
            </span>
          ))}
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="eyebrow text-gold-400"
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="heading-display mt-4 max-w-4xl text-5xl text-cream-50 sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-100/80"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
