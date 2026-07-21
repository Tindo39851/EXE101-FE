import React from "react";
import { ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Badge } from "@/components/ui/badge";
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
    saveProfile,
  } = useAppState();

  const handleSave = () => {
    saveProfile();
    setShowEditProfile(false);
  };

  return (
    <section className="flex flex-col gap-6 bg-black p-0 w-full select-none font-mono">
      {/* Page Header */}
      <PageHeader
        code="USER_01 // SECURED DATA NODE PROFILE"
        title="Gamer Identity"
        subtitle="Calculated trust reputation, completed escrow activities, and wagers"
        backText="BACK TO HOME"
        onBack={() => setView("overview")}
        action={
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="py-2.5 px-4 bg-cyan-950/20 border border-cyan-400/25 flex flex-col items-center">
              <span className="text-slate-500 text-[8px] font-black tracking-widest leading-none">TRUST RATING</span>
              <strong className="text-cyan-400 text-3xl font-black mt-1 leading-none">
                {(currentUser.trustScore / 10).toFixed(1)}
              </strong>
              <div className="flex gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-2 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Main card details */}
      <div className="p-6 bg-slate-950/80 border border-cyan-400/20 flex justify-between items-start gap-6 max-lg:flex-col max-lg:items-stretch relative hover:shadow-[0_0_20px_rgba(0,246,255,0.05)] transition-all duration-300">
        <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.4)]" />

        <div className="flex gap-6 max-sm:flex-col items-start">
          {/* Avatar frame */}
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-cyan-400/5 border-2 border-cyan-400 flex justify-center items-center shadow-[0_0_15px_rgba(0,246,255,0.2)]">
              <span className="text-cyan-400 text-4xl font-black">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="size-2.5 absolute -top-1 -right-1 bg-fuchsia-500 shadow-[0_0_6px_#ff00df]" />
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_4px_#34d399]" />
              <span className="text-emerald-400 text-[8px] font-black tracking-widest">ONLINE NOW</span>
            </div>
          </div>

          {/* User metadata details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-slate-200 text-2xl font-black tracking-widest uppercase">
                {currentUser.name}
              </span>
              <span className="flex items-center gap-1 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[8.5px] font-black tracking-widest px-2.5 py-0.5">
                <ShieldCheck className="size-3" />
                VERIFIED OPERATOR
              </span>
            </div>

            <div className="flex gap-2 flex-wrap mt-1">
              <Badge variant="upcoming">PLATINUM NODE</Badge>
              <Badge variant="cyan">CLAN ELITE</Badge>
              <Badge variant="fuchsia">TOP 0.1%</Badge>
            </div>

            <p className="text-slate-550 text-[11px] font-bold mt-2">
              Member of <span className="text-cyan-400">[PSY] PHANTOM SYNDICATE</span> · Node active since Mar 2021 · Global rank <span className="text-yellow-400">#312</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 max-lg:items-start shrink-0">
          <Button
            onClick={() => setShowEditProfile(!showEditProfile)}
            variant="outline"
            className="text-[9.5px] font-black tracking-widest border-cyan-400/40 text-cyan-300 hover:border-cyan-400"
          >
            {showEditProfile ? "CLOSE CONFIG" : "EDIT PERSONA"}
          </Button>
        </div>
      </div>

      {/* Profile edit controls panel */}
      {showEditProfile && (
        <div className="p-6 bg-slate-950/80 border border-cyan-400/25 flex flex-col gap-5 relative hover:shadow-[0_0_20px_rgba(0,246,255,0.05)] transition-all duration-300">
          <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.4)]" />
          <SectionLabel code="SET_00" label="PROFILE PARAMETERS CONFIG" color="cyan" />
          
          <div className="grid gap-4 w-full">
            <Input
              label="DISPLAY PERSONA NAME"
              value={profileDraft.name}
              onChange={(e) => setProfileDraft((prev) => ({ ...prev, name: e.target.value }))}
            />

            {/* Custom styled select boxes */}
            <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-col gap-1.5 w-full">
                <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">MAIN GAME OPERATION</span>
                <select
                  value={profileDraft.game}
                  onChange={(e) => setProfileDraft((prev) => ({ ...prev, game: e.target.value }))}
                  className="h-11 px-4 bg-cyan-955/20 border border-cyan-400/25 text-slate-200 text-xs focus:border-cyan-400"
                >
                  {games.map((g) => (
                    <option key={g} value={g} className="bg-slate-950 text-slate-200">{g}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">TACTICAL RANK</span>
                <select
                  value={profileDraft.rank}
                  onChange={(e) => setProfileDraft((prev) => ({ ...prev, rank: e.target.value as Rank }))}
                  className="h-11 px-4 bg-cyan-955/20 border border-cyan-400/25 text-slate-200 text-xs focus:border-cyan-400"
                >
                  {ranks.map((r) => (
                    <option key={r} value={r} className="bg-slate-950 text-slate-200">{r}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">MISSION GOAL</span>
                <select
                  value={profileDraft.goal}
                  onChange={(e) => setProfileDraft((prev) => ({ ...prev, goal: e.target.value }))}
                  className="h-11 px-4 bg-cyan-955/20 border border-cyan-400/25 text-slate-200 text-xs focus:border-cyan-400"
                >
                  {goals.map((goal) => (
                    <option key={goal} value={goal} className="bg-slate-950 text-slate-200">{goal}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button variant="default" onClick={handleSave} className="mt-2 text-[10px] font-black tracking-widest">
              SAVE CONFIGURATION
            </Button>
          </div>
        </div>
      )}

      {/* Six statistical indices */}
      <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
        {[
          { val: "1,842",   label: "COMPLETED TRADES" },
          { val: "$284K",   label: "TRADE VOLUME" },
          { val: "0",       label: "DISPUTES DETECTED" },
          { val: "4",       label: "ACHIEVEMENTS" },
          { val: "312",     label: "GLOBAL SEEDING" },
          { val: "847",     label: "GUILD SIZE" },
        ].map(({ val, label }) => (
          <div key={label} className="bg-slate-950/80 p-4 border border-cyan-400/10 flex flex-col items-center">
            <span className="text-cyan-400 text-xl font-black">{val}</span>
            <span className="text-slate-500 text-[8px] font-bold tracking-widest uppercase mt-1 text-center">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid segments: inventory + achievements */}
      <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
        {/* Active inventory listings */}
        <div className="p-6 bg-slate-950/80 border border-cyan-400/25 flex flex-col justify-start items-start relative hover:shadow-[0_0_15px_rgba(0,246,255,0.05)] transition-all duration-300">
          <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.5)]" />
          <SectionLabel code="INV_01" label="ACTIVE ESCROW LISTINGS" color="cyan" />
          
          <div className="self-stretch pt-2 flex flex-col gap-3">
            {[
              { game: "FreeFire", rank: "Radiant", price: 249.00 },
              { game: "Arena of Valor", rank: "Challenger", price: 374.00 }
            ].map((inv, idx) => (
              <div key={idx} className="px-4 py-3 bg-black/50 border border-cyan-400/15 flex justify-between items-center transition-colors hover:border-cyan-400/30">
                <div>
                  <h4 className="text-slate-200 text-xs font-black uppercase tracking-wide">{inv.game}</h4>
                  <p className="text-slate-550 text-[9px] font-semibold uppercase mt-0.5">{inv.rank}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-fuchsia-455 text-xs font-black">${inv.price.toFixed(2)}</span>
                  <Badge variant="cyan" className="text-[7.5px] px-1.5">LISTED</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System achievements */}
        <div className="p-6 bg-slate-950/80 border border-yellow-400/25 flex flex-col justify-start items-start relative hover:shadow-[0_0_15px_rgba(250,204,21,0.05)] transition-all duration-300">
          <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          <SectionLabel code="ACH_02" label="UNLOCKED OPERATOR REWARDS" color="cyan" />

          <div className="self-stretch pt-2 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {[
              { icon: "⚔", name: "FIRST BLOOD", desc: "First completed escrow wagers" },
              { icon: "🛡", name: "TRUST SHIELD", desc: "Maintain score above 9.5 for 90 days" },
              { icon: "💯", name: "CENTURION", desc: "100 successful escrow trades" },
              { icon: "👑", name: "GUILDMASTER", desc: "Lead clan to globally verified Top 10" }
            ].map((ach, idx) => (
              <div key={idx} className="p-3 bg-yellow-400/5 border border-yellow-400/20 flex flex-col items-start transition-all hover:border-yellow-400/40">
                <span className="text-lg">{ach.icon}</span>
                <span className="text-yellow-400 text-[9px] font-black tracking-widest mt-1.5 uppercase">
                  {ach.name}
                </span>
                <span className="text-slate-500 text-[10px] mt-1 font-sans leading-normal">
                  {ach.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History table log */}
      <div className="p-6 bg-slate-950/80 border border-fuchsia-500/25 flex flex-col justify-start items-start relative hover:shadow-[0_0_15px_rgba(255,0,223,0.05)] transition-all duration-300">
        <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,0.5)]" />
        <SectionLabel code="ACT_03" label="HISTORICAL TRANSACTION LOGS" color="fuchsia" />

        <div className="self-stretch pt-2 flex flex-col divide-y divide-white/5">
          {[
            { action: "SOLD", item: "FreeFire Account", val: "+$249.00", color: "text-emerald-400 border-emerald-400/30", time: "2h ago", badge: "COMPLETE" },
            { action: "BOUGHT", item: "Arena of Valor Pro Acc", val: "-$189.50", color: "text-fuchsia-500 border-fuchsia-500/30", time: "5h ago", badge: "COMPLETE" },
            { action: "WAGER", item: "Neon Circuit Open Qualifiers", val: "+$2,500.00", color: "text-yellow-400 border-yellow-400/30", time: "1d ago", badge: "WON" },
            { action: "LISTING", item: "AoV Challenger Server VN", val: "$374.00", color: "text-cyan-400 border-cyan-400/30", time: "2d ago", badge: "ACTIVE" }
          ].map((act, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 flex-wrap gap-4 text-xs">
              <span className={`w-24 py-0.5 border text-center text-[9px] font-black tracking-widest ${act.color}`}>
                {act.action}
              </span>
              <span className="text-slate-200 text-xs font-semibold flex-1 min-w-[200px] truncate uppercase">
                {act.item}
              </span>
              <span className={`text-xs font-bold ${act.val.startsWith("+") ? "text-emerald-400" : "text-fuchsia-400"}`}>
                {act.val}
              </span>
              <span className="text-slate-550 text-[9px] font-semibold min-w-[60px] text-right">
                🕒 {act.time}
              </span>
              <Badge variant={act.badge === "WON" || act.badge === "COMPLETE" ? "success" : "cyan"} className="w-24 py-1 flex justify-center items-center text-[8.5px]">
                {act.badge}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Competency skill levels */}
      <div className="p-6 bg-slate-950/80 border border-cyan-400/25 flex flex-col justify-start items-start relative hover:shadow-[0_0_15px_rgba(0,246,255,0.05)] transition-all duration-300">
        <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.5)]" />
        <SectionLabel code="SKILL_04" label="OPERATIONAL COMPETENCY INDEX" color="cyan" />

        <div className="self-stretch pt-6 flex justify-around items-end h-40 max-sm:flex-wrap max-sm:h-auto max-sm:gap-6">
          {[
            { label: "TRADING", val: 98, color: "bg-cyan-400 shadow-[0_0_6px_#00ffff]" },
            { label: "TRUST INDEX", val: 99, color: "bg-yellow-400 shadow-[0_0_6px_#ffb900]" },
            { label: "ESCROW DEP", val: 95, color: "bg-cyan-400 shadow-[0_0_6px_#00ffff]" },
            { label: "GUILD OPS", val: 87, color: "bg-fuchsia-500 shadow-[0_0_6px_#ff00ff]" },
            { label: "TOURNAMENT", val: 74, color: "bg-fuchsia-500 shadow-[0_0_6px_#ff00ff]" }
          ].map((skill) => (
            <div key={skill.label} className="flex flex-col items-center w-24">
              <span className="text-slate-500 text-[8px] font-bold tracking-widest mb-2.5 uppercase text-center">{skill.label}</span>
              <div className="w-6 h-24 relative bg-slate-900/60 border border-white/5 flex items-end">
                <div
                  className={`w-full ${skill.color}`}
                  style={{ height: `${skill.val}%` }}
                />
              </div>
              <span className="text-slate-200 text-xs font-bold mt-2">{skill.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileView;
