import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { clans } from "@/lib/data/clans";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/ui/tabs";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ClanCard } from "@/components/features/clan/ClanCard";
import { ClanDetail } from "@/components/features/clan/ClanDetail";

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
    notify,
  } = useAppState();

  const tierTabs = [
    { id: "ALL", label: "ALL TIERS" },
    { id: "ELITE", label: "ELITE" },
    { id: "ALPHA", label: "ALPHA" },
    { id: "BETA", label: "BETA" },
    { id: "GAMMA", label: "GAMMA" },
  ];

  const regionTabs = [
    { id: "ALL", label: "ALL REGIONS" },
    { id: "Global", label: "GLOBAL" },
    { id: "NA/EU", label: "NA/EU" },
    { id: "EU", label: "EU" },
    { id: "AS", label: "ASIA" },
    { id: "SEA", label: "SEA" },
  ];

  return (
    <section className="flex flex-col bg-black p-0 w-full select-none font-mono">
      {/* Page Header */}
      <PageHeader
        code="CLAN_00 // DECENTRALIZED GUILD DIRECTORY"
        title="Guild Network"
        subtitle="Form syndicates, recruit competitive rosters, and climb faction ladders"
        backText="BACK TO HUB"
        onBack={() => setView("overview")}
        action={
          <div className="flex flex-col gap-2.5 items-end justify-end">
            <Tabs
              tabs={tierTabs}
              activeTab={clanTierFilter}
              onChange={setClanTierFilter}
              variant="cyan"
              className="border-none p-0"
            />
            <Tabs
              tabs={regionTabs}
              activeTab={clanRegionFilter}
              onChange={setClanRegionFilter}
              variant="cyan"
              className="border-none p-0 opacity-70 scale-90 origin-right"
            />
          </div>
        }
      />

      {/* Split layout view workspace */}
      <div className="w-full mt-8 grid grid-cols-[320px_1fr] gap-8 max-lg:grid-cols-1">
        
        {/* Left Column: Clans list */}
        <div className="flex flex-col gap-3">
          <span className="text-slate-500 text-[9px] font-black tracking-widest uppercase mb-1">
            [ DIRECTORY SEARCH // {filteredClans.length} CLANS ]
          </span>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[750px] pr-2">
            {filteredClans.length === 0 ? (
              <div className="py-12 text-center text-slate-600 font-bold uppercase border border-dashed border-cyan-400/25 bg-slate-950/20">
                NO CLANS FOUND MATCHING NODE CRITERIA
              </div>
            ) : (
              filteredClans.map((clan) => (
                <ClanCard
                  key={clan.id}
                  clan={clan}
                  isActive={selectedClanId === clan.id}
                  onSelect={() => setSelectedClanId(clan.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column: Selected Clan Info & Global Leaderboard */}
        <div className="flex flex-col gap-6">
          {activeClan ? (
            <ClanDetail
              clan={activeClan}
              isJoined={joinedClans.includes(activeClan.id)}
              currentUser={currentUser}
              onApply={() => {
                if (currentUser.trustScore < 75 && activeClan.requirement.includes("7.5+")) {
                  notify("Join request failed: Your Trust Score is below the 7.5 threshold.");
                  return;
                }
                setJoinedClans((prev) => [...prev, activeClan.id]);
                notify(`Applied to join ${activeClan.name} successfully!`);
              }}
              onLeave={() => {
                setJoinedClans((prev) => prev.filter((id) => id !== activeClan.id));
                notify(`Left clan [${activeClan.tag}] ${activeClan.name}.`);
              }}
              onViewMembers={() => notify(`Viewing members of ${activeClan.name}...`)}
            />
          ) : (
            <div className="w-full py-16 text-center text-slate-500 uppercase border border-dashed border-cyan-400/20">
              Select guild node from directory panel.
            </div>
          )}

          {/* Leaderboard standings box */}
          <div className="p-6 bg-slate-950/80 border border-yellow-400/20 flex flex-col justify-start items-start w-full relative hover:shadow-[0_0_20px_rgba(250,204,21,0.08)] transition-all duration-300">
            {/* Top gold line */}
            <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />

            <SectionLabel code="RANK_01" label="GLOBAL CLAN STANDINGS" color="cyan" />

            <div className="self-stretch mt-4 w-full flex flex-col">
              {/* Header row */}
              <div className="flex items-center justify-between pb-3 border-b border-yellow-400/15 text-[8.5px] font-bold text-slate-500 uppercase">
                <div className="w-10">RANK</div>
                <div className="flex-1 pl-4">GUILD INDEX</div>
                <div className="w-20 text-right">MEMBERS</div>
                <div className="w-20 text-right">WINS</div>
                <div className="w-24 text-right">SCORE</div>
              </div>

              {/* Leaderboard elements */}
              <div className="flex flex-col">
                {clans.map((clan, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={clan.id}
                      className={`flex items-center justify-between h-10 border-b border-white/5 text-[11px] font-bold transition-colors ${
                        isFirst ? "bg-yellow-400/5 text-yellow-400" : "text-slate-350 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className={`w-10 ${isFirst ? "text-yellow-400" : "text-cyan-400"}`}>
                        #{idx + 1}
                      </div>
                      <div className="flex-1 pl-4 flex items-center gap-2">
                        <span className="px-1 text-[8.5px] border border-cyan-400/20 bg-cyan-400/5 text-cyan-400">
                          [{clan.tag}]
                        </span>
                        <span className="truncate max-w-[200px]">{clan.name}</span>
                      </div>
                      <div className="w-20 text-right text-slate-500 font-normal">{clan.members}</div>
                      <div className="w-20 text-right text-slate-500 font-normal">{clan.wins}</div>
                      <div className="w-24 text-right text-cyan-400 font-black">
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
