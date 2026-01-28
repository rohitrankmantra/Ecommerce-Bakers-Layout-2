'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Play, Pause } from 'lucide-react'
import { galleryImages, galleryVideos } from '@/lib/products'
import { PageHero } from '@/components/page-hero'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

function VideoCard({ src }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const onEnded = () => setPlaying(false)
    el.addEventListener('ended', onEnded)
    return () => {
      el.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play()
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src={src}
        playsInline
        muted={false}
        controls={false}
        className="absolute inset-0 w-full h-full object-cover"
        poster=""
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-card/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg hover:bg-card/60 transition-colors"
      >
        {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
      </button>
      <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
    </div>
  )
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section with Background Image */}
      <PageHero
        title="Our Gallery"
        subtitle="Visual Delights"
        description="A visual journey through our artisan creations. Each image tells a story of passion, craftsmanship, and delicious moments."
        backgroundImage="https://res.cloudinary.com/dzq7axes2/image/upload/v1769579285/_STU0309_ktbfso.jpg"
      />

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
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
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ₹{
                index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Bakery gallery image ₹{index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="bg-card/90 backdrop-blur-sm text-primary font-serif px-6 py-3 rounded-xl">
                    View
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6">
          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Client Videos
          </span>
          <h2 className="font-serif text-2xl text-primary mt-2">Video Gallery</h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4"
        >
          {galleryVideos.map((src, index) => (
            <motion.div key={index} variants={itemVariants}>
              <VideoCard src={src} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
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
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-card/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-card/40 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
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
