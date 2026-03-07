'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const slides = [
  { id: 1, imageDesktop: '/hero-1.jpeg', imageMobile: '/mob-1.jpeg', label: 'THE ART OF BAKING' },
  { id: 2, imageDesktop: '/hero-2.jpeg', imageMobile: '/mob-2.jpeg', label: 'HANDCRAFTED DAILY' },
]

function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  const changeSlide = useCallback((index) => {
    setFade(false)
    setTimeout(() => {
      setCurrent(index)
      setFade(true)
    }, 400)
  }, [])

  const nextSlide = useCallback(() => {
    changeSlide((current + 1) % slides.length)
  }, [current, changeSlide])

  const prevSlide = useCallback(() => {
    changeSlide((current - 1 + slides.length) % slides.length)
  }, [current, changeSlide])

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full h-137.5 sm:h-162.5 lg:h-100 flex flex-col lg:flex-row bg-[#FAF9F6] overflow-hidden">
      
      {/* LEFT: SLIDER SECTION */}
      <div className="relative w-full h-[70%] lg:h-full lg:w-[78%] overflow-hidden bg-stone-100">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1500 ease-out ${
              index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Desktop Image */}
            <div className="hidden lg:block relative w-full h-full">
              <Image
                src={slide.imageDesktop} 
                alt="Baking Desktop"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            {/* Mobile Image */}
            <div className="block lg:hidden relative w-full h-full">
              <Image
                src={slide.imageMobile} 
                alt="Baking Mobile"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
        
        {/* DESKTOP ARROW KEYS */}
        <div className="hidden lg:flex absolute bottom-6 left-6 z-30 space-x-2">
          <button onClick={prevSlide} className="p-2.5 border-[0.5px] border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-sm">
            <ChevronLeft size={14} strokeWidth={1.5} />
          </button>
          <button onClick={nextSlide} className="p-2.5 border-[0.5px] border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-sm">
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* RIGHT: CONTENT PANEL */}
      <div className="relative w-full h-[35%] lg:h-full lg:w-[22%] bg-[#D2B48C] flex flex-col items-center justify-between px-6 py-6 lg:py-12 border-t lg:border-t-0 lg:border-l border-stone-300/30">
        
        {/* --- BACKGROUND LAYER --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.1]" 
            style={{ 
              backgroundImage: `radial-gradient(#1c1c1c 1px, transparent 0)`, 
              backgroundSize: '24px 24px' 
            }} 
          />
          {/* Subtle floral/organic overlay if desired - keeping it clean for now */}
        </div>

        {/* TOP: LOGO */}
        <div className="relative z-40 flex flex-col items-center">
          <Image
            src="/new-logo.png"
            alt="Logo"
            width={120}
            height={60}
            className="object-contain w-14 sm:w-16 lg:w-24"
          />
          <div className="h-[1px] w-8 bg-black/20 mt-4 hidden lg:block" />
        </div>

        {/* MIDDLE: MAIN MESSAGE */}
        <Link 
          href="/shop"
          className="relative z-10 flex flex-col items-center text-center group transition-transform duration-300 hover:scale-105"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white leading-tight tracking-tight drop-shadow-md">
            TAP HERE
          </h2>
          <p className="text-white font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.2em] mt-2 lg:mt-4 max-w-[180px]">
            TO GET OUR PRODUCTS DELIVERED PAN-INDIA
          </p>
          
          {/* Animated indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <div className="w-8 h-[1px] bg-white/60" />
          </div>
        </Link>

        {/* BOTTOM: SOCIAL */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <a 
            href="https://www.instagram.com/bakemasters.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
          >
            <Instagram size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] lg:text-[11px] font-bold uppercase tracking-widest">
              FOLLOW US AT
            </span>
          </a>
          <span className="text-[11px] lg:text-[13px] font-black text-white/90 tracking-tighter">
            bakemasters.in
          </span>
        </div>

        {/* Decorative Bookmark "Notch" or Edge - Optional refinement */}
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/10 hidden lg:block" />
      </div>
    </section>
  )
}

export default HeroSection
