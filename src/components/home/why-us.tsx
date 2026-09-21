"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Award, Headphones, Leaf } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Authenticity Guaranteed",
    description:
      "Every saree comes with a certificate of authenticity. We source directly from master weavers.",
  },
  {
    icon: Truck,
    title: "Free Pan-India Shipping",
    description:
      "Complimentary shipping on orders above ₹2,000. Carefully packed in premium gift boxes.",
  },
  {
    icon: RefreshCw,
    title: "Easy 7-Day Returns",
    description:
      "Not satisfied? Return your purchase within 7 days for a full refund — no questions asked.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description:
      "100% secure payments. Your personal and payment data is always protected.",
  },
  {
    icon: Headphones,
    title: "Expert Saree Guidance",
    description:
      "Our saree specialists are here to help you find the perfect piece for every occasion.",
  },
  {
    icon: Leaf,
    title: "Sustainable Craftsmanship",
    description:
      "We champion eco-conscious weaving traditions and sustainable practices throughout our supply chain.",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-ivory-100" aria-label="Why choose VG Collections">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
            Our Promise
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-maroon mb-4">
            Why VG Collections
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex gap-5 p-6 bg-ivory-50 rounded-sm border border-ivory-200 hover:border-gold/30 hover:shadow-[0_4px_24px_-8px_rgba(201,168,76,0.15)] transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-maroon/8 group-hover:bg-maroon/12 flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-5 h-5 text-maroon" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg text-maroon mb-2 leading-tight">{title}</h3>
                <p className="text-stone text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
