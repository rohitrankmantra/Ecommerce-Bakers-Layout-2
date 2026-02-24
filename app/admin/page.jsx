import Image from 'next/image'
import { products } from '@/lib/products'

export default function AdminHome({ searchParams }) {
  const transformCloudinary = (url, width = 200) => {
    if (!url?.includes('res.cloudinary.com')) return url
    return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
  }

  const q = (searchParams?.q || '').toLowerCase().trim()
  const category = searchParams?.category || ''
  const featuredParam = searchParams?.featured || ''
  const onlyFeatured = featuredParam === '1' || featuredParam === 'true'
  const sortKey = searchParams?.sort || ''
  const sortOrder = (searchParams?.order || 'asc').toLowerCase()

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

  if (sortKey) {
    const dir = sortOrder === 'desc' ? -1 : 1
    filtered.sort((a, b) => {
      let va = a[sortKey]
      let vb = b[sortKey]
      if (sortKey === 'name' || sortKey === 'category') {
        va = String(va || '').toLowerCase()
        vb = String(vb || '').toLowerCase()
        return va.localeCompare(vb) * dir
      }
      if (sortKey === 'price') {
        return (Number(va) - Number(vb)) * dir
      }
      if (sortKey === 'featured') {
        return ((a.featured ? 1 : 0) - (b.featured ? 1 : 0)) * dir
      }
      return 0
    })
  }

  const pageSize = 15
  const page = Math.max(1, Number(searchParams?.page) || 1)
  const totalPages = Math.ceil(filtered.length / pageSize)
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, filtered.length)
  const pageProducts = filtered.slice(start, start + pageSize)

  const baseParams = new URLSearchParams()
  if (q) baseParams.set('q', q)
  if (category) baseParams.set('category', category)
  if (sortKey) baseParams.set('sort', sortKey)
  if (sortOrder) baseParams.set('order', sortOrder)
  if (onlyFeatured) baseParams.set('featured', '1')
  const makePageHref = (p) => {
    const params = new URLSearchParams(baseParams.toString())
    params.set('page', String(p))
    return `/admin?${params.toString()}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-primary">Products</h2>
        <a
          href="/admin/products/new"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90"
        >
          Add Product
        </a>
      </div>

      <form method="get" className="rounded-2xl border border-border bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
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
          <select
            name="sort"
            defaultValue={sortKey}
            className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
            <option value="featured">Featured</option>
          </select>
          <select
            name="order"
            defaultValue={sortOrder}
            className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <label className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-border bg-cream">
            <input type="checkbox" name="featured" value="1" defaultChecked={!!onlyFeatured} />
            Featured only
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90"
            >
              Apply
            </button>
            <a
              href="/admin"
              className="rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-muted"
            >
              Reset
            </a>
          </div>
        </div>
      </form>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Featured</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageProducts.map((p) => (
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
                    <button className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted">
                      View
                    </button>
                    <a href={`/admin/products/${p.id}/edit`} className="px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      Edit
                    </a>
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
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages} • Showing {start + 1}-{end} of {products.length}
        </div>
        <div className="flex gap-2">
          <a
            href={makePageHref(page - 1)}
            className={`rounded-lg border border-border px-3 py-1.5 text-sm ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-muted'}`}
            aria-disabled={page <= 1}
          >
            Previous
          </a>
          <a
            href={makePageHref(page + 1)}
            className={`rounded-lg border border-border px-3 py-1.5 text-sm ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-muted'}`}
            aria-disabled={page >= totalPages}
          >
            Next
          </a>
        </div>
      </div>
    </div>
  )
}
