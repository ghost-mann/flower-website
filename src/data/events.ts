export type FarmEvent = {
  id: string
  title: string
  type: 'Trade Show' | 'Open Day' | 'Harvest' | 'Workshop' | 'Webinar'
  date: string // ISO date
  endDate?: string
  location: string
  capacity: number
  registered: number
}

// Reference date for the demo is 2026-06-11. Mix of past / live / upcoming.
export const events: FarmEvent[] = [
  {
    id: 'evt-iftf-2026',
    title: 'IFTF Trade Fair — Vijfhuizen',
    type: 'Trade Show',
    date: '2026-11-04',
    endDate: '2026-11-06',
    location: 'Amsterdam, Netherlands',
    capacity: 500,
    registered: 312,
  },
  {
    id: 'evt-open-day-aug',
    title: 'Grower Open Day & Greenhouse Tour',
    type: 'Open Day',
    date: '2026-08-15',
    location: 'Karen Roses Farm, Naivasha',
    capacity: 80,
    registered: 54,
  },
  {
    id: 'evt-sustainability-webinar',
    title: 'Road to Net-Zero: Live Webinar',
    type: 'Webinar',
    date: '2026-07-02',
    location: 'Online · Zoom',
    capacity: 1000,
    registered: 268,
  },
  {
    id: 'evt-valentine-prep',
    title: 'Valentine’s Pre-Order Window Opens',
    type: 'Workshop',
    date: '2026-06-30',
    location: 'Sales Office · Hybrid',
    capacity: 200,
    registered: 187,
  },
  {
    id: 'evt-mid-harvest',
    title: 'Mid-Year Peak Harvest',
    type: 'Harvest',
    date: '2026-06-09',
    endDate: '2026-06-13',
    location: 'Karen Roses Farm, Naivasha',
    capacity: 0,
    registered: 0,
  },
  {
    id: 'evt-ipm-workshop',
    title: 'Integrated Pest Management Workshop',
    type: 'Workshop',
    date: '2026-05-20',
    location: 'Karen Roses Farm, Naivasha',
    capacity: 40,
    registered: 40,
  },
  {
    id: 'evt-kenya-flower-expo',
    title: 'Kenya Flower Council Expo',
    type: 'Trade Show',
    date: '2026-03-12',
    endDate: '2026-03-14',
    location: 'Nairobi, Kenya',
    capacity: 600,
    registered: 600,
  },
]
