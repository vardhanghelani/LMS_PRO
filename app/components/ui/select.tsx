import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "default" | "nova" | "ghost";
  size?: "default" | "sm" | "lg";
  animated?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = "default", size = "default", animated = true, children, ...props }, ref) => {
    const variants = {
      default: "border-input bg-background hover:bg-accent hover:text-accent-foreground",
      nova: "nova-glass border-white/20 text-white placeholder:text-white/60 focus:border-nova-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50",
      ghost: "border-transparent bg-transparent hover:bg-accent focus:bg-accent",
    };

    const sizes = {
      default: "h-10 px-3 py-2",
      sm: "h-8 px-2 py-1 text-xs",
      lg: "h-12 px-4 py-3 text-base",
    };

    const selectElement = (
      <div className="relative">
        <select
          className={cn(
            "flex w-full rounded-lg border text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            variants[variant],
            sizes[size],
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    );

    return animated ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {selectElement}
      </motion.div>
    ) : (
      selectElement
    );
  }
);
Select.displayName = "Select";

export { Select };
