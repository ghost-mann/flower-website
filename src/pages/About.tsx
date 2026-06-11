import { motion } from 'framer-motion'
import { Sprout, Leaf, HeartHandshake, Snowflake } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import StatsBand from '../components/StatsBand'
import Newsletter from '../components/Newsletter'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { company, img, values } from '../data/site'

const iconMap = { Sprout, Leaf, HeartHandshake, Snowflake }

const timeline = [
  { year: '1989', title: 'A family plants its first roses', body: 'The farm is founded on 12 hectares with a single greenhouse and a long-term vision.' },
  { year: '1998', title: 'First exports to Europe', body: 'Our roses reach Dutch auctions, earning a reputation for colour and stem strength.' },
  { year: '2008', title: 'Fairtrade certification', body: 'We commit formally to fair wages, worker welfare and community reinvestment.' },
  { year: '2016', title: 'Solar & rainwater at scale', body: 'Major investment in renewables and water harvesting cuts our footprint sharply.' },
  { year: '2026', title: '90 hectares, 100+ varieties', body: 'Today we ship millions of stems a year while protecting the land that grows them.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Three decades rooted in the highlands"
        subtitle={`Since ${company.founded}, ${company.name} has been a close-knit family business devoted to growing the finest cut flowers — sustainably, ethically and with relentless attention to detail.`}
        image={img.aboutStory}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="container-xl grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="From a single greenhouse to a world-class farm"
              intro="What began as a family's bet on the rich volcanic soils of the Rift Valley has grown into one of the region's most respected flower farms — yet the values have never changed."
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-moss-900/70 leading-relaxed">
                We still walk the rows every morning. We still hand-select every variety we trial.
                And we still measure success not just in stems shipped, but in the wellbeing of the
                people and the landscape that make it all possible. Our altitude of 2,000 metres,
                cool nights and bright equatorial days give our roses their signature depth of
                colour and exceptional vase life.
              </p>
            </Reveal>
          </div>
          <Reveal className="relative" delay={0.1}>
            <div className="overflow-hidden rounded-[2rem]">
              <img src={img.whoWeAre} alt="Tending roses" className="aspect-[5/6] w-full object-cover" />
            </div>
            <div className="absolute -left-5 -top-5 -z-10 h-40 w-40 rounded-3xl bg-rose-200" />
            <div className="absolute -bottom-5 -right-5 -z-10 h-48 w-48 rounded-3xl bg-moss-200" />
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-moss-950 py-24 text-cream-50 lg:py-32">
        <div className="container-xl">
          <SectionHeading align="center" light eyebrow="Our journey" title="Milestones along the way" />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-[1.15rem] top-0 h-full w-px bg-cream-100/15 md:left-1/2" />
            <motion.ol
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-10"
            >
              {timeline.map((t, i) => (
                <motion.li
                  key={t.year}
                  variants={fadeUp}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <span
                    className={`absolute top-1.5 grid h-9 w-9 place-items-center rounded-full bg-gold-500 text-xs font-bold text-moss-950 left-0 ${
                      i % 2 === 0 ? 'md:-right-[1.15rem] md:left-auto' : 'md:-left-[1.15rem]'
                    }`}
                  >
                    {String(i + 1)}
                  </span>
                  <p className="font-display text-3xl text-gold-400">{t.year}</p>
                  <h3 className="mt-1 text-xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-cream-100/65">{t.body}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="container-xl">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="The values in every bloom"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => {
              const Icon = iconMap[v.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="rounded-3xl border border-moss-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-moss-900/5"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-moss-50 text-moss-600">
                    <Icon size={26} />
                  </span>
                  <h3 className="heading-display mt-5 text-xl text-moss-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-moss-900/60">{v.body}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <StatsBand />
      <Newsletter />
    </>
  )
}
