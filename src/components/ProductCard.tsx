import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp } from '../lib/motion'
import type { Product } from '../data/site'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl bg-moss-950"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-950/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          {product.category}
        </span>
        <h3 className="heading-display mt-1.5 text-2xl text-cream-50">{product.name}</h3>

        <div className="grid max-h-0 grid-rows-[0fr] overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
          <div className="min-h-0">
            <p className="pt-3 text-sm leading-relaxed text-cream-100/80">{product.blurb}</p>
            <div className="mt-4 flex gap-5 text-xs text-cream-100/70">
              <span>
                <span className="block font-semibold text-gold-400">{product.varieties}</span>
                varieties
              </span>
              <span>
                <span className="block font-semibold text-gold-400">{product.vaseLife}</span>
                vase life
              </span>
              <span>
                <span className="block font-semibold text-gold-400">{product.stemLength}</span>
                stem length
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cream-50 transition-colors hover:text-gold-400"
        >
          View More
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}
