'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  {
    id: 'tea-time-cake',
    name: 'Tea Time Cake',
    image: 'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579288/_STU0300_h6yjs9.jpg',
    description: 'Celebration & everyday cakes',
  },
  {
    id: 'biscuit-and-confections',
    name: 'Biscuit & Confections',
    image: 'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579135/_STU0016_uweqqo.jpg',
    description: 'Crispy & buttery delights',
  },
  {
    id: 'rusk',
    name: 'Rusks',
    image: 'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579141/_STU0062_dicysj.jpg',
    description: 'Traditional baked rusks',
  },
  {
    id: 'fresh-bread',
    name: 'Fresh Bread',
    image: 'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579226/_STU0235_pxarhy.jpg',
    description: 'Breads baked fresh',
  },
]

export function CategoriesSection() {
  /* MOBILE SLIDER STATE */
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setDirection(-1)
    setIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1))
  }

  const slideVariants = {
    enter: (direction ) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-black uppercase tracking-widest text-sm font-medium">
            Explore Our
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary mt-3 font-extrabold">
            Categories
          </h2>
        </div>

        {/* ================= MOBILE SLIDER ================= */}
        <div className="relative md:hidden">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-cream border rounded-full flex items-center justify-center shadow"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-cream border rounded-full flex items-center justify-center shadow"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="overflow-hidden px-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <CategoryCard category={categories[index]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= DESKTOP GRID (UNCHANGED) ================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* CARD COMPONENT (REUSED) */
function CategoryCard({ category }) {
  return (
    <Link href={`/shop?category=${category.id}`} className="group block">
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-muted">
        <Image
          src={category.image}
          alt={category.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-center">
          <h3 className="font-serif text-lg md:text-2xl text-white">
            {category.name}
          </h3>
          <p className="text-white/80 text-sm hidden md:block">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
