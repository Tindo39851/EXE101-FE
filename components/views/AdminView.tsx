"use client";
import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/ui/tabs";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SEV_COLORS: Record<string, string> = {
  HIGH: "bg-orange-500/10 outline-orange-500/30 text-orange-500",
  CRIT: "bg-fuchsia-500/10 outline-fuchsia-500/30 text-fuchsia-500",
  MED: "bg-yellow-400/10 outline-yellow-400/30 text-yellow-400",
  LOW: "bg-slate-500/10 outline-slate-500/30 text-slate-500",
};

const STATUS_COLORS: Record<string, string> = {
  BLOCKED: "bg-emerald-400/5 outline-emerald-400/25 text-emerald-400",
  REVIEWING: "bg-yellow-400/5 outline-yellow-400/25 text-yellow-400",
  RESOLVED: "bg-cyan-400/5 outline-cyan-400/25 text-cyan-400",
};

const INC_ID_MAP: Record<string, string> = {
  i1: "9821", i2: "9820", i3: "9819", i4: "9818", i5: "9817",
};
const INC_TIME_MAP: Record<string, string> = {
  i1: "12m ago", i2: "28m ago", i3: "1h ago", i4: "2h ago", i5: "4h ago",
};

function RadialGauge({ val, label, color }: { val: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 font-mono select-none">
      <div className="size-20 relative overflow-hidden flex justify-center items-center">
        <svg className="size-16 rotate-[-90deg]">
          <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle
            cx="32" cy="32" r="28"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={175.92}
            strokeDashoffset={175.92 - (175.92 * val) / 100}
            className={color}
          />
        </svg>
        <span className={`absolute font-bold text-xs ${color}`}>{val}%</span>
      </div>
      <span className="text-center text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

export function AdminView() {
  const {
    setView,
    trustTab,
    setTrustTab,
    incidents,
    setIncidents,
    brokersList,
    setBrokersList,
    notify,
  } = useAppState();

  const adminTabs = [
    { id: "OVERVIEW", label: "OVERVIEW" },
    { id: "INCIDENTS", label: "INCIDENTS", count: incidents.length },
    { id: "ESCROW", label: "ESCROW STATUS" },
    { id: "BROKERS", label: "BROKER INDEX", count: brokersList.length },
  ];

  return (
    <section className="flex flex-col bg-black p-0 w-full select-none font-mono">
      {/* Page Header */}
      <PageHeader
        code="TRUST_00 // DECISION VERIFICATION ENGINE"
        title="Admin Trust Center"
        subtitle="Platform risk monitoring metrics, escrow deposits, and verified operator control nodes"
        backText="BACK TO HOME"
        onBack={() => setView("overview")}
        glowColor="cyan"
        action={
          <Tabs
            tabs={adminTabs}
            activeTab={trustTab}
            onChange={setTrustTab}
            variant="cyan"
            className="border-none p-0"
          />
        }
      />

      {/* Main Workspace Content */}
      <div className="w-full mt-8 flex flex-col gap-6">

        {/* ── Tab 1: OVERVIEW ── */}
        {trustTab === "OVERVIEW" && (
          <div className="w-full flex flex-col gap-6">
            {/* Top 6 Metric Boxes */}
            <div className="w-full grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 bg-cyan-400/10 p-[1px]">
              {[
                { val: "9.4/10",   label: "TRUST INDEX",      color: "text-yellow-400" },
                { val: "14,892",   label: "SCAMS BLOCKED",    color: "text-fuchsia-500" },
                { val: "284,103",  label: "SAFE TRADES",      color: "text-emerald-400" },
                { val: "$4.2M",    label: "ESCROW VOL",       color: "text-cyan-400" },
                { val: "62,100",   label: "VERIFIED USERS",   color: "text-cyan-400" },
                { val: "0.003%",   label: "FRAUD RATE",       color: "text-emerald-400" },
              ].map(({ val, label, color }) => (
                <div key={label} className="p-5 bg-gray-950 flex flex-col items-center">
                  <span className={`text-center ${color} text-xl font-black`}>{val}</span>
                  <span className="text-center text-slate-500 text-[8px] font-bold mt-1.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            {/* Row 2: Escrow holds + Live threats */}
            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              {/* Wallet hold status card */}
              <div className="p-6 bg-slate-950/80 border border-cyan-400/20 flex flex-col justify-start items-start w-full relative">
                <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.4)]" />
                <SectionLabel code="ESCROW_01" label="WALLET HOLD STATUS" color="cyan" />

                <div className="w-full grid grid-cols-4 gap-4 py-6 justify-center">
                  {[
                    { val: 87, label: "ACTIVE HOLDS",    color: "text-cyan-400" },
                    { val: 64, label: "PENDING RELEASE", color: "text-fuchsia-500" },
                    { val: 99, label: "SECURED FUNDS",   color: "text-yellow-400" },
                    { val: 42, label: "IN DISPUTE",      color: "text-emerald-400" },
                  ].map((g) => (
                    <RadialGauge key={g.label} {...g} />
                  ))}
                </div>

                <div className="w-full flex flex-col gap-4 mt-2">
                  {[
                    { label: "Marketplace Holds", val: "$2.8M", color: "text-cyan-400",    glow: "#00ffff", pct: "40%" },
                    { label: "Tournament Prizes", val: "$0.7M", color: "text-fuchsia-500", glow: "#ff00ff", pct: "28%" },
                    { label: "Clan Wagers",        val: "$0.4M", color: "text-yellow-400",  glow: "#ffb900", pct: "16%" },
                  ].map(({ label, val, color, glow, pct }) => (
                    <div key={label} className="w-full flex flex-col">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <span className="text-slate-500">{label}</span>
                        <span className={color}>{val}</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 mt-1.5">
                        <div className={`h-full ${color.replace("text-", "bg-")}`} style={{ width: pct, boxShadow: `0 0 6px ${glow}` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live threats card */}
              <div className="p-6 bg-slate-950/80 border border-fuchsia-500/20 flex flex-col justify-start items-start w-full relative">
                <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,0.4)]" />
                <SectionLabel code="THREAT_01" label="LIVE RISK MONITOR" color="fuchsia" />
                <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-400 uppercase select-none">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#10b981] animate-pulse" />
                  REALTIME SHIELD ON
                </div>

                <div className="w-full flex flex-col gap-3.5 mt-6">
                  {incidents.slice(0, 4).map((i) => (
                    <div key={i.id} className="py-2.5 border-b border-white/5 flex items-center justify-between gap-3 text-[10px] w-full">
                      <Badge variant="cyan" className="text-[7.5px] px-1.5">
                        {i.severity}
                      </Badge>
                      <div className="flex-1 min-w-0 pl-1">
                        <span className="text-slate-200 font-bold block truncate">{i.type}</span>
                        <span className="text-slate-500 text-[8px] font-normal truncate block mt-0.5">{i.desc}</span>
                      </div>
                      <Badge variant={i.status === "BLOCKED" ? "success" : "upcoming"}>
                        {i.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: Trust score distribution */}
            <div className="p-6 bg-slate-950/80 border border-cyan-400/20 flex flex-col justify-start items-start w-full relative">
              <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.4)]" />
              <SectionLabel code="DIST_01" label="TRUST SCORE SPREAD" color="cyan" />

              <div className="w-full grid grid-cols-6 gap-4 pt-8 items-end">
                {[
                  { label: "9.5–10", count: "12,480", pct: 65, color: "bg-cyan-400 shadow-[0_0_6px_#00ffff]",    tColor: "text-cyan-400" },
                  { label: "9.0–9.5", count: "18,340", pct: 90, color: "bg-emerald-400 shadow-[0_0_6px_#10b981]", tColor: "text-emerald-400" },
                  { label: "8.5–9.0", count: "14,210", pct: 74, color: "bg-yellow-400 shadow-[0_0_6px_#ffb900]",  tColor: "text-yellow-400" },
                  { label: "8.0–8.5", count: "9,870",  pct: 48, color: "bg-orange-500 shadow-[0_0_6px_#f97316]",  tColor: "text-orange-400" },
                  { label: "7.0–8.0", count: "5,120",  pct: 26, color: "bg-fuchsia-500 shadow-[0_0_6px_#ff00ff]", tColor: "text-fuchsia-500" },
                  { label: "<7.0",    count: "2,080",  pct: 11, color: "bg-slate-500 shadow-[0_0_6px_#64748b]",   tColor: "text-slate-500" },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-col items-center gap-2 w-full">
                    <span className={`text-[9px] font-bold ${bar.tColor}`}>{bar.count}</span>
                    <div className="w-full h-2 bg-slate-900/80 relative">
                      <div className={`h-full ${bar.color}`} style={{ width: `${bar.pct}%` }}></div>
                    </div>
                    <span className="text-slate-500 text-[8px] font-bold uppercase mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 2: INCIDENTS ── */}
        {trustTab === "INCIDENTS" && (
          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-4 gap-4 max-md:grid-cols-2 bg-fuchsia-500/10 p-[1px]">
              {[
                { val: "127",    label: "BLOCKED TODAY", color: "text-fuchsia-500" },
                { val: "14",     label: "UNDER REVIEW",  color: "text-yellow-400" },
                { val: "8,441",  label: "RESOLVED",      color: "text-emerald-400" },
                { val: "1.2s",   label: "AVG RESPONSE",  color: "text-cyan-400" },
              ].map(({ val, label, color }) => (
                <div key={label} className="p-5 bg-gray-950 flex flex-col items-center">
                  <span className={`text-center ${color} text-2xl font-black`}>{val}</span>
                  <span className="text-center text-slate-500 text-[8px] font-bold mt-1.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-950/80 border border-fuchsia-500/25 flex flex-col justify-start items-start w-full relative">
              <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,0.4)]" />
              <SectionLabel code="INC_LOG" label="INCIDENT HISTOGRAM LOG" color="fuchsia" />

              {/* Table header */}
              <div className="w-full mt-6 border-b border-white/5 pb-2 flex text-slate-500 text-[8.5px] font-bold uppercase tracking-wider">
                <div className="w-24">INCID_ID</div>
                <div className="w-32">CATEGORY</div>
                <div className="w-20">SEVERITY</div>
                <div className="w-28">TIMESTAMP</div>
                <div className="flex-1">TARGET PAYLOAD</div>
                <div className="w-24 text-right">ACTION</div>
              </div>

              {/* Table rows */}
              <div className="w-full flex flex-col divide-y divide-white/5">
                {incidents.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs uppercase">
                    Threat logs clear. System operation normal.
                  </div>
                ) : (
                  incidents.map((i) => (
                    <div key={i.id} className="w-full py-3 flex items-center justify-between text-[10px]">
                      <div className="w-24 text-slate-500">#{`INC-${INC_ID_MAP[i.id] ?? "9800"}`}</div>
                      <div className="w-32 text-slate-200 font-bold uppercase">{i.type}</div>
                      <div className="w-20">
                        <span className={`px-1.5 py-0.5 outline outline-1 outline-offset-[-1px] font-bold text-[8px] uppercase ${SEV_COLORS[i.severity] ?? ""}`}>
                          {i.severity}
                        </span>
                      </div>
                      <div className="w-28 text-slate-500">
                        <span>🕒 {INC_TIME_MAP[i.id] ?? "6h ago"}</span>
                      </div>
                      <div className="flex-1 text-slate-400 truncate pr-4 font-sans">{i.desc}</div>
                      <div className="w-24 flex justify-end items-center gap-2">
                        <span className={`px-1.5 py-0.5 outline outline-1 outline-offset-[-1px] text-[8px] ${STATUS_COLORS[i.status] ?? ""}`}>
                          {i.status}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIncidents((prev: any[]) => prev.filter((item) => item.id !== i.id));
                            notify("Incident dismissed successfully.");
                          }}
                          className="px-2 py-0.5 bg-red-500/10 border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 text-[8px] h-6"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 3: ESCROW ── */}
        {trustTab === "ESCROW" && (
          <div className="w-full grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            {/* Hold Breakdown */}
            <div className="p-6 bg-slate-950/80 border border-cyan-400/20 flex flex-col justify-start items-start w-full relative">
              <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.4)]" />
              <SectionLabel code="ESC_01" label="SECURED FUNDS HOLD STATUS" color="cyan" />

              <div className="w-full flex justify-around py-8">
                {[
                  { val: 87, label: "ACTIVE HOLDS", color: "text-cyan-400" },
                  { val: 64, label: "PENDING",      color: "text-fuchsia-500" },
                  { val: 99, label: "SECURED",      color: "text-yellow-400" },
                ].map((g) => (
                  <RadialGauge key={g.label} {...g} />
                ))}
              </div>

              <div className="w-full mt-auto pt-6">
                <div className="w-full p-4 bg-cyan-400/5 border border-cyan-400/20 flex justify-between items-center">
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">TOTAL ESCROW IN CONTRACT</span>
                  <span className="text-cyan-400 text-lg font-black tracking-widest">$4,200,000</span>
                </div>
              </div>
            </div>

            {/* Daily Volume */}
            <div className="p-6 bg-slate-950/80 border border-yellow-400/25 flex flex-col justify-start items-start w-full relative">
              <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
              <SectionLabel code="ESC_02" label="DAILY DEPOSIT VALUE" color="cyan" />

              <div className="w-full grid grid-cols-5 gap-3 pt-6 pb-4 items-end">
                {[
                  { label: "Jun 18", pct: 45 },
                  { label: "Jun 19", pct: 35 },
                  { label: "Jun 20", pct: 78 },
                  { label: "Jun 21", pct: 62 },
                  { label: "Jun 22", pct: 95 },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-col items-center gap-1.5 w-full">
                    <div className="w-full h-1.5 bg-yellow-400/10 border border-yellow-400/25 relative">
                      <div className="h-full bg-yellow-400 shadow-[0_0_6px_#ffb900]" style={{ width: `${bar.pct}%` }}></div>
                    </div>
                    <span className="text-slate-500 text-[8px] font-bold uppercase mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>

              <div className="w-full flex flex-col mt-4 text-[9px] tracking-wide uppercase font-bold">
                {[
                  { date: "Jun 18", vol: "$312K", trades: 84,  disputes: 1, crit: true },
                  { date: "Jun 19", vol: "$289K", trades: 71,  disputes: 0, crit: false },
                  { date: "Jun 20", vol: "$441K", trades: 112, disputes: 2, crit: true },
                  { date: "Jun 21", vol: "$398K", trades: 96,  disputes: 1, crit: true },
                  { date: "Jun 22", vol: "$512K", trades: 131, disputes: 0, crit: false },
                ].map((row) => (
                  <div key={row.date} className="w-full h-8 py-2 border-b border-white/5 flex justify-between items-center">
                    <span className="w-16 text-slate-500">{row.date}</span>
                    <span className="w-16 text-yellow-400 font-bold">{row.vol}</span>
                    <span className="w-20 text-cyan-400">{row.trades} trades</span>
                    <span className={`w-20 text-right ${row.disputes > 0 ? "text-fuchsia-500" : "text-emerald-400"}`}>
                      {row.disputes} disputes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 4: BROKERS ── */}
        {trustTab === "BROKERS" && (
          <div className="w-full flex flex-col gap-6">
            <div className="w-full p-6 bg-slate-950/80 border border-yellow-400/20 flex flex-col justify-start items-start relative">
              <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
              <SectionLabel code="BRK_01" label="VERIFIED OPERATOR NODES" color="cyan" />

              <div className="w-full grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 mt-6">
                {brokersList.length === 0 ? (
                  <div className="col-span-3 py-12 text-center text-slate-500 text-xs uppercase">
                    No brokers currently verified.
                  </div>
                ) : (
                  brokersList.map((b: any) => (
                    <div key={b.id} className="p-5 bg-yellow-400/5 border border-yellow-400/20 flex flex-col justify-start items-start w-full relative hover:shadow-[0_0_15px_rgba(250,204,21,0.05)] transition-all duration-300">
                      <div className="self-stretch flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="size-11 bg-yellow-400/10 border border-yellow-400/35 flex justify-center items-center shrink-0">
                            <span className="text-yellow-400 text-xs font-black uppercase">{b.initials}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-slate-200 text-xs font-bold tracking-wide uppercase">{b.name}</span>
                            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-[8px] font-bold tracking-widest select-none">
                              <span>✓ VERIFIED</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-yellow-400 text-base font-black leading-none">{b.trust}</span>
                          <span className="text-slate-500 text-[7px] font-bold mt-1 uppercase tracking-wide">TRUST RATIO</span>
                        </div>
                      </div>

                      <div className="self-stretch grid grid-cols-3 gap-2.5 mt-4">
                        {[
                          { label: "TRADES",   val: b.trades },
                          { label: "VOLUME",   val: b.volume },
                          { label: "DISPUTES", val: b.disputes, highlight: b.disputes === 0 },
                        ].map(({ label, val, highlight }) => (
                          <div key={label} className="p-2 bg-black/50 border border-white/5 flex flex-col items-center">
                            <span className="text-slate-500 text-[7px] font-bold uppercase">{label}</span>
                            <strong className={`text-[10px] font-bold mt-1 ${highlight ? "text-emerald-400" : "text-slate-200"}`}>
                              {val}
                            </strong>
                          </div>
                        ))}
                      </div>

                      <div className="text-slate-550 text-[8px] font-bold mt-4 uppercase tracking-wider">
                        MEMBER SINCE {b.since}
                      </div>

                      <div className="self-stretch flex gap-2 mt-4 pt-3.5 border-t border-white/5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setBrokersList((prev: any[]) =>
                              prev.map((item) => {
                                if (item.id !== b.id) return item;
                                const next = Math.min(10.0, parseFloat(item.trust) + 0.1).toFixed(1);
                                return { ...item, trust: next };
                              })
                            );
                            notify(`Promoted broker ${b.name}. Trust score updated.`);
                          }}
                          className="flex-1 border-cyan-400/40 text-cyan-300 hover:border-cyan-400 text-[9px] font-bold tracking-wider"
                        >
                          PROMOTE
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setBrokersList((prev: any[]) => prev.filter((item) => item.id !== b.id));
                            notify(`Banned operator ${b.name} from directory.`);
                          }}
                          className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-white text-[9px] font-bold tracking-wider"
                        >
                          BAN OPERATOR
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default AdminView;
