import { describe, it, expect } from "vitest";
import { signAdminToken, verifyAdminToken } from "../src/lib/auth";

describe("Admin Authentication Guard & Token Utilities", () => {
  it("rejects invalid or malformed tokens", async () => {
    const user = await verifyAdminToken("invalid-tampered-token");
    expect(user).toBeNull();
  });

  it("signs and successfully verifies valid admin token", async () => {
    const payload = {
      id: "admin-123",
      email: "admin@cwbfashion.com",
      name: "CWB Director",
      role: "ADMIN",
    };

    const token = await signAdminToken(payload);
    expect(typeof token).toBe("string");

    const verified = await verifyAdminToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe("admin@cwbfashion.com");
    expect(verified?.role).toBe("ADMIN");
  });
});
