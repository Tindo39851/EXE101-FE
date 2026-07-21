import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "circle" | "bar";
  lines?: number;
}

export function Skeleton({ className, variant = "text", lines, ...props }: SkeletonProps) {
  // Multi-line text skeleton
  if (variant === "text" && lines && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "shimmer rounded-sm bg-cyan-950/30",
              i === lines - 1 ? "w-2/3 h-3" : "w-full h-3",
              className
            )}
            {...props}
          />
        ))}
      </div>
    );
  }

  const variantStyles: Record<string, string> = {
    text: "h-3.5 w-full rounded-sm",
    circle: "rounded-full",
    card: "h-48 w-full",
    bar: "h-2 w-full rounded-full",
  };

  return (
    <div
      className={cn(
        "shimmer bg-cyan-950/30",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

/** Card-shaped skeleton for loading states */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("cyber-card cyber-corners p-5 flex flex-col gap-4", className)}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-3/5 h-3.5" />
          <Skeleton className="w-2/5 h-2.5" />
        </div>
        <Skeleton variant="circle" className="size-8 shrink-0" />
      </div>
      <Skeleton variant="card" className="h-24 rounded-none" />
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-8 rounded-none" />
        ))}
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-20 h-8 rounded-none" />
      </div>
    </div>
  );
}

export default Skeleton;
