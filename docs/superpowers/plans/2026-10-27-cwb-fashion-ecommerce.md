# CWB Fashion (CryptoWebBuild Fashion) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, ultra-fast full-stack Men's Fashion E-Commerce platform with Brainwave/Xora-inspired aesthetics, a full-featured Admin Control Panel, Cash on Delivery (COD) checkout, 100/100 Lighthouse performance, and zero-cost free-tier hosting architecture.

**Architecture:** Unified Next.js 15 App Router codebase with Hono API routes running on edge/serverless, Prisma ORM with SQLite/Turso LibSQL for database queries, React Server Components for zero-bundle initial loads, Tailwind CSS + Shadcn UI for accessible styling, and Motion for sleek micro-interactions.

**Tech Stack:** Next.js 15, React 19, TypeScript, Hono, Prisma, SQLite/LibSQL (Turso), Tailwind CSS, Lucide React, Motion (Framer Motion), Zod, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-27-cwb-fashion-ecommerce-design.md`

## Global Constraints

- **Platform Target:** Node.js 18+ / Next.js 15 (App Router).
- **Styling & UI:** Tailwind CSS, Shadcn UI primitives, dark luxury theme with champagne/gold metallic accents.
- **Performance Benchmark:** 100/100 Lighthouse across Performance, SEO, Accessibility, Best Practices.
- **Zero Third-Party Client Trackers:** Analytics must be privacy-friendly edge-calculated without external script tags.
- **Payment & Checkout:** Frictionless Cash on Delivery (COD) guest checkout requiring Name, Phone, Delivery Address, City, Notes.
- **Admin Authentication:** Secure HttpOnly signed JWT session cookies with bcrypt-hashed credentials (`admin@cwbfashion.com` / `admin123`).

## Review Focus

1. **Variant Out-of-Stock Selection:** User selects a size/color combination with 0 stock; UI must disable "Add to Cart" and show "Out of Stock" badge immediately.
2. **Duplicate Cart Items:** Adding an identical product with the same size and color increments quantity rather than creating duplicate line items.
3. **Invalid COD Checkout Submission:** Submitting an order with empty name, invalid phone, or blank shipping address must trigger inline accessible field errors without losing form state.
4. **Unauthenticated Admin Access:** Direct navigation to `/admin/*` without a valid JWT cookie must immediately redirect to `/admin/login` with `returnUrl`.
5. **Cumulative Layout Shift (CLS):** Hero images and product cards must specify aspect ratios and Next.js Image dimensions to guarantee CLS = 0.

---

### Task 1: Project Initialization & Core Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `.env.example`
- Create: `.env`
- Test: `vitest.config.ts`
- Test: `tests/scaffold.test.ts`

**Interfaces:**
- Produces: Base Next.js 15 development environment with Tailwind CSS and Vitest test runner.

- [ ] **Step 1: Write the test verifying basic environment configuration**

```typescript
import { describe, it, expect } from "vitest";

describe("Scaffold Test", () => {
  it("verifies test suite is functional", () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails before installation**

Run: `npx vitest run tests/scaffold.test.ts`  
Expected: FAIL (vitest not found or not configured)

- [ ] **Step 3: Initialize Next.js project and install required dependencies**

Install dependencies: `next`, `react`, `react-dom`, `hono`, `@prisma/client`, `prisma`, `lucide-react`, `clsx`, `tailwind-merge`, `motion`, `zod`, `jose`, `bcryptjs`, and dev dependencies `typescript`, `@types/node`, `@types/react`, `tailwindcss`, `vitest`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/scaffold.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: scaffold next.js 15 project with tailwind, motion, and vitest"
```

---

### Task 2: Database Schema, Prisma Client & Curated Menswear Seeds

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/db.ts`
- Create: `prisma/seed.ts`
- Test: `tests/db.test.ts`

**Interfaces:**
- Consumes: Prisma ORM with SQLite provider.
- Produces: Singleton Prisma database client (`src/lib/db.ts`) with tables: `AdminUser`, `Category`, `Product`, `ProductVariant`, `Order`, `OrderItem`, `Coupon`, `DailyAnalytics`.

- [ ] **Step 1: Write failing database test for schema entities**

```typescript
import { describe, it, expect } from "vitest";
import { prisma } from "../src/lib/db";

describe("Database Models", () => {
  it("queries categories and products successfully", async () => {
    const categories = await prisma.category.findMany();
    expect(Array.isArray(categories)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/db.test.ts`  
Expected: FAIL with missing schema or client

- [ ] **Step 3: Define schema in `prisma/schema.prisma` and create seed data**

Include 4 categories (Luxury Suits, Streetwear, Outerwear, Footwear & Accessories) and 12-16 curated menswear items with realistic image URLs, prices, sizes (S, M, L, XL), colors, and variant stock.

- [ ] **Step 4: Run migration, seed database, and verify test passes**

Run: `npx prisma db push && npx tsx prisma/seed.ts && npx vitest run tests/db.test.ts`  
Expected: PASS with seeded database records

- [ ] **Step 5: Commit**

```bash
git add prisma/ src/lib/db.ts tests/db.test.ts
git commit -m "feat: setup prisma schema and seed curated menswear fashion catalog"
```

---

### Task 3: Hono Backend API & Authentication

**Files:**
- Create: `src/app/api/[[...route]]/route.ts`
- Create: `src/server/index.ts`
- Create: `src/server/routes/auth.ts`
- Create: `src/server/routes/products.ts`
- Create: `src/server/routes/orders.ts`
- Create: `src/server/routes/analytics.ts`
- Create: `src/lib/auth.ts`
- Test: `tests/api.test.ts`

**Interfaces:**
- Consumes: Prisma client (`src/lib/db.ts`), `jose` for JWT signing.
- Produces: REST endpoints mounted at `/api/*`:
  - `GET /api/products` (query params: category, search, sort, page)
  - `GET /api/products/:slug`
  - `POST /api/orders` (guest COD checkout payload)
  - `POST /api/auth/login` (admin credential check & HttpOnly cookie)
  - `GET /api/analytics` (KPI metrics for admin dashboard)

- [ ] **Step 1: Write failing test for Hono API endpoints**

```typescript
import { describe, it, expect } from "vitest";
import app from "../src/server";

describe("Hono API Endpoints", () => {
  it("GET /api/products returns product array", async () => {
    const res = await app.request("/api/products");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.products)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/api.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement Hono router, auth middleware, and product/order controllers**

Implement Hono routes with Zod validation for order submissions, bcrypt comparison for admin login, and Prisma queries.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/api.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/server/ src/app/api/ src/lib/auth.ts tests/api.test.ts
git commit -m "feat: implement hono api routes with auth, products, and order endpoints"
```

---

### Task 4: Storefront UI Components, Cart State & Brainwave/Xora Design System

**Files:**
- Create: `src/context/cart-context.tsx`
- Create: `src/components/shared/navbar.tsx`
- Create: `src/components/shared/footer.tsx`
- Create: `src/components/shared/announcement-bar.tsx`
- Create: `src/components/store/cart-drawer.tsx`
- Create: `src/components/store/product-card.tsx`
- Create: `src/components/store/bento-grid.tsx`
- Test: `tests/cart.test.ts`

**Interfaces:**
- Consumes: Cart Context and Product types.
- Produces: Fully interactive Cart Drawer, Glassmorphic Navbar with cart badge, Product Card with quick add, and Bento Grid showcase.

- [ ] **Step 1: Write failing cart context test for item grouping and quantity update**

```typescript
import { describe, it, expect } from "vitest";
import { cartReducer } from "../src/context/cart-reducer";

describe("Cart Reducer", () => {
  it("increments quantity when same variant is added twice", () => {
    const state = { items: [{ id: "1", variantId: "v1", quantity: 1, price: 100 }] };
    const nextState = cartReducer(state, {
      type: "ADD_ITEM",
      payload: { id: "1", variantId: "v1", quantity: 1, price: 100 }
    });
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].quantity).toBe(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/cart.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement cart reducer, context provider, cart drawer, and shared components**

Implement with Motion slide-in animations, accessible Radix dialog/drawer primitives, and luxury dark theme design tokens.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/cart.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/context/ src/components/ tests/cart.test.ts
git commit -m "feat: build cart state management, navbar, and design components"
```

---

### Task 5: Storefront Pages (Home, Catalog, Product Detail, COD Checkout, Order Success)

**Files:**
- Create: `src/app/(store)/layout.tsx`
- Create: `src/app/(store)/page.tsx`
- Create: `src/app/(store)/shop/page.tsx`
- Create: `src/app/(store)/product/[slug]/page.tsx`
- Create: `src/app/(store)/checkout/page.tsx`
- Create: `src/app/(store)/order-success/[orderNumber]/page.tsx`
- Test: `tests/checkout.test.ts`

**Interfaces:**
- Consumes: Prisma Server Components, Hono order creation API, Cart Context.
- Produces: Complete customer-facing shopping journey from landing page to Cash on Delivery order confirmation.

- [ ] **Step 1: Write failing checkout validation test**

```typescript
import { describe, it, expect } from "vitest";
import { checkoutSchema } from "../src/lib/validations";

describe("COD Checkout Validation", () => {
  it("fails when phone or address is missing", () => {
    const result = checkoutSchema.safeParse({ customerName: "John", phone: "" });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/checkout.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement storefront pages with dynamic server rendering and COD checkout**

Implement homepage with Hero & Bento grids, filterable `/shop` page, `/product/[slug]` with variant switcher and stock checker, `/checkout` with full COD form, and `/order-success/[orderNumber]`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/checkout.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/(store)/ src/lib/validations.ts tests/checkout.test.ts
git commit -m "feat: complete customer storefront pages and cash on delivery checkout"
```

---

### Task 6: Admin Control Panel (`/admin`)

**Files:**
- Create: `src/middleware.ts`
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx` (KPI Dashboard)
- Create: `src/app/admin/products/page.tsx` & `new/page.tsx`
- Create: `src/app/admin/orders/page.tsx`
- Create: `src/app/admin/settings/page.tsx`
- Test: `tests/admin.test.ts`

**Interfaces:**
- Consumes: Admin auth cookies, Prisma database actions.
- Produces: Full control panel for managing orders, products with variant matrix, stock, categories, and viewing revenue/order metrics.

- [ ] **Step 1: Write test verifying admin route protection logic**

```typescript
import { describe, it, expect } from "vitest";
import { verifyAdminToken } from "../src/lib/auth";

describe("Admin Auth Guard", () => {
  it("rejects invalid or missing tokens", async () => {
    const user = await verifyAdminToken("invalid-token");
    expect(user).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/admin.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement admin dashboard, product management CRUD, order status updater, and login**

Build clean, accessible administrative UI using Shadcn UI table, cards, dialogs, status badges, and quick-filter buttons.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/admin.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/ src/middleware.ts tests/admin.test.ts
git commit -m "feat: build full admin control panel with kpi dashboard, product crud, and order lifecycle"
```

---

### Task 7: 100/100 Lighthouse Optimization (SEO, Performance, PWA, Accessibility)

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/components/seo/json-ld.tsx`
- Modify: `next.config.ts`
- Test: `tests/seo.test.ts`

**Interfaces:**
- Consumes: Product slugs and store metadata.
- Produces: Structured JSON-LD microdata, dynamic sitemap, robots configuration, optimized AVIF/WebP image caching headers, and zero-CLS layout guarantees.

- [ ] **Step 1: Write test verifying sitemap and JSON-LD generator**

```typescript
import { describe, it, expect } from "vitest";
import { generateProductJsonLd } from "../src/components/seo/json-ld";

describe("SEO Structured Data", () => {
  it("produces valid schema.org Product schema", () => {
    const jsonLd = generateProductJsonLd({
      name: "Tailored Italian Blazer",
      description: "Fine wool blazer",
      price: 249,
      images: ["https://example.com/blazer.webp"]
    });
    expect(jsonLd["@type"]).toBe("Product");
    expect(jsonLd.offers["@type"]).toBe("Offer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/seo.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement sitemap, robots, JSON-LD, and Next.js performance optimizations**

Add strict security headers, configure AVIF/WebP image domains, set preconnect links, and ensure all buttons/inputs have accessible aria labels.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/seo.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/components/seo/ next.config.ts tests/seo.test.ts
git commit -m "feat: implement 100/100 lighthouse seo optimizations, json-ld schema, and security headers"
```

---

### Task 8: Production Build Verification & Free-Tier Deployment Guide

**Files:**
- Create: `DEPLOYMENT.md`
- Test: `tests/build.test.ts`

**Interfaces:**
- Produces: Passing `npm run build`, verified zero-error production bundle, and step-by-step instructions for 1-click Vercel and Turso deployment.

- [ ] **Step 1: Run complete test suite**

Run: `npx vitest run`  
Expected: All tests PASS

- [ ] **Step 2: Run production Next.js build**

Run: `npm run build`  
Expected: Successful compile with zero TypeScript or Lint errors

- [ ] **Step 3: Document zero-cost deployment instructions in `DEPLOYMENT.md`**

Provide exact steps to link GitHub repository to Vercel (100% Free Hobby Tier) and connect Turso database URL with zero recurring fees.

- [ ] **Step 4: Final commit**

```bash
git add DEPLOYMENT.md
git commit -m "docs: add 100% free hosting deployment guide for vercel and turso"
```
