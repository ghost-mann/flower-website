import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Send } from 'lucide-react'
import Reveal from './Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail('')
  }

  return (
    <section className="relative overflow-hidden bg-rose-50 py-24">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-moss-200/50 blur-3xl" />

      <div className="container-xl relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center text-rose-600">
              <span className="h-px w-8 bg-current" />
              Stay in bloom
              <span className="h-px w-8 bg-current" />
            </span>
            <h2 className="heading-display mt-4 text-4xl text-moss-900 sm:text-5xl">
              Seasonal varieties, farm stories &amp; fresh availability
            </h2>
            <p className="mt-5 text-lg text-moss-900/65">
              Join our florist newsletter for new variety launches, market updates and a peek
              behind the greenhouse doors.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@florist.com"
                className="w-full rounded-full border border-moss-200 bg-white/80 px-6 py-3.5 text-sm text-moss-900 outline-none transition focus:border-moss-400 focus:ring-2 focus:ring-moss-300/50"
              />
              <button type="submit" className="btn-primary shrink-0">
                {done ? (
                  <>
                    <Check size={16} /> Subscribed
                  </>
                ) : (
                  <>
                    Subscribe <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {done && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm font-medium text-moss-600"
            >
              Thank you — please check your inbox to confirm.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
