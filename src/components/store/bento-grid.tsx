import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function BentoGrid() {
  const collections = [
    {
      title: "Sartorial Tailoring",
      subtitle: "Super 150s Italian Virgin Wool & Hand-Rolled Lapels",
      category: "luxury-tailoring",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2",
      tag: "Drop 01 • Master Tailoring",
      aspect: "aspect-[4/3] md:aspect-auto md:min-h-[500px]",
    },
    {
      title: "Cyber Heavyweight Streetwear",
      subtitle: "500GSM Custom-Milled Boxy Cotton & Modular Cargo",
      category: "urban-streetwear",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-1",
      tag: "500 GSM Fleece",
      aspect: "aspect-[4/3] md:aspect-auto md:min-h-[240px]",
    },
    {
      title: "Architectural Outerwear",
      subtitle: "Full-Grain Calfskin & Double-Faced Cashmere",
      category: "outerwear",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-1",
      tag: "Italian Nappa",
      aspect: "aspect-[4/3] md:aspect-auto md:min-h-[240px]",
    },
    {
      title: "Footwear & Horology",
      subtitle: "Blake-Stitched Leather Boots & Sapphire Automatic Movements",
      category: "footwear-accessories",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-1",
      tag: "Archival Footwear",
      aspect: "aspect-[16/9] md:aspect-auto md:min-h-[240px]",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cwb-accent font-mono text-[11px] tracking-[0.25em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter 2026 Collection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
              The Curated <span className="italic font-normal text-cwb-accent">Categories</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:text-cwb-accent transition-colors pb-1 border-b border-white/20 hover:border-cwb-accent"
          >
            <span>View Complete Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetrical Luxury Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, idx) => (
            <Link
              key={idx}
              href={`/shop?category=${item.category}`}
              className={`group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-cwb-accent/50 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 ${item.span} ${item.aspect} luxury-card`}
            >
              {/* Image Background with Cinematic Scale */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-45 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cwb-void via-cwb-void/50 to-transparent" />
              </div>

              {/* Card Top: Badges & Corner Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cwb-accent font-mono text-[9px] uppercase tracking-widest">
                  {item.tag}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-cwb-accent group-hover:border-cwb-accent/40 group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Bottom: Typography */}
              <div className="relative z-10 mt-20">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white group-hover:text-cwb-accentLight transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 mt-2 font-light leading-relaxed max-w-md">
                  {item.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-cwb-accent tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Drops</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
