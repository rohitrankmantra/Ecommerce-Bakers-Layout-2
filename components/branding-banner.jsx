'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BrandingBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80"
          alt="Fresh baked goods background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/90 to-primary/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-gold/40 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gold/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-gold/50 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <div className="relative">
              {/* Logo Container with Decorative Border */}
              <div className="relative bg-cream/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&h=120&fit=crop&q=80"
                  alt="Artisan Bakery Logo"
                  width={200}
                  height={80}
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
              {/* Corner Decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-gold" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-gold" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-gold" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-gold" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wide uppercase">
                Since 2010
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
              Baked Fresh Daily,{' '}
              <span className="text-gold">Crafted with Love</span>
            </h2>

            <p className="mt-6 text-cream/80 text-lg max-w-xl leading-relaxed">
              Experience the difference of artisan baking. Every item is handcrafted using 
              time-honored recipes and the finest ingredients, delivering exceptional taste 
              in every bite.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span className="text-cream/90 text-sm">Premium Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span className="text-cream/90 text-sm">Handcrafted Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span className="text-cream/90 text-sm">Local Delivery</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-dark text-primary font-medium px-8 rounded-full"
              >
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream rounded-full px-8 bg-transparent"
              >
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden xl:block shrink-0"
          >
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gold/30">
                <Image
                  src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&q=80"
                  alt="Fresh pastries"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold text-primary px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold">100% Fresh</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-cream/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-gold">15+</div>
              <div className="text-cream/70 text-sm mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-gold">50K+</div>
              <div className="text-cream/70 text-sm mt-1">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-gold">100+</div>
              <div className="text-cream/70 text-sm mt-1">Unique Recipes</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-gold">4.9</div>
              <div className="text-cream/70 text-sm mt-1">Customer Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
