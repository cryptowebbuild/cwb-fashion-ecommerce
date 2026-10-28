"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  Check,
  AlertTriangle,
  ChevronDown,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/cart-context";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem, toggleCart } = useCart();
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Extract distinct sizes & colors
  const allSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const allColors = Array.from(new Set(product.variants.map((v) => v.color)));

  const [selectedSize, setSelectedSize] = useState<string>(allSizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(allColors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Exact matching variant with NO fallback to variant[0] to prevent bypassing out-of-stock guards
  const currentVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const currentStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = !currentVariant || currentStock === 0;

  // Auto-switch size if current size is not in stock for the newly selected color
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    const variantInNewColor = product.variants.find(
      (v) => v.color === newColor && v.size === selectedSize && v.stock > 0
    );
    if (!variantInNewColor) {
      const availableVariant = product.variants.find(
        (v) => v.color === newColor && v.stock > 0
      );
      if (availableVariant) {
        setSelectedSize(availableVariant.size);
      }
    }
  };

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

  const handleBuyNowCOD = () => {
    handleAddToCart();
    toggleCart();
  };

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left: Editorial Gallery (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  activeImageIndex === idx
                    ? "border-cwb-accent scale-105 shadow-lg shadow-cwb-accent/20"
                    : "border-white/10 opacity-50 hover:opacity-100"
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

        {/* Main High-Res Image (3:4 ratio for editorial elegance) */}
        <div className="relative aspect-[3/4] flex-1 rounded-2xl overflow-hidden bg-[#0c0d12] border border-white/[0.08] shadow-2xl luxury-card group">
          <Image
            src={images[activeImageIndex]}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />

          {hasDiscount && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cwb-accent text-black font-mono font-bold text-[10px] tracking-wider uppercase shadow-xl">
              Archival Privilege Price
            </div>
          )}

          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[9px] tracking-widest uppercase">
            Look 0{activeImageIndex + 1} • High-Resolution View
          </div>
        </div>
      </div>

      {/* Right: Product Dossier & Purchase Concierge (5 Cols) */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
        <div>
          {product.category && (
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cwb-accent mb-2 block">
              {product.category.name} • Drop 01
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-4 border-b border-white/[0.06] pb-6">
            <span className="text-3xl font-mono font-bold text-white">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="text-sm font-mono text-white/40 line-through">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 uppercase tracking-widest">
              100% Cash On Delivery
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-[11px] text-white/80 uppercase tracking-widest">
              Selected Size: <strong className="text-cwb-accent">{selectedSize}</strong>
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
              True to Tailored Cut
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {allSizes.map((size) => {
              const sizeVariant = product.variants.find(
                (v) => v.size === size && v.color === selectedColor
              );
              const isSizeOOS = !sizeVariant || sizeVariant.stock === 0;

              return (
                <button
                  key={size}
                  disabled={isSizeOOS}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-cwb-accent text-black shadow-lg shadow-cwb-accent/20"
                      : isSizeOOS
                      ? "bg-white/[0.02] text-white/20 border border-white/[0.04] line-through cursor-not-allowed opacity-40"
                      : "bg-white/[0.04] text-white/70 border border-white/[0.08] hover:border-cwb-accent/40 hover:text-white"
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
          <span className="font-mono text-[11px] text-white/80 uppercase tracking-widest block">
            Finish & Colorway: <strong className="text-cwb-accent">{selectedColor}</strong>
          </span>

          <div className="flex flex-wrap gap-2">
            {allColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  selectedColor === color
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-white/[0.04] text-white/70 border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Real-Time Stock Status */}
        <div className="pt-2">
          {isOutOfStock ? (
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Archived out of stock in this combination.</span>
            </div>
          ) : currentStock <= 4 ? (
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-cwb-accent" />
              <span>High demand: Only {currentStock} pieces remaining in archival reserve.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>In Atelier Stock ({currentStock} pieces) — Complimentary nationwide dispatch.</span>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 py-3.5 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-cwb-accent text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-cwb-accent" />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNowCOD}
            disabled={isOutOfStock}
            className="flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-cwb-accentLight text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 disabled:opacity-40"
          >
            <span>Order via Cash on Delivery</span>
          </button>
        </div>

        {/* Doorstep Trust Note */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3 text-xs text-white/50">
          <Truck className="w-4 h-4 text-cwb-accent shrink-0" />
          <span>Pay in cash upon physical delivery. Inspect stitching & fit before payment.</span>
        </div>

        {/* Luxury Accordions */}
        <div className="border-t border-white/[0.06] pt-6 space-y-3">
          <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() => toggleAccordion("craft")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left font-serif text-sm text-white hover:text-cwb-accent transition-colors"
            >
              <span>Fabric & Sartorial Construction</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordion === "craft" ? "rotate-180 text-cwb-accent" : "text-white/40"
                }`}
              />
            </button>
            {openAccordion === "craft" && (
              <div className="px-4 pb-4 text-xs text-white/60 leading-relaxed font-light border-t border-white/[0.04] pt-3">
                Woven from premium natural fibers sourced from Italian and Japanese textile authorities. Engineered with canvas structuring, hand-finished cuffs, and corrosion-resistant hardware.
              </div>
            )}
          </div>

          <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() => toggleAccordion("cod")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left font-serif text-sm text-white hover:text-cwb-accent transition-colors"
            >
              <span>Cash on Delivery & Doorstep Protocol</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordion === "cod" ? "rotate-180 text-cwb-accent" : "text-white/40"
                }`}
              />
            </button>
            {openAccordion === "cod" && (
              <div className="px-4 pb-4 text-xs text-white/60 leading-relaxed font-light border-t border-white/[0.04] pt-3">
                1. Our concierge calls to confirm delivery window.<br />
                2. Rider arrives with your archival garment box.<br />
                3. Inspect garment quality, size, and finish.<br />
                4. Hand over exact cash payment. 7-day doorstep size exchange guaranteed.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
