'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, Phone, Mail, MapPin, Facebook, Instagram, User } from 'lucide-react'
import { useCart } from './cart-context'
import { products } from '@/lib/products'
import { useAuth } from '@/components/auth-context'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Our Products' },
   { href: '/our-story', label: 'Our Story' },
  { href: '/gallery', label: 'Gallery' },
 
  { href: '/contact', label: 'Contact Us' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const accountRef = useRef(null)
  const router = useRouter()
  const { setIsOpen, itemCount } = useCart()
  const { user, logout } = useAuth()

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
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const slugify = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

  const handleProductClick = (product) => {
    router.push(`/shop/${slugify(product.name)}`)
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
                className="flex items-center gap-1.5 text-white  transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">+91 9068664222</span>
              </a>
              <a 
                href="tel:+911352717771" 
                className="flex items-center gap-1.5 text-white"
              >
                <span className="hidden sm:inline">+91 1352717771</span>
              </a>
              <a 
                href="mailto:bakemasters.in@gmail.com" 
                className="flex items-center gap-1.5 text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white transition-colors" />
                <span className="hidden sm:inline">bakemasters.in@gmail.com</span>
              </a>
              <div className="hidden lg:flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-white transition-colors" />
                <span>BAKEMASTERS , 19,Rajpur  Road, Kwality Complex, Dehradun, Uttarakhand. 248001 INDIA</span>
              </div>
            </div>

            {/* Social Media Icons - Right Side */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/bakemasters.in/#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/bakemasters.in?igsh=OXl1emo1eGhwa3cy&utm_source=ig_contact_invite" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

{/* Main Header */}
<div className="bg-cream/95 backdrop-blur-sm border-b border-border">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8">

      {/* LEFT – Logo */}
      <div className="flex items-center min-w-17.5 sm:min-w-25">
        <Link href="/" className="block">
          <Image
            src="/new-logo.png"
            alt="BakeMasters Logo"
            width={220}
            height={100}
            className="h-13.75 xs:h-16.25 sm:h-18.75 md:h-21.25 lg:h-23.75 w-auto object-contain"
            priority
            // Temporary debug: remove after confirming it loads
            // onError={() => console.error("Logo failed to load – check /public/new-logo.png")}
          />
        </Link>
      </div>

      {/* CENTER – Brand name + nav links below */}
      <div className="flex flex-col items-center justify-center">
        <Link
          href="/"
          className="font-unica-one font-bold  text-black text-3xl sm:text-4xl md:text-5xl  mt-2"
        >
          BakeMasters
        </Link>

        {/* Desktop nav – hidden on mobile */}
        <div className="hidden md:flex flex-wrap justify-center gap-5 lg:gap-8 mt-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black hover:text-primary hover:underline underline-offset-8 transition-colors text-sm md:text-base uppercase tracking-wide font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT – Icons + mobile hamburger */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-3 md:gap-4">

        {/* Search icon */}
        <div ref={searchRef} className="relative">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-black hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Search dropdown remains the same – keeping your original */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-cream rounded-lg shadow-xl border border-border overflow-hidden z-50"
              >
                <form onSubmit={handleSearchSubmit} className="p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      autoFocus
                    />
                  </div>
                </form>

                {searchResults.length > 0 && (
                  <div className="border-t border-border">
                    <div className="py-2 max-h-72 overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductClick(product)}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-beige/50 transition-colors text-left"
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-md object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {product.category}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-gold whitespace-nowrap">
                            ₹{product.price.toFixed(2)}
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

                {searchQuery.length > 0 && searchResults.length === 0 && (
                  <div className="border-t border-border p-4 text-center text-sm text-muted-foreground">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Account / User icon */}
        <div ref={accountRef} className="relative">
          <button
            type="button"
            aria-label="Account"
            onClick={() => {
              if (user) {
                setAccountMenuOpen(!accountMenuOpen)
              } else {
                router.push('/auth/login')
              }
            }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-r from-primary to-gold text-white flex items-center justify-center font-semibold text-sm hover:ring-2 hover:ring-gold transition-all"
            title={user?.name || 'Account'}
          >
            {user ? user.name?.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
          </button>

          {/* Account dropdown – keeping your original */}
          {user && (
            <AnimatePresence>
              {accountMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-cream rounded-lg shadow-xl border border-border overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-primary">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/account')
                      setAccountMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-beige/50 transition-colors text-primary font-medium flex items-center gap-2"
                  >
                    <i className="fas fa-box"></i>
                    My Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setAccountMenuOpen(false)
                      router.push('/')
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-beige/50 transition-colors text-red-600 border-t border-border flex items-center gap-2"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Cart icon */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative p-2 text-black hover:text-primary transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
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

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-black transition-colors"
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
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="md:hidden bg-cream border-t border-border overflow-hidden shadow-sm"
    >
      <nav className="flex flex-col px-5 py-5">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.25 }}
          >
            <Link
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                block py-3.5 px-2 
                text-base font-medium uppercase tracking-wide text-black
                hover:text-primary hover:bg-beige/40 
                active:bg-beige/60 
                transition-colors duration-150
                border-b border-border/40 last:border-b-0
              `}
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
