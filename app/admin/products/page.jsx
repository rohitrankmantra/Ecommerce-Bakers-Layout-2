'use client';

import { Suspense, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { products } from '@/lib/products'
import { CATEGORIES } from '@/lib/categories'

function ProductsList() {
  const searchParams = useSearchParams()
  const transformCloudinary = (url, width = 200) => {
    if (!url?.includes('res.cloudinary.com')) return url
    return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
  }

  // Get filter values from URL
  const q = (searchParams?.get('q') || '').toLowerCase().trim()
  const category = searchParams?.get('category') || ''
  const featuredParam = searchParams?.get('featured') || ''
  const onlyFeatured = featuredParam === '1' || featuredParam === 'true'
  
  // Pagination setup
  const page = Math.max(1, Number(searchParams?.get('page')) || 1)
  const pageSize = 15

  // Memoized filtered products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchText =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      const matchCategory = !category || p.category === category
      const matchFeatured = !onlyFeatured || p.featured === true
      return matchText && matchCategory && matchFeatured
    })
  }, [q, category, onlyFeatured])

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / pageSize)
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, filtered.length)
  const pageProducts = filtered.slice(start, start + pageSize)

  const makePageHref = (p) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(p))
    return `/admin/products?${params.toString()}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-primary font-bold">Products</h2>
          <p className="text-muted-foreground mt-1 text-sm">Catalog overview with quick actions</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 shadow-md shadow-primary/10 transition-all"
        >
          Add Product
        </Link>
      </div>

      <form method="get" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Search</label>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Name or description..."
              className="w-full rounded-xl border border-border bg-cream px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</label>
            <select
              name="category"
              defaultValue={category}
              className="w-full rounded-xl border border-border bg-cream px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden transition-all appearance-none"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="inline-flex items-center gap-3 text-sm px-4 py-2.5 rounded-xl border border-border bg-cream cursor-pointer hover:bg-muted/30 transition-all">
              <input
                type="checkbox"
                name="featured"
                value="1"
                defaultChecked={!!onlyFeatured}
                className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
              />
              <span className="font-medium text-primary">Featured only</span>
            </label>
          </div>
          <div className="flex gap-2 items-end">
            <button
              type="submit"
              className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-all flex-1 shadow-sm"
            >
              Apply
            </button>
            <Link
              href="/admin/products"
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-primary hover:bg-muted transition-all flex-1 text-center"
            >
              Reset
            </Link>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground font-semibold">
            <tr>
              <th className="text-left px-5 py-4">Item</th>
              <th className="text-left px-5 py-4">Name</th>
              <th className="text-left px-5 py-4">Category</th>
              <th className="text-left px-5 py-4">Price</th>
              <th className="text-left px-5 py-4">Featured</th>
              <th className="text-right px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pageProducts.length > 0 ? (
              pageProducts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="relative w-14 h-14 overflow-hidden rounded-xl bg-muted shadow-xs">
                      <Image
                        src={transformCloudinary(p.image, 200) || '/placeholder.svg'}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-[240px]">
                    <div className="font-bold text-primary">{p.name.trim()}</div>
                    <div className="text-muted-foreground text-[11px] line-clamp-1 mt-1 leading-relaxed">{p.description}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-cream px-3 py-1 text-[10px] border border-border font-bold uppercase tracking-wider text-primary">
                      {CATEGORIES.find(c => c.id === p.category)?.name || p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-primary">
                    ₹{Number(p.price).toFixed(2)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.featured ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-muted/40 border-border text-muted-foreground'}`}>
                      {p.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 justify-end">
                      <Link 
                        href={`/shop/${p.id}`} 
                        className="p-2 rounded-lg border border-border hover:bg-muted transition-all text-primary"
                        target="_blank"
                        title="View"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      </Link>
                      <Link 
                        href={`/admin/products/${p.id}/edit`} 
                        className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </Link>
                      <button 
                        className="p-2 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all"
                        title="Delete"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this product?')) {
                            alert('Delete functionality triggered!');
                          }
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center text-muted-foreground italic font-serif text-lg">
                  No products found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
          <p className="text-sm text-muted-foreground font-medium order-2 sm:order-1">
            Showing <span className="text-primary font-bold">{start + 1}</span> to <span className="text-primary font-bold">{end}</span> of <span className="text-primary font-bold">{filtered.length}</span> products
          </p>
          <div className="flex gap-2 order-1 sm:order-2">
            <Link 
              href={makePageHref(page - 1)} 
              className={`px-5 py-2 rounded-xl border border-border text-sm font-bold transition-all ${page <= 1 ? 'pointer-events-none opacity-40' : 'hover:bg-muted hover:border-primary/30 text-primary'}`}
            >
              Previous
            </Link>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pNum = i + 1;
                // Show only a few page numbers if there are many
                if (totalPages > 7 && Math.abs(pNum - page) > 2 && pNum !== 1 && pNum !== totalPages) {
                  if (pNum === 2 || pNum === totalPages - 1) return <span key={pNum} className="px-1 text-muted-foreground">...</span>;
                  return null;
                }
                return (
                  <Link
                    key={pNum}
                    href={makePageHref(pNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all border ${page === pNum ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'border-border text-primary hover:bg-muted'}`}
                  >
                    {pNum}
                  </Link>
                );
              })}
            </div>
            <Link 
              href={makePageHref(page + 1)} 
              className={`px-5 py-2 rounded-xl border border-border text-sm font-bold transition-all ${page >= totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-muted hover:border-primary/30 text-primary'}`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductsListPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-primary animate-pulse font-serif text-xl">Loading Inventory...</div>
      </div>
    }>
      <ProductsList />
    </Suspense>
  )
}
