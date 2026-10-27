import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Star, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { BentoGrid } from "@/components/store/bento-grid";
import { ProductCard } from "@/components/store/product-card";
import { Product } from "@/types";

export const revalidate = 60; // ISR for instant edge responses and 100 SEO

export default async function HomePage() {
  const featuredProductsRaw = await prisma.product.findMany({
    where: { isFeatured: true, isArchived: false },
    take: 8,
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const featuredProducts: Product[] = featuredProductsRaw.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-24">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cwb-accent/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-32 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cwb-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
              New Seasonal Release • Drop 01
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[1.05]">
            HAUTE COUTURE <br />
            <span className="bg-gradient-to-r from-white via-cwb-accentLight to-cwb-accent bg-clip-text text-transparent">
              FOR MODERN TITANS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed font-light">
            Engineered in Biella & Tokyo. Merging fine Italian wool tailoring with heavy-weight cyber streetwear. Order with complete peace of mind via <strong className="text-white font-medium">100% Cash on Delivery</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cwb-accent to-cwb-accentLight text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-cwb-accent/20 hover:scale-105 transition-all"
            >
              <span>Explore The Drops</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop?category=luxury-tailoring"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center"
            >
              <span>Italian Tailoring</span>
            </Link>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Cash On Delivery</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">Super 150s</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Virgin Wool Mills</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">500 GSM</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Heavy French Terry</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4.9 / 5.0</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Visual Showcase */}
      <BentoGrid />

      {/* Featured Drops Carousel / Grid */}
      <section className="py-20 bg-[#06070a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cwb-accent mb-2 block">
                Exclusive Availability
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Featured Seasonal Drops
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 sm:mt-0 text-xs uppercase font-bold tracking-widest text-white/70 hover:text-cwb-accent transition-colors flex items-center gap-1.5"
            >
              <span>View All 12 Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CWB Fashion */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-3 block">
              The CWB Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Why Discerning Men Choose CWB
            </h2>
            <p className="mt-4 text-sm text-white/60">
              We eliminated the compromises of traditional shopping to deliver an elite luxury menswear experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-cwb-card border border-white/5 relative">
              <div className="w-12 h-12 rounded-2xl bg-cwb-accent/10 border border-cwb-accent/20 flex items-center justify-center text-cwb-accent mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Zero Pre-Payment Risk</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Pay only when the package arrives in your hands. Inspect fabric quality, tailoring seams, and size at your doorstep with 100% Cash on Delivery.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-cwb-card border border-white/5 relative">
              <div className="w-12 h-12 rounded-2xl bg-cwb-accent/10 border border-cwb-accent/20 flex items-center justify-center text-cwb-accent mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Biella & Tokyo Textile Sourcing</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                We strictly bypass synthetic shortcuts. Every blazer uses genuine horn buttons and horsehair canvas; every hoodie utilizes 500 GSM combed cotton.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-cwb-card border border-white/5 relative">
              <div className="w-12 h-12 rounded-2xl bg-cwb-accent/10 border border-cwb-accent/20 flex items-center justify-center text-cwb-accent mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Complimentary Doorstep Exchange</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Need a size adjustment? Our concierge team dispatches your alternate size within 24 hours with zero return fees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
