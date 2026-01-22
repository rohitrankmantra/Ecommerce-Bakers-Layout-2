'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PageHero } from '@/components/page-hero'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Bakery Lane', 'Sweet City, SC 12345'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (234) 567-890', '+1 (234) 567-891'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@artisanbakery.com', 'orders@artisanbakery.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Mon - Fri: 6AM - 8PM', 'Sat - Sun: 7AM - 6PM'],
  },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <PageHero
        title="Get in Touch"
        subtitle="Contact Us"
        description="Have a question, special request, or want to place a custom order? We would love to hear from you."
        backgroundImage="https://images.unsplash.com/photo-1517433670267-30f41a9cba6f?w=1920&q=80"
      />

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold uppercase tracking-widest text-sm font-medium">
                Reach Out
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3 mb-6">
                We&apos;d Love to Hear From You
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Whether you have a question about our products, want to discuss a custom order, 
                or simply want to say hello, our team is here to help. Reach out through any 
                of the channels below or fill out the contact form.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-6 border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-primary mb-2">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-serif text-lg text-primary mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground hover:bg-gold hover:text-primary transition-colors duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm">
                <h3 className="font-serif text-2xl text-primary mb-6">Send Us a Message</h3>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-gold" />
                    </div>
                    <h4 className="font-serif text-xl text-primary mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (234) 567-890"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Custom Order Inquiry"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your inquiry or special request..."
                        rows={5}
                        required
                        className="bg-background resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-gold/90 text-primary font-medium py-6"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-gold uppercase tracking-widest text-sm font-medium">
              Find Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3">
              Our Location
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1637158842024!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bakery Location"
              className="absolute inset-0"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold uppercase tracking-widest text-sm font-medium">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3">
              Frequently Asked
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                question: 'Do you take custom cake orders?',
                answer: 'Yes! We specialize in custom cakes for weddings, birthdays, and special occasions. Please contact us at least 2 weeks in advance for custom orders.',
              },
              {
                question: 'Are your products made fresh daily?',
                answer: 'Absolutely. Our bakers start at 4 AM every morning to ensure all products are freshly baked. We never sell day-old items.',
              },
              {
                question: 'Do you offer gluten-free or vegan options?',
                answer: 'Yes, we have a selection of gluten-free breads and vegan pastries available daily. Please ask our staff for the current options.',
              },
              {
                question: 'Can I place an order for pickup?',
                answer: 'Yes, you can call us or use our online ordering system to place orders for pickup. We recommend ordering at least 24 hours in advance for larger orders.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h3 className="font-serif text-lg text-primary mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
