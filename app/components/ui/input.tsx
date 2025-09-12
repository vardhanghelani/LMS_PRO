import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { formFieldVariants } from "@/app/lib/motion";

const inputVariants = cva(
  "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-input hover:border-primary/50 focus:border-primary",
        nova: "nova-glass border-white/20 text-white placeholder:text-white/60 focus:border-nova-primary focus:ring-ring/50",
        ghost: "border-transparent bg-transparent hover:bg-accent focus:bg-accent",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  animated?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, animated = true, icon, iconPosition = "left", ...props }, ref) => {
    const motionProps = animated ? {
      variants: formFieldVariants,
      initial: "initial",
      animate: "animate",
      whileFocus: "focus",
    } : {};

    const inputElement = (
      <input
        className={inputVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );

    if (icon) {
      return (
        <motion.div
          className="relative"
          {...motionProps}
        >
          {iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          {React.cloneElement(inputElement, {
            className: `${inputElement.props.className} ${iconPosition === "left" ? "pl-10" : "pr-10"}`,
          })}
          {iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
        </motion.div>
      );
    }

    return animated ? (
      <motion.div {...motionProps}>
        {inputElement}
      </motion.div>
    ) : (
      inputElement
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
