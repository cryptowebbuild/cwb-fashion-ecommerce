import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cwbfashion.com"),
  title: {
    default: "CWB Fashion | Curated Men's Luxury Atelier & Streetwear",
    template: "%s | CWB Fashion",
  },
  description:
    "Explore bespoke menswear, architectural streetwear, Italian wool tailoring, and archival footwear. White-glove concierge and 100% Cash on Delivery nationwide.",
  keywords: [
    "luxury menswear",
    "streetwear atelier",
    "cash on delivery fashion",
    "italian tailoring",
    "designer overcoat",
    "CWB Fashion",
    "CryptoWebBuild",
  ],
  authors: [{ name: "CWB Atelier Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cwbfashion.com",
    title: "CWB Fashion | Curated Men's Luxury Atelier",
    description: "Architectural menswear, Italian tailoring, and limited streetwear drops.",
    siteName: "CWB Fashion",
  },
  twitter: {
    card: "summary_large_image",
    title: "CWB Fashion | Curated Men's Luxury Drops",
    description: "Architectural menswear and luxury Italian tailoring.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
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
    <html
      lang="en"
      className={`dark ${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-cwb-void text-foreground flex flex-col font-sans selection:bg-cwb-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
