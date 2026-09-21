"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

// We extend only what we need, avoiding the conflicting HTMLAttributes spread
interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
  className?: string;
}

// For regular button usage
export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-maroon text-ivory-50 hover:bg-maroon-dark border border-maroon hover:border-maroon-dark shadow-md hover:shadow-lg",
  secondary:
    "bg-ivory-50 text-maroon hover:bg-ivory-100 border border-ivory-300 shadow-md hover:shadow-lg",
  outline:
    "border-2 border-maroon text-maroon hover:bg-maroon hover:text-ivory-50 bg-transparent",
  ghost: "text-maroon hover:bg-maroon/8 bg-transparent border border-transparent",
  gold: "bg-gold text-charcoal hover:bg-gold-dark border border-gold hover:border-gold-dark shadow-md hover:shadow-lg",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[10px] tracking-widest",
  md: "px-6 py-3 text-[11px] tracking-widest",
  lg: "px-8 py-4 text-xs tracking-widest",
  xl: "px-10 py-5 text-sm tracking-widest",
};

const baseClass =
  "relative inline-flex items-center justify-center font-sans uppercase font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden cursor-pointer";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      loading,
      disabled,
      asChild,
      type = "button",
      ...htmlProps
    },
    ref
  ) => {
    const combined = cn(baseClass, variantStyles[variant], sizeStyles[size], className);

    // If asChild, clone the child element (e.g., a Next.js <Link>) with merged className
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(combined, child.props.className),
      });
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={!disabled && !loading ? { scale: 1.01 } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
        disabled={disabled || loading}
        className={combined}
        // Only pass safe, non-conflicting props
        id={htmlProps.id}
        name={htmlProps.name}
        form={htmlProps.form}
        aria-label={htmlProps["aria-label"]}
        aria-expanded={htmlProps["aria-expanded"]}
        aria-controls={htmlProps["aria-controls"]}
        aria-describedby={htmlProps["aria-describedby"]}
        onClick={htmlProps.onClick}
        onFocus={htmlProps.onFocus}
        onBlur={htmlProps.onBlur}
        onMouseEnter={htmlProps.onMouseEnter}
        onMouseLeave={htmlProps.onMouseLeave}
        tabIndex={htmlProps.tabIndex}
        style={htmlProps.style}
        data-testid={htmlProps["data-testid" as keyof typeof htmlProps] as string}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          <>
            {children}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
              initial={{ x: "-150%" }}
              whileHover={{ x: "150%" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            />
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
