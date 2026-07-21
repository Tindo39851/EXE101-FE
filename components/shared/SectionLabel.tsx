import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  code: string;
  label: string;
  className?: string;
  color?: "cyan" | "fuchsia" | "muted";
}

export function SectionLabel({ code, label, className, color = "muted" }: SectionLabelProps) {
  const colorStyles = {
    cyan: "text-cyan-400",
    fuchsia: "text-fuchsia-500",
    muted: "text-slate-500",
  };

  return (
    <div className={cn("flex items-center gap-2 font-mono select-none uppercase mb-4", className)}>
      <span className={cn("text-[9px] font-black tracking-widest", colorStyles[color])}>
        {code}
      </span>
      <span className="text-slate-650 text-[9px] font-black tracking-wider select-none">//</span>
      <span className="text-slate-450 text-[9px] font-bold tracking-widest">
        {label}
      </span>
    </div>
  );
}
