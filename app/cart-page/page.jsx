'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react'
import { useCart } from '@/components/cart-context'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const router = useRouter()
  
  // Delivery charge constant
  const DELIVERY_CHARGE = 160

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-cream flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-primary opacity-50" />
        </div>
        <h1 className="font-serif text-3xl text-primary mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any treats yet. Explore our collection of premium baked goods.
        </p>
        <Link 
          href="/shop" 
          className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop" className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-[#3E2723]">My Cart</h1>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-lg text-[#3E2723] font-medium leading-tight">
                        {item.name}
                      </h3>
                      {/* Placeholder for future attributes like weight/type if available */}
                      <div className="mt-1 space-y-1">
                         {item.weight && (
                            <p className="text-sm text-stone-500">Weight: {item.weight}</p>
                         )}
                         {item.type && (
                            <p className="text-sm text-stone-500">Type: {item.type}</p>
                         )}
                         <p className="text-sm text-stone-500">Unit Price: ₹{item.price}</p>
                      </div>
                    </div>
                    <p className="font-serif text-lg font-bold text-[#C85B24]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 sm:mt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1 border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-stone-600 shadow-sm hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-medium text-stone-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-stone-600 shadow-sm hover:text-primary transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Action */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-6 sm:p-8 sticky top-24">
              <h2 className="font-serif text-xl text-[#3E2723] mb-6 border-b border-stone-100 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charge</span>
                  <span className="font-medium">₹{DELIVERY_CHARGE.toFixed(2)}</span>
                </div>
                <div className="text-xs text-stone-400 mt-2 bg-stone-50 p-2 rounded text-center">
                  Standard delivery charges apply Pan-India
                </div>
              </div>

              <div className="border-t border-dashed border-stone-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-serif text-lg text-[#3E2723]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#C85B24]">
                    ₹{(total + DELIVERY_CHARGE).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-right text-stone-400 mt-1">(Inclusive of all taxes)</p>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 bg-[#C85B24] text-white rounded-xl font-medium tracking-wide shadow-lg hover:shadow-xl hover:bg-[#B04A1B] hover:-translate-y-0.5 transition-all duration-300"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-stone-400 text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Checkout with Razorpay</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}