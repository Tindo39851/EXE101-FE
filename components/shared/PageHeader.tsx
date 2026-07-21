import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  code?: string;
  title: string;
  subtitle?: string;
  backText?: string;
  onBack?: () => void;
  action?: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "fuchsia";
}

export function PageHeader({
  code,
  title,
  subtitle,
  backText,
  onBack,
  action,
  className,
  glowColor = "cyan",
}: PageHeaderProps) {
  const glowStyles = {
    cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,1)]",
    fuchsia: "bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,1)]",
  };

  return (
    <div
      className={cn(
        "relative bg-slate-950/95 border border-white/5 border-b-cyan-400/20 py-8 px-8 flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-stretch font-mono select-none overflow-hidden",
        className
      )}
    >
      {/* Visual cyber top glow indicator bar */}
      <div className={cn("absolute left-[1px] right-[1px] top-[1px] h-[2px]", glowStyles[glowColor])} />

      <div className="flex flex-col gap-2.5">
        {onBack && backText && (
          <button
            onClick={onBack}
            className="text-cyan-400 text-[10px] font-bold tracking-wider hover:underline text-left cursor-pointer border-none bg-transparent p-0 uppercase"
          >
            ← {backText}
          </button>
        )}

        <div className="flex flex-col">
          {code && (
            <div className="flex items-center gap-3">
              <div className={cn("w-6 h-[1px]", glowColor === "cyan" ? "bg-cyan-400" : "bg-fuchsia-500")} />
              <span className={cn(
                "text-[10px] tracking-widest font-black uppercase",
                glowColor === "cyan" ? "text-cyan-400" : "text-fuchsia-500"
              )}>
                {code}
              </span>
            </div>
          )}
          <h2 className="text-slate-100 text-3xl font-extrabold tracking-widest uppercase mt-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-[10px] font-bold tracking-wide uppercase mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && <div className="shrink-0 flex items-center justify-end">{action}</div>}
    </div>
  );
}
