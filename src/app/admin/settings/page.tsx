"use client";

import React, { useState } from "react";
import { Settings, Shield, Server, Check, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("CWB Fashion");
  const [contactEmail, setContactEmail] = useState("concierge@cwbfashion.com");
  const [shippingNotice, setShippingNotice] = useState(
    "100% Cash on Delivery (COD) Available • Free Express Shipping"
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-1 block">
          Platform Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Store & System Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Settings (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          <form
            onSubmit={handleSave}
            className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Storefront Preferences
            </h2>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Store Brand Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Concierge Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase mb-1">
                Top Announcement Bar Message
              </label>
              <input
                type="text"
                value={shippingNotice}
                onChange={(e) => setShippingNotice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cwb-accent"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cwb-accent text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-cwb-accentLight transition-colors shadow-lg shadow-cwb-accent/20"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Preferences Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Infrastructure & Free Hosting Status (1 Col) */}
        <div className="space-y-6">
          <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-cwb-accent">
              <Server className="w-5 h-5" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                100% Free Tier Status
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-white/40 uppercase block">
                  Frontend & Edge API
                </span>
                <span className="font-semibold text-white">Vercel Hobby Tier</span>
                <span className="text-[10px] text-emerald-400 block">
                  • 100% Free Forever ($0/mo)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-white/40 uppercase block">
                  Cloud Database
                </span>
                <span className="font-semibold text-white">Turso Edge SQLite</span>
                <span className="text-[10px] text-emerald-400 block">
                  • 9GB Storage, 1B Reads ($0/mo)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-white/40 uppercase block">
                  Image CDN
                </span>
                <span className="font-semibold text-white">Cloudinary / Unsplash</span>
                <span className="text-[10px] text-emerald-400 block">
                  • AVIF / WebP Auto-Compressed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
