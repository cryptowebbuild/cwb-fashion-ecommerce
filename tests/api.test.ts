import { describe, it, expect, beforeAll } from "vitest";
import app from "../src/server";
import { signAdminToken } from "../src/lib/auth";

describe("Hono Backend API Endpoints", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await signAdminToken({
      id: "admin-1",
      email: "admin@cwbfashion.com",
      name: "CWB Director",
      role: "ADMIN",
    });
  });

  it("GET /api/products returns product array with variants", async () => {
    const res = await app.request("/api/products");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBeGreaterThanOrEqual(10);
    expect(data.products[0].variants).toBeDefined();
  });

  it("GET /api/products/:slug returns a single product", async () => {
    const res = await app.request("/api/products/obsidian-milano-double-breasted-blazer");
    expect(res.status).toBe(200);
    const product = await res.json();
    expect(product.slug).toBe("obsidian-milano-double-breasted-blazer");
    expect(product.price).toBe(495);
  });

  it("GET /api/categories returns all categories", async () => {
    const res = await app.request("/api/categories");
    expect(res.status).toBe(200);
    const categories = await res.json();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThanOrEqual(4);
  });

  it("POST /api/coupons/validate validates active coupon code", async () => {
    const res = await app.request("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "CWB10", subtotal: 200 }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.valid).toBe(true);
    expect(data.discountAmount).toBe(20); // 10% of 200
  });

  it("POST /api/orders creates a guest COD order and decrements variant stock", async () => {
    // Pick an in-stock variant to order
    const prodRes = await app.request("/api/products/obsidian-milano-double-breasted-blazer");
    const prod = await prodRes.json();
    const variant = prod.variants.find((v: any) => v.stock > 0);

    const initialStock = variant.stock;

    const orderPayload = {
      customerName: "Mahmud Hasan",
      customerPhone: "+8801712345678",
      customerEmail: "mahmud@example.com",
      shippingAddress: "House 12, Road 4, Dhanmondi",
      city: "Dhaka",
      notes: "Please call before delivery",
      items: [
        {
          productId: prod.id,
          variantId: variant.id,
          title: prod.title,
          size: variant.size,
          color: variant.color,
          quantity: 1,
          price: prod.price,
        },
      ],
    };

    const res = await app.request("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    expect(res.status).toBe(201);
    const createdOrder = await res.json();
    expect(createdOrder.orderNumber).toBeDefined();
    expect(createdOrder.paymentMethod).toBe("COD");
    expect(createdOrder.status).toBe("PENDING");
    expect(createdOrder.totalAmount).toBe(prod.price);

    // Verify stock was decremented
    const updatedProdRes = await app.request("/api/products/obsidian-milano-double-breasted-blazer");
    const updatedProd = await updatedProdRes.json();
    const updatedVariant = updatedProd.variants.find((v: any) => v.id === variant.id);
    expect(updatedVariant.stock).toBe(initialStock - 1);
  });

  it("POST /api/auth/login validates admin credentials", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@cwbfashion.com",
        password: "admin123",
      }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.token).toBeDefined();
    expect(data.user.email).toBe("admin@cwbfashion.com");
  });

  it("GET /api/analytics returns live store KPIs when authenticated", async () => {
    const res = await app.request("/api/analytics", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.status).toBe(200);
    const analytics = await res.json();
    expect(analytics.totalRevenue).toBeDefined();
    expect(analytics.totalOrders).toBeDefined();
    expect(analytics.conversionRate).toBeDefined();
  });
});
