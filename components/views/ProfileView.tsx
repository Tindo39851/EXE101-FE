import React from "react";
import { ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormShell, Input, Select } from "@/components/shared/ui-atoms";
import { games, ranks, goals } from "@/lib/data/constants";
import { useAppState } from "@/hooks/use-app-state";
import { Rank } from "@/lib/types";

export function ProfileView() {
  const {
    setView,
    currentUser,
    showEditProfile,
    setShowEditProfile,
    profileDraft,
    setProfileDraft,
    saveProfile
  } = useAppState();

  return (
    <section className="flex flex-col gap-8 bg-black p-0">
      {/* Back Button */}
      <button
        onClick={() => setView("overview")}
        className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left cursor-pointer"
      >
        ← BACK TO HOME
      </button>

      {/* Profile Header Banner */}
      <div className="relative bg-gray-950 border-b border-cyan-400/20 py-8 px-6 flex justify-between items-start gap-6 max-lg:flex-col max-lg:items-stretch">
        <div className="flex gap-6 max-sm:flex-col items-start">
          {/* Avatar Box */}
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-cyan-400/5 shadow-[0px_0px_20px_rgba(0,255,255,0.4)] shadow-[0px_0px_8px_rgba(0,255,255,1)] outline outline-2 outline-offset-[-2px] outline-cyan-400 flex justify-center items-center">
              <span className="text-cyan-400 text-4xl font-black font-mono">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute w-3.5 h-3.5 left-[88px] top-[-4px] bg-fuchsia-500 rounded-sm shadow-[0px_0px_20px_rgba(255,0,255,0.4)] shadow-[0px_0px_8px_rgba(255,0,255,1)]"></div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm shadow-[0px_0px_6px_rgba(0,255,136,1)]"></div>
              <span className="text-emerald-400 text-[8.3px] font-mono tracking-wider font-semibold">ONLINE</span>
            </div>
          </div>

          {/* User Info details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-slate-200 text-3xl font-black font-mono tracking-widest uppercase">
                {currentUser.name}
              </span>
              <div className="flex items-center gap-1.5 border border-emerald-400/30 bg-emerald-400/5 px-2.5 py-0.5 text-emerald-400 text-[9.6px] font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED BROKER
              </div>
            </div>

            {/* Sub-Badges */}
            <div className="flex gap-3 flex-wrap mt-1">
              <div className="px-2.5 py-1 bg-yellow-400/5 outline outline-1 outline-offset-[-1px] outline-yellow-400/40 text-yellow-400 text-[8.3px] font-mono font-semibold tracking-wider uppercase">
                PLATINUM TRADER
              </div>
              <div className="px-2.5 py-1 bg-yellow-400/5 outline outline-1 outline-offset-[-1px] outline-yellow-400/40 text-yellow-400 text-[8.3px] font-mono font-semibold tracking-wider uppercase">
                CLAN ELITE
              </div>
              <div className="px-2.5 py-1 bg-yellow-400/5 outline outline-1 outline-offset-[-1px] outline-yellow-400/40 text-yellow-400 text-[8.3px] font-mono font-semibold tracking-wider uppercase">
                TOP 0.1%
              </div>
            </div>

            <div className="text-slate-500 text-sm font-medium tracking-wide mt-2">
              Member of <span className="text-cyan-400">[PSY] PHANTOM SYNDICATE</span> · Joined Mar 2021 · Global Rank <span className="text-yellow-400">#312</span>
            </div>
          </div>
        </div>

        {/* Trust Score block & Edit button */}
        <div className="flex flex-col items-end gap-3 max-lg:items-start">
          <div className="w-36 py-4 px-6 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/30 flex flex-col items-center">
            <span className="text-slate-500 text-[9.3px] font-mono tracking-wider font-semibold">TRUST SCORE</span>
            <strong className="text-cyan-400 text-5xl font-black font-mono leading-10 mt-1.5">
              {(currentUser.trustScore / 10).toFixed(1)}
            </strong>
            <span className="text-slate-500 text-[8.3px] font-mono mt-1">/10.0</span>
            
            {/* Stars representation */}
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>

          <Button
            onClick={() => setShowEditProfile(!showEditProfile)}
            variant="outline"
            size="sm"
            className="text-xs border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 font-mono tracking-wider"
          >
            {showEditProfile ? "CLOSE CONFIG" : "EDIT PROFILE"}
          </Button>
        </div>
      </div>

      {/* Collapsible Edit Profile Panel */}
      {showEditProfile && (
        <div className="bg-gray-950/90 border border-cyan-400/30 p-6 flex flex-col gap-5">
          <p className="text-cyan-400 text-[9px] font-mono tracking-[0.2em]">SET_00 // PROFILE CONFIG</p>
          <h3 className="text-slate-200 text-xl font-bold uppercase tracking-wider">Update Gamer Persona</h3>
          <FormShell>
            <Input
              label="Display name"
              value={profileDraft.name}
              onChange={(value) => setProfileDraft((prev) => ({ ...prev, name: value }))}
            />
            <Select
              label="Main game"
              value={profileDraft.game}
              values={games}
              onChange={(value) => setProfileDraft((prev) => ({ ...prev, game: value }))}
            />
            <Select
              label="Rank"
              value={profileDraft.rank}
              values={ranks}
              onChange={(value) => setProfileDraft((prev) => ({ ...prev, rank: value as Rank }))}
            />
            <Select
              label="Goal"
              value={profileDraft.goal}
              values={goals}
              onChange={(value) => setProfileDraft((prev) => ({ ...prev, goal: value }))}
            />
            <Button onClick={() => { saveProfile(); setShowEditProfile(false); }} className="mt-2 bg-cyan-400 hover:bg-cyan-300 text-black">
              Save Profile
            </Button>
          </FormShell>
        </div>
      )}

      {/* Six Metrics Row */}
      <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
        <div className="bg-gray-950 p-4 border border-cyan-400/10 flex flex-col items-center">
          <span className="text-cyan-400 text-xl font-extrabold font-mono">1,842</span>
          <span className="text-slate-500 text-[8.3px] font-mono tracking-wider font-semibold mt-1">TOTAL TRADES</span>
        </div>
        <div className="bg-gray-950 p-4 border border-cyan-400/10 flex flex-col items-center">
          <span className="text-cyan-400 text-xl font-extrabold font-mono">$284K</span>
          <span className="text-slate-500 text-[8.3px] font-mono tracking-wider font-semibold mt-1">VOLUME</span>
        </div>
        <div className="bg-gray-950 p-4 border border-cyan-400/10 flex flex-col items-center">
          <span className="text-cyan-400 text-xl font-extrabold font-mono">0</span>
          <span className="text-slate-500 text-[8.3px] font-mono tracking-wider font-semibold mt-1">DISPUTES</span>
        </div>
        <div className="bg-gray-950 p-4 border border-cyan-400/10 flex flex-col items-center">
          <span className="text-cyan-400 text-xl font-extrabold font-mono">4</span>
          <span className="text-slate-500 text-[8.3px] font-mono tracking-wider font-semibold mt-1">ACHIEVEMENTS</span>
        </div>
        <div className="bg-gray-950 p-4 border border-cyan-400/10 flex flex-col items-center">
          <span className="text-cyan-400 text-xl font-extrabold font-mono">312</span>
          <span className="text-slate-500 text-[8.3px] font-mono tracking-wider font-semibold mt-1">GLOBAL RANK</span>
        </div>
        <div className="bg-gray-950 p-4 border border-cyan-400/10 flex flex-col items-center">
          <span className="text-cyan-400 text-xl font-extrabold font-mono">847</span>
          <span className="text-slate-500 text-[8.3px] font-mono tracking-wider font-semibold mt-1">CLAN SIZE</span>
        </div>
      </div>

      {/* Inventory & Achievements Grid */}
      <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
        {/* My Inventory */}
        <div className="p-6 bg-gray-950/90 border border-cyan-400/25 flex flex-col justify-start items-start">
          <div className="self-stretch flex justify-between items-end border-b border-cyan-400/10 pb-4">
            <div className="flex flex-col justify-start items-start">
              <div className="flex justify-start items-center gap-3">
                <div className="w-6 h-px bg-cyan-400 shadow-[0px_0px_8px_rgba(0,255,255,1)]"></div>
                <span className="text-cyan-400 text-[9.9px] font-mono tracking-widest font-semibold">INV_01 // ACTIVE LISTINGS</span>
              </div>
              <h3 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
                MY INVENTORY
              </h3>
            </div>
          </div>
          
          {/* List items */}
          <div className="self-stretch pt-6 flex flex-col gap-3">
            <div className="px-4 py-3 bg-black/50 border border-cyan-400/10 flex justify-between items-center">
              <div>
                <h4 className="text-slate-200 text-sm font-bold font-sans">FreeFire</h4>
                <p className="text-slate-500 text-[9.3px] font-mono">Radiant</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-fuchsia-500 text-sm font-bold font-mono">$249.00</span>
                <div className="px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 text-[8.3px] font-mono uppercase tracking-wider font-semibold">
                  LISTED
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-black/50 border border-cyan-400/10 flex justify-between items-center">
              <div>
                <h4 className="text-slate-200 text-sm font-bold font-sans">Arena of Valor</h4>
                <p className="text-slate-500 text-[9.3px] font-mono">Challenger</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-fuchsia-500 text-sm font-bold font-mono">$374.00</span>
                <div className="px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 text-[8.3px] font-mono uppercase tracking-wider font-semibold">
                  LISTED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="p-6 bg-gray-950/90 border border-yellow-400/25 flex flex-col justify-start items-start">
          <div className="self-stretch flex justify-between items-end border-b border-yellow-400/10 pb-4">
            <div className="flex flex-col justify-start items-start">
              <div className="flex justify-start items-center gap-3">
                <div className="w-6 h-px bg-yellow-400 shadow-[0px_0px_6px_rgba(255,215,0,1)]"></div>
                <span className="text-yellow-400 text-[9.9px] font-mono tracking-widest font-semibold">ACH_02 // UNLOCKS</span>
              </div>
              <h3 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
                ACHIEVEMENTS
              </h3>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="self-stretch pt-6 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="p-3.5 bg-yellow-400/5 border border-yellow-400/30 flex flex-col">
              <span className="text-slate-200 text-xl">⚔</span>
              <span className="text-yellow-400 text-[9.6px] font-bold font-mono tracking-wide mt-1.5 uppercase">
                FIRST BLOOD
              </span>
              <span className="text-slate-500 text-xs mt-1 font-sans">
                Complete first escrow trade
              </span>
            </div>

            <div className="p-3.5 bg-yellow-400/5 border border-yellow-400/30 flex flex-col">
              <span className="text-slate-200 text-xl">🛡</span>
              <span className="text-yellow-400 text-[9.6px] font-bold font-mono tracking-wide mt-1.5 uppercase">
                TRUST GUARDIAN
              </span>
              <span className="text-slate-500 text-xs mt-1 font-sans">
                Maintain 9.5+ score for 90 days
              </span>
            </div>

            <div className="p-3.5 bg-yellow-400/5 border border-yellow-400/30 flex flex-col">
              <span className="text-slate-200 text-xl">💯</span>
              <span className="text-yellow-400 text-[9.6px] font-bold font-mono tracking-wide mt-1.5 uppercase">
                CENTURY TRADER
              </span>
              <span className="text-slate-500 text-xs mt-1 font-sans">
                100 successful transactions
              </span>
            </div>

            <div className="p-3.5 bg-yellow-400/5 border border-yellow-400/30 flex flex-col">
              <span className="text-slate-200 text-xl">👑</span>
              <span className="text-yellow-400 text-[9.6px] font-bold font-mono tracking-wide mt-1.5 uppercase">
                CLAN WARLORD
              </span>
              <span className="text-slate-500 text-xs mt-1 font-sans">
                Lead clan to top 10 globally
              </span>
            </div>

            <div className="p-3.5 border border-white/5 opacity-40 flex flex-col">
              <span className="text-slate-200 text-xl">👻</span>
              <span className="text-slate-500 text-[9.6px] font-bold font-mono tracking-wide mt-1.5 uppercase">
                PHANTOM BROKER
              </span>
              <span className="text-slate-500 text-xs mt-1 font-sans">
                500+ trades with zero disputes
              </span>
            </div>

            <div className="p-3.5 border border-white/5 opacity-40 flex flex-col">
              <span className="text-slate-200 text-xl">🏆</span>
              <span className="text-slate-500 text-[9.6px] font-bold font-mono tracking-wide mt-1.5 uppercase">
                GRID MASTER
              </span>
              <span className="text-slate-500 text-xs mt-1 font-sans">
                Win 3 tournaments in one season
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-gray-950/90 border border-fuchsia-500/25 flex flex-col justify-start items-start">
        <div className="self-stretch flex justify-between items-end border-b border-fuchsia-500/10 pb-4">
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center gap-3">
              <div className="w-6 h-px bg-fuchsia-500 shadow-[0px_0px_8px_rgba(255,0,255,1)]"></div>
              <span className="text-fuchsia-500 text-[9.9px] font-mono tracking-widest font-semibold">ACT_03 // HISTORY</span>
            </div>
            <h3 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              RECENT ACTIVITY
            </h3>
          </div>
        </div>

        {/* Activity table */}
        <div className="self-stretch pt-6 flex flex-col">
          <div className="flex items-center justify-between py-4 border-b border-white/5 flex-wrap gap-4 text-xs font-mono">
            <div className="w-24 py-1 border border-emerald-400/30 text-center text-emerald-400 text-[9.3px]">
              SOLD
            </div>
            <span className="text-slate-200 text-sm font-sans flex-1 min-w-[200px]">FreeFire Account</span>
            <span className="text-emerald-400 text-sm font-semibold">+$249.00</span>
            <span className="text-slate-500 text-[9.3px] min-w-[60px] text-right">2h ago</span>
            <div className="w-24 py-1.5 bg-cyan-400/5 border border-cyan-400/20 text-center text-cyan-400 text-[8.3px] font-semibold">
              COMPLETE
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-white/5 flex-wrap gap-4 text-xs font-mono">
            <div className="w-24 py-1 border border-fuchsia-500/30 text-center text-fuchsia-500 text-[9.3px]">
              PURCHASED
            </div>
            <span className="text-slate-200 text-sm font-sans flex-1 min-w-[200px]">Arena Of Valor Account — Pro</span>
            <span className="text-fuchsia-500 text-sm font-semibold">-$189.50</span>
            <span className="text-slate-500 text-[9.3px] min-w-[60px] text-right">5h ago</span>
            <div className="w-24 py-1.5 bg-cyan-400/5 border border-cyan-400/20 text-center text-cyan-400 text-[8.3px] font-semibold">
              COMPLETE
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-white/5 flex-wrap gap-4 text-xs font-mono">
            <div className="w-24 py-1 border border-yellow-400/30 text-center text-yellow-400 text-[9.3px]">
              TOURNAMENT
            </div>
            <span className="text-slate-200 text-sm font-sans flex-1 min-w-[200px]">NEON CIRCUIT OPEN — Round 2</span>
            <span className="text-emerald-400 text-sm font-semibold">+$2,500</span>
            <span className="text-slate-500 text-[9.3px] min-w-[60px] text-right">1d ago</span>
            <div className="w-24 py-1.5 bg-cyan-400/5 border border-cyan-400/20 text-center text-cyan-400 text-[8.3px] font-semibold">
              WON
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-white/5 flex-wrap gap-4 text-xs font-mono">
            <div className="w-24 py-1 border border-cyan-400/30 text-center text-cyan-400 text-[9.3px]">
              LISTING
            </div>
            <span className="text-slate-200 text-sm font-sans flex-1 min-w-[200px]">Arena Of Valor Challenger VN</span>
            <span className="text-slate-200 text-sm font-semibold">$374.00</span>
            <span className="text-slate-500 text-[9.3px] min-w-[60px] text-right">2d ago</span>
            <div className="w-24 py-1.5 bg-cyan-400/5 border border-cyan-400/20 text-center text-cyan-400 text-[8.3px] font-semibold">
              ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Skill Profile */}
      <div className="p-6 bg-gray-950/90 border border-cyan-400/25 flex flex-col justify-start items-start">
        <div className="self-stretch flex justify-between items-end border-b border-cyan-400/10 pb-4">
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center gap-3">
              <div className="w-6 h-px bg-cyan-400 shadow-[0px_0px_8px_rgba(0,255,255,1)]"></div>
              <span className="text-cyan-400 text-[9.9px] font-mono tracking-widest font-semibold">SKILL_04 // COMPETENCY</span>
            </div>
            <h3 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              SKILL PROFILE
            </h3>
          </div>
        </div>

        {/* Vertical Skill Bars */}
        <div className="self-stretch pt-10 flex justify-around items-end h-48 max-sm:flex-wrap max-sm:h-auto max-sm:gap-6">
          <div className="flex flex-col items-center w-24">
            <span className="text-slate-500 text-[9.3px] font-mono tracking-wider font-semibold mb-3 uppercase">TRADING</span>
            <div className="w-8 h-28 relative bg-cyan-400/10 outline outline-1 outline-offset-[-1px] outline-cyan-400/30 flex items-end">
              <div
                className="w-full bg-cyan-400 shadow-[0px_0px_6px_rgba(0,255,255,1)]"
                style={{ height: "98%" }}
              ></div>
            </div>
            <span className="text-cyan-400 text-sm font-extrabold font-mono mt-2">98</span>
          </div>

          <div className="flex flex-col items-center w-24">
            <span className="text-slate-500 text-[9.3px] font-mono tracking-wider font-semibold mb-3 uppercase">TRUST</span>
            <div className="w-8 h-28 relative bg-yellow-400/10 outline outline-1 outline-offset-[-1px] outline-yellow-400/30 flex items-end">
              <div
                className="w-full bg-yellow-400 shadow-[0px_0px_6px_rgba(255,212,0,1)]"
                style={{ height: "99%" }}
              ></div>
            </div>
            <span className="text-yellow-400 text-sm font-extrabold font-mono mt-2">99</span>
          </div>

          <div className="flex flex-col items-center w-24">
            <span className="text-slate-500 text-[9.3px] font-mono tracking-wider font-semibold mb-3 uppercase">ESCROW</span>
            <div className="w-8 h-28 relative bg-cyan-400/10 outline outline-1 outline-offset-[-1px] outline-cyan-400/30 flex items-end">
              <div
                className="w-full bg-cyan-400 shadow-[0px_0px_6px_rgba(0,255,255,1)]"
                style={{ height: "95%" }}
              ></div>
            </div>
            <span className="text-cyan-400 text-sm font-extrabold font-mono mt-2">95</span>
          </div>

          <div className="flex flex-col items-center w-24">
            <span className="text-slate-500 text-[9.3px] font-mono tracking-wider font-semibold mb-3 uppercase">CLAN OPS</span>
            <div className="w-8 h-28 relative bg-fuchsia-500/10 outline outline-1 outline-offset-[-1px] outline-fuchsia-500/30 flex items-end">
              <div
                className="w-full bg-fuchsia-500 shadow-[0px_0px_6px_rgba(255,0,223,1)]"
                style={{ height: "87%" }}
              ></div>
            </div>
            <span className="text-fuchsia-500 text-sm font-extrabold font-mono mt-2">87</span>
          </div>

          <div className="flex flex-col items-center w-24">
            <span className="text-slate-500 text-[9.3px] font-mono tracking-wider font-semibold mb-3 uppercase">TOURNAMENT</span>
            <div className="w-8 h-28 relative bg-fuchsia-500/10 outline outline-1 outline-offset-[-1px] outline-fuchsia-500/30 flex items-end">
              <div
                className="w-full bg-fuchsia-500 shadow-[0px_0px_6px_rgba(255,0,223,1)]"
                style={{ height: "74%" }}
              ></div>
            </div>
            <span className="text-fuchsia-500 text-sm font-extrabold font-mono mt-2">74</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProfileView;
