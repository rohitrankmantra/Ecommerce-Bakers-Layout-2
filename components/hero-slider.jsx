'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'


const slides = [
  { id: 1, imageDesktop: '/homebanner.webp', imageMobile: '/homebannermobile1.png', label: 'THE ART OF BAKING' },
  { id: 2, imageDesktop: '/hero-banner2.jpeg', imageMobile: '/hero-banner2.jpeg', label: 'HANDCRAFTED DAILY' },
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
    <section className="relative w-full lg:h-[65vh] flex flex-col lg:flex-row bg-[#FAF9F6] overflow-hidden">
      
      {/* LEFT: SLIDER SECTION */}
      <div className="relative w-full h-[45vh] lg:h-full lg:w-[80%] overflow-hidden bg-stone-100">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${
              index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.imageDesktop} 
              alt="Baking"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
        
        {/* DESKTOP ARROW KEYS */}
        <div className="hidden lg:flex absolute bottom-8 left-8 z-30 space-x-3">
          <button onClick={prevSlide} className="p-3 border-[0.5px] border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-sm">
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button onClick={nextSlide} className="p-3 border-[0.5px] border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-sm">
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* RIGHT: CONTENT PANEL (Responsive Fix Applied) */}
 {/* Updated background to #EEE3D2 */}
<div className="relative w-full min-h-[45vh] lg:h-full lg:w-[25%] bg-gradient-to-b from-[#F9F6F1] to-[#EEE3D2] flex flex-col items-center justify-start gap-4 lg:gap-6 px-8 py-12 lg:py-20 border-t lg:border-t-0 lg:border-l border-stone-300/30">
  
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

  {/* LOGO - Reduced margins to bring text closer */}
  <div className="absolute -top-8 lg:static lg:top-0 z-40 bg-transparent p-1 lg:p-0">
    <Image
      src="/new-logo.png"
      alt="Logo"
      width={100}
      height={50}
      className="object-contain w-[70px] lg:w-[100px]"
    />
  </div>

  {/* Text Section - Adjusted margins and spacing */}
  <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 mt-2 lg:mt-4 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1c1c1c] tracking-tight leading-tight mb-4 lg:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <span className="block">
        DESSERTS
      </span>
      {/* Sub-header: increased size and tightened tracking for better visibility */}
      <span className="text-[#B44B1E] uppercase text-[12px] lg:text-[13px] tracking-[0.3em] font-extrabold block mt-2">
        made to impress
      </span>
    </h2>

    <Link
      href="/shop"
      aria-label="Go to shop"
      className="group relative z-50 inline-flex items-center justify-center px-8 py-3 bg-[#C85B24] rounded-full text-white transition-all duration-500 ease-in-out overflow-hidden hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
    >
      <div className="absolute inset-0 z-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      
      {/* Button Text: increased size slightly for legibility */}
      <span className="relative z-10 text-[11px] lg:text-[10px] uppercase tracking-[0.2em] font-black">
        Order Now
      </span>
    </Link>
  </div>

  {/* MOBILE NAVIGATION */}
  <div className="flex lg:hidden absolute bottom-6 space-x-6 z-20">
    <button onClick={prevSlide} className="p-2 text-stone-500 hover:text-stone-800">
      <ChevronLeft size={20} strokeWidth={1} />
    </button>
    <div className="w-px h-6 bg-stone-300/50" />
    <button onClick={nextSlide} className="p-2 text-stone-500 hover:text-stone-800">
      <ChevronRight size={20} strokeWidth={1} />
    </button>
  </div>
</div>
    </section>
  )
}

export default HeroSection
