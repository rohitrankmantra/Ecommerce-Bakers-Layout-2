'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/lib/products'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function GalleryPreview() {
  const previewImages = galleryImages.slice(0, 6)

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Visual Delights
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3">
            Our Gallery
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {previewImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-4/3">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Bakery gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-serif text-sm md:text-base px-4 py-2 border border-white/50 rounded-lg backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-10"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-wide text-sm"
          >
            View Full Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
