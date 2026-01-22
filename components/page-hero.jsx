'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function PageHero({ 
  title, 
  subtitle, 
  description, 
  backgroundImage 
}) {
  return (
    <div className="relative h-[50vh] min-h-100 max-h-125 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-primary/60 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {subtitle && (
              <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
                {subtitle}
              </span>
            )}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
              {title}
            </h1>
            {description && (
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom curve
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z"
            className="fill-cream"
          />
        </svg>
      </div> */}
    </div>
  )
}
