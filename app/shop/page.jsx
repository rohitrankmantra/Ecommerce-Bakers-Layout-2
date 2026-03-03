'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal, MapPin, Globe, RefreshCcw } from 'lucide-react'
import { ShopFilters } from '@/components/shop-filters'
import { ProductCard } from '@/components/product-card'
import { PageHero } from '@/components/page-hero'
import { orderedProducts } from '@/lib/products'

export default function ShopPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDiet, setSelectedDiet] = useState('all')
  const [deliveryScope, setDeliveryScope] = useState('unset')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 12

  useEffect(() => {
    // Reset deliveryScope to 'unset' on every page hit to force selection
    setDeliveryScope('unset')
    
    // We still keep the check for initial mount if needed, 
    // but the user wants it to appear ALWAYS on hitting the page.
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...orderedProducts]

    if (deliveryScope === 'panIndia') {
      const allowed = new Set(['biscuit-and-confections', 'rusk'])
      filtered = filtered.filter((p) => allowed.has(p.category))
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (selectedCategory === 'tea-time-cake' && selectedDiet !== 'all') {
      const isVeg = (p) => {
        const s = `${p.name} ${p.description || ''}`.toLowerCase()
        return s.includes('eggless')
      }
      filtered = filtered.filter((p) =>
        selectedDiet === 'veg' ? isVeg(p) : !isVeg(p),
      )
    }

    return filtered
  }, [selectedCategory, selectedDiet, deliveryScope])

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1
  const paginated = filteredProducts.slice((page - 1) * pageSize, page * pageSize)
  const goTo = (p) => setPage(Math.min(Math.max(p, 1), totalPages))

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section with Background Image */}
      <PageHero
        title="Our Shop"
        subtitle="Browse Our Collection"
        description="Discover our handcrafted selection of premium baked goods, made fresh daily with the finest ingredients."
        backgroundImage="https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908535/_STU0310_ljsglm.webp"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {deliveryScope === 'unset' ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center py-10">
            <div className="w-full max-w-md space-y-6 px-4">
              <button
                onClick={() => {
                  setDeliveryScope('city')
                  if (typeof window !== 'undefined') localStorage.setItem('deliveryScope', 'city')
                }}
                className="w-full py-4 text-xl text-gray-400 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors bg-white shadow-sm"
              >
                Delivery in Dehradun
              </button>

              <button
                onClick={() => {
                  setDeliveryScope('panIndia')
                  if (typeof window !== 'undefined') localStorage.setItem('deliveryScope', 'panIndia')
                }}
                className="w-full py-4 text-xl text-gray-400 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors bg-white shadow-sm"
              >
                Pan-India Delivery
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-2xl text-primary flex items-center gap-2">
                  {deliveryScope === 'panIndia' ? (
                    <><Globe className="w-6 h-6 text-gold" /> Pan India Selection</>
                  ) : (
                    <><MapPin className="w-6 h-6 text-primary" /> Dehradun Menu</>
                  )}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {deliveryScope === 'panIndia' 
                    ? 'Showing shelf-stable treats available for nationwide shipping.' 
                    : 'Showing our full range of fresh bakery items for local delivery.'}
                </p>
              </div>
              
              <button
                onClick={() => setDeliveryScope('unset')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-2xl text-primary hover:bg-beige transition-all shadow-sm hover:shadow-md group"
              >
                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm font-medium">Change Delivery Mode</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <ShopFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedDiet={selectedDiet}
                onDietChange={setSelectedDiet}
                isMobileOpen={mobileFiltersOpen}
                onMobileClose={() => setMobileFiltersOpen(false)}
                deliveryScope={deliveryScope}
              />

              {/* Products Grid */}
              <div className="flex-1">
                {/* Mobile Filter Button & Results Count */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Showing <span className="text-primary font-medium">{paginated.length}</span> of {filteredProducts.length} products
                  </p>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card rounded-xl text-primary hover:bg-beige transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      No products found matching your filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all')
                        setPage(1)
                      }}
                      className="mt-4 text-gold hover:text-primary transition-colors underline underline-offset-4"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginated.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                )}
                {filteredProducts.length > pageSize && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      type="button"
                      onClick={() => goTo(page - 1)}
                      disabled={page === 1}
                      className="px-3 py-1.5 rounded-lg border border-border bg-cream text-primary disabled:opacity-50"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i + 1)}
                        className={`px-3 py-1.5 rounded-lg border ${
                          page === i + 1
                            ? 'bg-gold border-gold text-white'
                            : 'bg-cream border-border text-primary'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => goTo(page + 1)}
                      disabled={page === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-border bg-cream text-primary disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
