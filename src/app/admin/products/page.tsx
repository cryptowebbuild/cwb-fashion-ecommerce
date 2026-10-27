import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Package, Edit, Trash2, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductTableClient } from "./product-table-client";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const productsRaw = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      variants: true,
    },
  });

  const products = productsRaw.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
    createdAt: p.createdAt.toISOString(),
    totalStock: p.variants.reduce((sum, v) => sum + v.stock, 0),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-1 block">
            Catalog Database
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Menswear Collection ({products.length})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 rounded-xl bg-cwb-accent text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-cwb-accentLight transition-colors shadow-lg shadow-cwb-accent/20 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Garment</span>
        </Link>
      </div>

      {/* Interactive Products Table */}
      <ProductTableClient initialProducts={products} />
    </div>
  );
}
