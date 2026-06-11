import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Leaf } from 'lucide-react'
import WeatherChip from './WeatherChip'
import { img } from '../data/site'

type Slide = {
  image: string
  kicker: string
  title: string
  highlight: string
  body: string
}

const slides: Slide[] = [
  {
    image: img.heroRoses,
    kicker: 'Premium cut flowers since 1989',
    title: 'Where Passion &',
    highlight: 'Dedication Blossom',
    body: 'A family farm in the Kenyan highlands, growing roses of rare colour, strength and vase life for florists across the world.',
  },
  {
    image: img.heroField,
    kicker: 'Sustainable. Fairtrade. Future-fit.',
    title: 'Think Green,',
    highlight: 'Act Green',
    body: 'Rainwater harvesting, solar energy and regenerative soils — flowers grown in harmony with the land that raises them.',
  },
  {
    image: img.heroBouquet,
    kicker: 'A home of bouquets',
    title: 'Bouquets Built',
    highlight: 'to Be Remembered',
    body: 'From single-variety bunches to bespoke mixed bouquets, hand-tied and cold-chained fresh to your market.',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500)
    return () => clearInterval(t)
  }, [])

  const slide = slides[index]

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-moss-950/85 via-moss-950/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-moss-950/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating decorative petals */}
      <div className="pointer-events-none absolute right-[12%] top-[24%] hidden text-rose-300/40 lg:block">
        <Leaf size={90} className="animate-float-slow" />
      </div>

      {/* Live weather chip */}
      <div className="absolute inset-x-0 top-24 z-20 hidden sm:block">
        <div className="container-xl flex justify-end">
          <WeatherChip />
        </div>
      </div>

      <div className="container-xl relative flex h-full items-center">
        <div className="max-w-2xl pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow text-gold-400">
                <span className="h-px w-10 bg-current" />
                {slide.kicker}
              </span>
              <h1 className="heading-display mt-5 text-5xl text-cream-50 sm:text-6xl lg:text-7xl">
                {slide.title}
                <br />
                <span className="text-gradient-gold">{slide.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/85">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link to="/products" className="btn-rose">
              Explore Our Flowers <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-ghost border-cream-100/40 text-cream-50 hover:bg-cream-50 hover:text-moss-900 hover:border-cream-50">
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0">
        <div className="container-xl flex items-center justify-between">
          <div className="flex gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-12 bg-gold-400' : 'w-6 bg-cream-50/40 hover:bg-cream-50/70'
                }`}
              />
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 text-cream-50 transition hover:bg-cream-50 hover:text-moss-900"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 text-cream-50 transition hover:bg-cream-50 hover:text-moss-900"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
