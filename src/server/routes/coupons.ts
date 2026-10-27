import { Hono } from "hono";
import { prisma } from "../../lib/db";
import { z } from "zod";

const coupons = new Hono();

// POST /api/coupons/validate
coupons.post("/validate", async (c) => {
  try {
    const { code, subtotal } = await c.req.json();
    if (!code) {
      return c.json({ valid: false, message: "Coupon code required" }, 400);
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return c.json({ valid: false, message: "Invalid or expired coupon" }, 400);
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return c.json({ valid: false, message: "Coupon has expired" }, 400);
    }

    if (subtotal < coupon.minOrderAmount) {
      return c.json(
        {
          valid: false,
          message: `Minimum order amount of $${coupon.minOrderAmount} required for this coupon`,
        },
        400
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      discountAmount = (subtotal * coupon.value) / 100;
    } else {
      discountAmount = Math.min(coupon.value, subtotal);
    }

    return c.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      value: coupon.value,
      discountAmount: Math.round(discountAmount * 100) / 100,
    });
  } catch (err: any) {
    return c.json({ valid: false, message: err.message }, 500);
  }
});

// GET /api/coupons (Admin)
coupons.get("/", async (c) => {
  try {
    const list = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return c.json(list);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default coupons;
