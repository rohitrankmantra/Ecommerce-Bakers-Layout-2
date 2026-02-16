'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { useAuth } from '@/components/auth-context'
import { toast } from '@/hooks/use-toast'
import { OrderSuccessOverlay } from '@/components/order-success'
import api from '@/utils/axiosinstance'

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, removeItem, total, clearCart } = useCart()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: 'Please login first',
        description: 'You need to sign in to place an order',
      })
      router.push('/auth/login')
    }
  }, [user, router])

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)

  const isEmpty = items.length === 0

  const subtotal = useMemo(() => total, [total])
const grandTotal = subtotal


  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isValid = () =>
    form.name.trim().length >= 2 &&
    form.phone.trim().length >= 10 &&
    form.address.trim().length >= 5 &&
    form.city.trim().length >= 2 &&
    form.state.trim().length >= 2 &&
    form.postalCode.trim().length >= 6

  /**
   * PLACE ORDER → BACKEND CHECKOUT WITH RAZORPAY
   */
const placeOrder = async () => {
  if (!isValid() || isEmpty || submitting) return
  setSubmitting(true)

  try {
    const { data } = await api.post('/orders/checkout', {
      userInfo: form,
      items: items.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    })

    const { razorpayOrder } = data

    if (!window.Razorpay) {
      toast({
        title: 'Payment error',
        description: 'Razorpay SDK not loaded',
        variant: 'destructive',
      })
      setSubmitting(false)
      return
    }

    // ✅ Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // 🔥 PUBLIC KEY
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'BakeMasters',
      description: 'Order Payment',
      order_id: razorpayOrder.id,

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      handler: async function (response) {
        try {
          await api.post('/orders/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })

          clearCart()

          toast({
            title: 'Payment successful 🎉',
            description: 'Order confirmed',
          })

          router.push('/checkout/success')
        } catch (err) {
          toast({
            title: 'Payment verification failed',
            variant: 'destructive',
          })
          setSubmitting(false)
        }
      },

      theme: {
        color: '#7C3AED',
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  } catch (error) {
    toast({
      title: 'Checkout failed',
      description:
        error?.response?.data?.message || 'Something went wrong',
      variant: 'destructive',
    })
    setSubmitting(false)
  }
}



  if (isEmpty) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-card rounded-2xl border border-border p-10 text-center max-w-md">
          <h1 className="font-serif text-3xl text-primary">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">
            Add items before checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground"
          >
            Go to Shop
          </Link>
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
            <h2 className="font-serif text-xl text-primary mb-4">
              Customer Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['name', 'Full Name', 'Your name'],
                ['phone', 'Phone', '+91 9XXXXXXXXX'],
                ['email', 'Email (optional)', 'you@example.com'],
                ['city', 'City', 'City'],
                ['state', 'State', 'State'],
                ['postalCode', 'postalCode', '248001'],
              ].map(([name, label, placeholder]) => (
                <div key={name}>
                  <label className="block text-sm text-muted-foreground mb-1">
                    {label}
                  </label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1">
                  Delivery Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-serif text-xl text-primary mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-muted">
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
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-gold font-medium mt-2">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between text-lg pt-2 font-semibold">
                <span>Total</span>
                <span className="text-gold">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={!isValid() || submitting}
              className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground
                         hover:bg-primary/90 transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>

            <p className="text-xs text-muted-foreground mt-3">
              Secure checkout • Payment verified • COD supported
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
