'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from './cart-context'
import { featuredProducts } from '@/lib/products'

// Hook to get responsive products per view
function useProductsPerView() {
  const [productsPerView, setProductsPerView] = useState(4)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setProductsPerView(1) // Mobile: 1 product
      } else if (window.innerWidth < 1024) {
        setProductsPerView(2) // Tablet: 2 products
      } else {
        setProductsPerView(4) // Desktop: 4 products
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return productsPerView
}

export function FeaturedProducts() {
  const { addItem } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const productsPerView = useProductsPerView()
  
  const totalProducts = featuredProducts.length
  const maxIndex = totalProducts - productsPerView

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Reset index when productsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0)
    }
  }, [productsPerView, maxIndex, currentIndex])

  // Get visible products based on current index
  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + productsPerView)

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  // Grid columns based on products per view
  const gridClass = productsPerView === 1 
    ? 'grid-cols-1' 
    : productsPerView === 2 
      ? 'grid-cols-2' 
      : 'grid-cols-4'

  return (
    <section className="py-20 md:py-28 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Bestsellers
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary mt-3">
            Featured Products
          </h2>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-cream border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-cream border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            aria-label="Next product"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Products Grid */}
          <div className="overflow-hidden px-4 sm:px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`grid ${gridClass} gap-4 md:gap-6`}
              >
                {visibleProducts.map((product) => (
                  <div key={product.id} className="group">
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
                          className="absolute bottom-3 right-3 w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-primary"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.button>
                      </div>
                      <div className="p-4 md:p-5">
                        <h3 className="font-serif text-base md:text-lg text-primary mb-2 truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-gold font-medium text-base md:text-lg">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => addItem(product)}
                            className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold w-8'
                    : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
