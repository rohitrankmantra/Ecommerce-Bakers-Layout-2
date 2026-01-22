'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import { useCart } from './cart-context'
import { products } from '@/lib/products'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'Shop' },
  { href: '#', label: 'Gallery' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const router = useRouter()
  const { setIsOpen, itemCount } = useCart()

  // Filter products based on search query
  const searchResults = searchQuery.length > 0
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleProductClick = (productId) => {
    router.push(`/shop?highlight=${productId}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Info Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            {/* Contact Details - Left Side */}
            <div className="flex items-center gap-4 md:gap-6">
              <a 
                href="tel:+919068664222" 
                className="flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+91 9068664222</span>
              </a>
              <a 
                href="tel:+911352717771" 
                className="flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <span className="hidden sm:inline">+91 1352717771</span>
              </a>
              <a 
                href="mailto:navrajjolly@gmail.com" 
                className="flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">navrajjolly@gmail.com</span>
              </a>
              <div className="hidden lg:flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>BAKEMASTERS , 19,Rajpur Road, Kwality Complex, Dehradun, Uttarakhand. 248001 INDIA</span>
              </div>
            </div>

            {/* Social Media Icons - Right Side */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-transparent.png"
                alt="Artisan Bakery Logo"
                width={140}
                height={56}
                className="h-20 md:h-24 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link,i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm uppercase tracking-wide font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button 
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-foreground/80 hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Dropdown */}
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-cream rounded-lg shadow-xl border border-border overflow-hidden z-50"
                    >
                      <form onSubmit={handleSearchSubmit} className="p-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            autoFocus
                          />
                        </div>
                      </form>

                      {/* Search Results */}
                      {searchResults.length > 0 && (
                        <div className="border-t border-border">
                          <div className="py-2">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                type="button"
                                onClick={() => handleProductClick(product.id)}
                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-beige/50 transition-colors text-left"
                              >
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="w-10 h-10 rounded-md object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-primary truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground capitalize">
                                    {product.category}
                                  </p>
                                </div>
                                <span className="text-sm font-medium text-gold">
                                  ${product.price.toFixed(2)}
                                </span>
                              </button>
                            ))}
                          </div>
                          <div className="border-t border-border p-2">
                            <button
                              type="button"
                              onClick={handleSearchSubmit}
                              className="w-full text-center text-sm text-primary hover:text-gold transition-colors py-2"
                            >
                              View all results
                            </button>
                          </div>
                        </div>
                      )}

                      {/* No Results */}
                      {searchQuery.length > 0 && searchResults.length === 0 && (
                        <div className="border-t border-border p-4 text-center">
                          <p className="text-sm text-muted-foreground">
                            No products found for "{searchQuery}"
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cream border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-foreground/80 hover:text-primary transition-colors text-sm uppercase tracking-wide font-medium border-b border-border/50 last:border-0"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
