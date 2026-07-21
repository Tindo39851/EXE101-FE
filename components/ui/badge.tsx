import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "live" | "upcoming" | "success" | "locked" | "fuchsia" | "cyan";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase border outline outline-1 outline-offset-[-1px] transition-all select-none";

  const variants = {
    default: "border-cyan-400/30 bg-cyan-400/8 text-cyan-400 outline-cyan-400/20",
    cyan: "border-cyan-400/30 bg-cyan-400/8 text-cyan-400 outline-cyan-400/20",
    live: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-400 outline-fuchsia-500/30",
    fuchsia: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-400 outline-fuchsia-500/30",
    upcoming: "border-yellow-400/30 bg-yellow-400/8 text-yellow-400 outline-yellow-400/20",
    success: "border-emerald-400/30 bg-emerald-400/8 text-emerald-400 outline-emerald-400/20",
    locked: "border-red-500/20 bg-red-950/20 text-red-400 outline-red-500/15 opacity-70",
  };

  return (
    <span
      className={cn(baseStyle, variants[variant], className)}
      {...props}
    >
      {variant === "live" && <span className="mr-1.5 inline-block size-1.5 rounded-full bg-fuchsia-400 animate-dot-breathe" />}
      {children}
    </span>
  );
}
