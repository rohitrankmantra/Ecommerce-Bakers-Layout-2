'use client'

import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary">Order Confirmed</h1>
        <p className="text-muted-foreground mt-2">
          Your order has been placed successfully.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/shop"
            className="px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-border bg-cream text-primary hover:bg-beige transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

