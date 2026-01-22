'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './cart-context'

export function ProductCard({ product, index }) {
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(product)}
            className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-primary"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="p-5">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-serif text-lg text-primary mt-1 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gold font-medium text-lg">
              ${product.price.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
