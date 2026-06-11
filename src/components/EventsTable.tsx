import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Globe2, Palette, Scissors, Ship } from 'lucide-react'
import { events, type FarmEvent } from '../data/events'

type Status = 'upcoming' | 'production' | 'completed'
type Filter = 'All' | 'Upcoming' | 'In Production' | 'Completed'

const filterToStatus: Record<Exclude<Filter, 'All'>, Status> = {
  Upcoming: 'upcoming',
  'In Production': 'production',
  Completed: 'completed',
}

const day = (iso: string) => new Date(`${iso}T00:00:00`)
const endDay = (iso: string) => new Date(`${iso}T23:59:59`)

function getStatus(e: FarmEvent, now: Date): Status {
  const start = day(e.picksFrom || e.date)
  const end = endDay(e.shipTo || e.date)
  if (now > end) return 'completed'
  if (now >= start && now <= end) return 'production'
  return 'upcoming'
}

const statusMeta: Record<Status, { label: string; cls: string }> = {
  upcoming: { label: 'Upcoming', cls: 'bg-moss-100 text-moss-700 ring-moss-200' },
  production: { label: 'In Production', cls: 'bg-rose-100 text-rose-700 ring-rose-200' },
  completed: { label: 'Completed', cls: 'bg-slate-100 text-slate-500 ring-slate-200' },
}

// Title-case the SHOUTING source text, keeping short tokens (MD, UK, USA…) upty.
const KEEP = new Set(['MD', 'UK', 'USA', 'UAE', 'KSA', 'EU', 'EUMD'])
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .replace(/\b[\w']+/g, (w) => {
      const up = w.toUpperCase()
      if (KEEP.has(up)) return up
      return w.charAt(0).toUpperCase() + w.slice(1)
    })

const fmtDay = (iso: string) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'

const fmtFull = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

const fmtRange = (from: string, to: string) =>
  from && to ? `${fmtDay(from)} – ${fmtDay(to)}` : '—'

export default function EventsTable() {
  const [filter, setFilter] = useState<Filter>('Upcoming')
  const now = useMemo(() => new Date(), [])

  const decorated = useMemo(
    () =>
      events
        .map((e) => ({ ...e, status: getStatus(e, now) }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [now],
  )

  const counts = useMemo(
    () => ({
      All: decorated.length,
      Upcoming: decorated.filter((e) => e.status === 'upcoming').length,
      'In Production': decorated.filter((e) => e.status === 'production').length,
      Completed: decorated.filter((e) => e.status === 'completed').length,
    }),
    [decorated],
  )

  const rows = decorated.filter((e) =>
    filter === 'All' ? true : e.status === filterToStatus[filter],
  )

  return (
    <div>
      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(['All', 'Upcoming', 'In Production', 'Completed'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === f
                ? 'bg-moss-600 text-cream-50 shadow-lg shadow-moss-900/15'
                : 'border border-moss-200 text-moss-700 hover:border-moss-400'
            }`}
          >
            {f === 'In Production' && (
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
      <div className="hidden overflow-hidden rounded-[2rem] border border-moss-100 bg-white/70 backdrop-blur-xl lg:block">
        <div className="max-h-[40rem] overflow-y-auto">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-moss-100 bg-moss-50 text-xs uppercase tracking-[0.13em] text-moss-500">
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Event date</th>
                <th className="px-6 py-4 font-semibold">Markets</th>
                <th className="px-6 py-4 font-semibold">Flower picks</th>
                <th className="px-6 py-4 font-semibold">Shipping</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {rows.map((e, i) => (
                  <motion.tr
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.35 }}
                    className="border-b border-moss-50 align-top transition-colors last:border-0 hover:bg-moss-50/40"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-moss-900">{titleCase(e.event)}</p>
                      {e.remarks && (
                        <p className="mt-1 flex items-start gap-1.5 text-xs text-moss-900/50">
                          <Palette size={12} className="mt-0.5 shrink-0 text-rose-400" />
                          {e.remarks}
                        </p>
                      )}
                      <span className="mt-1.5 inline-block text-[0.7rem] text-moss-900/40">
                        Wk {e.week}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium tabular-nums text-moss-900/80">
                      {fmtFull(e.date)}
                    </td>
                    <td className="px-6 py-4">
                      <MarketBadge value={e.countries} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm tabular-nums text-moss-900/70">
                      {fmtRange(e.picksFrom, e.picksTo)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm tabular-nums text-moss-900/70">
                      {fmtRange(e.shipFrom, e.shipTo)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={e.status} />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <EmptyState />}
      </div>

      {/* ── Mobile / tablet cards ───────────────────── */}
      <div className="space-y-4 lg:hidden">
        <AnimatePresence mode="popLayout">
          {rows.map((e, i) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="rounded-3xl border border-moss-100 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-moss-900">{titleCase(e.event)}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-moss-700">
                    <CalendarDays size={14} className="text-moss-400" /> {fmtFull(e.date)}
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <MarketBadge value={e.countries} />
                <span className="text-[0.7rem] text-moss-900/40">Wk {e.week}</span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-moss-50 p-3">
                  <dt className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wide text-moss-900/50">
                    <Scissors size={12} /> Picks
                  </dt>
                  <dd className="mt-0.5 tabular-nums text-moss-800">
                    {fmtRange(e.picksFrom, e.picksTo)}
                  </dd>
                </div>
                <div className="rounded-xl bg-moss-50 p-3">
                  <dt className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wide text-moss-900/50">
                    <Ship size={12} /> Shipping
                  </dt>
                  <dd className="mt-0.5 tabular-nums text-moss-800">
                    {fmtRange(e.shipFrom, e.shipTo)}
                  </dd>
                </div>
              </dl>

              {e.remarks && (
                <p className="mt-3 flex items-start gap-1.5 text-xs text-moss-900/55">
                  <Palette size={13} className="mt-0.5 shrink-0 text-rose-400" />
                  {e.remarks}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {rows.length === 0 && <EmptyState />}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const m = statusMeta[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${m.cls}`}
    >
      {status === 'production' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
        </span>
      )}
      {m.label}
    </span>
  )
}

function MarketBadge({ value }: { value: string }) {
  if (!value) return <span className="text-xs text-moss-900/30">—</span>
  const isAll = value.toUpperCase() === 'ALL'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isAll ? 'bg-gold-400/20 text-gold-600' : 'bg-sky-50 text-sky-700'
      }`}
    >
      <Globe2 size={12} />
      {isAll ? 'All markets' : value}
    </span>
  )
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-moss-100 bg-white px-6 py-16 text-center text-moss-900/50">
      <CalendarDays className="mx-auto mb-3 text-moss-300" />
      No events in this category right now.
    </div>
  )
}
