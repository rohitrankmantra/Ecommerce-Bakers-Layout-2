import { products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }))
}

export default function EditProductPage({ params }) {
  const id = Number(params?.id)
  const product = products.find((p) => Number(p.id) === id)
  const categories = Array.from(new Set(products.map((p) => p.category)))

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-primary">Edit Product</h2>
          <a href="/admin" className="rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-muted">
            Back
          </a>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-muted-foreground">Product not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-3 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-serif text-2xl text-primary">Edit Product</h2>
        <a href="/admin" className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm text-primary hover:bg-muted w-full sm:w-auto">
          Back
        </a>
      </div>

      <form method="post" className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Name</label>
            <input type="text" name="name" defaultValue={product.name} required className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Price</label>
            <input type="number" step="0.01" min="0" name="price" defaultValue={product.price} required className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Category</label>
            <select name="category" defaultValue={product.category} required className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Featured</label>
            <label className="inline-flex items-center gap-2 rounded-lg border border-border bg-cream px-3 py-2 text-sm">
              <input type="checkbox" name="featured" defaultChecked={!!product.featured} />
              Mark as featured
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Description</label>
          <textarea name="description" defaultValue={product.description} rows={4} className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Main Image URL</label>
            <input type="url" name="image" defaultValue={product.image} required className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Additional Image URL 1</label>
            <input type="url" name="image1" defaultValue={product.images?.[0] || ''} className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Additional Image URL 2</label>
            <input type="url" name="image2" defaultValue={product.images?.[1] || ''} className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Additional Image URL 3</label>
            <input type="url" name="image3" defaultValue={product.images?.[2] || ''} className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <a href="/admin" className="rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-muted sm:w-auto w-full">
            Cancel
          </a>
          <button type="submit" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90 sm:w-auto w-full">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
