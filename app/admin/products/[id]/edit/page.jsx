'use client';

import { useState, useEffect, use } from 'react';
import { products } from '@/lib/products';
import { CATEGORIES } from '@/lib/categories';
import Image from 'next/image';

export default function EditProductPage({ params }) {
  const unwrappedParams = use(params);
  const id = Number(unwrappedParams?.id);
  const [product, setProduct] = useState(null);
  const [previews, setPreviews] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    const foundProduct = products.find((p) => Number(p.id) === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setPreviews({
        image: foundProduct.image,
        image1: foundProduct.images?.[0] || null,
        image2: foundProduct.images?.[1] || null,
        image3: foundProduct.images?.[2] || null,
      });
    }
  }, [id]);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [key]: url }));
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-serif text-primary">Product Not Found</h2>
          <a href="/admin/products" className="inline-block rounded-lg bg-primary text-white px-6 py-2">Back to List</a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-primary font-bold">Edit Product</h2>
          <p className="text-muted-foreground mt-1">Update information for "{product.name}"</p>
        </div>
        <a href="/admin/products" className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-muted transition-colors w-full sm:w-auto">
          Back to List
        </a>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          alert('In a real app, this would upload files and update the database. Since this is a demo, we are showing the UI flow.');
        }}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8 shadow-sm"
      >
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-primary border-b border-border pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Product Name</label>
              <input type="text" name="name" defaultValue={product.name} required className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Price (₹)</label>
              <input type="number" step="0.01" min="0" name="price" defaultValue={product.price} required className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Category</label>
              <select name="category" defaultValue={product.category} required className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden transition-all appearance-none">
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Featured Product</label>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-cream px-4 py-2.5 text-sm h-[42px]">
                <input type="checkbox" name="featured" id="featured" defaultChecked={product.featured} className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary" />
                <label htmlFor="featured" className="text-muted-foreground cursor-pointer select-none">Show on homepage</label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Description</label>
            <textarea name="description" defaultValue={product.description} rows={4} className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden transition-all resize-none" />
          </div>
        </div>

        {/* Media */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-primary border-b border-border pb-2">Product Images</h3>
          <p className="text-xs text-muted-foreground -mt-4">Update images from your directory</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Main Image */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Main Image</label>
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden group hover:border-primary/50 transition-colors">
                {previews.image ? (
                  <Image src={previews.image} alt="Main" fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs text-muted-foreground">No image selected</span>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, 'image')}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>
            </div>

            {/* Additional Images */}
            {['image1', 'image2', 'image3'].map((key, index) => (
              <div key={key} className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gallery Image {index + 1}</label>
                <div className="relative aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden group hover:border-primary/50 transition-colors">
                  {previews[key] ? (
                    <Image src={previews[key]} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-xs text-muted-foreground text-center">Optional image</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, key)}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-border">
          <a href="/admin/products" className="w-full sm:w-auto text-center rounded-xl border border-border px-8 py-3 text-sm font-semibold text-primary hover:bg-muted transition-all">
            Cancel
          </a>
          <button type="submit" className="w-full sm:w-auto rounded-xl bg-primary text-primary-foreground px-10 py-3 text-sm font-semibold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
