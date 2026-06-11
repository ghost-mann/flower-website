import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import WeatherGlyph from './WeatherGlyph'
import { describeWeather, fallbackWeather, fetchWeather, type CurrentWeather } from '../lib/weather'

/** Compact live-weather pill for the hero. Links through to Farm Events. */
export default function WeatherChip() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let active = true
    fetchWeather()
      .then((d) => active && (setCurrent(d.current), setLive(true)))
      .catch(() => active && setCurrent(fallbackWeather().current))
    return () => {
      active = false
    }
  }, [])

  if (!current) {
    // slim loading placeholder to avoid layout shift
    return (
      <div className="hidden h-[3.25rem] w-44 animate-pulse rounded-full border border-cream-50/15 bg-cream-50/5 backdrop-blur-md sm:block" />
    )
  }

  const meta = describeWeather(current.code, current.isDay)

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/farm-events"
        className="group hidden items-center gap-3 rounded-full border border-cream-50/20 bg-cream-50/10 py-2 pl-3 pr-4 text-cream-50 backdrop-blur-md transition-all duration-300 hover:border-cream-50/40 hover:bg-cream-50/15 sm:inline-flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-cream-50/15">
          <WeatherGlyph icon={meta.icon} size={20} className="text-cream-50" />
        </span>
        <span className="leading-tight">
          <span className="flex items-center gap-1.5 text-sm font-semibold tabular-nums">
            {current.temperature}°C
            <span className="font-normal text-cream-100/70">· {meta.label}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[0.7rem] text-cream-100/60">
            {live ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </span>
                Live · on the farm
              </>
            ) : (
              'Farm conditions'
            )}
          </span>
        </span>
        <ArrowUpRight
          size={15}
          className="text-cream-100/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cream-50"
        />
      </Link>
    </motion.div>
  )
}
