import { describe, it, expect } from "vitest";
import { generateProductJsonLd, generateStoreJsonLd } from "../src/components/seo/json-ld";

describe("SEO Structured Data & JSON-LD Microdata", () => {
  it("produces valid schema.org Product and Offer markup", () => {
    const jsonLd = generateProductJsonLd({
      name: "Obsidian Milano Double-Breasted Blazer",
      description: "Super 150s virgin wool",
      price: 495,
      currency: "USD",
      slug: "obsidian-milano-double-breasted-blazer",
      images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35"],
      inStock: true,
      category: "Luxury Tailoring",
    });

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Product");
    expect(jsonLd.name).toBe("Obsidian Milano Double-Breasted Blazer");
    expect(jsonLd.offers["@type"]).toBe("Offer");
    expect(jsonLd.offers.price).toBe(495);
    expect(jsonLd.offers.priceCurrency).toBe("USD");
    expect(jsonLd.offers.availability).toBe("https://schema.org/InStock");
  });

  it("produces valid schema.org Organization and OnlineStore markup", () => {
    const storeJsonLd = generateStoreJsonLd();
    expect(storeJsonLd["@type"]).toBe("OnlineStore");
    expect(storeJsonLd.name).toBe("CWB Fashion");
    expect(storeJsonLd.currenciesAccepted).toBe("USD");
    expect(storeJsonLd.paymentAccepted).toContain("Cash on Delivery");
  });
});
