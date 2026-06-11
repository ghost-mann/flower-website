import { CalendarDays, Radio } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import WeatherDashboard from '../components/WeatherDashboard'
import EventsTable from '../components/EventsTable'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'
import { img } from '../data/site'

export default function FarmEvents() {
  return (
    <>
      <PageHero
        eyebrow="Farm events"
        title="The floral demand calendar"
        subtitle="Every global event we grow for — Valentine's, the world's Mother's Days, religious holidays and more — with the flower-pick and shipping windows that get the right colours to each market, right on time."
        image={img.greenhouse}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Farm Events' }]}
      />

      {/* Events calendar (primary) */}
      <section className="py-24 lg:py-32">
        <div className="container-xl">
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={13} /> Planning calendar
              </span>
            }
            title="Events: upcoming, in production & completed"
            intro="Filter the calendar to see what's coming up, what's being picked and shipped right now, and what we've already delivered this season."
          />
          <div className="mt-14">
            <EventsTable />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xs text-moss-900/40">
              Source: Karen Roses Events Planning Calendar · windows shown are flower-pick and
              shipping dates per target market.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Current growing conditions */}
      <section className="relative overflow-hidden bg-cream-100 py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-moss-200/40 blur-3xl" />
        <div className="container-xl relative">
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-2">
                <Radio size={13} /> Live from the farm
              </span>
            }
            title="Current growing conditions"
            intro="Our roses thrive on cool highland nights and bright equatorial days. Here's exactly what the farm is experiencing today — powered by live meteorological data."
          />
          <div className="mt-14">
            <WeatherDashboard />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 text-center text-xs text-moss-900/40">
              Weather data by Open-Meteo · refreshed live on load
            </p>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
