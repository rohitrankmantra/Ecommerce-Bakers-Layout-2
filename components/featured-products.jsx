'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from './cart-context'
import { featuredProducts } from '@/lib/products'

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

/* ---------------- RESPONSIVE COUNT ---------------- */
function useProductsPerView() {
  const [count, setCount] = useState(4)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCount(1)
      else if (window.innerWidth < 1024) setCount(2)
      else setCount(4)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return count
}

export function FeaturedProducts() {
  const { addItem } = useCart()
  const perView = useProductsPerView()

  const totalPages = Math.ceil(featuredProducts.length / perView)
  const [page, setPage] = useState(0)

  const viewportRef = useRef(null)

  /* ---------------- SLIDE WITHOUT ANIMATION ---------------- */
  const slideTo = useCallback(
    (targetPage) => {
      if (!viewportRef.current) return

      const width = viewportRef.current.offsetWidth
      const offset = -targetPage * width

      // Use CSS transform without animation for instant scroll
      const motionDiv = viewportRef.current.querySelector('.carousel-inner')
      if (motionDiv) {
        motionDiv.style.transform = `translateX(${offset}px)`
      }
    },
    []
  )

  const next = () => {
    const nextPage = (page + 1) % totalPages
    setPage(nextPage)
    slideTo(nextPage)
  }

  const prev = () => {
    const prevPage = (page - 1 + totalPages) % totalPages
    setPage(prevPage)
    slideTo(prevPage)
  }

  /* ---------------- AUTO PLAY DISABLED (NO INTERRUPTION) -------- */
  useEffect(() => {
    slideTo(page)
  }, [page, slideTo])

  return (
    <section className="py-20 md:py-28 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* -------- HEADER -------- */}
        <div className="text-center mb-12">
          <span className="text-gold uppercase tracking-widest text-sm">
            Bestsellers
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold mt-3">
            Featured Products
          </h2>
        </div>

        <div className="relative">
          {/* -------- ARROWS -------- */}
          <button onClick={prev} className="carousel-btn left-0">
            <ChevronLeft />
          </button>
          <button onClick={next} className="carousel-btn right-0">
            <ChevronRight />
          </button>

          {/* -------- VIEWPORT -------- */}
          <div ref={viewportRef} className="overflow-hidden">
            <div
              className="carousel-inner flex transition-transform duration-300"
              style={{ transform: `translateX(0)` }}
            >
              {Array.from({ length: totalPages }).map((_, i) => {
                const items = featuredProducts.slice(
                  i * perView,
                  i * perView + perView
                )

                return (
                  <div
                    key={i}
                    className="grid gap-6 px-2 min-w-full"
                    style={{
                      gridTemplateColumns: `repeat(${perView}, minmax(0,1fr))`,
                    }}
                  >
                    {items.map((product) => (
                      <div key={product.id} className="group">
                        <div className="bg-card rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                          <div className="relative aspect-square">
                            <Image
                              src={product.image || '/placeholder.svg'}
                              alt={product.name}
                              fill
                              loading="lazy"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <button
                              onClick={() => addItem(product)}
                              className="absolute bottom-3 right-3 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              <ShoppingBag className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="p-4">
                            <h3 className="font-serif truncate">
                              {product.name}
                            </h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-gold font-medium">
                                ₹{product.price.toFixed(2)}
                              </span>
                              <div className="flex gap-2">
                                <Link
                                  href={`/shop/${slugify(product.name)}`}
                                  className="text-sm bg-cream border border-border text-primary px-3 py-1.5 rounded-lg hover:bg-beige transition"
                                >
                                  Detail
                                </Link>
                                <button
                                  onClick={() => addItem(product)}
                                  className="text-sm bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-gold transition"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* -------- DOTS -------- */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i)
                  slideTo(i)
                }}
                className={`h-2.5 rounded-full transition-all ${
                  page === i ? 'bg-gold w-8' : 'bg-border w-2.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* -------- ARROW STYLE -------- */}
      <style jsx>{`
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  )
}
