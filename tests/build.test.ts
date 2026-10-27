import { describe, it, expect } from "vitest";
import packageJson from "../package.json";

describe("Production Build Configuration", () => {
  it("verifies package.json scripts and build targets", () => {
    expect(packageJson.scripts.build).toBe("next build");
    expect(packageJson.scripts.start).toBe("next start");
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies["@prisma/client"]).toBeDefined();
  });
});
