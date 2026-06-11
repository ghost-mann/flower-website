import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '../data/site'

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-moss-900 py-20 text-cream-50">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute -left-10 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-cream-50" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full border border-cream-50" />
      </div>
      <div className="container-xl relative">
        <p className="eyebrow mb-12 justify-center text-center text-gold-400">
          <span className="h-px w-8 bg-current" />
          Karen Roses by the numbers
          <span className="h-px w-8 bg-current" />
        </p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} index={i} />
          ))}
        </dl>
      </div>
    </section>
  )
}

function Stat({
  value,
  suffix,
  label,
  index,
}: {
  value: string
  suffix?: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const target = Number(value)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return
    let raf = 0
    const duration = 1500
    let start = 0
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="text-center"
    >
      <dd className="heading-display text-5xl text-gold-400 sm:text-6xl">
        {Number.isNaN(target) ? value : display.toLocaleString()}
        {suffix && <span className="text-3xl">{suffix}</span>}
      </dd>
      <dt className="mx-auto mt-3 max-w-[12ch] text-sm leading-snug text-cream-100/70">
        {label}
      </dt>
    </motion.div>
  )
}
