'use client'

import { useMemo, useState, useEffect, useRef, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'
import { orderedProducts } from '@/lib/products'
import { useCart } from '@/components/cart-context'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export default function ProductDetailPage({ params }) {
  const unwrappedParams = use(params)
  const param = unwrappedParams.id
  const slugify = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  const product = useMemo(() => {
    const maybeId = parseInt(param, 10)
    if (!isNaN(maybeId)) {
      const foundById = orderedProducts.find((p) => p.id === maybeId)
      if (foundById) return foundById
    }
    const paramSlug = slugify(param)
    return orderedProducts.find((p) => slugify(p.name) === paramSlug)
  }, [param])
  const router = useRouter()

  useEffect(() => {
    if (!product) router.push('/shop')
  }, [product, router])

  if (!product) return null

  const images = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.slice(0, 3)
    }
    return [
      product.image,
      product.image,
      product.image,
    ]
  }, [product])

  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const carouselApiRef = useRef(null)
  const setApi = (api) => {
    carouselApiRef.current = api
    if (!api) return
    api.on('select', () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }

  const handleThumbClick = (index) => {
    setActiveIndex(index)
    carouselApiRef.current?.scrollTo(index)
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* BACK BUTTON FOR SMALL DEVICES */}
        <div className="block lg:hidden mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-gold transition bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT – IMAGE + BACK BUTTON FOR LARGE DEVICES */}
          <div className="relative flex flex-col items-center pt-6 lg:pt-8">
            {/* BACK BUTTON FOR LARGE SCREENS */}
            <button
              onClick={() => router.back()}
              className="hidden lg:flex absolute -top-2 -left-8 z-30 mb-4 items-center gap-2 text-primary hover:text-gold transition bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="relative w-full max-w-2xl z-10">
              <Carousel setApi={setApi} opts={{ align: 'center' }}>
                <CarouselContent>
                  {images.map((src, i) => (
                    <CarouselItem key={i}>
                      <div
                        className="relative aspect-4/3 sm:aspect-3/2 rounded-xl overflow-hidden bg-muted cursor-zoom-in"
                        onClick={() => setLightboxOpen(true)}
                      >
                        <Image
                          src={src || '/placeholder.svg'}
                          alt={`${product.name} ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 ease-out"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="h-12 w-12 -left-6 bg-white/90 backdrop-blur shadow-xl hover:bg-primary hover:text-white transition">
                  <ChevronLeft className="w-6 h-6" />
                </CarouselPrevious>
                <CarouselNext className="h-12 w-12 -right-6 bg-white/90 backdrop-blur shadow-xl hover:bg-primary hover:text-white transition">
                  <ChevronRight className="w-6 h-6" />
                </CarouselNext>
              </Carousel>
            </div>
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogContent className="bg-transparent border-none p-0 sm:max-w-3xl w-[95vw] sm:w-[85vw] h-auto rounded-xl shadow-2xl">
                <DialogTitle className="sr-only">{product.name}</DialogTitle>
                <div className="relative w-full aspect-4/3 sm:aspect-3/2">
                  <Image
                    src={images[activeIndex] || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* BOTTOM THUMBNAILS */}
            <div className="relative z-20 mt-4">
              <div className="flex justify-center gap-3 flex-wrap">
                {images.map((src, i) => {
                  const isActive = i === activeIndex
                  return (
                    <div
                      key={i}
                      className={`
                        w-24 h-24 sm:w-28 sm:h-28 shrink-0
                        p-0.75 rounded-lg
                        bg-white/30 backdrop-blur-md
                        transition-all duration-300
                        ${isActive
                          ? 'border-2 border-gold scale-[1.05] shadow-md'
                          : 'border border-gray-300 hover:scale-105'}
                      `}
                    >
                      <button
                        onClick={() => handleThumbClick(i)}
                        className="w-full h-full relative rounded-lg overflow-hidden"
                      >
                        <Image
                          src={src || '/placeholder.svg'}
                          alt={`Thumb ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div>
            <span className="text-gold uppercase tracking-widest text-sm font-semibold">
              {product.category}
            </span>

            <h1 className="font-serif text-4xl lg:text-5xl text-primary mt-3 leading-tight">
              {product.name}
            </h1>

            <p className="text-gold text-3xl font-semibold mt-4">
              ₹{product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mt-6 max-w-md leading-relaxed">
              {product.description}
            </p>

            <ul className="mt-6 space-y-2 text-muted-foreground">
              {[
                'Freshly baked every morning',
                'Premium quality ingredients sourced locally',
                '100% Eggless options available',
                'Free delivery on orders above ₹500',
                'Customizable sweetness levels',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            {/* QUANTITY + ADD TO CART INLINE */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setQty((q) => Math.max(q - 1, 1))}
                className="w-10 h-10 rounded-full bg-muted hover:bg-beige flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="font-medium w-10 text-center">{qty}</span>

              <button
                onClick={() => setQty((q) => Math.min(q + 1, 20))}
                className="w-10 h-10 rounded-full bg-muted hover:bg-beige flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* ADD TO CART INLINE */}
              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) addItem(product)
                }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition ml-4"
              >
                Add to Cart
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
