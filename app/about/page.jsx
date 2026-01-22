'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Clock, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'

const stats = [
  { icon: Award, value: '25+', label: 'Years Experience' },
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: Clock, value: '4AM', label: 'We Start Baking' },
  { icon: Heart, value: '100%', label: 'Made with Love' },
]

const team = [
  {
    name: 'Marie Laurent',
    role: 'Head Pastry Chef',
    image: 'https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=400&q=80',
  },
  {
    name: 'Thomas Bernard',
    role: 'Master Baker',
    image: 'https://images.unsplash.com/photo-1583394293214-28ez86a4f0e0?w=400&q=80',
  },
  {
    name: 'Sophie Dubois',
    role: 'Cake Designer',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <PageHero
        title="Our Story"
        subtitle="About Us"
        description="A family tradition of baking excellence, crafting moments of joy one loaf at a time since 1998."
        backgroundImage="https://images.unsplash.com/photo-1556217477-d325251ece38?w=1920&q=80"
      />

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold uppercase tracking-widest text-sm font-medium">
                Our Heritage
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3 mb-6">
                Baking with Passion Since 1998
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What began as a small family bakery in the heart of the city has blossomed 
                  into a beloved destination for artisan breads and pastries. Our founder, 
                  Jean-Pierre Laurent, brought his grandmother&apos;s recipes from France, 
                  infusing each creation with generations of baking wisdom.
                </p>
                <p>
                  Today, we continue that legacy, rising before dawn to prepare fresh breads, 
                  pastries, and cakes using time-honored techniques and the finest ingredients. 
                  Every item that leaves our kitchen carries the warmth of our family tradition.
                </p>
                <p>
                  We believe that great baking is an art form that brings people together. 
                  Whether it&apos;s a simple morning croissant or an elaborate wedding cake, 
                  we pour our hearts into every creation.
                </p>
              </div>
              <Button asChild className="mt-8 bg-gold hover:bg-gold/90 text-primary">
                <Link href="/shop">Explore Our Products</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&q=80"
                  alt="Baker kneading dough"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/20 rounded-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-beige rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-beige/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-gold" />
                </div>
                <div className="font-serif text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold uppercase tracking-widest text-sm font-medium">
              What We Believe
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Ingredients',
                description: 'We source only the finest organic flour, farm-fresh eggs, and premium butter to ensure every bite is exceptional.',
                image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80',
              },
              {
                title: 'Artisan Craftsmanship',
                description: 'Our bakers are trained in traditional European techniques, bringing centuries of wisdom to modern creations.',
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
              },
              {
                title: 'Community First',
                description: 'We believe in giving back, supporting local farmers, and creating a welcoming space for our neighborhood.',
                image: 'https://images.unsplash.com/photo-1517433670267-30f41a9cba6f?w=600&q=80',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={value.image || "/placeholder.svg"}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold uppercase tracking-widest text-sm font-medium">
              The Artisans
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              The passionate people behind every delicious creation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold/30 group-hover:border-gold transition-colors duration-300">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl text-primary">{member.name}</h3>
                <p className="text-gold mt-1">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Visit Our Bakery
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Come experience the aroma of fresh-baked bread, taste our signature pastries, 
              and become part of our story.
            </p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
