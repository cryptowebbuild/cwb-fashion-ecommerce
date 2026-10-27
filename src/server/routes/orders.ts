import { Hono } from "hono";
import { prisma } from "../../lib/db";
import { z } from "zod";

const orders = new Hono();

const orderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional().nullable(),
  title: z.string(),
  size: z.string(),
  color: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const createOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z.string().min(7, "Valid phone number is required"),
  customerEmail: z.string().email().optional().or(z.literal("")).nullable(),
  shippingAddress: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  notes: z.string().optional().nullable(),
  paymentMethod: z.string().default("COD"),
  couponCode: z.string().optional().nullable(),
  items: z.array(orderItemSchema).min(1, "At least one item is required in order"),
});

// POST /api/orders (Guest COD Checkout)
orders.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validated = createOrderSchema.parse(body);

    // Calculate total amount & verify stock
    let subtotal = 0;
    for (const item of validated.items) {
      subtotal += item.price * item.quantity;

      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
        });
        if (!variant) {
          return c.json({ error: `Variant for item "${item.title}" not found.` }, 400);
        }
        if (variant.stock < item.quantity) {
          return c.json(
            {
              error: `Insufficient stock for ${item.title} (${item.size} / ${item.color}). Only ${variant.stock} available.`,
            },
            400
          );
        }
      }
    }

    // Apply coupon if provided
    let discount = 0;
    if (validated.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: validated.couponCode.toUpperCase() },
      });
      if (coupon && coupon.isActive && subtotal >= coupon.minOrderAmount) {
        if (coupon.discountType === "PERCENTAGE") {
          discount = (subtotal * coupon.value) / 100;
        } else {
          discount = Math.min(coupon.value, subtotal);
        }
      }
    }

    const totalAmount = Math.max(0, subtotal - discount);

    // Generate Order Number: CWB-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `CWB-${currentYear}-${randomSuffix}`;

    // Execute in transaction: Create Order + OrderItems, Decrement Variant Stocks
    const createdOrder = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName: validated.customerName,
          customerPhone: validated.customerPhone,
          customerEmail: validated.customerEmail || null,
          shippingAddress: validated.shippingAddress,
          city: validated.city,
          notes: validated.notes || null,
          totalAmount,
          status: "PENDING",
          paymentMethod: validated.paymentMethod || "COD",
          items: {
            create: validated.items.map((item) => ({
              productId: item.productId,
              variantId: item.variantId || null,
              title: item.title,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Decrement stock for each variant
      for (const item of validated.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }
      }

      return newOrder;
    });

    return c.json(createdOrder, 201);
  } catch (err: any) {
    return c.json({ error: err.message || "Order placement failed." }, 400);
  }
});

// GET /api/orders (Admin Orders List)
orders.get("/", async (c) => {
  try {
    const status = c.req.query("status");
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    const list = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    return c.json({ orders: list });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// GET /api/orders/:idOrNumber
orders.get("/:idOrNumber", async (c) => {
  try {
    const param = c.req.param("idOrNumber");
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: param }, { orderNumber: param }],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    return c.json(order);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// PATCH /api/orders/:id/status (Admin)
orders.patch("/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const { status } = await c.req.json();

    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return c.json({ error: "Invalid status" }, 400);
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    return c.json(updated);
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
});

export default orders;
