import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/app/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "nova";
  animated?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant = "default", animated = true, ...props }, ref) => {
    const variants = {
      default: "border-input bg-background hover:bg-accent hover:text-accent-foreground",
      nova: "border-white/40 bg-transparent hover:border-white/60 focus:border-nova-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50",
    };

    const checkboxElement = (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            variants[variant],
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary"
          )}
          ref={ref}
          {...props}
        />
        <div className="grid place-items-center">
          <Check className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
    );

    return animated ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {checkboxElement}
      </motion.div>
    ) : (
      checkboxElement
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
