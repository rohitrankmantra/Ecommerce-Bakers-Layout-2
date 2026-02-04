import { Josefin_Slab, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { Header } from '@/components/header'
import { CartDrawer } from '@/components/cart-drawer'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'

/* ✅ BEST Josefin Slab config */
const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // 🔥 best-looking weights only
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'], // clean & readable
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'BakeMasters | Dehradun | Premium Baked Goods in Dehradun',
  description:
    'Discover our collection of freshly baked artisan cakes, biscuits, rusks, and premium bakery items made with the finest ingredients.',
      icons: {
    icon: [
      { url: '/logo-transparent.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
    
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefinSlab.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-cream text-foreground">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartDrawer />
          <Toaster />
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
