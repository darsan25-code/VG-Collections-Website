"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] max-h-[1000px] w-full overflow-hidden bg-charcoal"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src={SAREE_PLACEHOLDERS.hero}
          alt="Premium silk saree — VG Collections"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Multi-layer gradient for premium depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-start justify-center"
      >
        <div className="section-container w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gold-light text-xs md:text-sm uppercase tracking-[0.4em] font-bold mb-6"
            >
              VG Collections · Chennai
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory-50 leading-[1.1] mb-6"
            >
              Timeless Sarees,<br />
              <em className="font-light not-italic text-ivory-200">
                Eternal Elegance
              </em>
            </motion.h1>

            {/* Animated gold line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="h-px bg-gold mb-6"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-ivory-200/80 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg"
            >
              Discover handpicked Kanchipuram silks, Banarasi weaves, and bridal
              masterpieces — each a celebration of Indian heritage.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="gold" size="lg" asChild>
                <Link href="/sarees">
                  Shop Sarees
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-ivory-200/60 text-ivory-100 hover:bg-ivory-50/10 hover:border-ivory-100"
                asChild
              >
                <Link href="/collections">View Collections</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex items-center gap-8 mt-14 pt-8 border-t border-ivory-200/20"
            >
              {[
                { value: "30+", label: "Years of Craft" },
                { value: "5000+", label: "Happy Customers" },
                { value: "500+", label: "Saree Designs" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-2xl md:text-3xl text-gold-light font-bold">
                    {value}
                  </p>
                  <p className="text-ivory-300/60 text-xs uppercase tracking-widest mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <p className="text-ivory-300/40 text-[10px] uppercase tracking-[0.3em]">Scroll</p>
        <div className="w-px h-16 bg-ivory-200/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent to-gold absolute top-0"
          />
        </div>
      </motion.div>
    </div>
  );
}
