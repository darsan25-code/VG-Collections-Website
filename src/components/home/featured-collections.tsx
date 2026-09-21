"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

// Editorial-style featured collections
const collections = [
  {
    id: "bridal",
    title: "Bridal Splendour",
    subtitle: "2025 Wedding Collection",
    description:
      "Our most treasured bridal sarees — each crafted to mark the most beautiful day of your life.",
    href: "/sarees?category=Bridal",
    image: SAREE_PLACEHOLDERS.collectionBridal,
    badge: "Exclusive",
    span: "lg:col-span-2 lg:row-span-2",
    textSize: "text-3xl md:text-4xl",
    align: "bottom-left",
  },
  {
    id: "kanchipuram",
    title: "Kanchipuram Heritage",
    subtitle: "Pure Silk Collection",
    description: "The gold standard of South Indian silk.",
    href: "/sarees?category=Silk+Sarees",
    image: SAREE_PLACEHOLDERS.collectionSilk,
    badge: "Best Seller",
    span: "lg:col-span-1",
    textSize: "text-xl md:text-2xl",
    align: "bottom-left",
  },
  {
    id: "handloom",
    title: "Artisan Handloom",
    subtitle: "Hand Block Prints",
    description: "Each piece tells the story of a master craftsman.",
    href: "/sarees?category=Handloom",
    image: SAREE_PLACEHOLDERS.collectionHandloom,
    badge: "New",
    span: "lg:col-span-1",
    textSize: "text-xl md:text-2xl",
    align: "bottom-left",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24 bg-ivory-50" aria-label="Featured collections">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
            Curated
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-maroon mb-4">
            Featured Collections
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:grid-rows-2">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-sm bg-charcoal ${col.span} ${i === 0 ? "min-h-[400px] md:min-h-[500px]" : "min-h-[240px] md:min-h-[280px]"}`}
            >
              <Link href={col.href} aria-label={`Explore ${col.title}`} className="block h-full">
                {/* Image */}
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/90 text-charcoal text-[10px] font-bold uppercase tracking-widest rounded-sm">
                    <Gem className="w-2.5 h-2.5" />
                    {col.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-gold-light text-xs uppercase tracking-[0.2em] mb-1.5">
                    {col.subtitle}
                  </p>
                  <h3 className={`font-serif text-ivory-50 ${col.textSize} leading-tight mb-2`}>
                    {col.title}
                  </h3>
                  {i === 0 && (
                    <p className="text-ivory-200/70 text-sm font-light mb-4 max-w-xs">
                      {col.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-gold-light text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/collections">
              View All Collections
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
