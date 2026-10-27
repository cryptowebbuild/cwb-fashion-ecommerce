import { Hono } from "hono";
import { prisma } from "../../lib/db";
import { z } from "zod";

const categories = new Hono();

// GET /api/categories
categories.get("/", async (c) => {
  try {
    const list = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });
    return c.json(list);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// POST /api/categories (Admin)
const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
});

categories.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validated = categorySchema.parse(body);

    const created = await prisma.category.create({
      data: validated,
    });
    return c.json(created, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
});

export default categories;
