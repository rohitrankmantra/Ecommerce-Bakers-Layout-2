'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { ShopFilters } from '@/components/shop-filters'
import { ProductCard } from '@/components/product-card'
import { PageHero } from '@/components/page-hero'
import { products } from '@/lib/products'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedSort, setSelectedSort] = useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Price filter
    if (selectedPrice === 'under-20') {
      filtered = filtered.filter((p) => p.price < 20)
    } else if (selectedPrice === '20-40') {
      filtered = filtered.filter((p) => p.price >= 20 && p.price <= 40)
    } else if (selectedPrice === 'over-40') {
      filtered = filtered.filter((p) => p.price > 40)
    }

    // Sort
    if (selectedSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (selectedSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (selectedSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (selectedSort === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [selectedCategory, selectedPrice, selectedSort])

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section with Background Image */}
      <PageHero
        title="Our Shop"
        subtitle="Browse Our Collection"
        description="Discover our handcrafted selection of premium baked goods, made fresh daily with the finest ingredients."
        backgroundImage="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <ShopFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            isMobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="text-primary font-medium">{filteredProducts.length}</span> products
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
                    setSelectedPrice('all')
                  }}
                  className="mt-4 text-gold hover:text-primary transition-colors underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
