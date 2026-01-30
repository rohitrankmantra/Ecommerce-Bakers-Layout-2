'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowUpRight } from 'lucide-react'
import { useCart } from './cart-context'

export function ProductCard({ product, index }) {
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative"
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
        
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Quick action */}
          <button
            onClick={() => addItem(product)}
            className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-105"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>

          <h3 className="mt-1 font-serif text-lg text-primary leading-snug">
            {product.name}
          </h3>

          <div className="mt-2 mb-5">
            <span className="text-xl font-semibold text-gold">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-auto flex gap-3">
            <Link
              href={`/product/${product.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-muted transition-colors"
            >
              Details
              {/* <ArrowUpRight size={14} /> */}
            </Link>

            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag size={16} />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
