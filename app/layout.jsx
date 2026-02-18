import { Josefin_Slab, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AuthProvider } from '@/components/auth-context'
import { CartProvider } from '@/components/cart-context'
import { Header } from '@/components/header'
import { CartDrawer } from '@/components/cart-drawer'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'

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
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
    
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefinSlab.variable} ${dmSans.variable}`}>
        <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </head>
      <body className="font-sans antialiased bg-cream text-foreground">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <CartDrawer />
            <Toaster />
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
