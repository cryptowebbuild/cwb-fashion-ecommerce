# Luxury Editorial UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Elevate CWB Fashion from a standard dark-mode store to an award-winning, magazine-grade luxury menswear boutique inspired by Pinterest, Awwwards, Fear of God, Zara Studio, Balenciaga, and SSENSE.

---

## Proposed Architecture & Design Decisions

### Typography & Color Palette
- **Primary Noir/Obsidian:** `#08080A` (Deep Void), `#111114` (Elevated Card), `#1A1A20` (Subtle Surface).
- **Champagne & Warm Metallics:** `#D4AF37` / `#E5C378` (Refined Gold Accents), `#C5A880` (Muted Warm Sand).
- **Bone White & Mist:** `#F8F9FA` (High Contrast Text), `#A1A1AA` (Editorial Subtext), `#27272A` (Hairline Borders).
- **Typography:** Refined editorial serifs for collection titles, paired with ultra-clean modern geometric grotesque sans, wide letter-spacing (`tracking-[0.2em]`), and monospaced micro-data.

---

## Tasks

### Task 1: Design Tokens, Typography, and Global Styling Foundation
**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1:** Enhance `tailwind.config.ts` with luxury colors (`cwb-gold`, `cwb-bone`, `cwb-noir`), custom aspect ratios (`3/4` portrait, `4/5` lookbook), and refined animations (`marquee`, `fade-up`, `image-zoom`).
- [ ] **Step 2:** Update `src/app/globals.css` with luxury scrollbars, noise overlay effects, editorial typography styles, and smooth focus/hover states.
- [ ] **Step 3:** Update `src/app/layout.tsx` with Google Fonts (`Playfair Display` or `Cinzel` alongside modern sans) for magazine-grade typography.
- [ ] **Step 4:** Run `npm test` to ensure base tests remain passing.
- [ ] **Step 5:** Commit changes (`feat(design): setup luxury editorial typography and design tokens`).

---

### Task 2: Luxury Brand Architecture (Announcement Bar, Navigation, and Footer)
**Files:**
- Modify: `src/components/shared/announcement-bar.tsx`
- Modify: `src/components/shared/navbar.tsx`
- Modify: `src/components/shared/footer.tsx`

- [ ] **Step 1:** Upgrade `announcement-bar.tsx` into a continuous smooth marquee ticker ("EXECUTIVE CASH ON DELIVERY • HANDCRAFTED CURATED TAILORING • NATIONWIDE CONCIERGE DISPATCH • LIMITED RUN ARCHIVE").
- [ ] **Step 2:** Redesign `navbar.tsx` with a floating glassmorphic pill header, refined minimalist logo ("CWB / ATELIER"), category nav links with hover underlines, search input trigger, and luxury cart trigger with item count chip.
- [ ] **Step 3:** Redesign `footer.tsx` with editorial brand watermark, newsletter sign-up with immediate feedback, concierge service details, accepted payment methods (COD highlight), and copyright notice.
- [ ] **Step 4:** Run `npm test` to verify header/footer components pass.
- [ ] **Step 5:** Commit changes (`feat(ui): redesign luxury navbar, announcement ticker and editorial footer`).

---

### Task 3: Editorial Product Card & Lookbook Micro-Interactions
**Files:**
- Modify: `src/components/store/product-card.tsx`

- [ ] **Step 1:** Redesign `product-card.tsx` with high-fashion 3:4 aspect ratio portrait imagery.
- [ ] **Step 2:** Implement smooth hover zoom and front-to-back angle swap micro-interaction.
- [ ] **Step 3:** Add editorial micro-badges (e.g. `AUTUMN / WINTER`, `LIMITED RUN`, `PURE CASHMERE`, `ITALIAN WOOL`).
- [ ] **Step 4:** Add in-card size selector chips and Quick-Add button with spring feedback.
- [ ] **Step 5:** Run `npm test` to ensure product card interactions and cart addition pass.
- [ ] **Step 6:** Commit changes (`feat(store): build editorial 3:4 product card with hover lookbook transitions`).

---

### Task 4: Magazine-Grade Homepage Redesign (`/`)
**Files:**
- Modify: `src/app/(store)/page.tsx`
- Modify: `src/components/store/bento-grid.tsx`

- [ ] **Step 1:** Build an editorial full-bleed Hero Section with dual CTA ("Explore Collection" & "View Lookbook"), staggered typography, seasonal tagline, and curated runway photo preview.
- [ ] **Step 2:** Redesign `bento-grid.tsx` into an asymmetrical luxury collection showcase with dramatic scale, category descriptions, and direct filter links.
- [ ] **Step 3:** Add an "Atelier Standards & Trust" section highlighting: 100% Cash on Delivery, Try Before You Pay, Master Tailoring, and 48-Hour Concierge Shipping.
- [ ] **Step 4:** Add a "Curated Drops / Editor's Pick" section with category switcher tabs.
- [ ] **Step 5:** Run `npm test` and build check.
- [ ] **Step 6:** Commit changes (`feat(pages): craft magazine-grade editorial homepage and luxury bento showcase`).

---

### Task 5: High-Fashion Catalog & Filter Experience (`/shop`)
**Files:**
- Modify: `src/app/(store)/shop/shop-client.tsx`
- Modify: `src/app/(store)/shop/page.tsx`

- [ ] **Step 1:** Redesign catalog controls: sleek category pills, price range sort dropdown, active product counter, and 2-col / 4-col view toggle.
- [ ] **Step 2:** Add search query instant filtering and empty state with reset filters button.
- [ ] **Step 3:** Style catalog grid with consistent 3:4 cards and motion stagger entrance.
- [ ] **Step 4:** Run `npm test` to verify shop client tests.
- [ ] **Step 5:** Commit changes (`feat(shop): upgrade catalog page with luxury filters and view toggles`).

---

### Task 6: High-End Split Product Detail Page (`/product/[slug]`)
**Files:**
- Modify: `src/app/(store)/product/[slug]/product-details-client.tsx`
- Modify: `src/app/(store)/product/[slug]/page.tsx`

- [ ] **Step 1:** Create sticky split layout: Left side features multi-angle image gallery with thumbnail navigator, Right side features sticky product dossier.
- [ ] **Step 2:** Add luxury details: fabric composition, fit narrative ("Model is 6'2\" wearing Size Large"), low-stock scarcity counter.
- [ ] **Step 3:** Add prominent "Cash on Delivery Order" button and Quick Add to Cart with slide-out drawer confirmation.
- [ ] **Step 4:** Add expandable Accordion for "Care Guide", "Shipping & Cash on Delivery", and "Authenticity Guarantee".
- [ ] **Step 5:** Run `npm test` to verify PDP logic.
- [ ] **Step 6:** Commit changes (`feat(pdp): redesign split-screen luxury product detail page with editorial gallery`).

---

### Task 7: Full Verification, Production Build & Vercel Live Deployment
**Files:**
- All touched files

- [ ] **Step 1:** Run full test suite `npm test` — verify all tests pass.
- [ ] **Step 2:** Run production build `npm run build` — verify zero build errors and clean bundle output.
- [ ] **Step 3:** Push all commits to GitHub repository `cryptowebbuild/cwb-fashion-ecommerce`.
- [ ] **Step 4:** Deploy to Vercel production using Vercel CLI.
- [ ] **Step 5:** Verify live URLs (`/`, `/shop`, `/product/...`) respond 200 OK with the new luxury design.
