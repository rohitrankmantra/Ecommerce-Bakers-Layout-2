'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Leaf, Truck } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Freshly Baked',
    description: 'Every item is baked fresh daily with love and care',
  },
  {
    icon: Leaf,
    title: 'Premium Ingredients',
    description: 'We source only the finest quality ingredients',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery to keep your treats fresh',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20 md:py-28 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-80 md:h-120 rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/18296426/pexels-photo-18296426.jpeg"
                alt="Baker at work"
                fill
                className="object-cover"
              />
            </div>
            
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-widest text-sm font-medium">
              Our Promise
            </span>
           <h2 className="font-serif normal-case text-3xl md:text-5xl text-primary mt-3 mb-6 font-extrabold">
  Why Choose Us
</h2>

            <p className="text-muted-foreground leading-relaxed mb-10">
              For over a decade, we have been crafting delicious baked goods with passion 
              and dedication. Our commitment to quality and taste has made us the preferred 
              choice for bakery lovers across the city.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold-light flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
