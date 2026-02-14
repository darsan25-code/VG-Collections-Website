"use client";

import { motion } from "framer-motion";
import { ProductCard, Product } from "./product-card";

// Placeholder Data
const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Royal Kanchipuram Silk",
        price: 25000,
        category: "Silk Sarees",
        image: "https://images.unsplash.com/photo-1621644827013-72f9c30575d5?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "2",
        name: "Banarasi Georgette",
        price: 18500,
        category: "Georgette",
        image: "https://images.unsplash.com/photo-1594639446411-j41a87e47265?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "3",
        name: "Mysore Silk Print",
        price: 12000,
        category: "Printed Silk",
        image: "https://images.unsplash.com/photo-1583391733958-86716d7a468d?q=80&w=2674&auto=format&fit=crop",
    },
    {
        id: "4",
        name: "Handloom Cotton",
        price: 4500,
        category: "Cotton",
        image: "https://images.unsplash.com/photo-1533054593635-420da9a40a23?q=80&w=2670&auto=format&fit=crop",
    },
];

export function ProductGrid() {
    return (
        <section className="py-20 bg-ivory-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-dark text-sm uppercase tracking-[0.2em] block mb-2">Editor's Pick</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-maroon mb-4">Featured Collections</h2>
                    <div className="w-24 h-1 bg-gold mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
