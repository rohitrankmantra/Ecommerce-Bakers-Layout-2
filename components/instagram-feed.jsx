'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import fallbackPosts from '@/lib/instagram.json'

export function InstagramFeed({ title = 'Latest on Instagram' }) {
  const [posts, setPosts] = useState(fallbackPosts.slice(0, 6))

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL
    if (!url) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(url)
        const data = await res.json()
        if (!cancelled && Array.isArray(data) && data.length) {
          setPosts(data.slice(0, 6))
        }
      } catch (_) {}
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="py-16 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-primary">{title}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {posts.map((p) => (
            <a
              key={p.id}
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden border border-border bg-card"
            >
              <div className="relative aspect-square">
                <Image
                  src={p.media_url || '/placeholder.svg'}
                  alt={p.caption || 'Instagram post'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-2 text-center">
                <span className="text-xs text-primary">Visit Post</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
