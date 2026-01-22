'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'biscuits', label: 'Biscuits' },
  { id: 'rusk', label: 'Rusk' },
  { id: 'other', label: 'Other Items' },
]

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-20', label: 'Under $20' },
  { id: '20-40', label: '$20 - $40' },
  { id: 'over-40', label: 'Over $40' },
]

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A-Z' },
]

export function ShopFilters({
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  selectedSort,
  onSortChange,
  isMobileOpen,
  onMobileClose,
}) {
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-serif text-lg text-primary mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-beige'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-serif text-lg text-primary mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              type="button"
              onClick={() => onPriceChange(range.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                selectedPrice === range.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-beige'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-serif text-lg text-primary mb-4">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((sort) => (
            <button
              key={sort.id}
              type="button"
              onClick={() => onSortChange(sort.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                selectedSort === sort.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-beige'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-primary">Filters</h2>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 max-h-[80vh] bg-card rounded-t-3xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-xl text-primary">Filters</h2>
                  </div>
                  <button
                    type="button"
                    onClick={onMobileClose}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="w-full mt-8 py-4 bg-primary text-primary-foreground font-medium rounded-2xl hover:bg-primary/90 transition-colors uppercase tracking-wide"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
