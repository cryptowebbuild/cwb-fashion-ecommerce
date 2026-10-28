import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Star, CheckCircle2, ArrowUpRight, Compass } from "lucide-react";
import { prisma } from "@/lib/db";
import { BentoGrid } from "@/components/store/bento-grid";
import { ProductCard } from "@/components/store/product-card";
import { Product } from "@/types";

export const revalidate = 60; // Instant edge ISR with fresh revalidation

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
    <div className="flex flex-col overflow-hidden">
      {/* 1. High-Fashion Editorial Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 overflow-hidden border-b border-white/[0.06]">
        {/* Background Atmospheric Radial Light */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cwb-accent/[0.07] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (Cols 7) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Season Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cwb-accent animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/80 uppercase">
                  Autumn / Winter 2026 Edition
                </span>
              </div>

              {/* Main Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light text-white tracking-tight uppercase leading-[1.05] font-serif">
                THE ARCHITECTURAL <br />
                <span className="font-normal italic text-cwb-accent lowercase font-serif">
                  silhouette
                </span>
              </h1>

              {/* Editorial Description */}
              <p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed font-light mx-auto lg:mx-0">
                Where Italian sartorial tailoring converges with heavyweight Japanese streetwear. Pure virgin wools, 500GSM boxy cottons, and handcrafted calfskin. Experience effortless acquisition with{" "}
                <span className="text-white font-medium underline decoration-cwb-accent/50 underline-offset-4">
                  100% Cash on Delivery
                </span>{" "}
                nationwide.
              </p>

              {/* CTA Group */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-cwb-accentLight text-black font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Explore The Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop?category=luxury-tailoring"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-cwb-accent/50 text-white font-mono text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Compass className="w-4 h-4 text-cwb-accent" />
                  <span>Bespoke Tailoring</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/[0.06] text-center lg:text-left">
                <div>
                  <span className="text-xs font-mono font-bold text-white block">100% COD</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Zero Advance Risk</span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-white block">SUPER 150s</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Biella Virgin Wool</span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-white block">48H DISPATCH</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">White-Glove Courier</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Model Photography (Cols 5) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl luxury-card group">
                <Image
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
                  alt="CWB Atelier Lookbook 01"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Floating Fashion Label Card */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-cwb-accent tracking-widest uppercase block">
                      Featured Runway Look
                    </span>
                    <h3 className="text-sm font-serif text-white tracking-wide">
                      Obsidian Double-Breasted & Pleated Wool
                    </h3>
                  </div>
                  <Link
                    href="/shop?category=luxury-tailoring"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-cwb-accent hover:bg-white/20 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Bento Categories Showcase */}
      <BentoGrid />

      {/* 3. Featured Drops Section (3:4 Editorial Cards) */}
      <section className="py-24 border-t border-white/[0.06] bg-cwb-dark/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-cwb-accent block mb-2">
                Curated Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                Featured <span className="italic font-normal text-cwb-accent">Runway Drops</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:text-cwb-accent transition-colors pb-1 border-b border-white/20 hover:border-cwb-accent"
            >
              <span>Explore All {featuredProducts.length}+ Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. The CWB Atelier Standard (Editorial Trust Manifesto) */}
      <section className="py-24 border-t border-white/[0.06] bg-cwb-void relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cwb-accent block mb-3">
              The Code of Sartorial Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              The Atelier <span className="italic text-cwb-accent font-normal">Standard</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-4 leading-relaxed font-light">
              Every garment is designed, patterned, and finished to meet the exacting criteria of international luxury houses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-6">
              <span className="text-3xl font-serif text-cwb-accent font-light">01</span>
              <div>
                <h3 className="text-base font-serif text-white tracking-wide">Doorstep Inspection</h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  Every order ships with zero upfront payment. Inspect fabric density, button hand-stitching, and cut before handing over cash.
                </p>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                100% Cash on Delivery
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-6">
              <span className="text-3xl font-serif text-cwb-accent font-light">02</span>
              <div>
                <h3 className="text-base font-serif text-white tracking-wide">Biella & Tokyo Mills</h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  We partner exclusively with legacy heritage textile mills for Super 150s virgin wool, double-faced cashmere, and 500GSM loopback cotton.
                </p>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Natural Noble Fibers
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-6">
              <span className="text-3xl font-serif text-cwb-accent font-light">03</span>
              <div>
                <h3 className="text-base font-serif text-white tracking-wide">Sculpted Proportions</h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  Structured shoulders with roped sleeve heads and draped chest canvassing engineered to augment natural masculine silhouette.
                </p>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Architectural Fit
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-6">
              <span className="text-3xl font-serif text-cwb-accent font-light">04</span>
              <div>
                <h3 className="text-base font-serif text-white tracking-wide">Archival Packaging</h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  Delivered inside custom matte-black garment boxes, breathable cotton suit dusters, and heavy-duty wooden shoulder hangers.
                </p>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                White-Glove Presentation
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
