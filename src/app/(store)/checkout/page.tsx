"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Truck,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { checkoutFormSchema, CheckoutFormData } from "@/lib/validations";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    shippingAddress: "",
    city: "Dhaka",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cwb-accent mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-white/50 max-w-sm mt-2 mb-6">
          Add pieces from our menswear drops to place a Cash on Delivery order.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-cwb-accent text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cwb-accentLight transition-colors"
        >
          Explore Menswear Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Validate form fields
    const result = checkoutFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        ...formData,
        paymentMethod: "COD",
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          title: i.title,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          price: i.price,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order creation failed. Please check stock.");
      }

      // Clear local cart on success
      clearCart();

      // Redirect to success screen
      router.push(`/order-success/${data.orderNumber}`);
    } catch (err: any) {
      setApiError(err.message || "Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-cwb-accent mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cwb-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent">
              Secure Cash on Delivery Checkout
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            Complete Your Order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                1. Delivery & Contact Details
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Enter your exact home or office address for doorstep inspection and cash payment.
              </p>
            </div>

            {apiError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Asif Mahmud"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                    errors.customerName
                      ? "border-rose-500"
                      : "border-white/10 focus:border-cwb-accent"
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.customerName}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                    Phone Number (for Courier Call) *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="e.g. +8801712345678"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.customerPhone
                        ? "border-rose-500"
                        : "border-white/10 focus:border-cwb-accent"
                    }`}
                  />
                  {errors.customerPhone && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.customerPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail || ""}
                    onChange={handleChange}
                    placeholder="For invoice & receipt"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cwb-accent transition-colors"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                  Detailed Delivery Address *
                </label>
                <textarea
                  name="shippingAddress"
                  rows={2}
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  placeholder="Apartment/Flat, House No, Road No, Area"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                    errors.shippingAddress
                      ? "border-rose-500"
                      : "border-white/10 focus:border-cwb-accent"
                  }`}
                />
                {errors.shippingAddress && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    {errors.shippingAddress}
                  </p>
                )}
              </div>

              {/* City Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                    City / Division *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cwb-accent cursor-pointer"
                  >
                    <option value="Dhaka" className="bg-[#12141c]">Dhaka (Inside City)</option>
                    <option value="Chittagong" className="bg-[#12141c]">Chittagong</option>
                    <option value="Sylhet" className="bg-[#12141c]">Sylhet</option>
                    <option value="Rajshahi" className="bg-[#12141c]">Rajshahi</option>
                    <option value="Khulna" className="bg-[#12141c]">Khulna</option>
                    <option value="Barisal" className="bg-[#12141c]">Barisal</option>
                    <option value="Rangpur" className="bg-[#12141c]">Rangpur</option>
                    <option value="Other / International" className="bg-[#12141c]">Other / Suburbs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                    Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes || ""}
                    onChange={handleChange}
                    placeholder="e.g. Call before arrival"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cwb-accent transition-colors"
                  />
                </div>
              </div>

              {/* Payment Method Badge */}
              <div className="pt-4 border-t border-white/5">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cwb-accent/10 to-transparent border border-cwb-accent/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-4 border-cwb-accent bg-black" />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Cash on Delivery (COD)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cwb-accent text-black font-extrabold uppercase">
                          No Advance
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-0.5">
                        Pay in cash upon doorstep verification of your package.
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-cwb-accent shrink-0" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cwb-accent to-cwb-accentLight text-black font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl shadow-cwb-accent/25 hover:opacity-95 transition-all disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Order with Cash on Delivery (${subtotal})</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white tracking-wide uppercase">
              Order Summary ({items.length} items)
            </h2>

            <div className="divide-y divide-white/5 max-h-96 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.variantId} className="pt-3 first:pt-0 flex gap-4">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/50 mt-0.5">
                        Size: <strong className="text-white/80">{item.size}</strong> • {item.color}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/60">Qty: {item.quantity}</span>
                      <span className="font-bold text-cwb-accentLight">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Doorstep Courier Delivery</span>
                <span className="text-cwb-accent font-bold uppercase text-[11px]">
                  Free Express
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total Due on Delivery</span>
                <span className="text-cwb-accentLight">${subtotal}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-white/50 space-y-1.5">
              <p className="font-semibold text-white/80">CWB Guarantee:</p>
              <p>• Inspection prior to payment allowed.</p>
              <p>• 7-day complimentary doorstep size exchange guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
