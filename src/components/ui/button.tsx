"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        const variants = {
            primary: "bg-maroon text-ivory-50 hover:bg-maroon-dark shadow-md hover:shadow-lg",
            secondary: "bg-gold text-charcoal hover:bg-gold-dark shadow-md hover:shadow-lg",
            outline: "border-2 border-maroon text-maroon hover:bg-maroon hover:text-ivory-50",
            ghost: "text-maroon hover:bg-maroon/10",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-sm font-serif font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-maroon/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
                {/* Shine effect overlay for premium feel on primary/secondary */}
                {(variant === 'primary' || variant === 'secondary') && (
                    <motion.div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
