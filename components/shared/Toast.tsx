import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Toast({ message, isVisible, onDismiss, className }: ToastProps) {
  return (
    <div
      className={cn(
        "fixed bottom-24 right-8 z-50 max-w-sm bg-slate-950/95 border border-cyan-400/30 p-4 shadow-[0_0_24px_rgba(0,246,255,0.2)] text-cyan-300 font-mono transition-all duration-300 select-none flex items-center justify-between gap-4",
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none",
        className
      )}
      role="status"
    >
      <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400" />
      
      <div className="flex items-center gap-2 text-xs">
        <span className="text-cyan-400">🛡️</span>
        <span className="font-semibold uppercase tracking-wider">{message}</span>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-cyan-400 transition-colors text-[9px] font-bold border-none bg-transparent cursor-pointer"
        >
          [✕]
        </button>
      )}
    </div>
  );
}
