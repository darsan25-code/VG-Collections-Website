"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  title?: string;
  eyebrow?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
  columns?: 3 | 4;
}

export function ProductGrid({
  products,
  title = "Featured Collections",
  eyebrow = "Editor's Pick",
  showViewAll = true,
  viewAllHref = "/sarees",
  columns = 4,
}: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 bg-ivory-50" aria-label={title}>
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
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-maroon mb-4">
            {title}
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Grid */}
        <div
          className={`grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 ${
            columns === 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>

        {/* View All */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href={viewAllHref}>
                View All Sarees
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
