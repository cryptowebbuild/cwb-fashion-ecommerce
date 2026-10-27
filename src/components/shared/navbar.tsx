"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, Shield, ChevronRight } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "All Drops", href: "/shop" },
    { name: "Tailoring", href: "/shop?category=luxury-tailoring" },
    { name: "Streetwear", href: "/shop?category=urban-streetwear" },
    { name: "Outerwear", href: "/shop?category=outerwear" },
    { name: "Footwear", href: "/shop?category=footwear-accessories" },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
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

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cwb-accent to-cwb-accentDark flex items-center justify-center font-bold text-black text-lg tracking-wider shadow-lg shadow-cwb-accent/20 group-hover:scale-105 transition-transform">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-widest text-white uppercase group-hover:text-cwb-accentLight transition-colors">
                CWB<span className="text-cwb-accent">.</span>FASHION
              </span>
              <span className="text-[9px] tracking-[0.25em] text-white/40 -mt-1 uppercase">
                CryptoWebBuild Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white hover:text-cwb-accent transition-colors relative py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            aria-label="Search collection"
          >
            <Search className="w-5 h-5" />
          </Link>

          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:text-cwb-accent hover:border-cwb-accent/40 transition-colors"
            title="Admin Control Panel"
          >
            <Shield className="w-3.5 h-3.5 text-cwb-accent" />
            <span>Admin</span>
          </Link>

          <button
            onClick={toggleCart}
            className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cwb-accent/40 rounded-full text-white transition-all group"
            aria-label={`Shopping Cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-cwb-accent" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-cwb-accent text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-base font-medium text-white/80 hover:text-cwb-accent py-2 border-b border-white/5"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-cwb-accent py-2"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Control Panel</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
