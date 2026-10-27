import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CWB Fashion database...");

  // 1. Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.dailyAnalytics.deleteMany();

  // 2. Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: "admin@cwbfashion.com",
      passwordHash: hashedPassword,
      name: "CWB Fashion Director",
      role: "ADMIN",
    },
  });
  console.log(`Created Admin: ${admin.email}`);

  // 3. Create Categories
  const catTailoring = await prisma.category.create({
    data: {
      name: "Luxury Tailoring",
      slug: "luxury-tailoring",
      description: "Fine Italian wool blazers, double-breasted suits, and tailored trousers engineered for modern power dressing.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
    },
  });

  const catStreetwear = await prisma.category.create({
    data: {
      name: "Urban Streetwear",
      slug: "urban-streetwear",
      description: "Heavyweight drop-shoulder hoodies, cyberpunk utility cargo pants, and graphic oversized tees.",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
    },
  });

  const catOuterwear = await prisma.category.create({
    data: {
      name: "Designer Outerwear",
      slug: "outerwear",
      description: "Full-grain leather biker jackets, minimal cashmere trench coats, and weather-shield parkas.",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    },
  });

  const catFootwear = await prisma.category.create({
    data: {
      name: "Footwear & Accessories",
      slug: "footwear-accessories",
      description: "Handcrafted calfskin Chelsea boots, minimalist low-top sneakers, chronograph watches, and sterling rings.",
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
    },
  });

  // 4. Create Curated Products with Variants
  const productsData = [
    // Tailoring
    {
      title: "Obsidian Milano Double-Breasted Blazer",
      slug: "obsidian-milano-double-breasted-blazer",
      description: "Crafted in Biella from 100% Super 150s virgin wool. Features peak lapels, genuine horn buttons, half-canvas construction, and a streamlined silhouette with subtle shoulder structure.",
      price: 495,
      compareAtPrice: 595,
      costPrice: 220,
      categoryId: catTailoring.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "38R", color: "Obsidian Black", sku: "BLZ-MIL-38R-BLK", stock: 8 },
        { size: "40R", color: "Obsidian Black", sku: "BLZ-MIL-40R-BLK", stock: 12 },
        { size: "42R", color: "Obsidian Black", sku: "BLZ-MIL-42R-BLK", stock: 6 },
        { size: "44R", color: "Obsidian Black", sku: "BLZ-MIL-44R-BLK", stock: 0 }, // Out of stock test
        { size: "40R", color: "Charcoal Grey", sku: "BLZ-MIL-40R-GRY", stock: 9 },
      ],
    },
    {
      title: "Venetian Pleated Wool Trousers",
      slug: "venetian-pleated-wool-trousers",
      description: "High-rise tailored trousers with double forward pleats, side adjusters, and a relaxed taper. Woven from breathable tropical wool perfect for all-season styling.",
      price: 240,
      compareAtPrice: null,
      costPrice: 90,
      categoryId: catTailoring.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: false,
      variants: [
        { size: "30", color: "Charcoal Grey", sku: "TRS-VEN-30-GRY", stock: 14 },
        { size: "32", color: "Charcoal Grey", sku: "TRS-VEN-32-GRY", stock: 20 },
        { size: "34", color: "Charcoal Grey", sku: "TRS-VEN-34-GRY", stock: 10 },
        { size: "32", color: "Sand Beige", sku: "TRS-VEN-32-SND", stock: 15 },
      ],
    },
    {
      title: "Royal Tuxedo Silk-Lapel Dinner Jacket",
      slug: "royal-tuxedo-silk-lapel-dinner-jacket",
      description: "A commanding evening silhouette featuring pure satin silk shawl lapels, jetted pockets, and a tailored slim taper. Impeccably finished with silk-covered buttons.",
      price: 680,
      compareAtPrice: 799,
      costPrice: 310,
      categoryId: catTailoring.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "38R", color: "Midnight Navy", sku: "TXD-RYL-38R-NVY", stock: 4 },
        { size: "40R", color: "Midnight Navy", sku: "TXD-RYL-40R-NVY", stock: 7 },
        { size: "42R", color: "Midnight Navy", sku: "TXD-RYL-42R-NVY", stock: 5 },
      ],
    },

    // Streetwear
    {
      title: "Cyber-Heavyweight 500GSM Boxy Hoodie",
      slug: "cyber-heavyweight-500gsm-boxy-hoodie",
      description: "Extremely dense 500 GSM custom-milled organic French terry cotton. Double-layered hood without drawstrings, dropped shoulders, pre-shrunk wash, and ribbed ergonomic cuffs.",
      price: 165,
      compareAtPrice: 195,
      costPrice: 55,
      categoryId: catStreetwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "S", color: "Washed Onyx", sku: "HD-CYB-S-ONX", stock: 15 },
        { size: "M", color: "Washed Onyx", sku: "HD-CYB-M-ONX", stock: 25 },
        { size: "L", color: "Washed Onyx", sku: "HD-CYB-L-ONX", stock: 18 },
        { size: "XL", color: "Washed Onyx", sku: "HD-CYB-XL-ONX", stock: 12 },
        { size: "M", color: "Vintage Bone", sku: "HD-CYB-M-BNE", stock: 20 },
        { size: "L", color: "Vintage Bone", sku: "HD-CYB-L-BNE", stock: 14 },
      ],
    },
    {
      title: "Tactical Modular Cyber Cargo Pant",
      slug: "tactical-modular-cyber-cargo-pant",
      description: "Constructed with ripstop Cordura nylon and stretch elastane. Features 8 ergonomic magnetic cargo compartments, Fidlock waistband cinch, and adjustable ankle bungee cords.",
      price: 195,
      compareAtPrice: null,
      costPrice: 70,
      categoryId: catStreetwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "S (30)", color: "Matte Black", sku: "CRG-TAC-S-BLK", stock: 10 },
        { size: "M (32)", color: "Matte Black", sku: "CRG-TAC-M-BLK", stock: 18 },
        { size: "L (34)", color: "Matte Black", sku: "CRG-TAC-L-BLK", stock: 14 },
        { size: "XL (36)", color: "Matte Black", sku: "CRG-TAC-XL-BLK", stock: 8 },
      ],
    },
    {
      title: "Matrix Graphic Distressed Oversized Tee",
      slug: "matrix-graphic-distressed-oversized-tee",
      description: "Vintage-washed 280 GSM heavyweight combed cotton with hand-distressed collar accents and high-density futuristic typography print on the back.",
      price: 85,
      compareAtPrice: 110,
      costPrice: 24,
      categoryId: catStreetwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: false,
      variants: [
        { size: "M", color: "Acid Ash", sku: "TEE-MTX-M-ASH", stock: 30 },
        { size: "L", color: "Acid Ash", sku: "TEE-MTX-L-ASH", stock: 24 },
        { size: "XL", color: "Acid Ash", sku: "TEE-MTX-XL-ASH", stock: 15 },
      ],
    },

    // Outerwear
    {
      title: "Apex Full-Grain Italian Leather Biker",
      slug: "apex-full-grain-italian-leather-biker",
      description: "1.2mm premium vegetable-tanned Italian calfskin leather. Asymmetrical gunmetal Excella dual-zip front, quilted moto shoulders, and cupro silk lining.",
      price: 790,
      compareAtPrice: 950,
      costPrice: 380,
      categoryId: catOuterwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "S", color: "Deep Obsidian", sku: "JKT-APX-S-BLK", stock: 5 },
        { size: "M", color: "Deep Obsidian", sku: "JKT-APX-M-BLK", stock: 8 },
        { size: "L", color: "Deep Obsidian", sku: "JKT-APX-L-BLK", stock: 6 },
        { size: "XL", color: "Deep Obsidian", sku: "JKT-APX-XL-BLK", stock: 3 },
      ],
    },
    {
      title: "Kashmir Minimalist Cashmere Overcoat",
      slug: "kashmir-minimalist-cashmere-overcoat",
      description: "Luxurious double-faced Mongolian cashmere blend (90% Cashmere, 10% Silk). Hidden button placket, high center back vent, and seamless interior finish.",
      price: 890,
      compareAtPrice: 1100,
      costPrice: 420,
      categoryId: catOuterwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "38R", color: "Camel Tan", sku: "COAT-KSH-38R-CML", stock: 5 },
        { size: "40R", color: "Camel Tan", sku: "COAT-KSH-40R-CML", stock: 7 },
        { size: "42R", color: "Camel Tan", sku: "COAT-KSH-42R-CML", stock: 4 },
        { size: "40R", color: "Midnight Black", sku: "COAT-KSH-40R-BLK", stock: 6 },
      ],
    },
    {
      title: "Stealth Tech-Shield Hooded Windbreaker",
      slug: "stealth-tech-shield-hooded-windbreaker",
      description: "Waterproof 3-layer GORE-grade technical membrane with fully taped seams, breathable underarm laser perforations, and YKK Aquaguard zips.",
      price: 285,
      compareAtPrice: null,
      costPrice: 110,
      categoryId: catOuterwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: false,
      variants: [
        { size: "S", color: "Gunmetal Shadow", sku: "WB-STL-S-GNT", stock: 12 },
        { size: "M", color: "Gunmetal Shadow", sku: "WB-STL-M-GNT", stock: 16 },
        { size: "L", color: "Gunmetal Shadow", sku: "WB-STL-L-GNT", stock: 10 },
      ],
    },

    // Footwear & Accessories
    {
      title: "Vanguard Calfskin Chelsea Boot",
      slug: "vanguard-calfskin-chelsea-boot",
      description: "Handcrafted in Florence using Goodyear welt construction. Waxed French calf leather, tonal elasticated side gussets, stacked leather heel, and non-slip Vibram sole.",
      price: 360,
      compareAtPrice: 420,
      costPrice: 160,
      categoryId: catFootwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "EU 41 (US 8)", color: "Obsidian Black", sku: "BOT-VAN-41-BLK", stock: 6 },
        { size: "EU 42 (US 9)", color: "Obsidian Black", sku: "BOT-VAN-42-BLK", stock: 10 },
        { size: "EU 43 (US 10)", color: "Obsidian Black", sku: "BOT-VAN-43-BLK", stock: 8 },
        { size: "EU 44 (US 11)", color: "Obsidian Black", sku: "BOT-VAN-44-BLK", stock: 4 },
      ],
    },
    {
      title: "Monolith Minimalist Nappa Leather Sneaker",
      slug: "monolith-minimalist-nappa-leather-sneaker",
      description: "Buttery soft Italian nappa leather upper with padded collar, reinforced gold-embossed heel counter, and stitched Margom rubber cupsole.",
      price: 245,
      compareAtPrice: null,
      costPrice: 95,
      categoryId: catFootwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "EU 41", color: "Triple White", sku: "SNK-MNL-41-WHT", stock: 12 },
        { size: "EU 42", color: "Triple White", sku: "SNK-MNL-42-WHT", stock: 18 },
        { size: "EU 43", color: "Triple White", sku: "SNK-MNL-43-WHT", stock: 14 },
        { size: "EU 42", color: "Midnight Shadow", sku: "SNK-MNL-42-BLK", stock: 15 },
      ],
    },
    {
      title: "Chronos Matte-Black Automatic Watch",
      slug: "chronos-matte-black-automatic-watch",
      description: "Sapphire crystal glass with anti-reflective coating, 41mm sandblasted 316L stainless steel case, Japanese Miyota automatic movement, and quick-release horween leather band.",
      price: 450,
      compareAtPrice: 520,
      costPrice: 190,
      categoryId: catFootwear.id,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      ]),
      isFeatured: true,
      variants: [
        { size: "One Size (41mm)", color: "Stealth Matte Black", sku: "WTC-CHR-41-BLK", stock: 14 },
        { size: "One Size (41mm)", color: "Champagne Gold Edition", sku: "WTC-CHR-41-GLD", stock: 7 },
      ],
    },
  ];

  for (const p of productsData) {
    const { variants, ...productInfo } = p;
    const createdProduct = await prisma.product.create({
      data: {
        ...productInfo,
        variants: {
          create: variants,
        },
      },
    });
    console.log(`Created Product: ${createdProduct.title} (${variants.length} variants)`);
  }

  // 5. Create Promo Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "CWB10",
        discountType: "PERCENTAGE",
        value: 10,
        minOrderAmount: 100,
        isActive: true,
      },
      {
        code: "WELCOME50",
        discountType: "FLAT",
        value: 50,
        minOrderAmount: 250,
        isActive: true,
      },
      {
        code: "VIPLUXE",
        discountType: "PERCENTAGE",
        value: 20,
        minOrderAmount: 500,
        isActive: true,
      },
    ],
  });
  console.log("Created Promo Coupons (CWB10, WELCOME50, VIPLUXE)");

  // 6. Create Initial Analytics Rollups
  const today = new Date().toISOString().split("T")[0];
  await prisma.dailyAnalytics.create({
    data: {
      date: today,
      visitorSessions: 1420,
      ordersCount: 38,
      revenue: 12450,
    },
  });
  console.log("Seeded initial analytics baseline.");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
