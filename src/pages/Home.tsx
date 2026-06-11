import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Leaf, Sprout } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import StatsBand from '../components/StatsBand'
import Newsletter from '../components/Newsletter'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { company, img, news, partners, products } from '../data/site'

const infoCards = [
  {
    title: 'About Us',
    body: 'A close-knit family business growing top-quality cut flowers since 1989.',
    image: img.aboutStory,
    to: '/about',
    icon: Sprout,
  },
  {
    title: 'Sustainability',
    body: 'Climate-smart farming on a clear path to net-zero emissions by 2050.',
    image: img.sustainability,
    to: '/sustainability',
    icon: Leaf,
  },
  {
    title: 'Accreditations',
    body: 'Fairtrade, MPS and KFC certified — ethics and quality you can trace.',
    image: img.accreditation,
    to: '/sustainability',
    icon: Award,
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Who We Are ─────────────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container-xl grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src={img.whoWeAre}
                alt="Hands tending to roses"
                className="aspect-[5/6] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden rounded-3xl bg-moss-600 p-7 text-cream-50 shadow-2xl shadow-moss-900/30 sm:block">
              <p className="heading-display text-5xl text-gold-400">35+</p>
              <p className="mt-1 max-w-[14ch] text-sm text-cream-100/80">
                years of growing the world&apos;s finest roses
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  A family farm where every stem is <em className="not-italic text-moss-500">grown with intention</em>
                </>
              }
              intro={`${company.name} is a professionally run, close-knit family business growing top-quality cut flowers in the Kenyan highlands since ${company.founded}. From a meticulous selection process to gentle hand-harvesting, we obsess over the details that make a flower last.`}
            />
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-4">
                {[
                  'Single-origin roses with exceptional colour and vase life',
                  'An unbroken cold chain from cut to cargo within 24 hours',
                  'Certified ethical and environmental standards at every step',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-moss-900/80">
                    <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-moss-100 text-moss-600">
                      <Leaf size={12} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary mt-9">
                Discover Our Story <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Info cards ─────────────────────────────── */}
      <section className="bg-cream-100 py-24">
        <div className="container-xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-3"
          >
            {infoCards.map((card) => (
              <motion.div key={card.title} variants={fadeUp}>
                <Link
                  to={card.to}
                  className="group relative block h-80 overflow-hidden rounded-3xl"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-moss-950/90 via-moss-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/15 text-gold-400 backdrop-blur">
                      <card.icon size={20} />
                    </span>
                    <h3 className="heading-display mt-4 text-2xl text-cream-50">{card.title}</h3>
                    <p className="mt-2 max-w-xs text-sm text-cream-100/75">{card.body}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                      Learn more
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ───────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container-xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our flowers"
              title={
                <>
                  Cultivated varieties for <br className="hidden sm:block" /> every arrangement
                </>
              }
            />
            <Reveal delay={0.1}>
              <Link to="/products" className="btn-ghost">
                View Full Catalogue <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bouquets CTA ───────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={img.bouquets} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-moss-950/70" />
        </div>
        <div className="container-xl relative py-28 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="eyebrow justify-center text-gold-400">
              <span className="h-px w-8 bg-current" />
              A home of bouquets
              <span className="h-px w-8 bg-current" />
            </span>
            <h2 className="heading-display mt-5 text-4xl text-cream-50 sm:text-6xl">
              Hand-tied bouquets, <span className="text-gradient-gold">made to order</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-cream-100/80">
              Tell us your colours, stems and volumes — our bouquet house assembles, sleeves and
              cold-chains them straight to your market.
            </p>
            <Link to="/contact" className="btn-rose mt-9">
              Order a Bouquet <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* ── Partners ───────────────────────────────── */}
      <section className="py-24">
        <div className="container-xl">
          <SectionHeading
            align="center"
            eyebrow="Corporate responsibility"
            title="Partners in ethical, sustainable trade"
            intro="We work hand-in-hand with foundations and certification bodies that hold us to the highest social and environmental standards."
          />
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {partners.map((p) => (
              <motion.li
                key={p.name}
                variants={fadeUp}
                className="rounded-2xl border border-moss-100 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-xl hover:shadow-moss-900/5"
              >
                <p className="font-display text-xl font-semibold text-moss-800">{p.name}</p>
                <p className="mt-1 text-xs text-moss-900/55">{p.note}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── News preview ───────────────────────────── */}
      <section className="bg-cream-100 py-24">
        <div className="container-xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="From the farm" title="Latest news & stories" />
            <Reveal delay={0.1}>
              <Link to="/news" className="btn-ghost">
                All News <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {news.slice(0, 3).map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeUp}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-moss-900/5 transition-shadow hover:shadow-xl hover:shadow-moss-900/10"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-rose-100 px-3 py-1 font-semibold text-rose-700">
                      {post.category}
                    </span>
                    <span className="text-moss-900/50">
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="heading-display mt-4 text-xl text-moss-900 transition-colors group-hover:text-moss-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-moss-900/60">{post.excerpt}</p>
                  <Link
                    to="/news"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-moss-600 hover:text-moss-800"
                  >
                    Read article
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
