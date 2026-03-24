import { products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }))
}

export default function AdminEditSegmentLayout({ children }) {
  return children
}
