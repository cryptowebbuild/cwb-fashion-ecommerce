import { Hono } from "hono";
import { prisma } from "../../lib/db";
import { comparePassword, signAdminToken, verifyAdminToken } from "../../lib/auth";
import { z } from "zod";

const auth = new Hono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// POST /api/auth/login
auth.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await signAdminToken(payload);

    return c.json({
      success: true,
      token,
      user: payload,
    });
  } catch (err: any) {
    return c.json({ error: err.message || "Authentication failed" }, 400);
  }
});

// GET /api/auth/me
auth.get("/me", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const cookieHeader = c.req.header("Cookie");

    let token = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (cookieHeader) {
      const match = cookieHeader.match(/cwb_admin_token=([^;]+)/);
      if (match) token = match[1];
    }

    if (!token) {
      return c.json({ user: null }, 401);
    }

    const decoded = await verifyAdminToken(token);
    if (!decoded) {
      return c.json({ user: null }, 401);
    }

    return c.json({ user: decoded });
  } catch {
    return c.json({ user: null }, 401);
  }
});

// POST /api/auth/logout
auth.post("/logout", async (c) => {
  return c.json({ success: true, message: "Logged out successfully" });
});

export default auth;
