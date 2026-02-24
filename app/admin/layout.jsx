'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Ticket, ShieldCheck } from 'lucide-react';
// import { Logo } from '../shared';

const navConfig = [
  { label: 'Home', href: '/' },
  { 
    label: 'Company', 
    dropdown: [
      { label: 'What We Do', href: '/company/what-we-do' },
      { label: 'Mission & Vision', href: '/company/mission-vision' },
      { label: 'Team', href: '/company/team' }
    ] 
  },
  { 
    label: 'Solutions', 
    dropdown: [
      { label: 'Our Associates', href: '/solutions/associates' },
      { label: 'Product Offering', href: '/solutions/products' },
      { label: 'Distribution Products', href: '/solutions/distribution' },
      { label: 'Product Brochures', href: '/solutions/brochures' }
    ] 
  },
  { 
    label: 'Credentials', 
    dropdown: [
      { label: 'Awards', href: '/credentials/awards' },
      { label: 'Client Speaks', href: '/credentials/testimonials' }
    ] 
  },
  { label: 'Training', href: '/training' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' }
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Fixed: Removed TypeScript syntax

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
      padding: scrolled ? '12px 0' : '20px 0'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Brand Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Logo />
          <div style={{ display: scrolled ? 'block' : 'block' }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', lineHeight: 1 }}>D M SYSTEMS</div>
            <div style={{ fontSize: '0.65rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Internet Security Partner
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hidden lg:flex">
          {navConfig.map((item) => (
            <div 
              key={item.label}
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              style={{ position: 'relative' }}
            >
              <a 
                href={item.href || '#'} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#475569',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: '0.2s'
                }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} opacity={0.5} />}
              </a>

              <AnimatePresence>
                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '220px',
                      background: '#fff',
                      borderRadius: '12px',
                      padding: '8px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      marginTop: '10px'
                    }}
                  >
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          fontSize: '0.85rem',
                          color: '#64748b',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          transition: '0.2s'
                        }}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Action & Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Ticket size={16} />
            <span>Ticket Generate</span>
          </motion.button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ all: 'unset', cursor: 'pointer', display: 'flex' }}
            className="lg:hidden"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#fff',
              zIndex: 2000,
              padding: '40px 24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <ShieldCheck className="text-blue-600" size={32} />
              <X onClick={() => setIsOpen(false)} size={32} />
            </div>
            {navConfig.map((item) => (
              <div key={item.label} style={{ marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '8px' }}>{item.label}</div>
                {item.dropdown && (
                  <div style={{ borderLeft: '2px solid #f1f5f9', paddingLeft: '16px' }}>
                    {item.dropdown.map(sub => (
                      <a key={sub.label} href={sub.href} style={{ display: 'block', padding: '8px 0', color: '#64748b', textDecoration: 'none' }}>
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}