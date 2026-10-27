"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Trash2, ExternalLink, AlertTriangle } from "lucide-react";

interface ProductTableClientProps {
  initialProducts: any[];
}

export function ProductTableClient({ initialProducts }: ProductTableClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch {
      alert("Error deleting product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cwb-accent"
          />
        </div>
        <span className="text-xs text-white/40">Showing {filtered.length} products</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="pb-3 font-semibold">Garment</th>
              <th className="pb-3 font-semibold">Category</th>
              <th className="pb-3 font-semibold">Price</th>
              <th className="pb-3 font-semibold">Variants</th>
              <th className="pb-3 font-semibold">Total Stock</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((product) => {
              const image = product.images[0] || "/placeholder.jpg";
              const isLowStock = product.totalStock <= 5;

              return (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                      <Image
                        src={image}
                        alt={product.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white max-w-xs truncate">
                        {product.title}
                      </h4>
                      <span className="text-[10px] text-white/40 font-mono">
                        {product.slug}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-white/70">
                    {product.category?.name || "Uncategorized"}
                  </td>
                  <td className="py-3 font-bold text-cwb-accentLight">
                    ${product.price}
                  </td>
                  <td className="py-3 text-white/60">
                    {product.variants.length} options
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        product.totalStock === 0
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : isLowStock
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {product.totalStock === 0 ? "Out of Stock" : `${product.totalStock} units`}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/5"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        disabled={deletingId === product.id}
                        className="p-1.5 text-white/40 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
