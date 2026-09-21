"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    // TODO: Connect to newsletter service (Mailchimp, Klaviyo, etc.)
    setSubmitted(true);
    setError("");
  };

  return (
    <section
      className="py-16 md:py-20 bg-maroon"
      aria-label="Newsletter signup"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent -mt-0 mb-0" />
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-gold" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-3">
              Exclusive Access
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory-50 mb-4">
              Join the VG Circle
            </h2>
            <div className="gold-line mb-6" />
            <p className="text-ivory-200/70 text-base leading-relaxed mb-8">
              Be the first to discover new arrivals, exclusive collections, and heritage stories.
              Get special offers reserved only for our community.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 py-4 px-6 bg-gold/10 border border-gold/30 rounded-sm"
              >
                <CheckCircle className="w-5 h-5 text-gold" />
                <p className="text-ivory-50 font-medium">
                  Thank you! You&apos;re now part of the VG Circle.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="w-full bg-ivory-50/8 border border-ivory-200/20 focus:border-gold/40 rounded-sm py-3.5 px-4 text-ivory-100 placeholder:text-ivory-300/40 outline-none transition-colors text-sm"
                    aria-describedby={error ? "newsletter-error" : undefined}
                  />
                  {error && (
                    <p id="newsletter-error" className="text-rose-muted text-xs mt-1.5 text-left">
                      {error}
                    </p>
                  )}
                </div>
                <Button type="submit" variant="gold" size="md" className="whitespace-nowrap flex-shrink-0">
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-ivory-300/40 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
