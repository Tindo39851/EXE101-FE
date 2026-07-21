import React from "react";
import type { Plan } from "@/lib/types";
import { money } from "@/lib/data/constants";
import { Button } from "@/components/ui/button";

interface PlanCardProps {
  plan: Plan;
  allowed: boolean;
  onSelect: (plan: Plan) => void;
  accent?: "cyan" | "fuchsia";
}

export function PlanCard({ plan, allowed, onSelect, accent = "cyan" }: PlanCardProps) {
  const isShop = plan.id === "shop-pin";

  const glowStyles = {
    cyan: "border-cyan-400/25 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,246,255,0.1)]",
    fuchsia: "border-fuchsia-500/20 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(255,0,223,0.1)]",
  };

  const topBarStyles = {
    cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.6)]",
    fuchsia: "bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,0.6)]",
  };

  const textStyles = {
    cyan: "text-cyan-400",
    fuchsia: "text-fuchsia-400",
  };

  return (
    <div
      className={`p-6 bg-slate-950/85 border flex flex-col justify-between items-start transition-all duration-300 relative font-mono select-none ${glowStyles[accent]}`}
    >
      {/* Top micro-line indicator */}
      <div className={`absolute left-[1px] right-[1px] top-[1px] h-[2px] ${topBarStyles[accent]}`} />

      <div className="w-full">
        <span className="text-slate-500 text-[8px] font-black tracking-widest uppercase block mb-1">
          {isShop ? "B2B REVENUE STREAM" : "B2C REVENUE STREAM"}
        </span>
        <h4 className="text-slate-200 text-base font-extrabold tracking-wide uppercase">
          {plan.name}
        </h4>
        <p className="text-slate-400 text-xs mt-3 leading-5 min-h-[44px]">
          {plan.desc}
        </p>
      </div>

      <div className="w-full mt-6 flex items-end justify-between">
        <span className={`text-xl font-black ${textStyles[accent]}`}>
          {money.format(plan.price)}
        </span>

        {allowed ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(plan)}
            className={`text-[9px] font-black tracking-wider uppercase ${
              accent === "fuchsia"
                ? "border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-500/10 hover:border-fuchsia-500"
                : "border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400"
            }`}
          >
            SELECT PLAN
          </Button>
        ) : (
          <span className="text-slate-650 text-[9px] font-bold tracking-widest border border-white/5 bg-white/[0.01] px-3.5 py-2 uppercase cursor-not-allowed">
            LOCKED // ROLE
          </span>
        )}
      </div>
    </div>
  );
}
