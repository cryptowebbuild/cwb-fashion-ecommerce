import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ShieldCheck, Truck, Zap } from "lucide-react";

export function BentoGrid() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cwb-accent flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              A New Era of Sartorial Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Curated Menswear Architecture
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-cwb-accent hover:text-cwb-accentLight transition-colors"
          >
            <span>Explore All Drops</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Large Feature (Span 2 cols, 2 rows) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-gradient-to-b from-[#141724] to-[#0d0f17] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop"
                alt="Italian Milano Tailoring"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-[#0d0f17]/60 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-cwb-accent/20 border border-cwb-accent/30 text-cwb-accent font-semibold text-xs uppercase tracking-wider">
                Flagship Drop
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 mt-32">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Super 150s Italian Milano Double-Breasted
              </h3>
              <p className="text-sm text-white/60 mt-2 max-w-md">
                Woven in Biella with half-canvas structure and hand-carved horn buttons. Built for high-stakes presence.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="/shop?category=luxury-tailoring"
                  className="px-6 py-2.5 rounded-xl bg-cwb-accent text-black font-extrabold text-xs tracking-wider uppercase hover:bg-cwb-accentLight transition-colors"
                >
                  Shop Tailoring
                </Link>
                <span className="text-lg font-bold text-white">$495</span>
              </div>
            </div>
          </div>

          {/* Card 2: Cash on Delivery Highlight */}
          <div className="rounded-3xl bg-gradient-to-br from-[#12141c] to-[#090b10] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 text-cwb-accent mb-6">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cwb-accent">
                Frictionless Commerce
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                100% Cash on Delivery
              </h4>
              <p className="text-xs text-white/50 mt-2 leading-relaxed">
                Order in 30 seconds without prepaying. Inspect garments at your doorstep prior to payment.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
              <span>Delivery Time</span>
              <span className="font-semibold text-white">24-48 Hours</span>
            </div>
          </div>

          {/* Card 3: Cyber Streetwear */}
          <div className="rounded-3xl bg-gradient-to-br from-[#12141c] to-[#090b10] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop"
                alt="Cyber Streetwear"
                fill
                sizes="25vw"
                className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative z-10 flex justify-between">
              <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 text-cwb-accent">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-cwb-accentLight uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full h-fit">
                New Drop
              </span>
            </div>
            <div className="relative z-10 mt-16">
              <h4 className="text-xl font-bold text-white">500 GSM Heavyweight Terry</h4>
              <p className="text-xs text-white/50 mt-2">
                Uncompromising density and boxy silhouette with ergonomic drop shoulder.
              </p>
              <Link
                href="/shop?category=urban-streetwear"
                className="inline-flex items-center gap-1.5 text-xs text-cwb-accent font-semibold mt-4 hover:underline"
              >
                <span>Shop Streetwear</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: VIP Promo Code Banner (Span 2 cols on tablet/desktop) */}
          <div className="md:col-span-3 lg:col-span-2 rounded-3xl bg-gradient-to-r from-[#171a26] via-[#1f1910] to-[#171a26] border border-cwb-accent/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4" />
                Special Inaugural Drop Privilege
              </span>
              <h4 className="text-2xl font-black text-white">
                Claim 10% Off Your Entire Cart
              </h4>
              <p className="text-xs text-white/60">
                Use code <code className="bg-white/10 text-cwb-accent font-bold px-2 py-0.5 rounded text-xs">CWB10</code> at checkout.
              </p>
            </div>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cwb-accent to-cwb-accentLight text-black font-extrabold text-xs tracking-wider uppercase hover:opacity-90 shrink-0 shadow-lg shadow-cwb-accent/20"
            >
              Shop The Collection
            </Link>
          </div>

          {/* Card 5: Full-Grain Leather Outerwear */}
          <div className="md:col-span-3 lg:col-span-2 rounded-3xl bg-gradient-to-br from-[#131620] to-[#0b0d13] border border-white/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                Materials Standard
              </span>
              <h4 className="text-2xl font-bold text-white">
                1.2mm Italian Full-Grain Leather
              </h4>
              <p className="text-xs text-white/60 max-w-sm">
                Naturally vegetable-tanned hides that patina with character year after year.
              </p>
            </div>
            <Link
              href="/shop?category=outerwear"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase transition-colors shrink-0"
            >
              View Leather Biker
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
