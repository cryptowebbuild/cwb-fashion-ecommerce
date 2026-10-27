import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Truck, Package, Phone, MapPin, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-2 block">
            Cash On Delivery Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto mt-2">
            Your high-fashion menswear order has been received. Our logistics concierge will call you shortly prior to dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-[11px] text-white/50 uppercase tracking-wider block">
                Official Tracking ID
              </span>
              <span className="text-xl sm:text-2xl font-black text-cwb-accent font-mono tracking-wider">
                {order.orderNumber}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                {order.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold uppercase">
                {order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Delivery Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-white/80 font-bold mb-2">
                <MapPin className="w-4 h-4 text-cwb-accent" />
                <span>Shipping Destination</span>
              </div>
              <p className="text-white font-medium">{order.customerName}</p>
              <p className="text-white/60">{order.shippingAddress}</p>
              <p className="text-white/60">{order.city}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-white/80 font-bold mb-2">
                <Phone className="w-4 h-4 text-cwb-accent" />
                <span>Contact Details</span>
              </div>
              <p className="text-white font-medium">{order.customerPhone}</p>
              {order.customerEmail && (
                <p className="text-white/60">{order.customerEmail}</p>
              )}
              {order.notes && (
                <p className="text-white/50 text-[11px] pt-1">
                  Note: &quot;{order.notes}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Ordered Items List */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Garments in Package ({order.items.length})
            </h3>
            <div className="divide-y divide-white/5 border border-white/5 rounded-2xl bg-white/5 p-4 space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-[11px] text-white/50">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-cwb-accentLight">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Due */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-white/50 uppercase tracking-wider block">
                Total Amount Due on Delivery
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                No advance paid • Pay upon delivery
              </span>
            </div>
            <span className="text-2xl font-black text-cwb-accentLight">
              ${order.totalAmount}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-colors"
          >
            <span>Explore More Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
