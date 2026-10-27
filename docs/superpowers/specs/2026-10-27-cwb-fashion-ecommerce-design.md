# Design Document: CWB Fashion (CryptoWebBuild Fashion) Full-Stack E-Commerce Platform

**Date:** 2026-10-27  
**Author:** Antigravity & User  
**Status:** Approved by Engineering Review, Ready for Final User Approval  
**Target Brand:** CWB Fashion (CryptoWebBuild Fashion)

---

## 1. Intent & The "Why"
Build an ultra-premium, production-grade Men's Fashion E-Commerce platform with a complete custom Admin Control Panel. The experience combines the futuristic aesthetic and slick micro-interactions of Brainwave and Xora with the standard-setting speed of Next.js 15, Hono, Tailwind CSS, and Shadcn UI. It guarantees a flawless 100/100 score in Google Lighthouse across Performance, SEO, Accessibility, and Best Practices. The entire system is built to deploy on **100% free tier infrastructure** (Vercel + Turso SQLite + Cloudinary/Unsplash CDN) with zero hosting costs.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Curated Men's Fashion Storefront:** High-fashion menswear catalog (Luxury Formal Suits, Streetwear Hoodies/Tees, Premium Leather Jackets, Designer Footwear, Minimalist Watches/Accessories).
- **Frictionless Cash on Delivery (COD) Checkout:** Streamlined guest checkout requiring Name, Phone, Delivery Address, City, and Notes, maximizing conversion rates without forcing account registration.
- **Variant-Level Inventory & SKU Tracking:** Size (S, M, L, XL, XXL) and Color matrix with discrete stock units per combination, dynamic out-of-stock badges, and real-time availability checks.
- **Comprehensive Admin Control Panel (`/admin`):**
  - KPI Dashboard with live gross revenue, total orders, average order value, and privacy-preserving zero-script conversion rate tracking.
  - Product Catalog Management (CRUD operations, multi-image upload/URL, size/color variant matrix, stock controls, sale pricing, featured toggles).
  - Order Management & Lifecycle (`Pending` -> `Processing` -> `Shipped` -> `Delivered` -> `Cancelled`).
  - Category Management.
  - Promo & Coupon Engine (Percentage/Flat discount, expiry, min spend).
  - Store Announcements & Settings.
- **100/100 Lighthouse Benchmark:**
  - Performance: 100 (sub-second LCP, 0 CLS, <100ms INP).
  - SEO: 100 (JSON-LD Product Schema, dynamic OpenGraph, sitemap.xml, robots.txt, semantic HTML5).
  - Accessibility: 100 (WCAG 2.1 AA compliant, Radix UI accessible primitives).
  - Best Practices: 100 (HTTPS, modern image formats AVIF/WebP, strict security headers).
- **Modern Futuristic Aesthetic:** Inspired by Brainwave & Xora—deep luxury dark theme with refined metallic/champagne accents, smooth micro-interactions powered by Motion, bento-grid feature highlights, and responsive mobile bottom sheets.
- **100% Free Hosting:** Zero cost to host, run, and scale within free tier limits.

### Non-Goals
- Multi-vendor marketplace (dedicated single-brand store for CWB Fashion).
- Forced customer account creation (guest checkout is prioritized; admin auth is strictly secured).
- Paid third-party payment gateways (Cash on Delivery is the operational payment method).

### Anti-Goals
- Third-party client analytics scripts (Google Analytics/Meta Pixel) that degrade Lighthouse scores.
- Relying on paid cloud databases or CMS subscriptions.
- Generic templates that look like standard WooCommerce or basic Shopify stores.

---

## 3. 100% Free Hosting & Infrastructure Strategy

| Component | Free Platform / Provider | Free Tier Specifications & Rationale |
| :--- | :--- | :--- |
| **Web & API Hosting** | **Vercel** (Hobby Plan) | 100% free forever. Global Edge Network, automatic Next.js 15 optimization, automatic SSL, custom domain support, unlimited continuous deployments. |
| **Database** | **Turso (LibSQL/SQLite)** | Turso provides 500 databases, 9GB storage, and 1 billion row reads/month completely free. Extremely low-latency edge queries. For local development, an embedded SQLite database is used with seamless cloud sync. |
| **Image & Media Storage** | **Cloudinary** / **Unsplash CDN** / WebP optimized URLs | Free tier allows 25 monthly transformation credits or high-resolution optimized CDN links with automatic WebP/AVIF format negotiation. |
| **Authentication** | **Self-hosted JWT + Secure HttpOnly Cookies** | Zero cost, no external identity provider lock-in, bcrypt-hashed passwords stored directly in the database for admin access. |

---

## 4. Architectural Approaches Evaluated

1. **Approach 1: Unified Next.js 15 App Router + Hono API + Prisma/Drizzle (Selected)**
   - *Why chosen:* Single unified codebase with route groups `/(store)` for customer storefront and `/(admin)` for the management portal. Utilizes React Server Components (RSC) to render products with zero client-side JavaScript overhead for instant loading and 100 SEO. Hono runs seamlessly on edge/serverless routes for ultra-fast API execution.
   - *Trade-offs:* Requires keeping admin and storefront dependencies in the same package repository.

