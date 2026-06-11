import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react'
import { events, type FarmEvent } from '../data/events'

type Status = 'upcoming' | 'live' | 'past'
type Filter = 'All' | 'Upcoming' | 'Live' | 'Past'

function getStatus(e: FarmEvent, now: Date): Status {
  const start = new Date(e.date)
  start.setHours(0, 0, 0, 0)
  const end = e.endDate ? new Date(e.endDate) : new Date(e.date)
  end.setHours(23, 59, 59, 999)
  if (now > end) return 'past'
  if (now >= start && now <= end) return 'live'
  return 'upcoming'
}

const statusStyle: Record<Status, string> = {
  upcoming: 'bg-moss-100 text-moss-700 ring-moss-200',
  live: 'bg-rose-100 text-rose-700 ring-rose-200',
  past: 'bg-slate-100 text-slate-500 ring-slate-200',
}

const typeStyle: Record<FarmEvent['type'], string> = {
  'Trade Show': 'bg-amber-50 text-amber-700',
  'Open Day': 'bg-emerald-50 text-emerald-700',
  Harvest: 'bg-rose-50 text-rose-700',
  Workshop: 'bg-sky-50 text-sky-700',
  Webinar: 'bg-violet-50 text-violet-700',
}

const fmtDate = (e: FarmEvent) => {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  const start = new Date(e.date).toLocaleDateString('en-GB', opts)
  if (!e.endDate) return `${start} ${new Date(e.date).getFullYear()}`
  const end = new Date(e.endDate).toLocaleDateString('en-GB', { ...opts, year: 'numeric' })
  return `${start} – ${end}`
}

export default function EventsTable() {
  const [filter, setFilter] = useState<Filter>('All')
  // Live "now" so statuses stay accurate whenever the page is opened.
  const now = useMemo(() => new Date(), [])

  const decorated = useMemo(
    () =>
      events
        .map((e) => ({ ...e, status: getStatus(e, now) }))
        .sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [now],
  )

  const counts = useMemo(
    () => ({
      All: decorated.length,
      Upcoming: decorated.filter((e) => e.status === 'upcoming').length,
      Live: decorated.filter((e) => e.status === 'live').length,
      Past: decorated.filter((e) => e.status === 'past').length,
    }),
    [decorated],
  )

  const rows = decorated.filter((e) =>
    filter === 'All' ? true : e.status === filter.toLowerCase(),
  )

  return (
    <div>
      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(['All', 'Upcoming', 'Live', 'Past'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === f
                ? 'bg-moss-600 text-cream-50 shadow-lg shadow-moss-900/15'
                : 'border border-moss-200 text-moss-700 hover:border-moss-400'
            }`}
          >
            {f === 'Live' && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
            )}
            {f}
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs ${
                filter === f ? 'bg-cream-50/20' : 'bg-moss-100 text-moss-600'
              }`}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Desktop table ───────────────────────────── */}
      <div className="hidden overflow-hidden rounded-[2rem] border border-moss-100 bg-white/70 backdrop-blur-xl md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-moss-100 bg-moss-50/50 text-xs uppercase tracking-[0.15em] text-moss-500">
              <th className="px-6 py-5 font-semibold">Event</th>
              <th className="px-6 py-5 font-semibold">Date</th>
              <th className="px-6 py-5 font-semibold">Location</th>
              <th className="px-6 py-5 font-semibold">Registration</th>
              <th className="px-6 py-5 font-semibold">Status</th>
              <th className="px-6 py-5" />
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {rows.map((e, i) => (
                <motion.tr
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="group border-b border-moss-50 transition-colors last:border-0 hover:bg-moss-50/40"
                >
                  <td className="px-6 py-5">
                    <p className="font-medium text-moss-900">{e.title}</p>
                    <span
                      className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${typeStyle[e.type]}`}
                    >
                      {e.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm tabular-nums text-moss-900/70">
                    {fmtDate(e)}
                  </td>
                  <td className="px-6 py-5 text-sm text-moss-900/70">{e.location}</td>
                  <td className="px-6 py-5">
                    <RegistrationCell event={e} />
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    {e.status !== 'past' && e.capacity > 0 ? (
                      <button className="inline-flex items-center gap-1 text-sm font-semibold text-moss-600 opacity-0 transition group-hover:opacity-100 hover:text-moss-800">
                        Register <ArrowRight size={15} />
                      </button>
                    ) : (
                      <span className="text-xs text-moss-900/30">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {rows.length === 0 && <EmptyState />}
      </div>

      {/* ── Mobile cards ────────────────────────────── */}
      <div className="space-y-4 md:hidden">
        <AnimatePresence mode="popLayout">
          {rows.map((e, i) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-3xl border border-moss-100 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-moss-900">{e.title}</p>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${typeStyle[e.type]}`}
                  >
                    {e.type}
                  </span>
                </div>
                <StatusBadge status={e.status} />
              </div>
              <div className="mt-4 space-y-2 text-sm text-moss-900/70">
                <p className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-moss-400" /> {fmtDate(e)}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={15} className="text-moss-400" /> {e.location}
                </p>
              </div>
              <div className="mt-4">
                <RegistrationCell event={e} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {rows.length === 0 && <EmptyState />}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusStyle[status]}`}
    >
      {status === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
        </span>
      )}
      {status}
    </span>
  )
}

function RegistrationCell({ event: e }: { event: FarmEvent }) {
  if (e.capacity === 0)
    return <span className="text-xs italic text-moss-900/40">Internal · farm only</span>

  const pct = Math.round((e.registered / e.capacity) * 100)
  const full = pct >= 100
  return (
    <div className="min-w-36">
      <div className="flex items-center justify-between text-xs text-moss-900/60">
        <span className="flex items-center gap-1">
          <Users size={12} /> {e.registered}/{e.capacity}
        </span>
        <span className={full ? 'font-semibold text-rose-600' : ''}>
          {full ? 'Full' : `${pct}%`}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-moss-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${
            full ? 'bg-rose-500' : 'bg-gradient-to-r from-moss-400 to-moss-600'
          }`}
        />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center text-moss-900/50">
      <CalendarDays className="mx-auto mb-3 text-moss-300" />
      No events in this category right now.
    </div>
  )
}
