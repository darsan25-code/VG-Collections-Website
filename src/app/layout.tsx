import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google"; // Changed fonts
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display", // Matches globals.css variable
  subsets: ["latin"],
  weight: ["400", "700"], // Regular and Bold
});

const lato = Lato({
  variable: "--font-lato", // Matches globals.css variable
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Light, Regular, Bold
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vg-collections.vercel.app"), // Replace with your actual domain
  title: "VG Collections | Timeless Elegance",
  description: "Premium ethnic wear and designer sarees.",
  openGraph: {
    title: "VG Collections | Timeless Elegance",
    description: "Premium ethnic wear and designer sarees.",
    url: "https://vg-collections.vercel.app",
    siteName: "VG Collections",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VG Collections - Premium Fashion Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VG Collections | Timeless Elegance",
    description: "Premium ethnic wear and designer sarees.",
    images: ["/og-image.jpg"],
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
        {children}
      </body>
    </html>
  );
}
