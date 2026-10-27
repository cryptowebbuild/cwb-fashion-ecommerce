import React from "react";

export interface ProductJsonLdProps {
  name: string;
  description: string;
  price: number;
  currency?: string;
  slug: string;
  images: string[];
  inStock?: boolean;
  category?: string;
}

export function generateProductJsonLd(props: ProductJsonLdProps) {
  const {
    name,
    description,
    price,
    currency = "USD",
    slug,
    images,
    inStock = true,
    category = "Men's Clothing",
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: images,
    category,
    brand: {
      "@type": "Brand",
      name: "CWB Fashion",
    },
    offers: {
      "@type": "Offer",
      url: `https://cwbfashion.com/product/${slug}`,
      priceCurrency: currency,
      price,
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "CWB Fashion (CryptoWebBuild)",
      },
    },
  };
}

export function generateStoreJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "CWB Fashion",
    url: "https://cwbfashion.com",
    description:
      "Curated luxury menswear, Italian tailored suits, and cyber heavyweight streetwear drops.",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash on Delivery (COD)",
    priceRange: "$$$",
    telephone: "+8801712345678",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Dhaka",
    },
  };
}

export function JsonLdScript({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
