import { CalendarDays, Radio } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import WeatherDashboard from '../components/WeatherDashboard'
import EventsTable from '../components/EventsTable'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'
import { img } from '../data/site'

export default function FarmLive() {
  return (
    <>
      <PageHero
        eyebrow="Farm live"
        title="Live conditions & what's on"
        subtitle="Real-time growing weather straight from the highlands, plus every open day, trade fair and harvest on the Karen Roses calendar."
        image={img.greenhouse}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Farm Live' }]}
      />

      {/* Weather */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-moss-200/40 blur-3xl" />
        <div className="container-xl relative">
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-2">
                <Radio size={13} /> Live from the farm
              </span>
            }
            title="Growing weather, right now"
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

      {/* Events */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="container-xl">
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={13} /> Events calendar
              </span>
            }
            title="Upcoming & past events"
            intro="Trade fairs, greenhouse open days, grower workshops and harvest windows — filter the calendar to find your next visit."
          />
          <div className="mt-14">
            <EventsTable />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
