import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message?: string;
  isLoading?: boolean;
  className?: string;
  code?: string;
}

export function EmptyState({
  title = "NO DATA FOUND",
  message = "Please refine your filters or try again later.",
  isLoading = false,
  className,
  code = "NULL_00 // RES_EMPTY",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full py-16 px-6 bg-slate-950/40 border border-dashed border-cyan-400/20 flex flex-col items-center justify-center text-center font-mono select-none",
        className
      )}
    >
      {isLoading ? (
        <div className="relative size-14 mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50 animate-spin" />
          <span className="text-cyan-400 text-lg">⚙️</span>
        </div>
      ) : (
        <div className="size-12 border border-slate-700/50 flex items-center justify-center text-slate-500 text-xl mb-5 shadow-[inset_0_0_8px_rgba(255,255,255,0.02)]">
          ✕
        </div>
      )}

      <span className="text-slate-600 text-[8px] font-black tracking-widest uppercase mb-1">
        {code}
      </span>

      <h4 className="text-slate-200 text-xs font-bold tracking-widest uppercase">
        {isLoading ? "INITIALIZING SECURE RETRIEVAL..." : title}
      </h4>

      <p className="text-slate-500 text-[10px] mt-2 max-w-xs leading-5">
        {isLoading ? "Fetching remote data packages from server node..." : message}
      </p>
    </div>
  );
}
