import React from "react";
import type { Tournament } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface TournamentCardProps {
  tournament: Tournament;
  isActive: boolean;
  isRegistered: boolean;
  onClick: () => void;
}

export function TournamentCard({ tournament, isActive, isRegistered, onClick }: TournamentCardProps) {
  const getStatusVariant = (status: Tournament["status"]) => {
    switch (status) {
      case "LIVE":
        return "live";
      case "OPEN":
        return "default";
      default:
        return "upcoming";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-5 w-full flex flex-col justify-start items-start relative cursor-pointer border transition-all duration-300 font-mono select-none ${
        isActive
          ? "bg-fuchsia-500/5 border-fuchsia-500 shadow-[0_0_12px_rgba(255,0,223,0.15)]"
          : "bg-slate-950/80 border-fuchsia-500/20 hover:border-fuchsia-500/50"
      }`}
    >
      {/* Top accent glow line */}
      <div
        className={`absolute left-[1px] right-[1px] top-[1px] h-[2px] transition-all duration-300 ${
          isActive ? "bg-fuchsia-500 shadow-[0_0_8px_#ff00df]" : "bg-fuchsia-500/20"
        }`}
      />

      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2.5">
          <Badge variant={getStatusVariant(tournament.status)}>
            {tournament.status === "LIVE" ? "● LIVE" : tournament.status}
          </Badge>
          {isRegistered && (
            <Badge variant="success">
              ✓ REGISTERED
            </Badge>
          )}
        </div>
        <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
          {tournament.mode}
        </span>
      </div>

      <h4 className="text-slate-200 text-xs font-black tracking-wide mt-3 uppercase leading-tight group-hover:text-fuchsia-400 transition-colors">
        {tournament.title}
      </h4>
      <span className="text-slate-500 text-[9px] font-semibold mt-1 uppercase tracking-widest">
        {tournament.game}
      </span>

      <div className="w-full mt-4 pt-3.5 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] font-bold">
          <span>🏆</span>
          <span>{tournament.prize}</span>
        </div>

        <div className="flex items-center gap-1 text-fuchsia-500 text-xs font-bold">
          <span>⏱️</span>
          <span>{tournament.timer}</span>
        </div>
      </div>
    </div>
  );
}
