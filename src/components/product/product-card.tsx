"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Smooth cubic-bezier
            className="group cursor-pointer"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-5 rounded-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.25)]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick Add Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <Button className="w-full bg-ivory-50/90 backdrop-blur-md text-maroon hover:bg-maroon hover:text-ivory-50 shadow-lg border border-maroon/10" size="md">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Quick Add
                    </Button>
                </div>
            </div>

            <div className="text-center space-y-2 px-2">
                <p className="text-xs text-gold-dark/80 uppercase tracking-[0.15em] font-medium">{product.category}</p>
                <h3 className="font-serif text-xl tracking-tight text-maroon group-hover:text-gold-dark transition-colors duration-300">
                    {product.name}
                </h3>
                <p className="text-lg font-bold text-charcoal/90 font-serif tracking-wide">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>
            </div>
        </motion.div>
    );
}
