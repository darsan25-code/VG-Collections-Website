import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "space-y-4",
        isCenter ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs uppercase tracking-[0.3em] font-bold",
            isDark ? "text-gold-light" : "text-gold-dark"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-balance",
          isDark ? "text-ivory-50" : "text-maroon"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg font-light leading-relaxed max-w-2xl",
            isCenter && "mx-auto",
            isDark ? "text-ivory-200/80" : "text-charcoal-muted"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn("gold-line mt-2", !isCenter && "gold-line-left")} />
    </div>
  );
}
