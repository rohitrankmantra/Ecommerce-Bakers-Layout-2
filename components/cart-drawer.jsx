'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCart } from './cart-context'

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-xl text-primary">Your Cart</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm mt-2">Add some delicious treats!</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-primary text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-gold font-medium mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-beige flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-beige flex items-center justify-center transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-xl text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-2xl hover:bg-primary/90 transition-colors uppercase tracking-wide"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-transparent border border-primary text-primary font-medium rounded-2xl hover:bg-primary/5 transition-colors uppercase tracking-wide text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
