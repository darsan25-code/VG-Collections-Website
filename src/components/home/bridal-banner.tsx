"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

export function BridalBanner() {
  return (
    <section
      className="relative overflow-hidden min-h-[440px] md:min-h-[520px] flex items-center"
      aria-label="Bridal collection"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={SAREE_PLACEHOLDERS.bridalBanner}
          alt="Bridal saree collection"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/90 via-maroon-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container py-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-lg"
        >
          <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-4">
            Wedding Season 2025
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-ivory-50 leading-tight mb-4">
            Bridal Sarees<br />
            <em className="font-light not-italic text-gold-light">for Her Perfect Day</em>
          </h2>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-ivory-200/75 text-base leading-relaxed mb-8 max-w-sm">
            Our bridal collection features the finest Kanchipuram silks, heavily
            worked gold zari sarees, and exquisite heirloom pieces designed to
            become family treasures.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link href="/sarees?category=Bridal">
                Explore Bridal Collection
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-ivory-200/50 text-ivory-100 hover:bg-ivory-50/10"
              asChild
            >
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold/30 hidden md:block" />
    </section>
  );
}
