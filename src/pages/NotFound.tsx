import { Link } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-moss-950 px-6 text-center text-cream-50">
      <div>
        <p className="heading-display text-8xl text-gold-400 sm:text-9xl">404</p>
        <h1 className="heading-display mt-4 text-3xl">This page has wilted</h1>
        <p className="mx-auto mt-3 max-w-md text-cream-100/65">
          The page you&apos;re looking for can&apos;t be found. Let&apos;s get you back to fresher
          blooms.
        </p>
        <Link to="/" className="btn-rose mt-8">
          <HomeIcon size={16} /> Back to Home
        </Link>
      </div>
    </section>
  )
}
