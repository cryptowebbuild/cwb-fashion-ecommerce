import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Ensure pre-seeded SQLite database exists in serverless /tmp writable storage
function initDatabase() {
  const dbUrl = process.env.DATABASE_URL || "";
  if (dbUrl.includes("/tmp/")) {
    const targetPath = dbUrl.replace(/^file:/, "");
    if (!fs.existsSync(targetPath)) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        path.resolve("./prisma/dev.db"),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
            fs.copyFileSync(candidate, targetPath);
            break;
          } catch (e) {
            console.error("Failed to copy seed database to /tmp:", e);
          }
        }
      }
    }
  }
}

initDatabase();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
