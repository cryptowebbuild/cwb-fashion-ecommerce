import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-cwb-dark via-[#141722] to-cwb-dark border-b border-cwb-accent/20 text-xs py-2 px-4 text-center text-white/90 font-medium tracking-wider uppercase">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 overflow-hidden">
        <span className="flex items-center gap-1.5 text-cwb-accent">
          <Truck className="w-3.5 h-3.5" />
          <span>100% Cash on Delivery (COD)</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="hidden sm:flex items-center gap-1.5 text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-cwb-accent" />
          <span>Use Code <strong className="text-cwb-accentLight">CWB10</strong> for 10% Off</span>
        </span>
        <span className="hidden md:inline text-white/20">•</span>
        <span className="hidden md:flex items-center gap-1.5 text-white/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Guaranteed Authentic Italian Fabric</span>
        </span>
      </div>
    </div>
  );
}
