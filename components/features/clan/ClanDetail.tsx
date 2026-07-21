import React from "react";
import type { Clan, User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ClanDetailProps {
  clan: Clan;
  isJoined: boolean;
  currentUser: User;
  onApply: () => void;
  onLeave: () => void;
  onViewMembers: () => void;
}

export function ClanDetail({
  clan,
  isJoined,
  currentUser,
  onApply,
  onLeave,
  onViewMembers,
}: ClanDetailProps) {
  const getBadgeVariant = (tier: string) => {
    if (tier === "ELITE") return "upcoming";
    if (tier === "ALPHA") return "cyan";
    if (tier === "BETA") return "fuchsia";
    return "locked";
  };

  return (
    <div className="p-6 bg-slate-950/80 border border-cyan-400/25 flex flex-col justify-start items-start w-full relative hover:shadow-[0_0_20px_rgba(0,246,255,0.1)] transition-all duration-300 font-mono select-none">
      {/* Top visual glow bar */}
      <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.6)]" />

      {/* Watermark Banner */}
      <div className="self-stretch h-20 bg-yellow-400/5 border border-yellow-400/10 flex justify-between items-center px-6 overflow-hidden relative">
        <span className="text-yellow-400/10 text-5xl font-black tracking-[9.6px] select-none">
          [{clan.tag}]
        </span>
        <div className="flex flex-col items-end">
          <span className="text-slate-500 text-[9px] font-bold leading-none">FACTION TIER</span>
          <span className="text-yellow-400 text-sm font-extrabold mt-1.5 leading-none">
            {clan.tier}
          </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="self-stretch pt-6 flex justify-between items-start gap-4 max-sm:flex-col">
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-100 text-xl font-black tracking-widest uppercase truncate">
            {clan.name}
          </h4>
          <div className="flex items-center gap-2.5 mt-1.5 text-[10px] font-bold text-slate-500 flex-wrap">
            <span className="text-cyan-400">[{clan.tag}]</span>
            <span>·</span>
            <span>Founded {clan.founded}</span>
            <span>·</span>
            <span>🌐 {clan.region}</span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 max-sm:items-start">
          <strong className="text-cyan-400 text-2xl font-black leading-none">
            {clan.rating.toLocaleString()}
          </strong>
          <span className="text-slate-500 text-[8px] font-black tracking-widest mt-1.5 uppercase">
            CLAN RANKING
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 text-slate-400 text-xs font-sans leading-relaxed">
        {clan.desc}
      </p>

      {/* Stats specs grid */}
      <div className="self-stretch mt-6 grid grid-cols-4 gap-4 max-sm:grid-cols-2">
        <div className="p-3 bg-black/60 border border-white/5 flex flex-col items-center">
          <span className="text-slate-500 text-[7.5px] font-bold uppercase">MEMBERS</span>
          <strong className="text-slate-200 text-xs font-bold mt-1.5">
            {clan.members + (isJoined ? 1 : 0)}
          </strong>
        </div>
        <div className="p-3 bg-black/60 border border-white/5 flex flex-col items-center">
          <span className="text-slate-500 text-[7.5px] font-bold uppercase">WINS</span>
          <strong className="text-slate-200 text-xs font-bold mt-1.5">{clan.wins}</strong>
        </div>
        <div className="p-3 bg-black/60 border border-white/5 flex flex-col items-center">
          <span className="text-slate-500 text-[7.5px] font-bold uppercase">RATING</span>
          <strong className="text-slate-200 text-xs font-bold mt-1.5">{clan.rating.toLocaleString()}</strong>
        </div>
        <div className="p-3 bg-black/60 border border-white/5 flex flex-col items-center">
          <span className="text-slate-500 text-[7.5px] font-bold uppercase">REGION</span>
          <strong className="text-slate-200 text-xs font-bold mt-1.5">{clan.region}</strong>
        </div>
      </div>

      {/* Main Games and Requirements */}
      <div className="self-stretch mt-6 pt-5 border-t border-white/5 flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-slate-500 text-[8px] font-bold uppercase">MAIN CLAN OPERATIONS</span>
          <div className="flex gap-2">
            {clan.games.map((g) => (
              <Badge key={g} variant="cyan" className="text-[7.5px] px-1.5 border-none">
                {g}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end max-sm:items-start">
          <span className="text-slate-500 text-[8px] font-bold uppercase">REQUIREMENT</span>
          <strong className="text-yellow-400 text-[9.5px] mt-1 font-bold">
            {clan.requirement}
          </strong>
        </div>
      </div>

      {/* Action controls row */}
      <div className="w-full pt-5 flex items-center gap-3">
        {clan.status === "INVITE ONLY" ? (
          <span className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-500 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
            🔒 INVITE ONLY
          </span>
        ) : isJoined ? (
          <Button
            variant="ghost"
            onClick={onLeave}
            className="px-5 text-[10px] font-black tracking-widest border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-white"
          >
            ✓ LEAVE GUILD NODE
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onApply}
            className="px-5 text-[10px] font-black tracking-widest"
          >
            👤 APPLY TO JOIN
          </Button>
        )}

        <Button
          variant="outline"
          onClick={onViewMembers}
          className="border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-400/10 text-[10px] font-black tracking-widest"
        >
          VIEW ROSTER
        </Button>
      </div>
    </div>
  );
}
