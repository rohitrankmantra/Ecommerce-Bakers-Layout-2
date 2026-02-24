import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/products'

const transformCloudinary = (url, width = 200) => {
  if (!url?.includes('res.cloudinary.com')) return url
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
}

export default function ProductsListPage({ searchParams }) {
  const q = (searchParams?.q || '').toLowerCase().trim()
  const category = searchParams?.category || ''
  const featuredParam = searchParams?.featured || ''
  const onlyFeatured = featuredParam === '1' || featuredParam === 'true'

  const categories = Array.from(new Set(products.map((p) => p.category)))
  const filtered = products.filter((p) => {
    const matchText =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    const matchCategory = !category || p.category === category
    const matchFeatured = !onlyFeatured || p.featured === true
    return matchText && matchCategory && matchFeatured
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-primary">Products</h2>
          <p className="text-muted-foreground mt-1">Catalog overview with quick actions</p>
        </div>
        <Link
          href="#"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90"
        >
          Add Product
        </Link>
      </div>

      <form method="get" className="rounded-2xl border border-border bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name or description"
            className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm"
          />
          <select
            name="category"
            defaultValue={category}
            className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-border bg-cream">
            <input
              type="checkbox"
              name="featured"
              value="1"
              defaultChecked={!!onlyFeatured}
            />
            Featured only
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90"
            >
              Apply
            </button>
            <Link
              href="/admin/products"
              className="rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-muted"
            >
              Reset
            </Link>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Featured</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="relative w-16 h-16 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={transformCloudinary(p.image, 200) || '/placeholder.svg'}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-primary">{p.name.trim()}</div>
                  <div className="text-muted-foreground line-clamp-1">{p.description}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-cream px-2 py-1 text-xs border border-border">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  ₹{Number(p.price).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full border ${p.featured ? 'bg-gold/20 border-gold text-gold' : 'bg-muted/40 border-border text-muted-foreground'}`}>
                    {p.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href="#" className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted">
                      View
                    </Link>
                    <Link href={`/admin/products/${p.id}/edit`} className="px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      Edit
                    </Link>
                    <button className="px-3 py-1.5 text-xs rounded-lg border border-destructive text-destructive hover:bg-destructive/10">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
