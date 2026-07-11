import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { clans } from "@/lib/data/clans";

export function ClanView() {
  const {
    setView,
    clanTierFilter,
    setClanTierFilter,
    clanRegionFilter,
    setClanRegionFilter,
    filteredClans,
    selectedClanId,
    setSelectedClanId,
    activeClan,
    joinedClans,
    setJoinedClans,
    currentUser,
    notify
  } = useAppState();

  return (
    <section className="flex flex-col bg-black p-0">
      {/* Header Banner */}
      <div className="relative bg-gray-950 border-b border-cyan-400/20 py-8 px-6 flex flex-col justify-start items-start overflow-hidden">
        <button
          onClick={() => setView("overview")}
          className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left uppercase cursor-pointer border-none bg-transparent"
        >
          ← BACK TO HOME
        </button>

        <div className="w-full flex justify-between items-end mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
              <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest font-semibold uppercase">
                CLAN_00 // GUILD DIRECTORY
              </span>
            </div>
            <h3 className="text-slate-200 text-3xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              CLAN HUB
            </h3>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="w-full mt-8 pt-4 border-t border-white/5 flex gap-8 flex-wrap items-center">
          {/* Tier filters */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[9.28px] font-mono uppercase">TIER:</span>
            {["ALL", "ELITE", "ALPHA", "BETA", "GAMMA"].map((tier) => {
              const active = clanTierFilter === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setClanTierFilter(tier)}
                  className={`px-3 py-1 font-mono text-[9.28px] uppercase transition cursor-pointer ${
                    active
                      ? "bg-cyan-400/10 shadow-[0_0_8px_rgba(0,255,255,0.4)] outline outline-1 outline-offset-[-1px] outline-cyan-400 text-cyan-400"
                      : "outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tier}
                </button>
              );
            })}
          </div>

          {/* Region filters */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[9.28px] font-mono uppercase">REGION:</span>
            {["ALL", "Global", "NA/EU", "EU", "AS", "SEA", "NA"].map((reg) => {
              const active = clanRegionFilter === reg;
              return (
                <button
                  key={reg}
                  onClick={() => setClanRegionFilter(reg)}
                  className={`px-3 py-1 font-mono text-[9.28px] uppercase transition cursor-pointer ${
                    active
                      ? "bg-cyan-400/10 shadow-[0_0_8px_rgba(0,255,255,0.4)] outline outline-1 outline-offset-[-1px] outline-cyan-400 text-cyan-400"
                      : "outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {reg === "Global" ? "GLOBAL" : reg}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Split layout workspace */}
      <div className="grid grid-cols-[320px_1fr] gap-8 py-10 max-lg:grid-cols-1 w-[1100px] max-w-[1100px] px-8 mx-auto">
        
        {/* Left Column: Clans list */}
        <div className="flex flex-col gap-2.5">
          {filteredClans.length === 0 ? (
            <div className="py-10 text-center text-slate-600 font-mono text-xs uppercase border border-white/5 bg-gray-950/20">
              NO CLANS FOUND MATCHING CRITERIA
            </div>
          ) : (
            filteredClans.map((clan) => {
              const active = selectedClanId === clan.id;
              const tierColors: Record<string, string> = {
                ELITE: "bg-yellow-400/10 border-yellow-400/25 text-yellow-400",
                ALPHA: "bg-cyan-400/10 border-cyan-400/25 text-cyan-400",
                BETA: "bg-fuchsia-500/10 border-fuchsia-500/25 text-fuchsia-500",
                GAMMA: "bg-slate-500/10 border-slate-500/25 text-slate-500",
              };
              return (
                <div
                  key={clan.id}
                  onClick={() => setSelectedClanId(clan.id)}
                  className={`p-4 transition cursor-pointer ${
                    active
                      ? "bg-cyan-400/5 shadow-[0_0_8px_rgba(0,255,255,0.2)] outline outline-1 outline-offset-[-1px] outline-cyan-400"
                      : "bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 hover:outline-cyan-400/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-9 shrink-0 flex justify-center items-center border font-mono font-black text-[9px] ${tierColors[clan.tier]}`}>
                      {clan.tag}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1.5">
                        <h4 className={`text-xs font-bold font-mono tracking-wide truncate ${active ? "text-slate-200" : "text-gray-400"}`}>
                          {clan.name}
                        </h4>
                        <span className={`text-[8px] font-mono px-[5px] py-[1.5px] border ${tierColors[clan.tier]}`}>
                          {clan.tier}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-[8.80px] font-mono">
                        <span className="text-slate-500">{clan.members} members</span>
                        <span className="text-cyan-455 font-bold">★ {clan.rating.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Details & Leaderboard */}
        <div className="flex flex-col gap-6">
          
          {/* Clan profile box */}
          <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 flex flex-col justify-start items-start w-full relative">
            
            {/* Watermark Banner */}
            <div className="self-stretch h-20 bg-yellow-400/5 border border-yellow-400/10 flex justify-between items-center px-6 overflow-hidden relative">
              <span className="text-yellow-400/10 text-5xl font-black font-mono tracking-[9.60px] select-none">
                [{activeClan.tag}]
              </span>
              <div className="flex flex-col items-end">
                <span className="text-slate-500 text-[8.80px] font-mono leading-none">FACTION TIER</span>
                <span className="text-yellow-400 text-base font-extrabold font-mono mt-1.5 leading-none">
                  {activeClan.tier}
                </span>
              </div>
            </div>

            {/* Header Title & Rating */}
            <div className="self-stretch pt-6 flex justify-between items-start gap-4 max-sm:flex-col">
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-200 text-2xl font-black font-mono tracking-widest uppercase truncate">
                  {activeClan.name}
                </h4>
                <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                  <span className="text-cyan-400">[{activeClan.tag}]</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500">Founded {activeClan.founded}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500">🌐 {activeClan.region}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end shrink-0 max-sm:items-start">
                <strong className="text-cyan-400 text-3xl font-black font-mono leading-none">
                  {activeClan.rating.toLocaleString()}
                </strong>
                <span className="text-slate-500 text-[8.32px] font-mono mt-1.5 uppercase leading-none">
                  CLAN RATING
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 text-slate-400 text-sm font-sans leading-5">
              {activeClan.desc}
            </p>

            {/* 4 Stats Grid */}
            <div className="self-stretch mt-6 grid grid-cols-4 gap-4 max-sm:grid-cols-2">
              <div className="p-3 bg-black/60 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">MEMBERS</span>
                <strong className="text-slate-200 text-sm font-bold font-mono mt-1.5">
                  {activeClan.members + (joinedClans.includes(activeClan.id) ? 1 : 0)}
                </strong>
              </div>
              <div className="p-3 bg-black/60 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">WINS</span>
                <strong className="text-slate-200 text-sm font-bold font-mono mt-1.5">
                  {activeClan.wins}
                </strong>
              </div>
              <div className="p-3 bg-black/60 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">RATING</span>
                <strong className="text-slate-200 text-sm font-bold font-mono mt-1.5">
                  {activeClan.rating.toLocaleString()}
                </strong>
              </div>
              <div className="p-3 bg-black/60 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                <span className="text-slate-500 text-[8px] font-mono uppercase">FOUNDED</span>
                <strong className="text-slate-200 text-sm font-bold font-mono mt-1.5">
                  {activeClan.founded}
                </strong>
              </div>
            </div>

            {/* Games / Requirements */}
            <div className="self-stretch mt-6 pt-5 border-t border-white/5 flex justify-between items-center flex-wrap gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[8.80px] font-mono uppercase">MAIN GAMES</span>
                <div className="flex gap-2">
                  {activeClan.games.map((g: string) => (
                    <div key={g} className="px-2.5 py-[3px] bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 text-cyan-400 text-[8.80px] font-mono font-medium">
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end max-sm:items-start">
                <span className="text-slate-500 text-[8.80px] font-mono uppercase">REQUIREMENT</span>
                <strong className="text-yellow-400 text-[10.40px] font-mono mt-1">
                  {activeClan.requirement}
                </strong>
              </div>
            </div>

            {/* Actions buttons */}
            <div className="w-full pt-5 flex items-center gap-3">
              {activeClan.status === "INVITE ONLY" ? (
                <div className="px-6 py-2.5 outline outline-1 outline-offset-[-1px] outline-white/10 text-slate-500 text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-2 select-none">
                  <span className="text-slate-500">🔒</span>
                  <span>INVITE ONLY</span>
                </div>
              ) : joinedClans.includes(activeClan.id) ? (
                <button
                  onClick={() => {
                    setJoinedClans(prev => prev.filter(id => id !== activeClan.id));
                    notify(`Left clan [${activeClan.tag}] ${activeClan.name}.`);
                  }}
                  className="px-6 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono tracking-widest uppercase hover:bg-red-500 hover:text-white transition cursor-pointer flex items-center gap-2"
                >
                  <span>✓</span>
                  <span>LEAVE CLAN</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (currentUser.trustScore < 75 && activeClan.requirement.includes("7.5+")) {
                      notify("Join request failed: Your Trust Score is below the 7.5 threshold.");
                      return;
                    }
                    setJoinedClans(prev => [...prev, activeClan.id]);
                    notify(`Applied to join ${activeClan.name} successfully!`);
                  }}
                  className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold font-mono tracking-widest uppercase transition cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,255,0.3)] border-none"
                >
                  <span className="text-black text-sm">👤</span>
                  <span>APPLY TO JOIN</span>
                </button>
              )}

              <button
                onClick={() => notify(`Viewing members of ${activeClan.name}...`)}
                className="px-6 py-2.5 outline outline-1 outline-offset-[-1px] outline-cyan-400/40 hover:outline-cyan-400 text-cyan-400 text-xs font-bold font-mono tracking-widest uppercase transition cursor-pointer"
              >
                VIEW MEMBERS
              </button>
            </div>

          </div>

          {/* Leaderboard Standings Box */}
          <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-yellow-400/25 flex flex-col justify-start items-start w-full">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-yellow-400 shadow-[0_0_8px_rgba(255,215,0,0.5)]"></div>
              <span className="text-yellow-400 text-[9.92px] font-mono tracking-widest uppercase">
                RANK_01 // GLOBAL STANDINGS
              </span>
            </div>
            
            <h4 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              LEADERBOARD
            </h4>

            {/* Leaderboard Table */}
            <div className="self-stretch mt-8 w-full flex flex-col">
              {/* Header Row */}
              <div className="flex items-center justify-between pb-2.5 border-b border-yellow-400/10 text-[8.32px] font-mono text-slate-500 uppercase">
                <div className="w-10">#</div>
                <div className="flex-1 pl-4">CLAN</div>
                <div className="w-20 text-right">MEMBERS</div>
                <div className="w-20 text-right">WINS</div>
                <div className="w-24 text-right">RATING</div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {clans.map((clan, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={clan.id}
                      className={`flex items-center justify-between h-10 border-b border-white/5 text-xs font-mono transition ${
                        isFirst ? "bg-yellow-400/5 text-yellow-400" : "text-slate-300"
                      }`}
                    >
                      <div className={`w-10 font-bold ${isFirst ? "text-yellow-400" : "text-cyan-400"}`}>
                        #{idx + 1}
                      </div>
                      <div className="flex-1 pl-4 flex items-center gap-2">
                        <span className="px-1.5 py-[1px] border border-cyan-400/25 text-cyan-400 text-[8.80px]">
                          [{clan.tag}]
                        </span>
                        <span className="font-semibold">{clan.name}</span>
                      </div>
                      <div className="w-20 text-right text-slate-500">{clan.members}</div>
                      <div className="w-20 text-right text-slate-500">{clan.wins}</div>
                      <div className="w-24 text-right text-cyan-400 font-bold">
                        {clan.rating.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
export default ClanView;
