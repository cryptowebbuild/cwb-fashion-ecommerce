"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Grid, LayoutGrid, RotateCcw } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { Product, Category } from "@/types";

interface ShopClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [columns, setColumns] = useState<2 | 4>(4);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all" && product.category?.slug !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category?.name.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // default: featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div>
      {/* 1. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/[0.06]">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all whitespace-nowrap ${
            selectedCategory === "all"
              ? "bg-cwb-accent text-black font-bold shadow-lg shadow-cwb-accent/20"
              : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
          }`}
        >
          All Archival Pieces ({initialProducts.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedCategory === cat.slug
                ? "bg-cwb-accent text-black font-bold shadow-lg shadow-cwb-accent/20"
                : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 2. Controls & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-8 mb-8 border-b border-white/[0.06]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wool, blazer, boots, hoodie..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-cwb-accent font-sans transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Actions: Results Counter, View Toggle, Sort */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Silhouette" : "Silhouettes"}
          </span>

          {/* 2-col vs 4-col Grid Switcher */}
          <div className="hidden sm:flex items-center p-1 rounded-lg bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setColumns(2)}
              className={`p-1.5 rounded transition-colors ${
                columns === 2 ? "bg-white/10 text-cwb-accent" : "text-white/40 hover:text-white"
              }`}
              title="2 Columns (Editorial Lookbook View)"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 rounded transition-colors ${
                columns === 4 ? "bg-white/10 text-cwb-accent" : "text-white/40 hover:text-white"
              }`}
              title="4 Columns (Catalog View)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 pr-8 text-xs text-white/80 focus:outline-none focus:border-cwb-accent font-mono uppercase tracking-wider cursor-pointer"
            >
              <option value="featured" className="bg-[#101218] text-white">
                Featured Drops
              </option>
              <option value="newest" className="bg-[#101218] text-white">
                New Arrivals
              </option>
              <option value="price-asc" className="bg-[#101218] text-white">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-[#101218] text-white">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Product Catalog Grid */}
      {filteredProducts.length > 0 ? (
        <div
          className={`grid gap-6 sm:gap-8 ${
            columns === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-24 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-6 text-cwb-accent">
            <SlidersHorizontal className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-serif text-white tracking-wide">
            No Archival Pieces Found
          </h3>
          <p className="text-xs text-white/50 mt-2 leading-relaxed font-light">
            No pieces match your filter parameters. Try clearing your search keyword or switching category tags.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 hover:bg-cwb-accentLight transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
