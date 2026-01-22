'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    imageDesktop: '/homebanner1.png',
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
    <section className="relative w-full h-[70vh] md:h-[75vh] md:-mt-8.5">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <Image
            src={slides[current].imageDesktop}
            alt={`Slide ${current + 1}`}
            fill
            priority
            quality={90}
            className="hidden md:block object-contain"
          />

          {/* Mobile Image */}
          <Image
            src={slides[current].imageMobile}
            alt={`Slide ${current + 1}`}
            fill
            priority
            quality={90}
            className="block md:hidden object-cover"
          />
        </motion.div>
      </AnimatePresence>

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
