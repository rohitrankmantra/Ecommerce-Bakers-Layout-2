'use client'

import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/lib/products'

export function GalleryPreview() {
  const previewImages = galleryImages.slice(0, 6)

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-black uppercase tracking-widest text-sm font-medium">
            Visual Delights
          </span>
          <h2 className="font-serif normal-case text-3xl md:text-5xl text-primary mt-3 mb-6 font-extrabold">
            Our Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-4/3">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Bakery gallery image ${index + 1}`}
                  fill
                  loading="lazy"
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
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-wide text-sm"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
