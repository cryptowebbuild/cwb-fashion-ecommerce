import { Context, Next } from "hono";
import { verifyAdminToken } from "../../lib/auth";

export async function adminAuthMiddleware(c: Context, next: Next) {
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
    return c.json({ error: "Unauthorized: Admin authentication required" }, 401);
  }

  const user = await verifyAdminToken(token);
  if (!user || user.role !== "ADMIN") {
    return c.json({ error: "Unauthorized: Invalid or expired admin credentials" }, 401);
  }

  c.set("adminUser", user);
  await next();
}
