'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { ShopFilters } from '@/components/shop-filters'
import { ProductCard } from '@/components/product-card'
import { PageHero } from '@/components/page-hero'
import { orderedProducts } from '@/lib/products'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDiet, setSelectedDiet] = useState('all')
  const [deliveryScope, setDeliveryScope] = useState('unset')
  const [scopeOpen, setScopeOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 12
  useEffect(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('deliveryScope') : null
    if (s === 'city' || s === 'panIndia') {
      setDeliveryScope(s)
    }
    setScopeOpen(true)
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
      <Dialog open={scopeOpen} onOpenChange={setScopeOpen}>
        <DialogContent className="max-w-md bg-cream/90 backdrop-blur-xl border border-white/70 rounded-3xl p-6 text-primary">
          <DialogTitle className="sr-only">Choose Delivery Scope</DialogTitle>
          <div className="text-center space-y-3">
            <h3 className="font-serif text-2xl">Delivery Options</h3>
            <p className="text-muted-foreground text-sm">
              Choose your delivery preference to tailor product visibility.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                setDeliveryScope('city')
                setScopeOpen(false)
                if (typeof window !== 'undefined') localStorage.setItem('deliveryScope', 'city')
              }}
              className="px-4 py-4 rounded-2xl bg-white border border-border text-primary hover:bg-beige transition"
            >
              Deliver in Dehradun
            </button>
            <button
              type="button"
              onClick={() => {
                setDeliveryScope('panIndia')
                setScopeOpen(false)
                if (typeof window !== 'undefined') localStorage.setItem('deliveryScope', 'panIndia')
              }}
              className="px-4 py-4 rounded-2xl bg-white border border-border text-primary hover:bg-beige transition"
            >
              Pan India
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Section with Background Image */}
      <PageHero
        title="Our Shop"
        subtitle="Browse Our Collection"
        description="Discover our handcrafted selection of premium baked goods, made fresh daily with the finest ingredients."
        backgroundImage="https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908535/_STU0310_ljsglm.webp"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white/70 border border-border rounded-2xl p-1">
            <button
              type="button"
              onClick={() => {
                setDeliveryScope('city')
                if (typeof window !== 'undefined') localStorage.setItem('deliveryScope', 'city')
              }}
              className={`px-3 py-1.5 rounded-xl text-sm ${deliveryScope === 'city' ? 'bg-primary text-white' : 'text-primary hover:bg-beige'}`}
            >
              Deliver in Dehradun
            </button>
            <button
              type="button"
              onClick={() => {
                setDeliveryScope('panIndia')
                if (typeof window !== 'undefined') localStorage.setItem('deliveryScope', 'panIndia')
              }}
              className={`px-3 py-1.5 rounded-xl text-sm ${deliveryScope === 'panIndia' ? 'bg-primary text-white' : 'text-primary hover:bg-beige'}`}
            >
              Pan India
            </button>
          </div>
          <div className="text-sm text-muted-foreground">
            {deliveryScope === 'panIndia' ? 'Showing only Pan-India shippable items' : 'Showing all items'}
          </div>
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
      </div>
    </div>
  )
}
