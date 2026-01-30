'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Play, Pause } from 'lucide-react'
import { galleryImages, galleryVideos } from '@/lib/products'
import { PageHero } from '@/components/page-hero'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

/* ---------------- ANIMATIONS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/* ---------------- VIDEO CARD ---------------- */
function VideoCard({ src, isPlaying, onPlay, onPause, setEl }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const onEnded = () => onPause?.()
    el.addEventListener('ended', onEnded)
    return () => el.removeEventListener('ended', onEnded)
  }, [])

  useEffect(() => {
    if (typeof setEl === 'function') {
      setEl(videoRef.current)
    }
  }, [setEl])

  return (
    <div
      className="
        group relative
        aspect-9/16
        w-full
        max-w-65 sm:max-w-75 md:max-w-85
        mx-auto
        overflow-hidden
        rounded-2xl
        bg-black
      "
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        muted={false}
        controls={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <button
        type="button"
        onClick={() => (isPlaying ? onPause?.() : onPlay?.())}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-16 h-16
          rounded-full
          bg-card/40 backdrop-blur-md
          border border-white/30
          text-white
          flex items-center justify-center
          shadow-lg
          hover:bg-card/60
          transition-colors
        "
      >
        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
      </button>

      <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
    </div>
  )
}

/* ---------------- PAGE ---------------- */
export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const videoEls = useRef([])
  const carouselApiRef = useRef(null)

  const setApi = (api) => {
    carouselApiRef.current = api
  }

  const pauseAll = () => {
    videoEls.current.forEach((el) => {
      if (el) {
        try {
          el.pause()
        } catch {}
      }
    })
    setCurrentPlaying(null)
  }

  useEffect(() => {
    const api = carouselApiRef.current
    if (!api) return
    const onSelect = () => pauseAll()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => api.off('select', onSelect)
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* ---------------- HERO ---------------- */}
      <PageHero
        title="Our Gallery"
        subtitle="Visual Delights"
        description="A visual journey through our artisan creations. Each image tells a story of passion, craftsmanship, and delicious moments."
        backgroundImage="https://res.cloudinary.com/dzq7axes2/image/upload/v1769579285/_STU0309_ktbfso.jpg"
      />

      {/* ---------------- IMAGE GRID ---------------- */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square">
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------------- VIDEO SLIDER ---------------- */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="mb-6">
          <span className="text-gold uppercase tracking-widest text-sm">
            Client Videos
          </span>
          <h2 className="font-serif text-2xl text-primary mt-2">
            Video Gallery
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: 'center', loop: false }}
          className="w-full"
        >
          <CarouselContent>
            {galleryVideos.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div variants={itemVariants}>
                  <VideoCard
                    src={src}
                    isPlaying={currentPlaying === index}
                    onPlay={() => {
                      videoEls.current.forEach((el, i) => {
                        if (el && i !== index) {
                          try {
                            el.pause()
                          } catch {}
                        }
                      })
                      const el = videoEls.current[index]
                      if (el) {
                        try {
                          el.play()
                          setCurrentPlaying(index)
                        } catch {}
                      }
                    }}
                    onPause={() => {
                      const el = videoEls.current[index]
                      if (el) {
                        try {
                          el.pause()
                        } catch {}
                      }
                      if (currentPlaying === index) {
                        setCurrentPlaying(null)
                      }
                    }}
                    setEl={(el) => {
                      videoEls.current[index] = el
                    }}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-cream border border-border hover:bg-primary hover:text-white" />
          <CarouselNext className="bg-cream border border-border hover:bg-primary hover:text-white" />
        </Carousel>

        {/* Swipe indicator for small devices */}
        <div className="sm:hidden flex items-center justify-center mt-4 gap-2">
          <svg
            className="w-5 h-5 text-gold animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm text-gold tracking-wide">Swipe for more</span>
          <svg
            className="w-5 h-5 text-gold animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-card/30 rounded-full flex items-center justify-center text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-4/3 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery preview"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
