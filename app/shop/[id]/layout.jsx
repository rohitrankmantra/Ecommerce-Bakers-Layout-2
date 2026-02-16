 import { orderedProducts } from '@/lib/products'
 
 export function generateStaticParams() {
   const slugify = (s) =>
     s
       .toLowerCase()
       .replace(/[^a-z0-9\s-]/g, '')
       .trim()
       .replace(/\s+/g, '-')
   return orderedProducts.map((p) => ({ id: slugify(p.name) }))
 }
 
 export default function ProductSegmentLayout({ children }) {
   return children
 }
