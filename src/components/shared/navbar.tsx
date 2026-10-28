"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, Shield, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Navbar() {
  const { totalItems, subtotal, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Collection", href: "/shop" },
    { name: "Tailoring", href: "/shop?category=luxury-tailoring" },
    { name: "Streetwear", href: "/shop?category=urban-streetwear" },
    { name: "Outerwear", href: "/shop?category=outerwear" },
    { name: "Footwear", href: "/shop?category=footwear-accessories" },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-cwb-accent via-[#e5c378] to-cwb-accentDark flex items-center justify-center font-serif text-black font-bold text-xl tracking-wider shadow-md shadow-cwb-accent/10 group-hover:scale-105 transition-transform duration-300">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase font-sans group-hover:text-cwb-accentLight transition-colors">
                CWB <span className="font-serif italic font-normal text-cwb-accent text-sm lowercase">atelier</span>
              </span>
              <span className="text-[8px] tracking-[0.3em] text-white/40 uppercase font-mono -mt-0.5">
                Haute Menswear Drops
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Links with High-End Editorial Spacing */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white hover:text-cwb-accent transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cwb-accent hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/shop"
            className="p-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/admin"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] tracking-wider uppercase font-mono text-white/70 hover:text-cwb-accent hover:border-cwb-accent/30 transition-all"
            title="Admin Portal"
          >
            <Shield className="w-3 h-3 text-cwb-accent" />
            <span>Portal</span>
          </Link>

          {/* Cart Trigger with Luxury Chip */}
          <button
            onClick={toggleCart}
            className="flex items-center gap-2.5 pl-3 pr-3.5 py-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] hover:border-cwb-accent/40 rounded-full text-white transition-all group duration-300 shadow-sm"
            aria-label={`Shopping Bag with ${totalItems} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-cwb-accent group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-cwb-accent text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-mono tracking-wider font-semibold text-white/90">
              ${subtotal.toFixed(0)}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 pt-5 pb-8 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="text-[10px] uppercase tracking-widest text-cwb-accent font-mono mb-2">
            Curated Categories
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-base font-serif tracking-wider text-white/80 hover:text-cwb-accent py-2 border-b border-white/[0.06]"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-4 h-4 text-white/30" />
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-mono text-cwb-accent py-2 uppercase tracking-wider"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </Link>
            <span className="text-[10px] text-white/40 font-mono">100% COD</span>
          </div>
        </div>
      )}
    </header>
  );
}
