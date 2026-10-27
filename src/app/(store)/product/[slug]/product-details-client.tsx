"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/cart-context";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem } = useCart();
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Extract distinct sizes & colors
  const allSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const allColors = Array.from(new Set(product.variants.map((v) => v.color)));

  const [selectedSize, setSelectedSize] = useState<string>(allSizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(allColors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Find matching variant
  const currentVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  ) || product.variants[0];

  const currentStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = currentStock === 0;

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("craft");

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleAddToCart = () => {
    if (!currentVariant || isOutOfStock) return;

    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      title: product.title,
      size: currentVariant.size,
      color: currentVariant.color,
      price: product.price,
      quantity,
      image: images[0],
      stock: currentVariant.stock,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left: Gallery (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-cwb-accent scale-105 shadow-md shadow-cwb-accent/20"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main High-Res Image (Aspect 4:5 for zero CLS) */}
        <div className="relative aspect-[4/5] flex-1 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
          <Image
            src={images[activeImageIndex]}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />

          {hasDiscount && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-cwb-accent text-black font-extrabold text-xs tracking-wider uppercase shadow-lg">
              Special Drop Price
            </div>
          )}
        </div>
      </div>

      {/* Right: Product Buy Box & Specs (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          {product.category && (
            <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-2 block">
              {product.category.name}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-cwb-accentLight">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="text-lg text-white/40 line-through">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 font-semibold uppercase">
              Free Express Shipping
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-white uppercase tracking-wider">
              Select Size: <strong className="text-cwb-accent">{selectedSize}</strong>
            </span>
            <span className="text-white/40 cursor-pointer hover:text-white">
              Size Guide
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {allSizes.map((size) => {
              // check if this size is available in current or any color
              const sizeVariant = product.variants.find(
                (v) => v.size === size && v.color === selectedColor
              );
              const isSizeOOS = !sizeVariant || sizeVariant.stock === 0;

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase transition-all relative ${
                    selectedSize === size
                      ? "bg-cwb-accent text-black shadow-lg shadow-cwb-accent/20"
                      : isSizeOOS
                      ? "bg-white/5 text-white/25 border border-white/5 hover:border-white/10 line-through cursor-not-allowed"
                      : "bg-white/5 text-white/80 border border-white/10 hover:border-cwb-accent/40"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-white uppercase tracking-wider block">
            Select Color: <strong className="text-cwb-accent">{selectedColor}</strong>
          </span>

          <div className="flex flex-wrap gap-2">
            {allColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                  selectedColor === color
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-white/5 text-white/70 border border-white/10 hover:border-white/20"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Real-Time Stock Status Badge */}
        <div className="pt-2">
          {isOutOfStock ? (
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Currently Sold Out in this size/color combination.</span>
            </div>
          ) : currentStock <= 5 ? (
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>High demand: Only {currentStock} units remaining in vault.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
              <Check className="w-4 h-4 shrink-0" />
              <span>In Stock — Ready for complimentary dispatch.</span>
            </div>
          )}
        </div>

        {/* Quantity and Add to Bag */}
        <div className="flex gap-4 pt-2">
          <div className="flex items-center border border-white/10 rounded-2xl bg-white/5 px-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              className="p-2 text-white/70 hover:text-white disabled:opacity-20"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-sm font-bold px-3 text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
              disabled={quantity >= currentStock || isOutOfStock}
              className="p-2 text-white/70 hover:text-white disabled:opacity-20"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cwb-accent to-cwb-accentLight text-black font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl shadow-cwb-accent/20 hover:scale-[1.01] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-950 font-bold" />
                <span>Added To Shopping Bag</span>
              </>
            ) : isOutOfStock ? (
              <span>Out Of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag • ${(product.price * quantity).toFixed(0)}</span>
              </>
            )}
          </button>
        </div>

        {/* COD Reassurance Strip */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs text-white/70">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Truck className="w-4 h-4 text-cwb-accent" />
            <span>100% Cash on Delivery (COD)</span>
          </div>
          <p className="text-[11px] text-white/50 pl-6">
            Pay upon receipt at your delivery address. No advance deposit or credit card required.
          </p>
        </div>

        {/* Accordions */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          {/* Craftsmanship */}
          <div className="border border-white/5 rounded-2xl overflow-hidden bg-cwb-card">
            <button
              onClick={() => toggleAccordion("craft")}
              className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              <span>Materials & Craftsmanship</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openAccordion === "craft" ? "rotate-180 text-cwb-accent" : "text-white/40"
                }`}
              />
            </button>
            {openAccordion === "craft" && (
              <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5 space-y-2">
                <p>• Hand-tailored using traditional full-canvas or half-canvas construction.</p>
                <p>• Sourced directly from premier Biella wool mills and Okayama denim workshops.</p>
                <p>• Finished with genuine horn buttons and Japanese excella dual zippers.</p>
              </div>
            )}
          </div>

          {/* Shipping & COD */}
          <div className="border border-white/5 rounded-2xl overflow-hidden bg-cwb-card">
            <button
              onClick={() => toggleAccordion("shipping")}
              className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              <span>Doorstep Delivery & Exchange</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openAccordion === "shipping" ? "rotate-180 text-cwb-accent" : "text-white/40"
                }`}
              />
            </button>
            {openAccordion === "shipping" && (
              <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5 space-y-2">
                <p>• Complimentary express courier dispatch within 24 hours.</p>
                <p>• Pay comfortably in cash when you receive and inspect your items.</p>
                <p>• 7-day seamless doorstep size exchange.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
