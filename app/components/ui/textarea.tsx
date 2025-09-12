import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-input hover:border-primary/50 focus:border-primary",
        nova: "nova-glass border-white/20 text-white placeholder:text-white/60 focus:border-nova-primary focus:ring-ring/50",
        ghost: "border-transparent bg-transparent hover:bg-accent focus:bg-accent",
      },
      size: {
        default: "min-h-[80px] px-3 py-2",
        sm: "min-h-[60px] px-2 py-1 text-xs",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  animated?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, animated = true, ...props }, ref) => {
    const textareaElement = (
      <textarea
        className={cn(textareaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    return animated ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {textareaElement}
      </motion.div>
    ) : (
      textareaElement
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
