import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default: "border-cyan-300 bg-cyan-300 text-black shadow-cyan hover:brightness-110",
        outline: "border-cyan-300/40 bg-cyan-300/5 text-cyan-300 hover:border-cyan-300 hover:shadow-cyan",
        ghost: "border-transparent bg-transparent text-slate-400 hover:text-cyan-300",
        magenta: "border-fuchsia-400 bg-fuchsia-500 text-black shadow-magenta hover:brightness-110",
      },
      size: {
        default: "h-10",
        lg: "h-16 px-10 text-base",
        sm: "h-8 px-3 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
