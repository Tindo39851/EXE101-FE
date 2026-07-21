import React from "react";
import type { Tournament } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/data/constants";

interface TournamentDetailProps {
  tournament: Tournament;
  isRegistered: boolean;
  onJoin: (tournament: Tournament) => void;
  onSpectate: () => void;
}

export function TournamentDetail({ tournament, isRegistered, onJoin, onSpectate }: TournamentDetailProps) {
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
    <div className="w-full p-6 bg-slate-950/80 border border-fuchsia-500/25 flex flex-col justify-start items-start font-mono select-none relative hover:shadow-[0_0_20px_rgba(255,0,223,0.1)] transition-all duration-300">
      {/* Top accent glow line */}
      <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-fuchsia-500 shadow-[0_0_8px_#ff00df]" />

      <div className="w-full flex justify-between items-start max-sm:flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <Badge variant={getStatusVariant(tournament.status)}>
              {tournament.status === "LIVE" ? "● LIVE" : tournament.status}
            </Badge>
            <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
              {tournament.mode}
            </span>
          </div>

          <h4 className="text-slate-200 text-lg font-black tracking-widest uppercase">
            {tournament.title}
          </h4>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">
            {tournament.game}
          </span>
        </div>

        <div className="flex flex-col items-end max-sm:items-start shrink-0">
          <strong className="text-yellow-400 text-2xl font-black leading-none">
            {tournament.prize}
          </strong>
          <span className="text-slate-500 text-[8px] font-black tracking-widest mt-1.5 uppercase">
            ESTIMATED PRIZE POOL
          </span>
        </div>
      </div>

      {/* High-tech details sub-bar */}
      <div className="w-full h-14 bg-fuchsia-950/15 border border-fuchsia-500/20 grid grid-cols-4 gap-px mt-6">
        <div className="bg-slate-950/90 p-3 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">TEAMS</span>
          <strong className="text-slate-200 text-[11px] font-bold mt-0.5">{tournament.teams}</strong>
        </div>
        <div className="bg-slate-950/90 p-3 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">FORMAT</span>
          <strong className="text-slate-200 text-[11px] font-bold mt-0.5">{tournament.format}</strong>
        </div>
        <div className="bg-slate-950/90 p-3 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">STATUS</span>
          <strong className="text-slate-200 text-[11px] font-bold mt-0.5">{tournament.status}</strong>
        </div>
        <div className="bg-slate-950/90 p-3 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">STARTS</span>
          <strong className="text-slate-200 text-[11px] font-bold mt-0.5">{tournament.startsIn}</strong>
        </div>
      </div>

      {/* Button controls row */}
      <div className="w-full pt-5 flex items-center gap-3">
        {tournament.status === "OPEN" ? (
          isRegistered ? (
            <span className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-400 text-emerald-400 text-[10px] font-black tracking-widest uppercase cursor-not-allowed">
              ✓ ENTRY DEPOSITED // ACTIVE
            </span>
          ) : (
            <Button
              variant="magenta"
              onClick={() => onJoin(tournament)}
              className="px-5 text-[10px] font-black tracking-widest hover:brightness-110 shadow-magenta"
            >
              JOIN TOURNAMENT ({money.format(tournament.entryFee)})
            </Button>
          )
        ) : (
          <span className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-500 text-[10px] font-black tracking-widest uppercase cursor-not-allowed">
            REGISTRATION CLOSED
          </span>
        )}

        <Button
          variant="outline"
          onClick={onSpectate}
          className="border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-400/10 text-[10px] font-black tracking-widest"
        >
          SPECTATE STREAM
        </Button>
      </div>
    </div>
  );
}
