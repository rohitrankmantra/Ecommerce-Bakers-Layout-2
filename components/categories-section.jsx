 

import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryMobileSlider from '@/components/categories-mobile-slider'

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
