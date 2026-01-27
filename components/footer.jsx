import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/galllery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const categories = [
  { href: '/shop?category=cakes', label: 'Cakes' },
  { href: '/shop?category=biscuits', label: 'Biscuits' },
  { href: '/shop?category=rusk', label: 'Rusk' },
  { href: '/shop?category=other', label: 'Other Items' },
]


export function Footer() {
  return (
    <footer id="contact" className="bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-transparent.png"
                alt="Artisan Bakery Logo"
                width={200}
                height={80}
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-foreground/80 leading-relaxed">
              Crafting delicious memories with premium ingredients and artisan techniques since 2010.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-[#C85B24] hover:text-primary hover:bg-primary/15 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-[#C85B24] hover:text-primary hover:bg-primary/15 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-[#C85B24] hover:text-primary hover:bg-primary/15 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg text-primary mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black hover:text-primary hover:underline underline-offset-8 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black hover:text-primary hover:underline underline-offset-8 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-6">Contact Us</h3>
            <ul className="space-y-3 text-foreground/80">
              <li>BAKEMASTERS, 19,Rajpur Road, Kwality Complex, Dehradun, 
</li>
              <li>Uttarakhand. 248001 INDIA</li>
              <li>
                <a href="tel: +91 9068664222" className="text-black hover:text-primary/80 transition-colors">
                   +919068664222
                </a>
                <br />
                  <a href="tel: +911352717771" className="text-black hover:text-primary/80 transition-colors">
                   +911352717771
                   
                </a>
              </li>
              <li>
                <a href="mailto: navrajjolly@gmail.com" className="text-black hover:text-primary/80 transition-colors">
                   navrajjolly@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-4 text-center text-foreground/70 text-sm">
          <p>&copy; {new Date().getFullYear()} Artisan Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
