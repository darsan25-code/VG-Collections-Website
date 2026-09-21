"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

export function Craftsmanship() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative py-0 overflow-hidden bg-maroon-dark"
      aria-label="Our craftsmanship heritage"
    >
      {/* Decorative top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
        {/* Image Column */}
        <div className="relative h-72 sm:h-96 lg:h-auto overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
            <Image
              src={SAREE_PLACEHOLDERS.craftsmanship}
              alt="Master weaver crafting a Kanchipuram silk saree"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-maroon-dark/20" />
          </motion.div>

          {/* Decorative corner */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-gold/40" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-gold/40" />
        </div>

        {/* Content Column */}
        <div className="flex items-center px-8 md:px-12 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-lg"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-4">
              Our Heritage
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory-50 leading-tight mb-6">
              Three Decades of<br />
              <em className="font-light not-italic text-gold-light">Weaving Tradition</em>
            </h2>
            <div className="w-12 h-px bg-gold mb-6" />
            <p className="text-ivory-200/75 text-base leading-relaxed mb-5">
              VG Collections was born from a deep love for India&apos;s weaving heritage. For over
              three decades, we have worked directly with master artisans across Tamil Nadu,
              Varanasi, Gujarat, and Rajasthan.
            </p>
            <p className="text-ivory-200/75 text-base leading-relaxed mb-10">
              Each saree in our collection is handpicked for purity of material, excellence of
              craft, and beauty of design — ensuring that every purchase is a true heirloom.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-ivory-200/10">
              {[
                { n: "100%", l: "Pure Silk" },
                { n: "200+", l: "Weavers" },
                { n: "30+", l: "Years" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="font-serif text-2xl text-gold-light font-bold">{n}</p>
                  <p className="text-ivory-300/50 text-xs uppercase tracking-widest mt-1">{l}</p>
                </div>
              ))}
            </div>

            <Button variant="gold" size="lg" asChild>
              <Link href="/about">
                Our Story
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
