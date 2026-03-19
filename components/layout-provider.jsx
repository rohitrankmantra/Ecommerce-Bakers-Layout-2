'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { FloatingContact } from '@/components/floating-contact';
import { Toaster } from '@/components/ui/toaster';

export function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return (
      <>
        <main className="min-h-screen bg-cream px-4 md:px-8 lg:px-12 py-8">
          {children}
        </main>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <CartDrawer />
      <Toaster />
      <Footer />
      <FloatingContact />
    </>
  );
}
