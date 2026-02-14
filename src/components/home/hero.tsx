"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]); // Increased parallax scale
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-charcoal">
            {/* Background Image with Parallax & Zoom */}
            <motion.div
                style={{ y, scale, opacity }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop"
                    alt="Premium Silk Saree Texture"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Stronger Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pt-24 md:pt-32 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="space-y-10 md:space-y-12 max-w-5xl"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        animate={{ opacity: 1, letterSpacing: "0.4em" }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="block text-gold-light text-sm md:text-lg uppercase tracking-[0.4em] font-medium"
                    >
                        Welcome to VG Collections
                    </motion.span>

                    <div className="relative inline-block py-2">
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-ivory-50 leading-tight">
                            Timeless Elegance <br />
                            <span className="italic font-light">in Every Drape</span>
                        </h1>

                        {/* Animated Gold Underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                            className="absolute -bottom-6 left-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto right-0 opacity-80"
                        />
                    </div>

                    <p className="text-ivory-200 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed pt-6">
                        Discover the finest handpicked sarees, crafted with tradition and woven with luxury.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="pt-8"
                    >
                        <Button size="lg" variant="secondary">
                            Explore Collections
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-ivory-50/0 via-ivory-50/50 to-ivory-50/0 overflow-hidden relative">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-full h-1/2 bg-gradient-to-b from-transparent to-gold absolute top-0"
                    />
                </div>
            </motion.div>
        </div>
    );
}
