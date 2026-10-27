"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), subtotal }),
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setAppliedCoupon({
          code: data.code,
          discountAmount: data.discountAmount,
        });
        setCouponCode("");
      } else {
        setCouponError(data.message || "Invalid coupon code");
      }
    } catch {
      setCouponError("Failed to apply coupon. Try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0e14] border-l border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cwb-accent" />
              <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                Your Shopping Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-white">Your bag is empty</h3>
                <p className="text-xs text-white/50 max-w-xs mt-1 mb-6">
                  Explore our curated high-fashion tailoring and urban streetwear drops.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-cwb-accent text-black font-semibold text-xs tracking-wider uppercase hover:bg-cwb-accentLight transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-white/40 hover:text-rose-400 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-white/50 mt-0.5 flex gap-2">
                        <span>Size: <strong className="text-white/80">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/10 rounded-lg bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:text-cwb-accent text-white/70 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-1 hover:text-cwb-accent text-white/70 disabled:text-white/20 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-cwb-accentLight">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#08090c] space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. CWB10)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/30 uppercase focus:outline-none focus:border-cwb-accent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponLoading || !couponCode.trim()}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </form>

              {couponError && (
                <div className="flex items-center gap-1.5 text-[11px] text-rose-400">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{couponError}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3 h-3" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </span>
                  <span>-${appliedCoupon.discountAmount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-white/70 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${appliedCoupon.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-cwb-accent uppercase text-[11px] font-bold">Free Express</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="text-white/90">Cash on Delivery (COD)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-cwb-accentLight">${finalTotal}</span>
                </div>
              </div>

              {/* COD Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cwb-accent to-cwb-accentLight text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-cwb-accent/20 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
