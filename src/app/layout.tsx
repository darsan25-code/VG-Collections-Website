import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

export const viewport: Viewport = {
  themeColor: "#3D1220",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vg-collections.vercel.app"),
  title: {
    default: "VG Collections — Premium Sarees & Ethnic Wear",
    template: "%s | VG Collections",
  },
  description:
    "Discover timeless handwoven sarees and premium ethnic wear at VG Collections, Chennai. Kanchipuram silk, Banarasi georgette, bridal collections and more.",
  keywords: [
    "sarees",
    "silk sarees",
    "kanchipuram",
    "banarasi",
    "bridal sarees",
    "ethnic wear",
    "Chennai sarees",
    "VG Collections",
    "handloom sarees",
    "wedding sarees",
  ],
  openGraph: {
    title: "VG Collections — Premium Sarees & Ethnic Wear",
    description:
      "Discover timeless handwoven sarees and premium ethnic wear. Kanchipuram silk, Banarasi, bridal collections and more from Chennai.",
    url: "https://vg-collections.vercel.app",
    siteName: "VG Collections",
    images: [
      {
        url: "https://vg-collections.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "VG Collections — Premium Sarees & Ethnic Wear",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VG Collections — Premium Sarees & Ethnic Wear",
    description:
      "Discover timeless handwoven sarees and premium ethnic wear from Chennai.",
    images: ["https://vg-collections.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased bg-ivory-100 text-charcoal font-sans`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
