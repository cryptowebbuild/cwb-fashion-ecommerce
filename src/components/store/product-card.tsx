"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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

    // Pick selected size variant or first in-stock variant
    const inStockVariant = selectedSize
      ? product.variants?.find((v) => v.size === selectedSize && v.stock > 0)
      : product.variants?.find((v) => v.stock > 0);

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
    <div className="group relative rounded-xl bg-cwb-card/70 border border-white/[0.06] hover:border-cwb-accent/40 transition-all duration-500 flex flex-col overflow-hidden luxury-card">
      {/* High-Fashion 3:4 Aspect Ratio Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#0c0d12]"
      >
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Secondary editorial angle crossfade on hover */}
        {hoverImage !== primaryImage && (
          <Image
            src={hoverImage}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />
        )}

        {/* Ambient Dark Gradient Vignette for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Editorial Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 text-white font-mono text-[9px] tracking-widest uppercase">
              Atelier Drop
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-cwb-accent text-black font-bold font-mono text-[9px] tracking-wider uppercase shadow-lg shadow-cwb-accent/20">
              -${discountSavings}
            </span>
          )}
        </div>

        {/* Top Right Quick View Indicator */}
        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 group-hover:text-cwb-accent group-hover:border-cwb-accent/40 transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white/80 font-mono text-[10px] uppercase tracking-[0.25em]">
              Archive Sold Out
            </span>
          </div>
        )}

        {/* Interactive Quick Add Bar on Hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col gap-2 z-20">
          {/* Variant Size Selector Pills */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
              {product.variants.slice(0, 5).map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(v.size);
                  }}
                  disabled={v.stock === 0}
                  className={`px-2 py-0.5 text-[9px] font-mono rounded transition-colors ${
                    selectedSize === v.size
                      ? "bg-cwb-accent text-black font-bold"
                      : v.stock === 0
                      ? "text-white/20 line-through cursor-not-allowed"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {v.size.replace(/ \(.+\)/, "")}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="w-full py-2.5 rounded-lg bg-white hover:bg-cwb-accentLight text-black font-bold text-[11px] tracking-wider uppercase font-mono flex items-center justify-center gap-2 shadow-2xl transition-all disabled:opacity-50"
            aria-label={`Quick add ${product.title} to bag`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  Quick Add {selectedSize ? `(${selectedSize.replace(/ \(.+\)/, "")})` : ""}
                </span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Editorial Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {product.category && (
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cwb-accent/90 block">
              {product.category.name}
            </span>
          )}
          <Link href={`/product/${product.slug}`} className="group-hover:text-cwb-accent transition-colors">
            <h3 className="text-sm font-medium text-white/95 mt-1 line-clamp-1 tracking-tight">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t border-white/[0.05]">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="text-xs text-white/40 line-through font-mono">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-400/90 font-mono tracking-wider uppercase">
            Cash On Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
