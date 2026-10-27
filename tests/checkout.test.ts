import { describe, it, expect } from "vitest";
import { checkoutFormSchema } from "../src/lib/validations";

describe("COD Checkout Form Validation", () => {
  it("fails when customer name is less than 2 characters", () => {
    const result = checkoutFormSchema.safeParse({
      customerName: "A",
      customerPhone: "+8801712345678",
      shippingAddress: "House 12, Road 4, Dhanmondi",
      city: "Dhaka",
    });
    expect(result.success).toBe(false);
  });

  it("fails when customer phone is missing or too short", () => {
    const result = checkoutFormSchema.safeParse({
      customerName: "Mahmud Hasan",
      customerPhone: "123",
      shippingAddress: "House 12, Road 4, Dhanmondi",
      city: "Dhaka",
    });
    expect(result.success).toBe(false);
  });

  it("fails when shipping address is less than 5 characters", () => {
    const result = checkoutFormSchema.safeParse({
      customerName: "Mahmud Hasan",
      customerPhone: "+8801712345678",
      shippingAddress: "Road",
      city: "Dhaka",
    });
    expect(result.success).toBe(false);
  });

  it("fails when city is missing", () => {
    const result = checkoutFormSchema.safeParse({
      customerName: "Mahmud Hasan",
      customerPhone: "+8801712345678",
      shippingAddress: "House 12, Road 4, Dhanmondi",
      city: "",
    });
    expect(result.success).toBe(false);
  });

  it("passes with valid COD checkout fields and optional email/notes", () => {
    const result = checkoutFormSchema.safeParse({
      customerName: "Mahmud Hasan",
      customerPhone: "+8801712345678",
      customerEmail: "mahmud@example.com",
      shippingAddress: "House 12, Road 4, Dhanmondi",
      city: "Dhaka",
      notes: "Ring the bell upon arrival",
    });
    expect(result.success).toBe(true);
  });
});
