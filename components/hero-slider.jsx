'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
      <div className="relative w-full h-[45vh] lg:h-full lg:w-[72%] overflow-hidden bg-stone-100">
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
<div className="relative w-full min-h-[45vh] lg:h-full lg:w-[28%] bg-gradient-to-b from-[#F9F6F1] to-[#EEE3D2] flex flex-col items-center lg:justify-between px-8 py-12 lg:py-16 border-t lg:border-t-0 lg:border-l border-stone-300/30">
  
  {/* --- BACKGROUND LAYER: Dots & SVGs (Contained so they don't leak, but allow logo to overlap) --- */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.12]" 
      style={{ 
        backgroundImage: `radial-gradient(#1c1c1c 1px, transparent 0)`, 
        backgroundSize: '24px 24px' 
      }} 
    />
    {/* Cake SVG */}
    <svg className="absolute top-12 -right-6 opacity-[0.05] w-24 h-24 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8m16 0H4m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m13-14a3 3 0 11-6 0c0-1.657 1.343-3 3-3s3 1.343 3 3z" />
    </svg>
    {/* Croissant SVG */}
    <svg className="absolute bottom-32 -left-6 opacity-[0.05] w-24 h-24 text-stone-900 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 15c2-2 4-3 7-3s5 1 7 3m-12-3c1.5-2 3.5-3 6-3s4.5 1 6 3m-10-3c1-2 2.5-3 4-3s3 1 4 3" />
    </svg>
  </div>

  {/* LOGO - Now visible because overflow-hidden is moved to the bg layer */}
  <div className="absolute -top-8 lg:static lg:top-0 z-40 bg-transparent p-1 lg:p-0 rounded-full lg:rounded-none lg:mb-4">
    <Image
      src="/new-logo.png"
      alt="Logo"
      width={110}
      height={55}
      className="object-contain w-[75px] lg:w-[130px]"
    />
  </div>

  {/* Text Section */}
  <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 lg:my-auto ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <p className="text-[9px] uppercase tracking-[0.5em] text-stone-600 mb-4 lg:mb-6 font-bold">
      {slides[current].label}
    </p>
    
    <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-sans font-black text-[#1c1c1c] tracking-tight leading-[0.95] mb-6 lg:mb-10 whitespace-nowrap lg:whitespace-normal">
      Freshly <br className="hidden lg:block" />
      <span className="text-[#C85B24] uppercase text-xl sm:text-2xl lg:text-3xl tracking-widest font-light ml-2 lg:ml-0">Baked</span>
    </h2>

    <a
      href="/products"
      className="group relative inline-flex items-center justify-center px-10 py-3 lg:px-12 lg:py-5 bg-[#1c1c1c] rounded-full text-white transition-all duration-500 overflow-hidden"
    >
      <span className="relative z-10 text-[10px] lg:text-[11px] uppercase tracking-[0.4em] font-bold">
        Order Now
      </span>
      <div className="absolute inset-0 bg-[#C85B24] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </a>
  </div>

  {/* MOBILE NAVIGATION */}
  <div className="flex lg:hidden absolute bottom-6 space-x-6 z-20">
    <button onClick={prevSlide} className="p-2 text-stone-500 hover:text-stone-800 transition-colors">
      <ChevronLeft size={20} strokeWidth={1} />
    </button>
    <div className="w-px h-6 bg-stone-300/50" />
    <button onClick={nextSlide} className="p-2 text-stone-500 hover:text-stone-800 transition-colors">
      <ChevronRight size={20} strokeWidth={1} />
    </button>
  </div>
</div>
    </section>
  )
}

export default HeroSection