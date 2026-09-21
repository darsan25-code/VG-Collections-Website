"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setDone(true);
      // TODO: Connect to newsletter service
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" aria-label="Newsletter signup">
      {done ? (
        <p className="text-gold text-sm py-2">✓ You&apos;re subscribed!</p>
      ) : (
        <>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory-300/40 pointer-events-none" />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address for newsletter"
              className="w-full bg-white/5 border border-ivory-300/15 focus:border-gold/40 rounded-sm py-3 pl-10 pr-4 text-sm text-ivory-200 placeholder:text-ivory-300/40 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-xs font-bold uppercase tracking-[0.15em] bg-gold/20 hover:bg-gold/30 border border-gold/30 hover:border-gold/50 text-gold transition-all rounded-sm"
          >
            Subscribe
          </button>
        </>
      )}
    </form>
  );
}
