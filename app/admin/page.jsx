'use client';

import { Suspense, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { products } from '@/lib/products'
import { CATEGORIES } from '@/lib/categories'

function AdminDashboard() {
  const searchParams = useSearchParams()
  const transformCloudinary = (url, width = 200) => {
    if (!url?.includes('res.cloudinary.com')) return url
    return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)
  }

  const q = (searchParams?.get('q') || '').toLowerCase().trim()
  const category = searchParams?.get('category') || ''
  const featuredParam = searchParams?.get('featured') || ''
  const onlyFeatured = featuredParam === '1' || featuredParam === 'true'
  const sortKey = searchParams?.get('sort') || ''
  const sortOrder = (searchParams?.get('order') || 'asc').toLowerCase()

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
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
      result.sort((a, b) => {
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
    return result
  }, [q, category, onlyFeatured, sortKey, sortOrder])

  const pageSize = 15
  const page = Math.max(1, Number(searchParams?.get('page')) || 1)
  const totalPages = Math.ceil(filtered.length / pageSize)
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, filtered.length)
  const pageProducts = filtered.slice(start, start + pageSize)

  const makePageHref = (p) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(p))
    return `/admin?${params.toString()}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-primary font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-1">Manage your bakery inventory and orders</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 shadow-md shadow-primary/10 transition-all"
        >
          Add Product
        </Link>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: products.length, icon: '📦' },
          { label: 'Featured Items', value: products.filter(p => p.featured).length, icon: '⭐' },
          { label: 'Categories', value: CATEGORIES.length, icon: '📁' },
          { label: 'Active Filters', value: filtered.length, icon: '🔍' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-xs">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{stat.label}</div>
            <div className="text-2xl font-bold text-primary mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <form method="get" className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="w-full rounded-xl border border-border bg-cream px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden"
            />
          </div>
          <select
            name="category"
            defaultValue={category}
            className="w-full rounded-xl border border-border bg-cream px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={sortKey}
            className="w-full rounded-xl border border-border bg-cream px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden"
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
            className="w-full rounded-xl border border-border bg-cream px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 flex-1 transition-all"
            >
              Apply
            </button>
            <Link
              href="/admin"
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-muted flex-1 text-center transition-all"
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
              <th className="text-left px-5 py-4">Product</th>
              <th className="text-left px-5 py-4">Price</th>
              <th className="text-left px-5 py-4">Category</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-right px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pageProducts.map((p) => (
              <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-xl bg-muted shadow-xs">
                      <Image
                        src={transformCloudinary(p.image, 100) || '/placeholder.svg'}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-primary">{p.name.trim()}</div>
                      <div className="text-muted-foreground text-xs line-clamp-1 mt-0.5">{p.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-bold text-primary">
                  ₹{Number(p.price).toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-cream border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {CATEGORIES.find(c => c.id === p.category)?.name || p.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.featured ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-muted/40 border-border text-muted-foreground'}`}>
                    {p.featured ? 'Featured' : 'Standard'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link 
                      href={`/shop/${p.id}`} 
                      target="_blank"
                      className="p-2 rounded-lg border border-border hover:bg-muted text-primary transition-all"
                      title="View Product"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </Link>
                    <Link 
                      href={`/admin/products/${p.id}/edit`} 
                      className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all"
                      title="Edit Product"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </Link>
                    <button 
                      className="p-2 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all"
                      title="Delete Product"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          alert('Delete action triggered!');
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold">{start + 1}</span> to <span className="font-bold">{end}</span> of <span className="font-bold">{filtered.length}</span> products
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={makePageHref(page - 1)} className="px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-all">Previous</Link>
            )}
            {page < totalPages && (
              <Link href={makePageHref(page + 1)} className="px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-all">Next</Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminHomePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-primary animate-pulse font-serif text-xl">Loading Dashboard...</div>
      </div>
    }>
      <AdminDashboard />
    </Suspense>
  )
}
