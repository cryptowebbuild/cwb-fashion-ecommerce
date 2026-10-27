import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProductDetailsClient } from "./product-details-client";
import { ProductCard } from "@/components/store/product-card";
import { Product } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return { title: "Product Not Found" };

  const images = JSON.parse(product.images || "[]");
  return {
    title: `${product.title} | CWB Fashion`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: images.length > 0 ? [{ url: images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const productRaw = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
    },
  });

  if (!productRaw || productRaw.isArchived) {
    notFound();
  }

  const product: Product = {
    ...productRaw,
    images: JSON.parse(productRaw.images || "[]"),
    createdAt: productRaw.createdAt.toISOString(),
  };

  // Fetch 4 related products
  const relatedRaw = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isArchived: false,
    },
    take: 4,
    include: {
      category: true,
      variants: true,
    },
  });

  const relatedProducts: Product[] = relatedRaw.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Viewer */}
        <ProductDetailsClient product={product} />

        {/* Related Drops */}
        {relatedProducts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-white/10">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-1 block">
                Complementary Pieces
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Complete The Silhouette
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
