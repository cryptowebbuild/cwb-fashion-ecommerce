import { Hono } from "hono";
import { prisma } from "../../lib/db";
import { z } from "zod";
import { adminAuthMiddleware } from "../middleware/auth";

const products = new Hono();

// GET /api/products (Public)
products.get("/", async (c) => {
  try {
    const categorySlug = c.req.query("category");
    const search = c.req.query("search");
    const sort = c.req.query("sort") || "featured";
    const featured = c.req.query("featured");
    const includeArchived = c.req.query("archived") === "true";

    const where: any = {};
    if (!includeArchived) {
      where.isArchived = false;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }
    if (categorySlug && categorySlug !== "all") {
      where.category = { slug: categorySlug };
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "featured") orderBy = [{ isFeatured: "desc" }, { createdAt: "desc" }];

    const items = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        variants: true,
      },
    });

    const parsedItems = items.map((p) => ({
      ...p,
      images: JSON.parse(p.images || "[]"),
    }));

    return c.json({ products: parsedItems });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// GET /api/products/:slug (Public)
products.get("/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        category: true,
        variants: true,
      },
    });

    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json({
      ...product,
      images: JSON.parse(product.images || "[]"),
    });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// PROTECTED ROUTES (Admin Only)
const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  compareAtPrice: z.number().optional().nullable(),
  costPrice: z.number().optional().nullable(),
  categoryId: z.string(),
  images: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  variants: z
    .array(
      z.object({
        size: z.string(),
        color: z.string(),
        sku: z.string(),
        stock: z.number().int().min(0),
      })
    )
    .min(1),
});

// POST /api/products (Admin)
products.post("/", adminAuthMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const validated = productSchema.parse(body);

    const created = await prisma.product.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        price: validated.price,
        compareAtPrice: validated.compareAtPrice,
        costPrice: validated.costPrice,
        categoryId: validated.categoryId,
        images: JSON.stringify(validated.images),
        isFeatured: validated.isFeatured,
        variants: {
          create: validated.variants,
        },
      },
      include: {
        category: true,
        variants: true,
      },
    });

    return c.json({ ...created, images: JSON.parse(created.images) }, 201);
  } catch (err: any) {
    return c.json({ error: err.message || "Failed to create product" }, 400);
  }
});

// PUT /api/products/:id (Admin)
products.put("/:id", adminAuthMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        costPrice: body.costPrice,
        categoryId: body.categoryId,
        images: body.images ? JSON.stringify(body.images) : undefined,
        isFeatured: body.isFeatured,
        isArchived: body.isArchived,
      },
      include: {
        category: true,
        variants: true,
      },
    });

    return c.json({ ...updated, images: JSON.parse(updated.images) });
  } catch (err: any) {
    return c.json({ error: err.message || "Failed to update product" }, 400);
  }
});

// DELETE /api/products/:id (Admin)
products.delete("/:id", adminAuthMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.product.delete({ where: { id } });
    return c.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
});

export default products;
