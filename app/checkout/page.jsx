'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { toast } from '@/hooks/use-toast'
import { OrderSuccessOverlay } from '@/components/order-success'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, total } = useCart()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)

  const isEmpty = items.length === 0
  const subtotal = useMemo(() => total, [total])
  const shipping = useMemo(() => (subtotal > 500 ? 0 : 40), [subtotal])
  const grandTotal = useMemo(() => subtotal + shipping, [subtotal, shipping])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const isValid = () => {
    return (
      form.name.trim().length >= 2 &&
      form.phone.trim().length >= 10 &&
      form.address.trim().length >= 5 &&
      form.city.trim().length >= 2 &&
      form.state.trim().length >= 2 &&
      form.pincode.trim().length >= 6
    )
  }

  const placeOrder = async () => {
    if (!isValid() || isEmpty) return
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      toast({
        title: 'Order placed',
        description: 'Thank you for choosing BakeMasters. Your order is confirmed.',
      })
      setSuccessVisible(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-card rounded-2xl border border-border p-10 text-center">
            <h1 className="font-serif text-3xl text-primary">Your cart is empty</h1>
            <p className="text-muted-foreground mt-2">
              Add some delicious items to proceed to checkout.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <OrderSuccessOverlay
        visible={successVisible}
        onDone={() => {
          setSuccessVisible(false)
          router.push('/checkout/success')
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl md:text-4xl text-primary">Checkout</h1>
        <p className="text-muted-foreground mt-2">
          Complete your details and review your order.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Customer Details */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
            <h2 className="font-serif text-xl text-primary mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="+91 9XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email (optional)</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="248001"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="House / Street / Area"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1">Delivery Notes (optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  placeholder="Any preferences or instructions"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-serif text-xl text-primary mb-4">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-primary">{item.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {item.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 rounded-md border border-border hover:bg-muted"
                        >
                          -
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 rounded-md border border-border hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-gold font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Shipping {shipping === 0 ? '(Free over ₹500)' : ''}
                </span>
                <span className="font-medium">₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg pt-2">
                <span className="font-semibold text-primary">Total</span>
                <span className="font-semibold text-gold">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={placeOrder}
              disabled={!isValid() || submitting}
              className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>

            <p className="text-xs text-muted-foreground mt-3">
              Cash on Delivery available. We will contact you to confirm your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
