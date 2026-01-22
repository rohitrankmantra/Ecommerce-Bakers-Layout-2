'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    id: 'cakes',
    name: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    description: 'Celebration & everyday cakes',
  },
  {
    id: 'biscuits',
    name: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
    description: 'Crispy & buttery delights',
  },
  {
    id: 'rusk',
    name: 'Rusk',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    description: 'Traditional baked rusks',
  },
  {
    id: 'other',
    name: 'Other Items',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80',
    description: 'Pastries, breads & more',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-8 md:pb-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Explore Our
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary capitalize mt-3 font-extrabold">
            Categories
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/shop?category=${category.id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <h3 className="font-serif text-2xl text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
