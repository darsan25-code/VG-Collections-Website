"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

const categories = [
  {
    name: "Silk Sarees",
    slug: "Silk Sarees",
    description: "Kanchipuram & Mysore silks",
    image: SAREE_PLACEHOLDERS.collectionSilk,
    color: "from-maroon-dark/70",
  },
  {
    name: "Bridal",
    slug: "Bridal",
    description: "Heirloom wedding sarees",
    image: SAREE_PLACEHOLDERS.collectionBridal,
    color: "from-charcoal/70",
  },
  {
    name: "Handloom",
    slug: "Handloom",
    description: "Block prints & khadi",
    image: SAREE_PLACEHOLDERS.collectionHandloom,
    color: "from-maroon-dark/70",
  },
  {
    name: "Georgette",
    slug: "Georgette",
    description: "Lightweight festive wear",
    image: SAREE_PLACEHOLDERS.collectionFestive,
    color: "from-charcoal/70",
  },
  {
    name: "Cotton",
    slug: "Cotton",
    description: "Everyday elegance",
    image: SAREE_PLACEHOLDERS.collectionCotton,
    color: "from-maroon-dark/70",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-20 bg-ivory-100" aria-label="Shop by category">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
            Browse
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-maroon">
            Shop by Category
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/sarees?category=${encodeURIComponent(cat.slug)}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-ivory-200"
                aria-label={`Shop ${cat.name}`}
              >
                {/* Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 18vw"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent`}
                />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-ivory-50 text-base leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-ivory-200/70 text-xs mt-0.5 font-light">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold-light text-[10px] uppercase tracking-widest mt-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
