'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    imageDesktop: '/homebanner.webp',
    imageMobile: '/homebannermobile1.png',
  },
]

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const hasMultipleSlides = slides.length > 1

  const nextSlide = useCallback(() => {
    if (!hasMultipleSlides) return
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [hasMultipleSlides])

  const prevSlide = useCallback(() => {
    if (!hasMultipleSlides) return
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [hasMultipleSlides])

  useEffect(() => {
    if (!hasMultipleSlides) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, hasMultipleSlides])

  return (
    <section className="relative w-full h-[70vh] md:h-[75vh]">
      <div className="absolute inset-0">
        <picture className="absolute inset-0">
          <source media="(min-width: 768px)" srcSet={slides[current].imageDesktop} />
          <img
            src={slides[current].imageMobile}
            alt={`Slide ${current + 1}`}
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      {hasMultipleSlides && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </section>
  )
}

export default HeroSlider
