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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-2 block">
            Menswear Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            The Complete Collection
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-2 max-w-xl">
            Explore handcrafted blazers, heavyweight terry streetwear, full-grain leather, and Goodyear-welted footwear. 100% Cash on Delivery on all orders.
          </p>
        </div>

        {/* Interactive Filter & Product Display */}
        <ShopClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
