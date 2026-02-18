import Image from 'next/image'
import Link from 'next/link'
import ProductActions from '@/components/product-actions'

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const transformCloudinary = (url, width = 800) => {
  if (!url?.includes('res.cloudinary.com')) return url
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
}

export function ProductCard({ product, index }) {
  return (
    <div className="group relative animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={transformCloudinary(product.image || '/placeholder.svg', 800)}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <ProductActions
            product={product}
            variant="icon"
            className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-105"
            ariaLabel="Add to cart"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
          <h3 className="mt-1 font-serif text-lg text-primary leading-snug">
            {product.name}
          </h3>
          <div className="mt-2 mb-5">
            <span className="text-xl font-semibold text-gold">
              ₹{product.price.toFixed(2)}
            </span>
          </div>
          <div className="mt-auto flex gap-3">
            <Link
              href={`/shop/${slugify(product.name)}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-muted transition-colors"
            >
              Details
            </Link>
            <ProductActions
              product={product}
              variant="button"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
