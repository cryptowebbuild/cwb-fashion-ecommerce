import React from "react";
import { Sparkles, Truck, ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function AnnouncementBar() {
  const marqueeItems = [
    {
      icon: Truck,
      text: "NATIONWIDE CASH ON DELIVERY • TRY & INSPECT BEFORE PAYMENT",
      highlight: true,
    },
    {
      icon: Sparkles,
      text: "ARCHIVAL DROP: USE CODE 'LAUNCH20' FOR 20% OFF",
      highlight: false,
    },
    {
      icon: ShieldCheck,
      text: "100% BESPOKE MASTER TAILORING & HEAVYWEIGHT JAPANESE COTTONS",
      highlight: false,
    },
    {
      icon: ArrowUpRight,
      text: "COMPLIMENTARY CONCIERGE PACKAGING & 48-HOUR DISPATCH",
      highlight: true,
    },
  ];

  return (
    <div className="bg-cwb-void/90 backdrop-blur-md border-b border-white/[0.06] text-[10px] sm:text-[11px] py-2 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap items-center text-white/70 font-mono tracking-widest uppercase">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center mx-6 gap-2">
              <Icon
                className={`w-3 h-3 ${
                  item.highlight ? "text-cwb-accent" : "text-white/40"
                }`}
              />
              <span className={item.highlight ? "text-white font-medium" : ""}>
                {item.text}
              </span>
              <span className="text-cwb-accent/40 ml-6">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
