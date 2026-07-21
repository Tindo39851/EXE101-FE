import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cyan" | "fuchsia" | "gradient";
  height?: "thin" | "normal" | "thick";
}

export function GlowDivider({ className, variant = "cyan", height = "thin", ...props }: GlowDividerProps) {
  const heightStyles = {
    thin: "h-px",
    normal: "h-[2px]",
    thick: "h-[3px]",
  };

  const variantStyles = {
    cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.6)]",
    fuchsia: "bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,0.6)]",
    gradient: "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 shadow-[0_0_10px_rgba(0,246,255,0.4)]",
  };

  return (
    <div
      className={cn(
        "w-full my-4 opacity-80",
        heightStyles[height],
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
