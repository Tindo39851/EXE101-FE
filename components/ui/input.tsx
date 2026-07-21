import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  extraTag?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, extraTag, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col justify-start items-start gap-1.5 font-mono">
        {label && (
          <div className="w-full flex justify-between items-center select-none">
            <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">
              {label}
            </span>
            {extraTag && (
              <span className="text-cyan-400 text-[8px] tracking-wide uppercase opacity-70">
                {extraTag}
              </span>
            )}
          </div>
        )}
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              "w-full h-11 px-4 bg-cyan-950/20 border border-cyan-400/25 text-slate-200 text-xs transition-all duration-300 placeholder:text-slate-650 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,246,255,0.25)] focus:bg-cyan-950/40",
              error && "border-red-500/50 bg-red-950/10 focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.25)]",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <span className="text-red-400 text-[9px] tracking-wider uppercase select-none mt-0.5">
            [ ERROR // {error} ]
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
