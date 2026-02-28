'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    imageDesktop: '/homebanner.webp',
    imageMobile: '/homebannermobile1.png',
    alt: 'Freshly baked bundt cake with almonds',
  },
  {
    id: 2,
    imageDesktop: '/hero-banner2.jpeg',
    imageMobile: '/hero-banner2.jpeg',
    alt: 'Assorted premium cookies',
  },
 
  // Add more for better auto-scroll
]

function HeroSection() {
  const [current, setCurrent] = useState(0)
  const hasMultipleSlides = slides.length > 1

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!hasMultipleSlides) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, hasMultipleSlides])

  return (
    <section className="relative w-full h-[70vh] md:h-[60vh] overflow-hidden bg-linear-to-br from-amber-50 via-amber-100/40 to-orange-50/30">
      {/* Optional: Light decorative bakery pattern overlay (subtle, low opacity) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply">
        <Image
          src="/bg-pattern-light-bakery.jpg" // Yeh image add kar: subtle parchment/flour/light motifs wali light beige-cream
          alt="Bakery pattern background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        
        {/* LEFT: 75% Slider (desktop) */}
        <div className="hidden lg:block lg:w-[75%] h-full relative overflow-hidden rounded-r-none lg:rounded-r-none shadow-2xl">
          <picture className="absolute inset-0">
            <source media="(min-width: 1024px)" srcSet={slides[current].imageDesktop} />
            <img
              src={slides[current].imageMobile}
              alt={slides[current].alt}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </picture>

          {/* Light left-to-right linear overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-r from-black/5 via-transparent to-transparent pointer-events-none" />

          {hasMultipleSlides && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition"
              >
                <ChevronLeft className="w-7 h-7 mx-auto" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition"
              >
                <ChevronRight className="w-7 h-7 mx-auto" />
              </button>
            </>
          )}
        </div>

        {/* Mobile: Full width slider */}
        <div className="lg:hidden w-full h-[60vh] relative overflow-hidden shadow-xl">
          <picture className="absolute inset-0">
            <source media="(min-width: 768px)" srcSet={slides[current].imageDesktop} />
            <img
              src={slides[current].imageMobile}
              alt={slides[current].alt}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        {/* RIGHT: 25% Content - Very simple with logo */}
        <div className="w-full lg:w-[25%]  bg-[#f6f0e6]   flex flex-col items-center justify-center text-center px-6 py-12 lg:py-0 lg:px-8 rounded-t-3xl lg:rounded-t-none lg:rounded-r-3xl shadow-2xl relative z-20">
          {/* Logo on top */}
          <div className="mb-6 lg:mb-8">
            <Image
              src="/new-logo.png"          // <-- Apna real logo yahan daal (transparent bg wala best rahega)
              alt="BakeMasters Logo"
              width={140}               // Size adjust kar lena
              height={80}
              className="mx-auto drop-shadow-lg height-20"
              priority
            />
          </div>

          <h2 className="text-4xl md:text-5xl  font-bold text-[#000000] mb-8 lg:mb-10 leading-tight drop-shadow-lg">
            Freshly Baked
          </h2>

          <a
            href="/products"
            className="bg-[#CF784A] hover:bg-amber-600 text-white font-semibold text-xl py-4 px-12 rounded-full transition-all shadow-2xl hover:shadow-3xl hover:scale-105 duration-300"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection