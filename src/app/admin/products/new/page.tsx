"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Variant Matrix
  const [variants, setVariants] = useState<
    Array<{ size: string; color: string; sku: string; stock: number }>
  >([
    { size: "M", color: "Obsidian Black", sku: "GAR-M-BLK", stock: 10 },
    { size: "L", color: "Obsidian Black", sku: "GAR-L-BLK", stock: 10 },
  ]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) setCategoryId(data[0].id);
        }
      });
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    // Auto-generate slug
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  const addVariantRow = () => {
    setVariants((prev) => [
      ...prev,
      { size: "XL", color: "Obsidian Black", sku: `GAR-${Date.now().toString().slice(-4)}`, stock: 5 },
    ]);
  };

  const removeVariantRow = (index: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, val: any) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !slug || !description || !price || !categoryId) {
      setError("Please fill in all required product fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title,
        slug,
        description,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        categoryId,
        images: imageUrl
          ? [imageUrl]
          : [
              "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
            ],
        isFeatured,
        variants: variants.map((v) => ({
          ...v,
          stock: Number(v.stock) || 0,
        })),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to save garment.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-cwb-accent transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Product Database</span>
      </Link>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-1 block">
          Catalog Creation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Add New Menswear Garment
        </h1>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Info Box */}
        <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            1. Garment Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Venetian Silk-Lined Overcoat"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="venetian-silk-lined-overcoat"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#12141c]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Retail Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="495"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Compare Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="595 (Optional discount)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe materials, construction, and fit details..."
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
              Primary Image URL (Unsplash or Cloudinary)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-cwb-accent focus:ring-0 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs text-white cursor-pointer">
              Mark as Featured Drop on Homepage
            </label>
          </div>
        </div>

        {/* Variant Matrix Box */}
        <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                2. Size & Color Variant Inventory Matrix
              </h2>
              <p className="text-xs text-white/50">
                Track discrete stock inventory per size and color combination.
              </p>
            </div>
            <button
              type="button"
              onClick={addVariantRow}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variant</span>
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 items-center"
              >
                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={v.size}
                    onChange={(e) => updateVariant(idx, "size", e.target.value)}
                    placeholder="M"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={v.color}
                    onChange={(e) => updateVariant(idx, "color", e.target.value)}
                    placeholder="Obsidian Black"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => updateVariant(idx, "sku", e.target.value)}
                    placeholder="SKU-100"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cwb-accent font-mono"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-[10px] text-white/50 uppercase mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => updateVariant(idx, "stock", parseInt(e.target.value) || 0)}
                      placeholder="10"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
                    />
                  </div>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariantRow(idx)}
                      className="p-1.5 text-white/40 hover:text-rose-400 mt-4"
                      title="Remove variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cwb-accent to-cwb-accentLight text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-cwb-accent/20 hover:opacity-95 transition-all disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isSubmitting ? "Creating Garment..." : "Publish Garment to Storefront"}</span>
        </button>
      </form>
    </div>
  );
}
