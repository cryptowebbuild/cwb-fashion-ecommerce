"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const images = Array.isArray(product.images)
    ? product.images
    : JSON.parse(product.images || "[]");

  const primaryImage =
    images[0] ||
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop";
  const hoverImage = images[1] || primaryImage;

  // Compute total stock across variants
  const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
  const isOutOfStock = totalStock === 0;

  // Discount calculation
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountSavings = hasDiscount
    ? Math.round(product.compareAtPrice! - product.price)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Pick first in-stock variant
    const inStockVariant = product.variants?.find((v) => v.stock > 0);
    if (!inStockVariant) return;

    addItem({
      productId: product.id,
      variantId: inStockVariant.id,
      title: product.title,
      size: inStockVariant.size,
      color: inStockVariant.color,
      price: product.price,
      quantity: 1,
      image: primaryImage,
      stock: inStockVariant.stock,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative rounded-2xl bg-cwb-card border border-white/5 hover:border-cwb-accent/30 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container with strict 4:5 aspect ratio for 0 CLS */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-zinc-900"
      >
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Secondary image crossfade if available */}
        {hoverImage !== primaryImage && (
          <Image
            src={hoverImage}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-md bg-cwb-accent text-black font-extrabold text-[10px] tracking-wider uppercase shadow-md">
              SAVE ${discountSavings}
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-white font-semibold text-[10px] tracking-wider uppercase">
              Featured Drop
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/20 text-white/80 font-bold text-xs uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="flex-1 py-2.5 rounded-xl bg-white/95 hover:bg-white text-black font-bold text-xs tracking-wide uppercase flex items-center justify-center gap-1.5 shadow-xl transition-all disabled:opacity-50"
            aria-label={`Quick add ${product.title} to bag`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {product.category && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-cwb-accent/90">
              {product.category.name}
            </span>
          )}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-semibold text-white/90 hover:text-cwb-accentLight transition-colors mt-1 line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-white">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="text-xs text-white/40 line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] text-white/40">
            {product.variants?.length || 1} variants
          </span>
        </div>
      </div>
    </div>
  );
}
