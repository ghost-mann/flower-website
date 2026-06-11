import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { company, navItems } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Solid bar when scrolled, on mobile menu, or on any non-home page.
  const solid = scrolled || open || !isHome

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-cream-50/90 backdrop-blur-md shadow-sm shadow-moss-900/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-xl flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={company.name}>
          <span
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-500 ${
              solid ? 'bg-moss-600 text-cream-50' : 'bg-cream-50/15 text-cream-50 backdrop-blur'
            }`}
          >
            <FlowerMark />
          </span>
          <span className="leading-tight">
            <span
              className={`block font-display text-xl font-semibold tracking-tight transition-colors duration-500 ${
                solid ? 'text-moss-800' : 'text-cream-50'
              }`}
            >
              Karen
            </span>
            <span
              className={`block text-[0.62rem] font-semibold uppercase tracking-[0.35em] transition-colors duration-500 ${
                solid ? 'text-gold-600' : 'text-gold-400'
              }`}
            >
              Roses
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `link-underline text-sm font-medium tracking-wide transition-colors duration-300 ${
                    solid
                      ? isActive
                        ? 'text-moss-700 after:w-full'
                        : 'text-moss-900/70 hover:text-moss-700'
                      : isActive
                        ? 'text-cream-50 after:w-full'
                        : 'text-cream-50/80 hover:text-cream-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className={`hidden items-center gap-2 text-sm font-semibold transition-colors duration-300 xl:flex ${
              solid ? 'text-moss-700 hover:text-moss-900' : 'text-cream-50 hover:text-gold-400'
            }`}
          >
            <Phone size={16} />
            {company.phone}
          </a>
          <Link to="/contact" className="btn-rose hidden sm:inline-flex">
            Order Flowers
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden ${
              solid ? 'text-moss-800 hover:bg-moss-100' : 'text-cream-50 hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-xl flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 font-display text-2xl transition-colors ${
                        isActive ? 'bg-moss-100 text-moss-800' : 'text-moss-900/80 hover:bg-moss-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <Link to="/contact" className="btn-rose w-full">
                  Order Flowers
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function FlowerMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden>
      <g fill="currentColor">
        <ellipse cx="16" cy="7" rx="3" ry="5" />
        <ellipse cx="16" cy="25" rx="3" ry="5" />
        <ellipse cx="7" cy="16" rx="5" ry="3" />
        <ellipse cx="25" cy="16" rx="5" ry="3" />
        <ellipse cx="9.6" cy="9.6" rx="3" ry="5" transform="rotate(45 9.6 9.6)" />
        <ellipse cx="22.4" cy="22.4" rx="3" ry="5" transform="rotate(45 22.4 22.4)" />
        <ellipse cx="22.4" cy="9.6" rx="3" ry="5" transform="rotate(-45 22.4 9.6)" />
        <ellipse cx="9.6" cy="22.4" rx="3" ry="5" transform="rotate(-45 9.6 22.4)" />
      </g>
      <circle cx="16" cy="16" r="3.2" fill="#c79a48" />
    </svg>
  )
}