2. **Approach 2: Decoupled Backend + Vite Frontend (Rejected)**
   - *Why rejected:* Requires separate hosting deployments, introduces CORS complexity, and client-rendered SPAs harm SEO rankings and first-contentful paint compared to Next.js SSR/ISR.

3. **Approach 3: Astro 5 SSR (Rejected)**
   - *Why rejected:* While Astro delivers great static performance, an interactive e-commerce cart, animated drawers, checkout state, and an interactive admin dashboard are more cohesive and standard in Next.js + React 19 ecosystem.

---

## 5. System Architecture & Feature Breakdown

### A. Storefront (`app/(store)`)
- **Hero & Bento Section:** Futuristic hero banner with headline, call to action, floating badges, and bento grid showcasing featured drops and trending collections.
- **Product Listing & Filtering:**
  - Dynamic filtering by Category, Price Range, Size (S, M, L, XL, XXL), Color, and Sort order.
  - Search modal with instant client-side / server-debounced results.
- **Product Detail Page (PDP):**
  - High-res image gallery with interactive thumbnail switcher.
  - Variant selector (Size & Color), real-time stock availability badge with out-of-stock safeguards.
  - Accordion for Materials & Care, Size Guide, Shipping & Returns.
  - Related products slider.
- **Shopping Cart & Cash on Delivery Checkout:**
  - Slide-out cart drawer with item count, quantity updater, promo code field, and subtotal calculation.
  - Streamlined Cash on Delivery (COD) checkout modal/page requiring Name, Phone, Address, City, and optional Order Notes.
  - Instant order creation with unique Order Number (e.g. `CWB-2026-XXXX`).
  - Order success confirmation screen with order tracking summary.
- **SEO & PWA:**
  - Automated dynamic `sitemap.ts` and `robots.ts`.
  - JSON-LD Schema: `BreadcrumbList`, `Product`, `Offer`, `Organization`.
  - OpenGraph social cards for each product.

### B. Admin Control Panel (`app/(admin)`)
- **Authentication Guard:** Protected `/admin` routes requiring signed JWT session cookie (`admin@cwbfashion.com` / `admin123`).
- **Analytics & Metrics:**
  - Total Revenue, Total Orders, Average Order Value, and Edge-calculated Conversion Rate.
  - Interactive charts for sales trends and order volumes.
- **Product & Variant Catalog Management:**
  - Full CRUD: Add product, edit product, delete product.
  - Fields: Title, Slug, Description, Category, Base Price, Sale Price, Images, Variant Matrix (Size, Color, Stock), Is Featured, Is Archived.
- **Order Management:**
  - View all COD orders with customer contact, shipping address, ordered items, and order status.
  - Real-time status update: `Pending` -> `Processing` -> `Shipped` -> `Delivered` -> `Cancelled`.
- **Category & Discount Management:**
  - Create and reorder categories.
  - Create promotional discount codes with expiration dates.
- **Store Settings:**
  - Edit store announcement bar message, contact info, and currency display.

---

## 6. Database Schema (Prisma / LibSQL)
- **AdminUser:** `id`, `name`, `email`, `passwordHash`, `role` (ADMIN), `createdAt`
- **Category:** `id`, `name`, `slug`, `image`, `description`
- **Product:** `id`, `name`, `slug`, `description`, `price`, `compareAtPrice`, `categoryId`, `images` (JSON/Array), `isFeatured`, `isArchived`, `createdAt`
- **ProductVariant:** `id`, `productId`, `size`, `color`, `sku`, `stock`
- **Order:** `id`, `orderNumber`, `customerName`, `customerEmail`, `customerPhone`, `shippingAddress`, `city`, `totalAmount`, `status`, `paymentMethod` (COD), `notes`, `createdAt`
- **OrderItem:** `id`, `orderId`, `productId`, `variantId`, `title`, `size`, `color`, `quantity`, `price`
- **Coupon:** `id`, `code`, `discountType` (PERCENTAGE, FLAT), `value`, `minOrderAmount`, `expiresAt`, `isActive`
- **DailyAnalytics:** `id`, `date`, `visitorSessions`, `ordersCount`, `revenue`

---

## 7. Performance & 100/100 Lighthouse Optimization Strategy
1. **Next.js `<Image>` Optimization:** Explicit `width`, `height`, `sizes` attribute, WebP/AVIF generation to eliminate Cumulative Layout Shift (CLS = 0).
2. **Font Optimization:** `next/font` with `font-display: swap` for Inter/Plus Jakarta Sans.
3. **Lazy Hydration & Dynamic Imports:** Motion animations only hydrate on client; core HTML content is pre-rendered via Server Components for immediate FCP and LCP.
4. **Security Headers:** Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options in `next.config.ts`.
5. **Semantic HTML5:** `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>` with proper ARIA attributes.
