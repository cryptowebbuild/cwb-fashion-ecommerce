"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-white/10 text-white/70 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cwb-card border border-white/10 text-cwb-accent">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Cash on Delivery (COD)</h4>
              <p className="text-xs text-white/50 mt-1">
                Zero advance payment required. Inspect your premium garments upon home delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cwb-card border border-white/10 text-cwb-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Master Craftsmanship</h4>
              <p className="text-xs text-white/50 mt-1">
                Super 150s virgin wool, Japanese Cordura, and full-grain Italian leather only.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cwb-card border border-white/10 text-cwb-accent">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Hassle-Free Exchange</h4>
              <p className="text-xs text-white/50 mt-1">
                7-day complimentary doorstep size exchange for a flawless custom fit.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cwb-accent to-cwb-accentDark flex items-center justify-center font-bold text-black text-base">
                C
              </div>
              <span className="text-lg font-extrabold tracking-widest text-white uppercase">
                CWB<span className="text-cwb-accent">.</span>FASHION
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/60">
              Where futuristic aesthetics meet sartorial excellence. Designed for modern leaders, innovators, and creators worldwide.
            </p>
            <div className="text-[11px] text-white/40">
              Direct from CryptoWebBuild Haute Couture Studio.
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shop?category=luxury-tailoring" className="hover:text-white transition-colors">
                  Italian Tailoring & Suits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=urban-streetwear" className="hover:text-white transition-colors">
                  Cyber Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link href="/shop?category=outerwear" className="hover:text-white transition-colors">
                  Leather Biker & Trench
                </Link>
              </li>
              <li>
                <Link href="/shop?category=footwear-accessories" className="hover:text-white transition-colors">
                  Calfskin Chelsea Boots & Watches
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  View All Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-4">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Size & Measurement Guide
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shipping & COD Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Staff & Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* VIP Access Newsletter */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-4">
              Private Drop Access
            </h5>
            <p className="text-xs text-white/50 mb-3">
              Subscribe for early access to limited edition seasonal menswear releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cwb-accent flex-1"
                aria-label="Newsletter email input"
              />
              <button
                type="submit"
                className="bg-cwb-accent hover:bg-cwb-accentLight text-black font-semibold px-3 py-2 rounded-lg text-xs flex items-center justify-center transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} CWB FASHION (CryptoWebBuild). All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
