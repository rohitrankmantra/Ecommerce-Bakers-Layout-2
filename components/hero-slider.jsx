'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
      <div className="relative w-full h-[30%] lg:h-full lg:w-[22%] bg-linear-to-b from-[#F9F6F1] to-[#EEE3D2] flex flex-col items-center justify-center gap-1.5 lg:gap-4 px-6 py-4 lg:py-10 border-t lg:border-t-0 lg:border-l border-stone-300/30">
        
        {/* --- BACKGROUND LAYER --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.06]" 
            style={{ 
              backgroundImage: `radial-gradient(#1c1c1c 1px, transparent 0)`, 
              backgroundSize: '30px 30px' 
            }} 
          />
        </div>

        {/* LOGO */}
        <div className="relative z-40 mb-1">
          <Image
            src="/new-logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="object-contain w-11.25 sm:w-13.75 lg:w-21.25"
          />
        </div>

        {/* Text Section */}
        <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-[#1c1c1c] tracking-tight leading-tight mb-1.5 lg:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <span className="block">
              DESSERTS
            </span>
            <span className="text-[#B44B1E] uppercase text-[9px] sm:text-[11px] lg:text-[12px] tracking-[0.3em] font-extrabold block mt-1 sm:mt-1.5">
              made to impress
            </span>
          </h2>

          <Link
            href="/shop"
            aria-label="Go to shop"
            className="group relative z-50 inline-flex items-center justify-center px-5 py-2 sm:px-7 sm:py-2.5 bg-[#C85B24] rounded-full text-white transition-all duration-500 ease-in-out overflow-hidden hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <div className="absolute inset-0 z-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-[8px] sm:text-[10px] lg:text-[9px] uppercase tracking-[0.2em] font-black">
              Order Now
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
