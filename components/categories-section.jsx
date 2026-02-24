 

import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryMobileSlider from '@/components/categories-mobile-slider'

const categories = [
  {
    id: 'tea-time-cake',
    name: 'Tea Time Cake',
    image: 'https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908495/_STU0220_kfdh9p.webp',
    description: 'Celebration & everyday cakes',
  },
  {
    id: 'biscuit-and-confections',
    name: 'Biscuit & Confections',
    image: 'https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908476/_STU0159_t7bw5o.webp',
    description: 'Crispy & buttery delights',
  },
  {
    id: 'rusk',
    name: 'Rusks',
    image: 'https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908443/_STU0057_ojlsuo.webp',
    description: 'Traditional baked rusks',
  },
  {
    id: 'fresh-bread',
    name: 'Fresh Bread',
    image: 'https://res.cloudinary.com/drx8l7t5c/image/upload/v1771908493/_STU0213_yashin.webp',
    description: 'Breads baked fresh',
  },
]

const transformCloudinary = (url, width = 800) => {
  if (!url?.includes('res.cloudinary.com')) return url
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
}

export function CategoriesSection() {
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
        <CategoryMobileSlider categories={categories} />

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
          src={transformCloudinary(category.image, 800)}
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
