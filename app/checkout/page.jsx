'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { State, City } from 'country-state-city'
import { motion, AnimatePresence } from 'framer-motion' // Added for smooth glass transitions
import { ChevronDown, Check } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { useAuth } from '@/components/auth-context'
import { toast } from '@/hooks/use-toast'
import { OrderSuccessOverlay } from '@/components/order-success'
import api from '@/utils/axiosinstance'

// --- Custom Glass Dropdown Component ---
const GlassSelect = ({ label, placeholder, options, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border transition-all
          ${disabled ? 'opacity-50 cursor-not-allowed bg-muted/30' : 'bg-background/60 backdrop-blur-md hover:bg-background/80'}
          ${isOpen ? 'ring-2 ring-primary/20 border-primary' : ''}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-[100] w-full mt-2 max-h-60 overflow-y-auto rounded-xl border border-border 
                       bg-white/90 backdrop-blur-xl shadow-2xl custom-scrollbar"
          >
            {options.map((opt) => (
              <div
                key={opt.isoCode || opt.name}
                onClick={() => {
                  onChange(opt.name, opt.isoCode)
                  setIsOpen(false)
                }}
                className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-primary/5 transition-colors"
              >
                <span className="text-sm">{opt.name}</span>
                {value === opt.name && <Check className="w-4 h-4 text-primary" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, removeItem, total, clearCart } = useCart()

  const allStates = useMemo(() => State.getStatesOfCountry('IN'), [])

  useEffect(() => {
    if (!user) {
      toast({ title: 'Please login first', description: 'You need to sign in to place an order' })
      router.push('/auth/login')
    }
  }, [user, router])

  const [form, setForm] = useState({
    phone: '', address: '', city: '', state: '', stateCode: '', postalCode: '', notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)

  const isEmpty = items.length === 0
  const subtotal = useMemo(() => total, [total])
  const grandTotal = subtotal

  const citiesOfState = useMemo(() => {
    return form.stateCode ? City.getCitiesOfState('IN', form.stateCode) : []
  }, [form.stateCode])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isValid = () =>
    form.phone.trim().length >= 10 &&
    form.address.trim().length >= 5 &&
    form.city.length > 0 &&
    form.state.length > 0 &&
    form.postalCode.trim().length >= 6

  const placeOrder = async () => {
    if (!isValid() || isEmpty || submitting) return
    setSubmitting(true)

    try {
      const { data } = await api.post('/orders/checkout', {
        userInfo: {
          name: user?.name || '',
          email: user?.email || '',
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          notes: form.notes,
        },
        items: items.map((item) => ({
          productId: item._id, name: item.name, price: item.price, quantity: item.quantity, image: item.image,
        })),
      })

      const { razorpayOrder } = data
      if (!window.Razorpay) {
        toast({ title: 'Payment error', description: 'Razorpay SDK not loaded', variant: 'destructive' })
        setSubmitting(false); return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'BakeMasters',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        prefill: { name: user?.name || '', email: user?.email || '', contact: form.phone },
        handler: async function (response) {
          try {
            await api.post('/orders/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            clearCart()
            toast({ title: 'Payment successful 🎉', description: 'Order confirmed' })
            router.push('/checkout/success')
          } catch (err) {
            toast({ title: 'Payment verification failed', variant: 'destructive' })
            setSubmitting(false)
          }
        },
        theme: { color: '#7C3AED' },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      toast({ title: 'Checkout failed', description: error?.response?.data?.message || 'Something went wrong', variant: 'destructive' })
      setSubmitting(false)
    }
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl border border-border p-10 text-center max-w-md">
          <h1 className="font-serif text-3xl text-primary">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">Add items before checkout.</p>
          <Link href="/shop" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground">
            Go to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <OrderSuccessOverlay visible={successVisible} onDone={() => { setSuccessVisible(false); router.push('/checkout/success') }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl text-primary mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE: Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white shadow-xl p-6 md:p-8">
              <h2 className="text-xl font-serif text-primary mb-6">Delivery Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                    <div className="w-full px-4 py-2.5 rounded-lg border border-border bg-white/20 backdrop-blur-sm text-gray-700 font-medium">
                      {user?.name || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Email</label>
                    <div className="w-full px-4 py-2.5 rounded-lg border border-border bg-white/20 backdrop-blur-sm text-gray-700 font-medium text-sm truncate">
                      {user?.email || 'N/A'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                  <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 9XXXXXXXXX" className="w-full px-4 py-2.5 rounded-lg border border-border bg-white/40 focus:bg-white/60 transition" />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Postal Code</label>
                  <input name="postalCode" value={form.postalCode} onChange={onChange} placeholder="248001" className="w-full px-4 py-2.5 rounded-lg border border-border bg-white/40 focus:bg-white/60 transition" />
                </div>

                <GlassSelect 
                  label="State" 
                  placeholder="Select State" 
                  options={allStates} 
                  value={form.state} 
                  onChange={(name, code) => setForm(f => ({ ...f, state: name, stateCode: code, city: '' }))} 
                />

                <GlassSelect 
                  label="City" 
                  placeholder="Select City" 
                  options={citiesOfState} 
                  value={form.city} 
                  disabled={!form.state}
                  onChange={(name) => setForm(f => ({ ...f, city: name }))} 
                />

                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-1">Address</label>
                  <textarea name="address" value={form.address} onChange={onChange} rows={3} placeholder="House No, Street, Area..." className="w-full px-4 py-2.5 rounded-lg border border-border bg-white/40 focus:bg-white/60 transition" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-1">Delivery Notes (optional)</label>
                  <textarea name="notes" value={form.notes} onChange={onChange} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-border bg-white/40 focus:bg-white/60 transition" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white p-6 sticky top-8 shadow-2xl">
              <h2 className="font-serif text-xl text-primary mb-4">Order Summary</h2>

              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-white/40 flex-shrink-0">
                      <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-primary text-sm truncate">{item.name}</p>
                        <button onClick={() => removeItem(item._id)} className="text-[13px] text-red-400 hover:text-red-600 ml-2">Remove</button>
                      </div>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-gold font-medium text-sm mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 font-semibold">
                  <span>Total</span>
                  <span className="text-gold">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={!isValid() || submitting}
                className="w-full mt-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg active:scale-[0.98]"
              >
                {submitting ? 'Placing Order…' : 'Place Order'}
              </button>

              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest opacity-60">
               Secure checkout • Payment verified
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>
    </div>
  )
}