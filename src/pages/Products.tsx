import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Scissors, Snowflake, Sprout, Truck } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { img, products } from '../data/site'

const steps = [
  { icon: Sprout, title: 'Selected & Grown', body: 'Varieties trialled for 18 months before they earn a place in our greenhouses.' },
  { icon: Scissors, title: 'Hand-Harvested', body: 'Cut at the perfect bud stage in the cool of the morning, graded by hand.' },
  { icon: Snowflake, title: 'Cold-Chained', body: 'Pre-cooled within the hour and held at a steady 2–4°C to lock in freshness.' },
  { icon: Truck, title: 'Shipped Fresh', body: 'On a plane within 24 hours, arriving at your market with days of vase life to spare.' },
]

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Our products"
        title="Flowers grown to perform"
        subtitle="From signature standard roses to delicate sprays, vivid alstroemeria and the fillers that finish every bouquet — explore a catalogue built for florists who demand consistency."
        image={img.heroRoses}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />

      {/* Catalogue */}
      <section className="py-24 lg:py-32">
        <div className="container-xl">
          <SectionHeading
            eyebrow="The catalogue"
            title="Four collections, one standard of quality"
            intro="Every stem is graded against strict criteria for head size, stem strength, colour and vase life before it leaves the farm."
          />

          <div className="mt-16 space-y-24">
            {products.map((p, i) => (
              <Reveal key={p.slug}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="group relative overflow-hidden rounded-[2rem]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-cream-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-moss-700 backdrop-blur">
                      {p.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="heading-display text-4xl text-moss-900">{p.name}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-moss-900/65">{p.blurb}</p>

                    <dl className="mt-8 grid grid-cols-3 gap-4">
                      {[
                        { k: 'Varieties', v: String(p.varieties) },
                        { k: 'Vase Life', v: p.vaseLife },
                        { k: 'Stem Length', v: p.stemLength },
                      ].map((spec) => (
                        <div key={spec.k} className="rounded-2xl bg-moss-50 p-4">
                          <dd className="heading-display text-2xl text-moss-700">{spec.v}</dd>
                          <dt className="mt-0.5 text-xs uppercase tracking-wide text-moss-900/50">
                            {spec.k}
                          </dt>
                        </div>
                      ))}
                    </dl>

                    <Link to="/contact" className="btn-primary mt-8">
                      Request Availability <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="container-xl">
          <SectionHeading
            align="center"
            eyebrow="From seed to vase"
            title="How we keep flowers fresher, longer"
          />
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((s, i) => (
              <motion.li key={s.title} variants={fadeUp} className="relative rounded-3xl bg-white p-8">
                <span className="absolute right-6 top-6 font-display text-5xl text-moss-100">
                  0{i + 1}
                </span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-moss-600 text-cream-50">
                  <s.icon size={26} />
                </span>
                <h3 className="heading-display mt-5 text-xl text-moss-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-moss-900/60">{s.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-moss-900 py-24 text-center">
        <div className="container-xl">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="heading-display text-4xl text-cream-50 sm:text-5xl">
              Need a tailored grower&apos;s programme?
            </h2>
            <p className="mt-5 text-lg text-cream-100/75">
              Talk to our commercial team about standing orders, mixed bouquets and bespoke
              colour packs for your season.
            </p>
            <Link to="/contact" className="btn-rose mt-8">
              Talk to Sales <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
