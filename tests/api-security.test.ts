import { describe, it, expect } from "vitest";
import app from "../src/server";
import { signAdminToken } from "../src/lib/auth";

describe("Hono Backend API Security & Auth Guard Tests", () => {
  let adminToken: string;

  it("generates a valid admin token for authorized requests", async () => {
    adminToken = await signAdminToken({
      id: "admin-1",
      email: "admin@cwbfashion.com",
      name: "CWB Director",
      role: "ADMIN",
    });
    expect(adminToken).toBeDefined();
  });

  it("REJECTS unauthenticated GET /api/orders with 401", async () => {
    const res = await app.request("/api/orders");
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Unauthorized: Admin authentication required");
  });

  it("REJECTS unauthenticated PATCH /api/orders/:id/status with 401", async () => {
    const res = await app.request("/api/orders/order-123/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "SHIPPED" }),
    });
    expect(res.status).toBe(401);
  });

  it("REJECTS unauthenticated POST /api/products with 401", async () => {
    const res = await app.request("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hack Item" }),
    });
    expect(res.status).toBe(401);
  });

  it("REJECTS unauthenticated GET /api/analytics with 401", async () => {
    const res = await app.request("/api/analytics");
    expect(res.status).toBe(401);
  });

  it("ALLOWS authorized admin to access GET /api/orders with Bearer token", async () => {
    const res = await app.request("/api/orders", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.orders)).toBe(true);
  });

  it("ALLOWS authorized admin to access GET /api/analytics with Cookie", async () => {
    const res = await app.request("/api/analytics", {
      headers: { Cookie: `cwb_admin_token=${adminToken}` },
    });
    expect(res.status).toBe(200);
  });

  it("SETS HttpOnly session cookie on successful /api/auth/login", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@cwbfashion.com",
        password: "admin123",
      }),
    });
    expect(res.status).toBe(200);
    const cookieHeader = res.headers.get("Set-Cookie");
    expect(cookieHeader).not.toBeNull();
    expect(cookieHeader).toContain("cwb_admin_token=");
    expect(cookieHeader?.toLowerCase()).toContain("httponly");
  });
});
