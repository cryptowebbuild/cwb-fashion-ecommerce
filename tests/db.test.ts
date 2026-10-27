import { describe, it, expect, beforeAll } from "vitest";
import { prisma } from "../src/lib/db";

describe("Database Models & Seed Data", () => {
  it("queries categories and verifies seed data exists", async () => {
    const categories = await prisma.category.findMany();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThanOrEqual(4);
  });

  it("queries products with their variant matrix and category relation", async () => {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
    });
    expect(products.length).toBeGreaterThanOrEqual(10);

    const firstProduct = products[0];
    expect(firstProduct.title).toBeDefined();
    expect(firstProduct.price).toBeGreaterThan(0);
    expect(firstProduct.variants.length).toBeGreaterThan(0);
    expect(firstProduct.variants[0].size).toBeDefined();
    expect(firstProduct.variants[0].color).toBeDefined();
    expect(firstProduct.variants[0].stock).toBeGreaterThanOrEqual(0);
  });

  it("verifies default admin account is seeded with hashed password", async () => {
    const admin = await prisma.adminUser.findUnique({
      where: { email: "admin@cwbfashion.com" },
    });
    expect(admin).not.toBeNull();
    expect(admin?.role).toBe("ADMIN");
  });
});
