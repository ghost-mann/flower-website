// ──────────────────────────────────────────────────────────────
// Central content + asset registry for Karen Roses.
// All imagery uses free Unsplash placeholders — swap the URLs in
// `img` for the farm's real photography later (keys are stable).
// ──────────────────────────────────────────────────────────────

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const img = {
  heroRoses: u('1518621736915-f3b1c41bfd00', 2000),
  heroField: u('1416879595882-3373a0480b5b', 2000),
  heroBouquet: u('1487070183336-b863922373d4', 2000),
  whoWeAre: u('1525310072745-f49212b5ac6d'),
  aboutStory: u('1490750967868-88aa4486c946'),
  sustainability: u('1469259943454-aef0f6f63b86'),
  accreditation: u('1463320726281-696a485928c7'),
  bouquets: u('1496062031456-07b8f162a322', 2000),
  greenhouse: u('1416879595882-3373a0480b5b'),
  team: u('1454942901704-3c44c11b2ad1'),
  contact: u('1502977249166-824b3a8a4d6d', 2000),
}

export type NavItem = { label: string; to: string }

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Farm Live', to: '/farm-live' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

export const company = {
  name: 'Karen Roses',
  tagline: 'Where Passion & Dedication Blossom',
  phone: '+254 722 717 187',
  email: 'hello@bloomfieldroses.com',
  address: 'Naivasha Road, Rift Valley, Kenya',
  founded: 1989,
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
}

export type Product = {
  slug: string
  name: string
  category: string
  blurb: string
  image: string
  varieties: number
  vaseLife: string
  stemLength: string
}

export const products: Product[] = [
  {
    slug: 'standard-roses',
    name: 'Standard Roses',
    category: 'Roses',
    blurb:
      'Single, large-headed blooms on long sturdy stems — our signature crop, grown for colour intensity and exceptional vase life.',
    image: u('1518621736915-f3b1c41bfd00'),
    varieties: 48,
    vaseLife: '12–14 days',
    stemLength: '40–80 cm',
  },
  {
    slug: 'spray-roses',
    name: 'Spray Roses',
    category: 'Roses',
    blurb:
      'Multiple delicate florets per stem, perfect for romantic bouquets and dense, textured arrangements.',
    image: u('1455659817273-f96807779a8a'),
    varieties: 26,
    vaseLife: '10–12 days',
    stemLength: '40–60 cm',
  },
  {
    slug: 'alstroemeria',
    name: 'Alstroemeria',
    category: 'Summer Flowers',
    blurb:
      'The Peruvian lily — vivid, speckled, and remarkably long-lasting. A florist favourite for volume and colour.',
    image: u('1502977249166-824b3a8a4d6d'),
    varieties: 18,
    vaseLife: '14–18 days',
    stemLength: '50–70 cm',
  },
  {
    slug: 'fillers',
    name: 'Fillers & Foliage',
    category: 'Accents',
    blurb:
      'Gypsophila, limonium and lush greenery that frame and complete every bouquet with natural texture.',
    image: u('1463320726281-696a485928c7'),
    varieties: 22,
    vaseLife: '8–12 days',
    stemLength: '45–65 cm',
  },
]

export type Stat = { value: string; label: string; suffix?: string }

export const stats: Stat[] = [
  { value: '90', suffix: 'Ha', label: 'Production area under flowers' },
  { value: '2000', suffix: 'm', label: 'Altitude above sea level' },
  { value: '1200', suffix: 'mm', label: 'Average annual rainfall' },
  { value: '100', suffix: '+', label: 'Flower varieties grown' },
  { value: '2050', label: 'Net-zero emissions target' },
]

export type Partner = { name: string; note: string }

export const partners: Partner[] = [
  { name: 'Fairtrade', note: 'Certified ethical trade' },
  { name: 'Waitrose Foundation', note: 'Community investment partner' },
  { name: 'Albert Heijn Foundation', note: 'Grower welfare programmes' },
  { name: 'MPS-ABC', note: 'Environmental certification' },
  { name: 'KFC Silver', note: 'Kenya Flower Council standard' },
  { name: 'Rainforest Alliance', note: 'Biodiversity stewardship' },
]

export type Value = { title: string; body: string; icon: string }

export const values: Value[] = [
  {
    title: 'Grown with Passion',
    body: 'Three decades of horticultural craft in every stem, tended by hands that know each variety intimately.',
    icon: 'Sprout',
  },
  {
    title: 'Climate-Smart',
    body: 'Rainwater harvesting, integrated pest management and solar power power a low-impact growing cycle.',
    icon: 'Leaf',
  },
  {
    title: 'People First',
    body: 'Fair wages, on-site healthcare, schooling and housing for the families who make the farm flourish.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Cold-Chain Fresh',
    body: 'From cut to cargo in under 24 hours through an unbroken cold chain to markets worldwide.',
    icon: 'Snowflake',
  },
]

export type NewsPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  readMins: number
}

export const news: NewsPost[] = [
  {
    slug: 'net-zero-roadmap-2050',
    title: 'Our Roadmap to Net-Zero by 2050',
    excerpt:
      'A look inside the investments — from solar arrays to regenerative soil programmes — driving our climate commitment.',
    date: '2026-05-18',
    category: 'Sustainability',
    image: u('1469259943454-aef0f6f63b86', 1200),
    readMins: 5,
  },
  {
    slug: 'new-spray-rose-varieties',
    title: 'Six New Spray Rose Varieties for the Season',
    excerpt:
      'Meet the blush tones and bi-colours joining our spray collection this year, trialled over eighteen months.',
    date: '2026-04-02',
    category: 'Products',
    image: u('1455659817273-f96807779a8a', 1200),
    readMins: 3,
  },
  {
    slug: 'fairtrade-premium-school',
    title: 'Fairtrade Premium Funds a New Community School',
    excerpt:
      'How the Fairtrade premium voted by our workers opened a classroom block for 300 children near the farm.',
    date: '2026-02-21',
    category: 'Community',
    image: u('1454942901704-3c44c11b2ad1', 1200),
    readMins: 4,
  },
  {
    slug: 'valentines-logistics',
    title: 'Behind the Scenes of Valentine’s Day Logistics',
    excerpt:
      'Eleven million stems in two weeks — the cold-chain choreography that gets roses to florists on time.',
    date: '2026-01-15',
    category: 'Operations',
    image: u('1487070183336-b863922373d4', 1200),
    readMins: 6,
  },
]
