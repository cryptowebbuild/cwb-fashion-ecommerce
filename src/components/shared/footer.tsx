"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-cwb-void border-t border-white/[0.08] text-white/70 pt-20 pb-12 mt-auto overflow-hidden relative">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cwb-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Value Props Bar - High-End Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/[0.06]">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="p-3 rounded-xl bg-cwb-card border border-white/10 text-cwb-accent shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-white text-lg tracking-wide">Cash on Delivery</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Zero advance commitment. Inspect the cut, fabric, and finishing before paying at your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="p-3 rounded-xl bg-cwb-card border border-white/10 text-cwb-accent shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-white text-lg tracking-wide">Atelier Craftsmanship</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Super 150s Italian virgin wools, 500GSM Japanese boxy fleeces, and full-grain nappa leathers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="p-3 rounded-xl bg-cwb-card border border-white/10 text-cwb-accent shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-white text-lg tracking-wide">Concierge Exchange</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                7-day complimentary doorstep size exchange with personalized tailoring consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Main Editorial Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-white/[0.06]">
          {/* Brand Dossier */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-bold tracking-[0.25em] text-white uppercase block font-sans">
                CWB <span className="font-serif italic font-normal text-cwb-accent text-lg lowercase">atelier</span>
              </span>
              <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase font-mono">
                CryptoWebBuild Fashion Studio
              </span>
            </Link>
            <p className="text-xs text-white/50 max-w-sm leading-relaxed">
              Curated menswear at the intersection of classical Italian sartorial tailoring and avant-garde streetwear. Engineered for discerning gentlemen seeking commanding presence.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-cwb-accent font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>LIVE ATELIER • AUTUMN/WINTER 2026 EDITION</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-cwb-accent font-mono block">
              Curations
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop" className="text-white/70 hover:text-white transition-colors">
                  Complete Archive
                </Link>
              </li>
              <li>
                <Link href="/shop?category=luxury-tailoring" className="text-white/70 hover:text-white transition-colors">
                  Bespoke Tailoring
                </Link>
              </li>
              <li>
                <Link href="/shop?category=urban-streetwear" className="text-white/70 hover:text-white transition-colors">
                  Heavyweight Streetwear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=outerwear" className="text-white/70 hover:text-white transition-colors">
                  Architectural Outerwear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=footwear-accessories" className="text-white/70 hover:text-white transition-colors">
                  Footwear & Horology
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-cwb-accent font-mono block">
              Concierge
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/checkout" className="text-white/70 hover:text-white transition-colors">
                  Cash on Delivery Guide
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/70 hover:text-cwb-accent transition-colors flex items-center gap-1">
                  <span>Admin Control Panel</span>
                </Link>
              </li>
              <li>
                <span className="text-white/40">Dhaka & Nationwide Courier</span>
              </li>
              <li>
                <span className="text-white/40">VIP Stylist: hello@cryptowebbuild.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Archival Circle */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-cwb-accent font-mono block">
              The Archival Circle
            </span>
            <p className="text-xs text-white/50 leading-relaxed">
              Receive private invitations to confidential seasonal drops and exclusive editorial promos.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are now enrolled in the VIP circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter executive email..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-cwb-accent transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-cwb-accent hover:bg-cwb-accentLight text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Watermark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>© 2026 CWB Fashion Atelier • CryptoWebBuild. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/70 transition-colors">Privacy Protocol</span>
            <span>•</span>
            <span className="hover:text-white/70 transition-colors">Terms of Atelier</span>
            <span>•</span>
            <span className="text-cwb-accent">100% Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
