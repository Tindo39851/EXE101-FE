import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { money } from "@/lib/data/constants";

export function TournamentView() {
  const {
    setView,
    tournaments,
    selectedTour,
    setSelectedTour,
    tourTab,
    setTourTab,
    notify,
    buyCart,
    state
  } = useAppState();

  const activeTour = tournaments.find(t => t.id === selectedTour) || tournaments[0];
  const filteredTours = tournaments.filter(t => tourTab === "ALL" || t.status === tourTab);

  return (
    <section className="flex flex-col bg-black p-0 w-full">
      {/* Header Banner */}
      <div className="relative bg-gray-950 border-b border-fuchsia-500/20 py-8 px-6 flex flex-col justify-start items-start overflow-hidden w-full">
        <button
          onClick={() => setView("overview")}
          className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left uppercase cursor-pointer border-none bg-transparent"
        >
          ← BACK TO HOME
        </button>

        <div className="w-full flex justify-between items-end mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,1)]"></div>
              <span className="text-fuchsia-500 text-[9.92px] font-mono tracking-widest font-semibold uppercase">
                TOUR_00 // ESPORTS ARENA
              </span>
            </div>
            <h3 className="text-slate-200 text-3xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              TOURNAMENT HUB
            </h3>
          </div>
        </div>

        {/* Sub tabs filtering */}
        <div className="w-full mt-8 flex justify-start items-center">
          {["ALL", "LIVE", "OPEN", "UPCOMING"].map((tab) => {
            const active = tourTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setTourTab(tab)}
                className={`px-6 py-2 border-l border-t border-b border-fuchsia-500/25 transition cursor-pointer text-[10.40px] font-mono uppercase tracking-wider ${
                  active
                    ? "bg-fuchsia-500/10 text-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.4)]"
                    : "text-slate-500 hover:text-slate-350"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main workspace layout */}
      <div className="w-full mt-10 grid grid-cols-[384px_1fr] gap-8 max-lg:grid-cols-1">
        
        {/* Left Column: List of Tournaments */}
        <div className="flex flex-col justify-start items-start w-full">
          <span className="text-slate-500 text-[9.60px] font-mono tracking-wider uppercase mb-4">
            {filteredTours.length} EVENTS FOUND
          </span>

          <div className="w-full flex flex-col gap-3.5">
            {filteredTours.map((t) => {
              const active = selectedTour === t.id;
              const statusColor = t.status === "LIVE" ? "text-fuchsia-500 border-fuchsia-500/50 bg-fuchsia-500/20" : t.status === "OPEN" ? "text-cyan-400 border-cyan-400/40 bg-cyan-400/10" : "text-yellow-400 border-yellow-400/40 bg-yellow-400/10";
              const registered = state.transactions.some(tx => tx.item === `Slot: ${t.title}`);

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTour(t.id)}
                  className={`p-5 w-full flex flex-col justify-start items-start relative cursor-pointer border border-fuchsia-500/20 transition ${
                    active
                      ? "bg-fuchsia-500/5 outline outline-1 outline-offset-[-1px] outline-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.2)]"
                      : "bg-gray-950/90 hover:outline hover:outline-1 hover:outline-offset-[-1px] hover:outline-fuchsia-500/40"
                  }`}
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className={`px-2 py-[2.40px] border outline outline-1 outline-offset-[-1px] ${statusColor} text-[8.32px] font-mono uppercase`}>
                        {t.status === "LIVE" ? "● LIVE" : t.status}
                      </div>
                      {registered && (
                        <div className="px-2 py-[2.40px] border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 outline outline-1 outline-offset-[-1px] outline-emerald-400/30 text-[8.32px] font-mono uppercase font-bold">
                          ✓ REGISTERED
                        </div>
                      )}
                    </div>
                    <span className="text-slate-500 text-[8.80px] font-mono">
                      {t.mode}
                    </span>
                  </div>

                  <h4 className="text-slate-200 text-xs font-bold font-mono tracking-wide mt-2.5 uppercase">
                    {t.title}
                  </h4>
                  <span className="text-slate-500 text-[9.28px] font-mono mt-1">
                    {t.game}
                  </span>

                  <div className="w-full mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-bold font-mono">
                      <svg className="size-3.5 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M19 5h-1.5A3.5 3.5 0 0 0 14 1.5H10A3.5 3.5 0 0 0 6.5 5H5A5 5 0 0 0 5 15h1.5A4.5 4.5 0 0 0 11 19.5v2.5H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2h-4v-2.5a4.5 4.5 0 0 0 4.5-4.5H19a5 5 0 0 0 0-10zm-14 8a3 3 0 0 1 0-6h1.5a4.47 4.47 0 0 0 .5 3 4.47 4.47 0 0 0-.5 3zm14 0h-1.5a4.47 4.47 0 0 0-.5-3 4.47 4.47 0 0 0 .5-3H19a3 3 0 0 1 0 6z" />
                      </svg>
                      <span>{t.prize}</span>
                    </div>

                    <div className="flex items-center gap-1 text-fuchsia-500 text-base font-mono">
                      <svg className="size-4 fill-current text-fuchsia-500" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-13h-2v6l5.2 3.2 1-1.6-4.2-2.6V7z" />
                      </svg>
                      <span>{t.timer}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Tournament Info & Bracket */}
        <div className="flex flex-col justify-start items-start w-full gap-6">
          
          {/* Selected Event Details Block */}
          <div className="w-full p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-fuchsia-500/25 flex flex-col justify-start items-start">
            <div className="w-full flex justify-between items-start max-sm:flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-[2.40px] border outline outline-1 outline-offset-[-1px] ${
                    activeTour.status === "LIVE" ? "text-fuchsia-500 border-fuchsia-500/50 bg-fuchsia-500/20" : activeTour.status === "OPEN" ? "text-cyan-400 border-cyan-400/40 bg-cyan-400/10" : "text-yellow-400 border-yellow-400/40 bg-yellow-400/10"
                  } text-[8.32px] font-mono uppercase`}>
                    {activeTour.status === "LIVE" ? "● LIVE" : activeTour.status}
                  </span>
                  <span className="text-slate-500 text-[8.80px] font-mono">
                    {activeTour.mode}
                  </span>
                </div>

                <h4 className="text-slate-200 text-xl font-extrabold font-mono tracking-widest uppercase">
                  {activeTour.title}
                </h4>
                <span className="text-slate-500 text-sm font-semibold font-mono tracking-wide">
                  {activeTour.game}
                </span>
              </div>

              <div className="flex flex-col items-end max-sm:items-start shrink-0">
                <strong className="text-yellow-400 text-3xl font-black font-mono leading-none">
                  {activeTour.prize}
                </strong>
                <span className="text-slate-500 text-[8.80px] font-mono mt-1.5 uppercase tracking-wide">
                  PRIZE POOL
                </span>
              </div>
            </div>

            {/* Stats metrics sub-bar */}
            <div className="w-full h-14 bg-fuchsia-500/10 grid grid-cols-4 gap-px mt-6 select-none">
              <div className="bg-gray-950 p-3 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">TEAMS</span>
                <strong className="text-slate-200 text-xs font-bold font-mono mt-1">{activeTour.teams}</strong>
              </div>
              <div className="bg-gray-950 p-3 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">FORMAT</span>
                <strong className="text-slate-200 text-xs font-bold font-mono mt-1">{activeTour.format}</strong>
              </div>
              <div className="bg-gray-950 p-3 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">STATUS</span>
                <strong className="text-slate-200 text-xs font-bold font-mono mt-1">{activeTour.status}</strong>
              </div>
              <div className="bg-gray-950 p-3 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">STARTS IN</span>
                <strong className="text-slate-200 text-xs font-bold font-mono mt-1">{activeTour.startsIn}</strong>
              </div>
            </div>

            {/* Actions row */}
            <div className="w-full pt-5 flex items-center gap-3">
              {activeTour.status === "OPEN" ? (
                state.transactions.some(tx => tx.item === `Slot: ${activeTour.title}`) ? (
                  <button
                    disabled
                    className="px-6 py-2.5 bg-emerald-500/10 border border-emerald-400 text-emerald-400 text-xs font-bold font-mono tracking-widest uppercase cursor-not-allowed"
                  >
                    ✓ YOU ARE REGISTERED
                  </button>
                ) : (
                  <button
                    onClick={() => buyCart({
                      id: `tour-${activeTour.id}`,
                      name: `Slot: ${activeTour.title}`,
                      price: activeTour.entryFee,
                      desc: `Entry slot fee for ${activeTour.title}. 25% hosting fee included.`
                    })}
                    className="px-6 py-2.5 bg-fuchsia-500 text-black text-xs font-bold font-mono tracking-widest uppercase hover:bg-fuchsia-400 transition shadow-[0_0_12px_rgba(255,0,255,0.4)] cursor-pointer border-none"
                  >
                    JOIN TOURNAMENT ({money.format(activeTour.entryFee)})
                  </button>
                )
              ) : (
                <button
                  disabled
                  className="px-6 py-2.5 bg-slate-800 text-slate-500 text-xs font-bold font-mono tracking-widest uppercase cursor-not-allowed border-none"
                >
                  REGISTRATION CLOSED
                </button>
              )}
              <button
                onClick={() => notify("Connecting to spectating viewport feeds...")}
                className="px-6 py-2.5 outline outline-1 outline-offset-[-1px] outline-cyan-400/40 hover:outline-cyan-400 text-cyan-400 text-xs font-bold font-mono tracking-widest uppercase transition cursor-pointer"
              >
                SPECTATE LIVE
              </button>
            </div>
          </div>

          {/* Selected Event Bracket Block */}
          {activeTour.bracket ? (
            <div className="w-full p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 flex flex-col justify-start items-start">
              <div className="w-full flex justify-between items-end border-b border-cyan-400/10 pb-4">
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
                    <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest font-semibold uppercase">BRACKET_01</span>
                  </div>
                  <h4 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
                    LIVE BRACKET
                  </h4>
                </div>
              </div>

              {/* Bracket tree structure */}
              <div className="w-full pt-8 grid grid-cols-3 gap-6 overflow-x-auto select-none">
                
                {/* Column 1: Quarterfinals */}
                <div className="flex flex-col gap-4">
                  <span className="text-slate-500 text-[8.5px] font-mono uppercase tracking-wider pb-2 border-b border-white/5 block">
                    QUARTERFINALS
                  </span>
                  
                  {activeTour.bracket.quarter.map((q: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-2.5 bg-slate-900/30 flex flex-col gap-1 w-44 border ${
                        q.isLive ? "border-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.2)]" : "border-white/5"
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-semibold font-sans">
                        <span className={q.s1 === "2" ? "text-slate-200 font-bold" : "text-slate-400"}>
                          {q.t1}
                        </span>
                        <span className={q.s1 === "2" || q.s1 === "LIVE" ? "text-fuchsia-500 font-bold font-mono" : "text-slate-500 font-mono"}>
                          {q.s1}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold font-sans border-t border-white/[0.03] pt-1">
                        <span className={q.s2 === "2" ? "text-slate-200 font-bold" : "text-slate-400"}>
                          {q.t2}
                        </span>
                        <span className={q.s2 === "2" ? "text-fuchsia-500 font-bold font-mono" : "text-slate-500 font-mono"}>
                          {q.s2}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: Semifinals */}
                <div className="flex flex-col gap-4">
                  <span className="text-slate-500 text-[8.5px] font-mono uppercase tracking-wider pb-2 border-b border-white/5 block">
                    SEMIFINALS
                  </span>
                  
                  {activeTour.bracket.semi.map((s: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-900/30 flex flex-col gap-1 w-44 border border-white/5 my-12"
                    >
                      <div className="flex justify-between items-center text-xs font-semibold font-sans">
                        <span className="text-slate-400">{s.t1}</span>
                        <span className="text-slate-500 font-mono">{s.s1}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold font-sans border-t border-white/[0.03] pt-1">
                        <span className="text-slate-400">{s.t2}</span>
                        <span className="text-slate-500 font-mono">{s.s2}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 3: Finals */}
                <div className="flex flex-col gap-4">
                  <span className="text-slate-500 text-[8.5px] font-mono uppercase tracking-wider pb-2 border-b border-white/5 block">
                    FINALS
                  </span>
                  
                  {activeTour.bracket.finals.map((f: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-900/30 flex flex-col gap-1 w-44 border border-white/5 my-32 animate-pulse"
                    >
                      <div className="flex justify-between items-center text-xs font-semibold font-sans">
                        <span className="text-slate-400">{f.t1}</span>
                        <span className="text-slate-500 font-mono">{f.s1}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold font-sans border-t border-white/[0.03] pt-1">
                        <span className="text-slate-400">{f.t2}</span>
                        <span className="text-slate-500 font-mono">{f.s2}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ) : (
            <div className="w-full p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 flex flex-col justify-start items-start">
              <div className="w-full flex justify-between items-end border-b border-cyan-400/10 pb-4">
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
                    <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest font-semibold uppercase">SCHED_01</span>
                  </div>
                  <h4 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
                    LINEUP & SCHEDULE
                  </h4>
                </div>
              </div>

              <div className="w-full py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center text-cyan-400 animate-spin mb-4">
                  ⚙️
                </div>
                <h5 className="text-slate-200 text-sm font-mono font-semibold uppercase">QUALIFIERS IN PROGRESS</h5>
                <p className="text-slate-500 text-xs mt-2 max-w-xs leading-5">
                  Brackets are generated dynamically once qualifiers finish. Group stage matches start in {activeTour.startsIn}.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
export default TournamentView;
