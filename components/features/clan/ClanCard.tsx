import React from "react";
import type { Clan } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ClanCardProps {
  clan: Clan;
  isActive: boolean;
  onSelect: () => void;
}

export function ClanCard({ clan, isActive, onSelect }: ClanCardProps) {
  const tierColors: Record<string, string> = {
    ELITE: "bg-yellow-400/10 border-yellow-400/25 text-yellow-400",
    ALPHA: "bg-cyan-400/10 border-cyan-400/25 text-cyan-400",
    BETA: "bg-fuchsia-500/10 border-fuchsia-500/25 text-fuchsia-500",
    GAMMA: "bg-slate-500/10 border-slate-500/25 text-slate-500",
  };

  const getBadgeVariant = (tier: string) => {
    if (tier === "ELITE") return "upcoming";
    if (tier === "ALPHA") return "cyan";
    if (tier === "BETA") return "fuchsia";
    return "locked";
  };

  return (
    <div
      onClick={onSelect}
      className={`p-4 transition-all duration-300 cursor-pointer border font-mono select-none ${
        isActive
          ? "bg-cyan-400/5 shadow-[0_0_8px_rgba(0,246,255,0.2)] border-cyan-400"
          : "bg-slate-950/80 border-white/5 hover:border-cyan-400/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`size-9 shrink-0 flex justify-center items-center border font-mono font-black text-[9.5px] ${tierColors[clan.tier]}`}>
          {clan.tag}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-1.5">
            <h4 className={`text-xs font-bold font-mono tracking-wide truncate ${isActive ? "text-slate-100" : "text-slate-400"}`}>
              {clan.name}
            </h4>
            <Badge variant={getBadgeVariant(clan.tier)} className="text-[7px] px-1 py-0 border-none">
              {clan.tier}
            </Badge>
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-[9px] font-mono">
            <span className="text-slate-500">{clan.members} members</span>
            <span className="text-cyan-400 font-bold">★ {clan.rating.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
