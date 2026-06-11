import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'
import { fadeUp, stagger } from '../lib/motion'
import { img, news } from '../data/site'

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function News() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(news.map((n) => n.category)))],
    [],
  )
  const [active, setActive] = useState('All')

  const [featured, ...rest] = news
  const filtered = active === 'All' ? rest : rest.filter((n) => n.category === active)

  return (
    <>
      <PageHero
        eyebrow="News & stories"
        title="From the greenhouse, to you"
        subtitle="Variety launches, sustainability updates, community milestones and the occasional behind-the-scenes look at life on the farm."
        image={img.heroBouquet}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'News' }]}
      />

      {/* Featured */}
      <section className="py-24">
        <div className="container-xl">
          <Reveal>
            <article className="group grid overflow-hidden rounded-[2rem] bg-moss-950 lg:grid-cols-2">
              <div className="aspect-[16/11] overflow-hidden lg:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-9 text-cream-50 lg:p-14">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-rose-500 px-3 py-1 font-semibold text-white">
                    {featured.category}
                  </span>
                  <span className="text-cream-100/60">Featured</span>
                </div>
                <h2 className="heading-display mt-5 text-3xl sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-cream-100/70">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-5 text-sm text-cream-100/60">
                  <span>{fmt(featured.date)}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {featured.readMins} min read
                  </span>
                </div>
                <button className="btn-rose mt-8 self-start">
                  Read the story <ArrowRight size={16} />
                </button>
              </div>
            </article>
          </Reveal>

          {/* Filters */}
          <div className="mt-16 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  active === c
                    ? 'bg-moss-600 text-cream-50'
                    : 'border border-moss-200 text-moss-700 hover:border-moss-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            key={active}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeUp}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-moss-900/5 transition-shadow hover:shadow-xl hover:shadow-moss-900/10"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-rose-100 px-3 py-1 font-semibold text-rose-700">
                      {post.category}
                    </span>
                    <span className="text-moss-900/50">{fmt(post.date)}</span>
                  </div>
                  <h3 className="heading-display mt-4 text-xl text-moss-900 transition-colors group-hover:text-moss-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-moss-900/60">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-moss-900/50">
                      <Clock size={13} /> {post.readMins} min read
                    </span>
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-moss-600 hover:text-moss-800">
                      Read
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-moss-900/50">No articles in this category yet.</p>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
