import { Hono } from "hono";
import { cors } from "hono/cors";
import products from "./routes/products";
import categories from "./routes/categories";
import orders from "./routes/orders";
import coupons from "./routes/coupons";
import analytics from "./routes/analytics";
import auth from "./routes/auth";

const app = new Hono();

// Global middleware
app.use("*", cors());

// Base health route
app.get("/api/health", (c) => c.json({ status: "healthy", timestamp: Date.now() }));

// Mount modular sub-routers
app.route("/api/products", products);
app.route("/api/categories", categories);
app.route("/api/orders", orders);
app.route("/api/coupons", coupons);
app.route("/api/analytics", analytics);
app.route("/api/auth", auth);

export default app;
