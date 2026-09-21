import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore curated saree collections at VG Collections — bridal, festive, everyday luxury, and heritage weaves.",
};

const collections = [
  {
    id: "bridal",
    name: "Bridal Splendour",
    tagline: "Wedding & Bridal Sarees",
    description:
      "Our most treasured collection of bridal sarees — Kanchipuram silks with heavy gold zari, and exquisite pieces designed to be worn on the most beautiful day of your life.",
    image: SAREE_PLACEHOLDERS.collectionBridal,
    href: "/sarees?category=Bridal",
    count: 12,
    accent: "bg-maroon-dark",
  },
  {
    id: "silk",
    name: "Silk Heritage",
    tagline: "Kanchipuram & Mysore Silks",
    description:
      "Timeless Kanchipuram and Mysore silk sarees handwoven by master craftsmen. Vivid colours, intricate zari borders, and unmatched lustre.",
    image: SAREE_PLACEHOLDERS.collectionSilk,
    href: "/sarees?category=Silk+Sarees",
    count: 24,
    accent: "bg-charcoal",
  },
  {
    id: "festive",
    name: "Festive Edit",
    tagline: "Georgette & Festive Weaves",
    description:
      "Lightweight, luminous, and celebration-ready. Our festive edit brings together the finest Banarasi georgettes and printed silks for every occasion.",
    image: SAREE_PLACEHOLDERS.collectionFestive,
    href: "/sarees?category=Georgette",
    count: 18,
    accent: "bg-maroon",
  },
  {
    id: "handloom",
    name: "Artisan Handloom",
    tagline: "Block Prints & Khadi",
    description:
      "A celebration of India's handloom heritage. Each piece in this collection is handcrafted by artisans using traditional techniques passed down for generations.",
    image: SAREE_PLACEHOLDERS.collectionHandloom,
    href: "/sarees?category=Handloom",
    count: 15,
    accent: "bg-charcoal",
  },
  {
    id: "everyday",
    name: "Everyday Luxury",
    tagline: "Cotton & Linen Sarees",
    description:
      "Effortlessly elegant everyday sarees in premium cotton and linen. Breathable, comfortable, and beautiful — perfect for the modern Indian woman.",
    image: SAREE_PLACEHOLDERS.collectionCotton,
    href: "/sarees?category=Cotton",
    count: 20,
    accent: "bg-maroon-dark",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main id="main-content">
        {/* Header */}
        <div className="bg-maroon-dark pt-28 pb-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent absolute bottom-0 left-0 right-0" />
          <div className="relative z-10 section-container">
            <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-3">
              Curated for You
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-ivory-50 mb-4">
              Our Collections
            </h1>
            <p className="text-ivory-200/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Each collection is a curated chapter in the story of Indian textile excellence.
              Discover yours.
            </p>
          </div>
        </div>

        {/* Collections Grid */}
        <section className="py-14 md:py-20 bg-ivory-100">
          <div className="section-container space-y-6 md:space-y-8">
            {collections.map((col, i) => (
              <div
                key={col.id}
                className={`group grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm shadow-card hover:shadow-card-hover transition-shadow duration-500 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                  <div className={`absolute top-4 left-4 px-3 py-1.5 ${col.accent} text-ivory-50 text-[10px] font-bold uppercase tracking-widest rounded-sm`}>
                    {col.count}+ sarees
                  </div>
                </div>

                {/* Content */}
                <div className="bg-ivory-50 flex flex-col justify-center p-8 md:p-10 lg:p-14">
                  <p className="text-xs text-gold-dark uppercase tracking-[0.25em] font-bold mb-3">
                    {col.tagline}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-maroon mb-4 leading-tight">
                    {col.name}
                  </h2>
                  <div className="w-10 h-px bg-gold mb-5" />
                  <p className="text-stone text-sm md:text-base leading-relaxed mb-8">
                    {col.description}
                  </p>
                  <Button variant="primary" size="md" asChild className="w-fit">
                    <Link href={col.href}>
                      Explore Collection
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
