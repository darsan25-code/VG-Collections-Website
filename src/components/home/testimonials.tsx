"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Lakshmi Raghunathan",
    location: "Mylapore, Chennai",
    rating: 5,
    text: "I ordered a Kanchipuram silk for my daughter's wedding and I was absolutely blown away. The quality is unparalleled — rich texture, vibrant colours. VG Collections is a name I trust completely.",
    occasion: "Bridal Saree",
  },
  {
    id: 2,
    name: "Priya Venkataraman",
    location: "T. Nagar, Chennai",
    rating: 5,
    text: "I've been shopping here for years. The staff is incredibly knowledgeable about fabrics and weaves. The handloom block-print I bought is still my most complimented saree!",
    occasion: "Handloom Collection",
  },
  {
    id: 3,
    name: "Ananya Krishnamurthy",
    location: "Adyar, Chennai",
    rating: 5,
    text: "The Banarasi georgette arrived so beautifully packed. It felt like receiving a gift. The saree is even more stunning in person than the photographs. Will definitely order again.",
    occasion: "Festive Saree",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-ivory-200/60" aria-label="Customer testimonials">
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
            Stories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-4">
            From Our Customers
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-ivory-50 rounded-sm p-7 relative border border-ivory-200 hover:border-gold/30 hover:shadow-card transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gold/20 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-charcoal-muted text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-gold/30 mb-4" />

              {/* Author */}
              <div>
                <p className="font-serif text-maroon font-semibold text-base">{t.name}</p>
                <p className="text-stone text-xs mt-0.5">{t.location}</p>
                <p className="text-gold-dark text-xs uppercase tracking-widest mt-1 font-bold">
                  {t.occasion}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
