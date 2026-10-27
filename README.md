# CWB Fashion (CryptoWebBuild Fashion) 🎩✨

> **The Future of Men's Luxury Streetwear & Sartorial Engineering**  
> An ultra-fast, production-ready full-stack E-Commerce platform built with **Next.js 15 (App Router)**, **Hono API**, **Prisma ORM**, **Tailwind CSS**, and **Motion**. Engineered for 100/100 Google Lighthouse performance, complete with a comprehensive Admin Control Panel and frictionless Cash on Delivery (COD) checkout.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Hono](https://img.shields.io/badge/Hono-v4-E36002?style=for-the-badge&logo=hono)](https://hono.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![100% Free Hosting](https://img.shields.io/badge/Free%20Tier-100%25-emerald?style=for-the-badge)](https://vercel.com)

---

## 🌟 Key Highlights

- **Futuristic Luxury Aesthetic:** Inspired by modern design benchmarks (Brainwave & Xora) — deep luxury dark canvas, champagne metallic accents, ambient glow cards, and sleek micro-interactions powered by Motion.
- **Frictionless Cash on Delivery (COD) Checkout:** Zero advance deposit or card friction. Customers complete checkout in seconds with instant address and phone verification.
- **Variant Matrix & Inventory Engine:** Discrete stock tracking per Size (S, M, L, XL, XXL) and Color. Dynamic out-of-stock badges and real-time availability checks.
- **Full Administrative Control Panel (`/admin`):**
  - Live KPI Dashboard: Gross Revenue, Total Orders, Average Order Value, and Conversion Rate.
  - Garment Catalog Manager: Add, edit, or delete pieces with variant matrices and image URLs.
  - Logistics & Order Lifecycle: Update statuses (`PENDING` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED`).
  - Store Announcements & Coupon Engine (`CWB10`, `WELCOME50`).
- **100/100 Lighthouse Benchmark:**
  - **Zero CLS (0.00):** Explicit aspect ratios (`4/5`) and Next.js `<Image>` AVIF/WebP rendering.
  - **100 SEO:** Schema.org JSON-LD structured data (`Product`, `Offer`, `OnlineStore`), dynamic XML sitemap (`/sitemap.xml`), and robots directives (`/robots.txt`).
  - **Zero Third-Party Client Bloat:** Edge-computed privacy analytics without invasive tracking scripts.
- **100% Free Hosting Architecture:** Deployable on Vercel (Hobby Tier) + Turso (Edge SQLite) with $0 monthly recurring costs.

---

## 🚀 Live Demo & Admin Credentials

- **Storefront:** `http://localhost:3000` (or your Vercel URL)
- **Admin Portal:** `http://localhost:3000/admin`
  - **Email:** `admin@cwbfashion.com`
  - **Password:** `admin123`

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 App Router](https://nextjs.org) with React 19
- **API Engine:** [Hono v4](https://hono.dev) mounted on Next.js Serverless Edge
- **Database & ORM:** [Prisma ORM](https://prisma.io) with SQLite (local) / Turso LibSQL (edge cloud)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + Custom Glassmorphism
- **Animations:** [Motion](https://motion.dev) (Framer Motion)
- **Icons:** [Lucide React](https://lucide.dev)
- **Validation:** [Zod](https://zod.dev)
- **Testing:** [Vitest](https://vitest.dev) (35 automated unit, security & integration tests)

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/cryptowebbuild/cwb-fashion-ecommerce.git
cd cwb-fashion-ecommerce
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

### 4. Initialize and Seed the Database
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Run the test suite
```bash
npm test
```

### 6. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ 100% Free Production Deployment (Vercel + Turso)

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the complete step-by-step guide to deploying this store in 5 minutes with zero hosting fees.

---

## 📄 License

MIT License © 2026 CWB Fashion (CryptoWebBuild).
