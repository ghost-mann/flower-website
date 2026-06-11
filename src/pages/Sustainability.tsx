import { motion } from 'framer-motion'
import { Droplets, Recycle, Sun, Users, Sprout, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Newsletter from '../components/Newsletter'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { img, partners } from '../data/site'

const pillars = [
  { icon: Droplets, title: 'Water Stewardship', body: 'Rainwater harvesting and closed-loop drip irrigation recycle every drop, cutting fresh-water draw by over 80%.' },
  { icon: Sun, title: 'Renewable Energy', body: 'On-site solar arrays and energy-efficient cold stores power the farm with a fraction of the grid carbon.' },
  { icon: Recycle, title: 'Integrated Pest Mgmt', body: 'Beneficial insects and biological controls replace chemicals, protecting workers and pollinators alike.' },
  { icon: Users, title: 'Thriving Communities', body: 'Fair wages, on-site clinics, schooling and housing for the families at the heart of the farm.' },
  { icon: Sprout, title: 'Healthy Soils', body: 'Composting and cover-cropping rebuild organic matter, keeping our volcanic soils alive for generations.' },
  { icon: ShieldCheck, title: 'Traceable Ethics', body: 'Independent audits verify every social and environmental claim, from greenhouse to airport.' },
]

const roadmap = [
  { year: '2024', label: '100% renewable electricity on-site', done: true },
  { year: '2028', label: 'Zero waste to landfill across operations', done: false },
  { year: '2035', label: '50% absolute emissions reduction (vs. 2020)', done: false },
  { year: '2050', label: 'Net-zero across the full value chain', done: false },
]

export default function Sustainability() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Think green, act green"
        subtitle="Beautiful flowers should never cost the earth. Our sustainability programme weaves climate-smart farming, ethical employment and biodiversity into everything we grow."
        image={img.sustainability}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Sustainability' }]}
      />

      {/* Pillars */}
      <section className="py-24 lg:py-32">
        <div className="container-xl">
          <SectionHeading
            align="center"
            eyebrow="Our commitments"
            title="Six pillars of responsible growing"
            intro="A practical, measurable approach — not greenwashing. Each pillar carries targets we report against every year."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="group rounded-3xl border border-moss-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-moss-300 hover:shadow-xl hover:shadow-moss-900/5"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-moss-600 text-cream-50 transition-colors group-hover:bg-rose-500">
                  <p.icon size={26} />
                </span>
                <h3 className="heading-display mt-5 text-xl text-moss-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-moss-900/60">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="relative overflow-hidden bg-moss-950 py-24 text-cream-50 lg:py-32">
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-moss-600/20 blur-3xl" />
        <div className="container-xl relative grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              light
              eyebrow="Net-zero by 2050"
              title="Our roadmap to net-zero"
              intro="A staged, science-aligned plan with clear milestones — and the investment behind them to make it real."
            />
          </div>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {roadmap.map((r) => (
              <motion.li
                key={r.year}
                variants={fadeUp}
                className="flex items-center gap-5 rounded-2xl border border-cream-100/10 bg-cream-50/[0.03] p-5"
              >
                <span
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-xl ${
                    r.done ? 'bg-gold-500 text-moss-950' : 'bg-moss-800 text-gold-400'
                  }`}
                >
                  {r.year}
                </span>
                <div>
                  <p className="font-medium">{r.label}</p>
                  <p className={`mt-0.5 text-xs ${r.done ? 'text-gold-400' : 'text-cream-100/50'}`}>
                    {r.done ? '✓ Achieved' : 'In progress'}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <div className="container-xl">
          <SectionHeading
            align="center"
            eyebrow="Accreditations"
            title="Independently certified, end to end"
            intro="Our standards are verified by the world's most trusted certification bodies and foundations."
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
                className="rounded-2xl border border-moss-100 bg-cream-50 px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-moss-900/5"
              >
                <p className="font-display text-xl font-semibold text-moss-800">{p.name}</p>
                <p className="mt-1 text-xs text-moss-900/55">{p.note}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
