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
      <div className="relative w-full h-[55%] lg:h-full lg:w-[78%] overflow-hidden bg-stone-100">
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
    <div className="relative w-full h-[45%] lg:h-full lg:w-[25%] xl:w-[22%] shrink-0 bg-white/95 flex flex-col items-center justify-between p-4 lg:py-8 overflow-hidden shadow-xl border-t lg:border-t-0 lg:border-l border-border/50 gap-4">
        
  {/* --- BACKGROUND LAYER --- */}
  <div className="absolute inset-0 pointer-events-none">
    <Image 
      src="https://img.freepik.com/premium-vector/bakery-seamless-pattern_91756-13285.jpg?semt=ais_hybrid" 
      alt="Background Pattern" 
      fill 
      className="object-cover opacity-30"
    />
  </div>

  {/* TOP: LOGO */}
  <div className="relative z-40 flex flex-col items-center">
    <div className="drop-shadow-lg">
      <Image
        src="/new-logo.png"
        alt="Logo"
        width={140}
        height={70}
        className="object-contain w-20 lg:w-28 xl:w-32 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
      />
    </div>
  </div>

  {/* MIDDLE: MAIN MESSAGE */}
  {/* Removed the bulky glass box padding to keep the layout clean and spacious */}
  <Link 
    href="/shop"
    className="relative z-10 flex flex-col items-center text-center group cursor-pointer w-full px-2"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="relative transition-all duration-500 group-hover:-translate-y-1 w-full flex flex-col items-center">
      
      {/* whitespace-nowrap prevents "TAP HERE" from ever stacking */}
      <h2 className="text-4xl lg:text-4xl xl:text-5xl font-cursive font-normal text-black leading-none tracking-normal drop-shadow-md whitespace-nowrap">
        Tap Here
      </h2>
      
      {/* Removed max-w, reduced font size on mid-screens, and adjusted tracking to fit cleanly */}
      <p className="text-black/80 font-medium text-[10px] lg:text-[11px] xl:text-sm tracking-wider mt-2 w-full leading-relaxed drop-shadow-sm px-2 capitalize">
        to get delicious treats delivered
      </p>
      
      <div className="mt-4 lg:mt-5 flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-black" />
        <div className="relative flex items-center justify-center">
          <div className="absolute w-2 h-2 rounded-full bg-black/20 animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
        </div>
        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-black" />
      </div>
    </div>
  </Link>

  {/* BOTTOM: SOCIAL */}
  <div className="relative z-10 flex flex-col items-center gap-2">
    <a 
      href="https://www.instagram.com/bakemasters.in" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1.5 group"
    >
      <div className="p-2 rounded-full bg-black/10 border border-black/20 text-black backdrop-blur-md shadow-lg transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:-translate-y-1">
        <Instagram size={16} />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-black/70 group-hover:text-black transition-colors">
          Follow us at
        </span>
        <span className="text-[10px] lg:text-xs font-black text-black tracking-widest mt-0.5 group-hover:text-black transition-colors drop-shadow-md">
          @BAKEMASTERS.IN
        </span>
      </div>
    </a>
  </div>

  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent hidden lg:block" />
</div>
    </section>
  )
}

export default HeroSection
