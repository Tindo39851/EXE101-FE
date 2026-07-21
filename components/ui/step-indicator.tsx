import * as React from "react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 1-indexed
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("w-full flex items-center flex-wrap gap-y-4 font-mono select-none", className)}>
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        const isFuture = currentStep < stepNum;

        return (
          <div key={idx} className="flex items-center">
            <div className="flex items-center gap-2.5">
              {isCompleted ? (
                <div className="size-7 bg-emerald-400/10 outline outline-1 outline-offset-[-1px] outline-emerald-400 flex justify-center items-center text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.25)]">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
              ) : (
                <div
                  className={cn(
                    "size-7 flex justify-center items-center border text-[9px] font-bold",
                    isActive
                      ? "bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.3)]"
                      : "bg-slate-950/40 border-white/10 text-slate-500"
                  )}
                >
                  {stepNum}
                </div>
              )}
              <span
                className={cn(
                  "text-[9px] font-bold tracking-wider uppercase",
                  isCompleted && "text-emerald-400",
                  isActive && "text-cyan-400",
                  isFuture && "text-slate-500"
                )}
              >
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className="px-4 flex justify-start items-start">
                <div
                  className={cn(
                    "w-12 h-[1px] transition-colors duration-300",
                    isCompleted ? "bg-emerald-400" : "bg-white/10"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
