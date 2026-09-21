import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "discount" | "new" | "sold_out" | "limited" | "bridal";
  className?: string;
}

const badgeVariants = {
  discount: "bg-maroon text-ivory-50",
  new: "bg-gold text-charcoal",
  sold_out: "bg-charcoal/70 text-ivory-100",
  limited: "bg-maroon-muted text-ivory-50",
  bridal: "bg-rose-muted text-ivory-50",
};

export function Badge({ children, variant = "discount", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
