import React from "react";
import type { TournamentBracket } from "@/lib/types";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmptyState } from "@/components/shared/EmptyState";

interface BracketViewProps {
  bracket: TournamentBracket;
  startsIn: string;
}

export function BracketView({ bracket, startsIn }: BracketViewProps) {
  if (!bracket) {
    return (
      <div className="w-full p-6 bg-slate-950/80 border border-cyan-400/25 flex flex-col justify-start items-start font-mono select-none relative hover:shadow-[0_0_20px_rgba(0,246,255,0.1)] transition-all duration-300">
        <SectionLabel code="SCHED_01" label="LINEUP & SCHEDULE" color="cyan" />
        <div className="w-full py-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center text-cyan-400 animate-spin mb-4">
            ⚙️
          </div>
          <h5 className="text-slate-200 text-xs font-black uppercase">QUALIFIERS IN PROGRESS</h5>
          <p className="text-slate-500 text-[10px] mt-2 max-w-xs leading-5">
            Brackets are generated dynamically once qualifiers finish. Group stage matches start in {startsIn}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-slate-950/80 border border-cyan-400/25 flex flex-col justify-start items-start font-mono select-none relative hover:shadow-[0_0_20px_rgba(0,246,255,0.1)] transition-all duration-300">
      <div className="w-full flex justify-between items-end border-b border-cyan-400/10 pb-4">
        <div className="flex flex-col justify-start items-start">
          <SectionLabel code="BRACKET_01" label="LIVE SEEDING BRACKET" color="cyan" className="mb-0" />
        </div>
      </div>

      {/* Bracket Tree Layout */}
      <div className="w-full pt-8 grid grid-cols-3 gap-6 overflow-x-auto select-none min-h-[380px]">
        {/* Column 1: Quarterfinals */}
        <div className="flex flex-col justify-around gap-4">
          <span className="text-slate-500 text-[8px] font-black tracking-widest uppercase pb-2 border-b border-white/5 block select-none">
            QUARTERFINALS
          </span>

          {bracket.quarter.map((q, idx) => (
            <div
              key={idx}
              className={`p-2.5 bg-slate-950 border flex flex-col gap-1 w-44 transition-all duration-300 ${
                q.isLive
                  ? "border-fuchsia-500 shadow-[0_0_10px_rgba(255,0,223,0.25)]"
                  : "border-white/5 hover:border-cyan-400/30"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-sans font-bold">
                <span className={q.s1 === "2" ? "text-slate-200" : "text-slate-500"}>{q.t1}</span>
                <span className={q.s1 === "2" || q.s1 === "LIVE" ? "text-fuchsia-500 font-mono" : "text-slate-650 font-mono"}>
                  {q.s1}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-sans font-bold border-t border-white/[0.03] pt-1">
                <span className={q.s2 === "2" ? "text-slate-200" : "text-slate-500"}>{q.t2}</span>
                <span className={q.s2 === "2" ? "text-fuchsia-500 font-mono" : "text-slate-650 font-mono"}>
                  {q.s2}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Semifinals */}
        <div className="flex flex-col justify-around gap-4">
          <span className="text-slate-500 text-[8px] font-black tracking-widest uppercase pb-2 border-b border-white/5 block select-none">
            SEMIFINALS
          </span>

          {bracket.semi.map((s, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-slate-950 border border-white/5 hover:border-cyan-400/30 flex flex-col gap-1 w-44 transition-all duration-300"
            >
              <div className="flex justify-between items-center text-[10px] font-sans font-bold">
                <span className="text-slate-500">{s.t1}</span>
                <span className="text-slate-650 font-mono">{s.s1}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-sans font-bold border-t border-white/[0.03] pt-1">
                <span className="text-slate-500">{s.t2}</span>
                <span className="text-slate-650 font-mono">{s.s2}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: Finals */}
        <div className="flex flex-col justify-around gap-4">
          <span className="text-slate-500 text-[8px] font-black tracking-widest uppercase pb-2 border-b border-white/5 block select-none">
            FINALS
          </span>

          {bracket.finals.map((f, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-slate-950 border border-white/5 hover:border-cyan-400/30 flex flex-col gap-1 w-44 transition-all duration-300 animate-pulse"
            >
              <div className="flex justify-between items-center text-[10px] font-sans font-bold">
                <span className="text-slate-500">{f.t1}</span>
                <span className="text-slate-650 font-mono">{f.s1}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-sans font-bold border-t border-white/[0.03] pt-1">
                <span className="text-slate-500">{f.t2}</span>
                <span className="text-slate-650 font-mono">{f.s2}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
