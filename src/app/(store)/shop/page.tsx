import React from "react";
import { prisma } from "@/lib/db";
import { ShopClient } from "./shop-client";
import { Product, Category } from "@/types";

export const revalidate = 60;

export default async function ShopPage() {
  const [categoriesRaw, productsRaw] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    }),
    prisma.product.findMany({
      where: { isArchived: false },
      include: {
        category: true,
        variants: true,
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const categories: Category[] = categoriesRaw.map((c) => ({
    ...c,
  }));

  const products: Product[] = productsRaw.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen py-16 bg-cwb-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Catalog Header */}
        <div className="mb-14 pb-8 border-b border-white/[0.08] text-center sm:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-cwb-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cwb-accent" />
              <span>Autumn / Winter 2026 Archive</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight font-serif">
              The Complete <span className="italic font-normal text-cwb-accent">Collection</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-white/50 max-w-md font-light leading-relaxed">
            From structured Italian double-breasted blazers to Japanese 500GSM loopback cottons. Every garment is available with 100% Cash on Delivery and doorstep inspection.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <ShopClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
