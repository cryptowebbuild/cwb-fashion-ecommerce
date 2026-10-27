import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cwbfashion.com"),
  title: {
    default: "CWB Fashion | The Future of Men's Luxury Streetwear & Tailoring",
    template: "%s | CWB Fashion",
  },
  description:
    "Discover curated luxury menswear, futuristic streetwear, fine Italian tailoring, and designer footwear. Engineered for effortless style with 100% Cash on Delivery.",
  keywords: [
    "men's fashion",
    "luxury menswear",
    "streetwear",
    "italian suits",
    "designer jackets",
    "CWB Fashion",
    "CryptoWebBuild",
  ],
  authors: [{ name: "CWB Fashion Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cwbfashion.com",
    title: "CWB Fashion | The Future of Men's Luxury Streetwear & Tailoring",
    description: "Curated luxury menswear and futuristic streetwear drops.",
    siteName: "CWB Fashion",
  },
  twitter: {
    card: "summary_large_image",
    title: "CWB Fashion | Curated Men's Luxury Drops",
    description: "Futuristic men's fashion and luxury tailoring.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-cwb-dark text-foreground flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
