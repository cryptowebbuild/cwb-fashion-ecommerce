import React from "react";
import { CartProvider } from "@/context/cart-context";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CartDrawer } from "@/components/store/cart-drawer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cwb-dark">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  );
}
