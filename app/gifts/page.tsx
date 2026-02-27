'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gift, Sparkles, ShoppingBag } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import hampers from '@/lib/hampers.json'
import { useCart } from '@/components/cart-context'

export default function GiftingHampersPage() {
  const { addItem, setIsOpen } = useCart()

  return (
    <div className="min-h-screen bg-cream">
      <PageHero
        title="Gifting Hampers"
        subtitle="The Art of Gifting"
        description="Premium curated boxes for your loved ones, hand-packed with our finest selection of artisanal treats."
        backgroundImage="https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908535/_STU0310_ljsglm.webp"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 p-8 rounded-[2.5rem] bg-white/30 backdrop-blur-lg border border-white/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
              <Gift size={32} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-primary leading-none mb-2">Signature Gifting</h3>
              <p className="text-muted-foreground text-sm max-w-xs">Includes custom packaging, ribbons, and a personalized hand-written note.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/40 px-6 py-3 rounded-2xl border border-white">
            <Sparkles size={18} className="text-gold" />
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Handmade Fresh</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground text-sm uppercase tracking-tighter">
            <span className="text-primary font-bold">{hampers.length}</span> Premium Hampers Available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {hampers.map((hamper) => (
            <div key={hamper.id} className="group relative">
              <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={hamper.image || '/placeholder.svg'}
                    alt={hamper.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Hamper</span>
                  <h3 className="mt-1 font-serif text-lg text-primary leading-snug">{hamper.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{hamper.description}</p>
                  {hamper.items && hamper.items.length > 0 && (
                    <ul className="mt-3 text-sm text-muted-foreground list-disc list-inside">
                      {hamper.items.slice(0, 4).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 mb-5">
                    <span className="text-xl font-semibold text-gold">₹{hamper.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(true)
                        addItem({
                          name: hamper.name,
                          price: hamper.price,
                          image: hamper.image,
                        })
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingBag size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
