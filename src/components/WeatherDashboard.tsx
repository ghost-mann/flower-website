import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets,
  Gauge,
  MapPin,
  RefreshCw,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from 'lucide-react'
import WeatherGlyph from './WeatherGlyph'
import {
  compassDirection,
  describeWeather,
  fallbackWeather,
  fetchWeather,
  FARM_LOCATION,
  type WeatherData,
} from '../lib/weather'

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: WeatherData; live: boolean }

const time = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const dayName = (iso: string, i: number) =>
  i === 0
    ? 'Today'
    : new Date(iso).toLocaleDateString('en-GB', { weekday: 'short' })

export default function WeatherDashboard() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [refreshing, setRefreshing] = useState(false)

  const load = () => {
    fetchWeather()
      .then((data) => setState({ status: 'ready', data, live: true }))
      .catch((err) => {
        // Network blocked / offline / timeout — show representative data
        // so the section still renders, flagged as non-live.
        console.warn('[weather] live feed unavailable, using fallback:', err?.message ?? err)
        setState({ status: 'ready', data: fallbackWeather(), live: false })
      })
      .finally(() => setRefreshing(false))
  }

  useEffect(() => {
    load()
  }, [])

  const refresh = () => {
    setRefreshing(true)
    load()
  }

  if (state.status === 'loading') return <WeatherSkeleton />

  const { current, daily, live } = { ...state.data, live: state.live }
  const meta = describeWeather(current.code, current.isDay)
  const today = daily[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      {/* ── Hero condition card ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${meta.gradient} p-px shadow-2xl shadow-moss-950/20`}
      >
        {/* animated conic sheen on the border */}
        <div className="pointer-events-none absolute inset-0 animate-spin opacity-0 transition-opacity duration-700 [animation-duration:6s] [background:conic-gradient(from_0deg,transparent,rgba(255,255,255,0.65),transparent_30%)] group-hover:opacity-100" />
        <div className={`relative h-full rounded-[2rem] bg-gradient-to-br ${meta.gradient} p-8 sm:p-10`}>
          {/* floating glow orbs */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex items-start justify-between text-white">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-medium text-white/80">
                <MapPin size={15} /> {FARM_LOCATION.label}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
                {live ? (
                  <>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    </span>
                    Live · updated {time(current.time)}
                  </>
                ) : (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.7rem] font-medium">
                    Sample data · live feed unavailable
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={refresh}
              aria-label="Refresh weather"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
            >
              <RefreshCw size={17} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="relative mt-6 flex items-center gap-6">
            <WeatherGlyph
              icon={meta.icon}
              size={104}
              className="shrink-0 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] animate-float-slow"
            />
            <div className="text-white">
              <div className="flex items-start font-display leading-none">
                <span className="text-7xl font-medium tabular-nums sm:text-8xl">
                  {current.temperature}
                </span>
                <span className="mt-2 text-3xl">°C</span>
              </div>
              <p className="mt-1 text-lg font-medium">{meta.label}</p>
              <p className="text-sm text-white/75">Feels like {current.apparent}°</p>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Thermometer, label: 'High / Low', value: `${today.tempMax}° / ${today.tempMin}°` },
              { icon: Sunrise, label: 'Sunrise', value: time(today.sunrise) },
              { icon: Sunset, label: 'Sunset', value: time(today.sunset) },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/10 p-3.5 text-white backdrop-blur-md ring-1 ring-white/15"
              >
                <s.icon size={18} className="text-white/80" />
                <p className="mt-2 text-sm font-semibold tabular-nums">{s.value}</p>
                <p className="text-[0.7rem] text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Live metric tiles ───────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <MetricTile
          icon={<Droplets size={22} />}
          label="Humidity"
          value={`${current.humidity}%`}
          accent="from-sky-400/20 to-cyan-400/10"
          bar={current.humidity}
        />
        <MetricTile
          icon={<Wind size={22} />}
          label="Wind"
          value={`${current.windSpeed} km/h`}
          sub={`${compassDirection(current.windDirection)} · ${current.windDirection}°`}
          accent="from-teal-400/20 to-emerald-400/10"
          bar={Math.min(current.windSpeed * 2, 100)}
        />
        <MetricTile
          icon={<Gauge size={22} />}
          label="Pressure"
          value={`${current.pressure}`}
          sub="hPa"
          accent="from-amber-400/20 to-orange-400/10"
          bar={Math.min(Math.max((current.pressure - 980) * 2, 0), 100)}
        />
        <MetricTile
          icon={<Droplets size={22} />}
          label="Rain today"
          value={`${today.precipProbability}%`}
          sub={`${current.precipitation} mm now`}
          accent="from-indigo-400/20 to-blue-400/10"
          bar={today.precipProbability}
        />
      </div>

      {/* ── 7-day forecast strip ────────────────────── */}
      <div className="lg:col-span-2">
        <div className="rounded-[2rem] border border-moss-100 bg-white/70 p-5 backdrop-blur-xl">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-moss-500">
            7-day outlook
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {daily.map((d, i) => {
              const dm = describeWeather(d.code, true)
              return (
                <motion.div
                  key={d.date}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    i === 0
                      ? 'border-moss-300 bg-moss-50'
                      : 'border-moss-100 bg-cream-50 hover:border-moss-200'
                  }`}
                >
                  <p className="text-xs font-semibold text-moss-700">{dayName(d.date, i)}</p>
                  <WeatherGlyph
                    icon={dm.icon}
                    size={34}
                    className="mx-auto my-3 text-moss-600 transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="text-sm font-semibold tabular-nums text-moss-900">{d.tempMax}°</p>
                  <p className="text-xs tabular-nums text-moss-900/45">{d.tempMin}°</p>
                  <p className="mt-2 flex items-center justify-center gap-1 text-[0.7rem] text-sky-600">
                    <Droplets size={11} /> {d.precipProbability}%
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricTile({
  icon,
  label,
  value,
  sub,
  accent,
  bar,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  accent: string
  bar: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-moss-100 bg-white p-5"
    >
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-moss-50 text-moss-600">
          {icon}
        </span>
        {sub && <span className="text-xs text-moss-900/45">{sub}</span>}
      </div>
      <div className="relative mt-4">
        <p className="heading-display text-3xl text-moss-900 tabular-nums">{value}</p>
        <p className="text-xs uppercase tracking-wide text-moss-900/50">{label}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-moss-100">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${bar}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-moss-400 to-moss-600"
          />
        </div>
      </div>
    </motion.div>
  )
}

function WeatherSkeleton() {
  return (
    <div className="grid animate-pulse gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="h-80 rounded-[2rem] bg-moss-100" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 rounded-3xl bg-moss-100" />
        ))}
      </div>
      <div className="h-40 rounded-[2rem] bg-moss-100 lg:col-span-2" />
    </div>
  )
}
