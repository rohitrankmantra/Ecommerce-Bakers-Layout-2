'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const transformCloudinary = (url, width = 800) => {
  if (!url?.includes('res.cloudinary.com')) return url
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
}

export default function CategoryMobileSlider({ categories }) {
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1))
  }

  const category = categories[index]

  return (
    <div className="relative md:hidden">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-cream border rounded-full flex items-center justify-center shadow"
        aria-label="Previous category"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-cream border rounded-full flex items-center justify-center shadow"
        aria-label="Next category"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="overflow-hidden px-10">
        <Link href={`/shop?category=${category.id}`} className="group block">
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-muted">
            <Image
              src={transformCloudinary(category.image, 800)}
              alt={category.name}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 80vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-center">
              <h3 className="font-serif text-lg md:text-2xl text-white">{category.name}</h3>
              <p className="text-white/80 text-sm hidden md:block">{category.description}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
