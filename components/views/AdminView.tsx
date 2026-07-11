"use client";
import React from "react";
import { useAppState } from "@/hooks/use-app-state";

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
    <div className="flex flex-col items-center gap-1.5">
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
      <span className="text-center text-slate-500 text-[9.92px] font-mono uppercase tracking-wide mt-1">{label}</span>
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

  return (
    <section className="flex flex-col bg-black p-0">
      {/* Header Banner */}
      <div className="relative bg-gray-950 border-b border-yellow-400/20 py-8 px-6 flex flex-col justify-start items-start overflow-hidden">
        <button
          onClick={() => setView("overview")}
          className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left uppercase cursor-pointer bg-transparent border-none"
        >
          ← BACK TO HOME
        </button>

        <div className="w-full flex justify-between items-end mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-yellow-400 shadow-[0_0_8px_rgba(255,215,0,0.5)]"></div>
              <span className="text-yellow-400 text-[9.92px] font-mono tracking-widest font-semibold uppercase">
                TRUST_00 // VERIFICATION ENGINE
              </span>
            </div>
            <h3 className="text-slate-200 text-3xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              TRUSTDASHBOARD
            </h3>
          </div>
        </div>

        {/* Toolbar tabs */}
        <div className="w-full mt-8 pt-4 border-t border-white/5 flex gap-2 flex-wrap">
          {["OVERVIEW", "INCIDENTS", "ESCROW", "BROKERS"].map((tab) => {
            const active = trustTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setTrustTab(tab)}
                className={`px-6 py-2 border-l border-t border-b border-yellow-400/20 text-[10.40px] font-mono tracking-wider transition cursor-pointer ${
                  active
                    ? "bg-yellow-400/10 shadow-[0_0_12px_rgba(255,215,0,0.3)] outline outline-1 outline-offset-[-1px] outline-yellow-400 text-yellow-400"
                    : "text-slate-500 hover:text-slate-350"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main workspace */}
      <div className="w-[1400px] max-w-[1400px] px-8 py-12 flex flex-col justify-start items-start mx-auto">

        {/* ── Tab 1: OVERVIEW ── */}
        {trustTab === "OVERVIEW" && (
          <div className="w-full flex flex-col gap-6">

            {/* Top 6 Metric Boxes */}
            <div className="w-full grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 bg-yellow-400/10 p-[1px]">
              {[
                { val: "9.4/10",   label: "TRUST INDEX",      color: "text-yellow-400" },
                { val: "14,892",   label: "SCAMS BLOCKED",    color: "text-fuchsia-500" },
                { val: "284,103",  label: "SAFE TRADES",      color: "text-emerald-400" },
                { val: "$4.2M",    label: "ESCROW VOL",       color: "text-cyan-400" },
                { val: "62,100",   label: "VERIFIED USERS",   color: "text-cyan-400" },
                { val: "0.003%",   label: "FRAUD RATE",       color: "text-emerald-400" },
              ].map(({ val, label, color }) => (
                <div key={label} className="p-5 bg-gray-950 flex flex-col items-center">
                  <span className={`text-center ${color} text-xl font-black font-mono`}>{val}</span>
                  <span className="text-center text-slate-500 text-[8px] font-mono mt-1.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            {/* Row 2: Escrow holds + Live threats */}
            <div className="grid grid-cols-[1fr_1fr] gap-6 max-lg:grid-cols-1">

              {/* Wallet hold status card */}
              <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 flex flex-col justify-start items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
                  <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest uppercase">ESCROW_01</span>
                </div>
                <h4 className="text-slate-200 text-2xl font-extrabold font-mono mt-1.5 tracking-wide uppercase">
                  WALLET HOLD STATUS
                </h4>

                <div className="w-full grid grid-cols-4 gap-4 py-8">
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
                      <div className="flex justify-between items-center text-[9.28px] font-mono">
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
              <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-fuchsia-500/25 flex flex-col justify-start items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.5)]"></div>
                  <span className="text-fuchsia-500 text-[9.92px] font-mono tracking-widest uppercase">THREAT_01</span>
                </div>
                <h4 className="text-slate-200 text-2xl font-extrabold font-mono mt-1.5 tracking-wide uppercase">
                  LIVE THREATS
                </h4>
                <div className="flex items-center gap-2 mt-4 text-[9.60px] font-mono text-emerald-400 uppercase select-none">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#10b981]"></span>
                  MONITORING ACTIVE
                </div>

                <div className="w-full flex flex-col gap-3 mt-6">
                  {incidents.slice(0, 4).map((i) => (
                    <div key={i.id} className="py-2.5 border-b border-white/5 flex items-center justify-between gap-3 text-[9.6px] font-mono w-full">
                      <span className={`px-1.5 py-[2px] outline outline-1 outline-offset-[-1px] font-bold text-[8px] uppercase ${SEV_COLORS[i.severity] ?? ""}`}>
                        {i.severity}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-slate-200 font-bold block">{i.type}</span>
                        <span className="text-slate-500 text-[8.32px] truncate block mt-0.5">{i.desc}</span>
                      </div>
                      <span className={`px-1.5 py-[2px] outline outline-1 outline-offset-[-1px] uppercase ${STATUS_COLORS[i.status] ?? ""}`}>
                        {i.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: Trust score distribution */}
            <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-yellow-400/25 flex flex-col justify-start items-start w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-yellow-400 shadow-[0_0_8px_rgba(255,215,0,0.5)]"></div>
                <span className="text-yellow-400 text-[9.92px] font-mono tracking-widest uppercase">DIST_01</span>
              </div>
              <h4 className="text-slate-200 text-2xl font-extrabold font-mono mt-1.5 tracking-wide uppercase">
                TRUST SCORE DISTRIBUTION
              </h4>

              <div className="w-full grid grid-cols-6 gap-3 pt-10 pb-4 items-end">
                {[
                  { label: "9.5–10", count: "12,480", pct: 65, color: "bg-cyan-400 shadow-[0_0_6px_#00ffff]",    tColor: "text-cyan-400" },
                  { label: "9.0–9.5", count: "18,340", pct: 90, color: "bg-emerald-400 shadow-[0_0_6px_#10b981]", tColor: "text-emerald-400" },
                  { label: "8.5–9.0", count: "14,210", pct: 74, color: "bg-yellow-400 shadow-[0_0_6px_#ffb900]",  tColor: "text-yellow-400" },
                  { label: "8.0–8.5", count: "9,870",  pct: 48, color: "bg-orange-500 shadow-[0_0_6px_#f97316]",  tColor: "text-orange-400" },
                  { label: "7.0–8.0", count: "5,120",  pct: 26, color: "bg-fuchsia-500 shadow-[0_0_6px_#ff00ff]", tColor: "text-fuchsia-500" },
                  { label: "<7.0",    count: "2,080",  pct: 11, color: "bg-slate-500 shadow-[0_0_6px_#64748b]",   tColor: "text-slate-500" },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-col items-center gap-1.5">
                    <span className={`text-[8.80px] font-mono leading-none ${bar.tColor}`}>{bar.count}</span>
                    <div className="w-full h-1.5 bg-slate-900/50 relative">
                      <div className={`h-full ${bar.color}`} style={{ width: `${bar.pct}%` }}></div>
                    </div>
                    <span className="text-slate-500 text-[8px] font-mono uppercase mt-1">{bar.label}</span>
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
                  <span className={`text-center ${color} text-2xl font-black font-mono`}>{val}</span>
                  <span className="text-center text-slate-500 text-[8.32px] font-mono mt-1.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-fuchsia-500/25 flex flex-col justify-start items-start w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.5)]"></div>
                <span className="text-fuchsia-500 text-[9.92px] font-mono tracking-widest uppercase">INC_LOG</span>
              </div>
              <h4 className="text-slate-200 text-3xl font-extrabold font-mono mt-1.5 tracking-wide uppercase">
                INCIDENT LOG
              </h4>

              {/* Table header */}
              <div className="w-full mt-10 border-b border-fuchsia-500/20 pb-2 flex text-slate-500 text-[8.32px] font-mono uppercase tracking-wide">
                <div className="w-24">ID</div>
                <div className="w-32">TYPE</div>
                <div className="w-20">SEV</div>
                <div className="w-28">TIME</div>
                <div className="flex-1">TARGET</div>
                <div className="w-24 text-right">STATUS</div>
              </div>

              {/* Table rows */}
              <div className="w-full flex flex-col pt-1">
                {incidents.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 font-mono text-sm uppercase">
                    No active incidents. Threat monitoring status: 100% SECURE.
                  </div>
                ) : (
                  incidents.map((i) => (
                    <div key={i.id} className="w-full h-14 border-b border-white/5 flex items-center justify-between text-[9.6px] font-mono">
                      <div className="w-24 text-slate-500">#{`INC-${INC_ID_MAP[i.id] ?? "9800"}`}</div>
                      <div className="w-32 text-slate-200 uppercase font-bold">{i.type}</div>
                      <div className="w-20">
                        <span className={`px-1.5 py-[2.40px] outline outline-1 outline-offset-[-1px] font-bold text-[8.32px] ${SEV_COLORS[i.severity] ?? ""}`}>
                          {i.severity}
                        </span>
                      </div>
                      <div className="w-28 text-slate-500 flex items-center gap-1.5">
                        <span className="text-[10px]">🕒</span>
                        <span>{INC_TIME_MAP[i.id] ?? "6h ago"}</span>
                      </div>
                      <div className="flex-1 text-slate-400 truncate pr-4">{i.desc}</div>
                      <div className="w-24 flex justify-end items-center gap-2">
                        <span className={`px-1.5 py-[2.40px] outline outline-1 outline-offset-[-1px] text-[8.32px] ${STATUS_COLORS[i.status] ?? ""}`}>
                          {i.status}
                        </span>
                        <button
                          onClick={() => {
                            setIncidents((prev: any[]) => prev.filter((item) => item.id !== i.id));
                            notify("Incident dismissed successfully.");
                          }}
                          className="px-2 py-1 bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 text-[8px] tracking-wider uppercase font-bold cursor-pointer transition rounded-sm"
                          title="Dismiss log"
                        >
                          ✕
                        </button>
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

            {/* Left: Hold Breakdown */}
            <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 flex flex-col justify-start items-start w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
                <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest uppercase">ESC_01</span>
              </div>
              <h4 className="text-slate-200 text-3xl font-extrabold font-mono mt-1.5 tracking-wide uppercase">
                HOLD BREAKDOWN
              </h4>

              <div className="w-full flex justify-around py-12">
                {[
                  { val: 87, label: "ACTIVE HOLDS", color: "text-cyan-400" },
                  { val: 64, label: "PENDING",      color: "text-fuchsia-500" },
                  { val: 99, label: "SECURED",      color: "text-yellow-400" },
                ].map((g) => (
                  <RadialGauge key={g.label} {...g} />
                ))}
              </div>

              <div className="w-full mt-auto pt-6">
                <div className="w-full h-16 p-4 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex justify-between items-center">
                  <span className="text-slate-500 text-[9.60px] font-mono uppercase tracking-wide">TOTAL LOCKED FUNDS</span>
                  <span className="text-cyan-400 text-xl font-extrabold font-mono tracking-wide">$4,200,000</span>
                </div>
              </div>
            </div>

            {/* Right: Daily Volume */}
            <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-yellow-400/25 flex flex-col justify-start items-start w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-yellow-400 shadow-[0_0_8px_rgba(255,215,0,0.5)]"></div>
                <span className="text-yellow-400 text-[9.92px] font-mono tracking-widest uppercase">ESC_02</span>
              </div>
              <h4 className="text-slate-200 text-3xl font-extrabold font-mono mt-1.5 tracking-wide uppercase">
                DAILY VOLUME
              </h4>

              <div className="w-full grid grid-cols-5 gap-3 pt-10 pb-4 items-end">
                {[
                  { label: "Jun 18", pct: 45 },
                  { label: "Jun 19", pct: 35 },
                  { label: "Jun 20", pct: 78 },
                  { label: "Jun 21", pct: 62 },
                  { label: "Jun 22", pct: 95 },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-col items-center gap-1.5">
                    <div className="w-full h-1.5 bg-yellow-400/10 outline outline-1 outline-offset-[-1px] outline-yellow-400/30 relative">
                      <div className="h-full bg-yellow-400 shadow-[0_0_6px_#ffb900]" style={{ width: `${bar.pct}%` }}></div>
                    </div>
                    <span className="text-slate-500 text-[8px] font-mono uppercase mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>

              <div className="w-full flex flex-col mt-4 font-mono text-[9.60px] tracking-wide">
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
                    <span className={`w-20 text-right ${row.crit ? "text-fuchsia-500 font-semibold" : "text-emerald-400"}`}>
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
            <div className="w-full p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-yellow-400/25 flex flex-col justify-start items-start">
              <div className="self-stretch inline-flex justify-between items-end">
                <div className="w-96 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch inline-flex justify-start items-center gap-3">
                    <div className="w-6 h-px bg-yellow-400 shadow-[0_0_8px_rgba(255,215,0,0.5)]"></div>
                    <span className="text-yellow-400 text-[9.92px] font-mono tracking-widest uppercase">
                      BRK_01 // VERIFIED OPERATORS
                    </span>
                  </div>
                  <h4 className="text-slate-200 text-3xl font-extrabold font-mono mt-1.5 tracking-[2.80px] uppercase">
                    BROKER DIRECTORY
                  </h4>
                </div>
              </div>

              <div className="w-full grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 mt-8">
                {brokersList.length === 0 ? (
                  <div className="col-span-3 py-12 text-center text-slate-500 font-mono text-sm uppercase">
                    No brokers currently registered.
                  </div>
                ) : (
                  brokersList.map((b: any) => (
                    <div key={b.id} className="p-5 bg-yellow-400/5 outline outline-1 outline-offset-[-1px] outline-yellow-400/20 flex flex-col justify-start items-start w-full">
                      <div className="self-stretch flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="size-11 bg-yellow-400/10 outline outline-1 outline-offset-[-1px] outline-yellow-400/40 flex justify-center items-center shrink-0">
                            <span className="text-yellow-400 text-xs font-black font-mono uppercase">{b.initials}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-slate-200 text-xs font-bold font-mono tracking-wide uppercase">{b.name}</span>
                            <div className="flex items-center gap-1.5 mt-1 text-emerald-400 text-[8.32px] font-mono select-none">
                              <span className="text-[10px]">✔</span>
                              <span>VERIFIED</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-yellow-400 text-lg font-black font-mono leading-none">{b.trust}</span>
                          <span className="text-slate-500 text-[7.68px] font-mono mt-1 uppercase tracking-wide">TRUST SCORE</span>
                        </div>
                      </div>

                      <div className="self-stretch grid grid-cols-3 gap-2.5 mt-4">
                        {[
                          { label: "TRADES",   val: b.trades },
                          { label: "VOLUME",   val: b.volume },
                          { label: "DISPUTES", val: b.disputes, highlight: b.disputes === 0 },
                        ].map(({ label, val, highlight }) => (
                          <div key={label} className="p-2 bg-black/40 flex flex-col items-center">
                            <span className="text-slate-500 text-[7.68px] font-mono uppercase">{label}</span>
                            <strong className={`text-xs font-bold font-mono mt-1 ${highlight !== undefined ? (highlight ? "text-emerald-400" : "text-slate-200") : "text-slate-200"}`}>
                              {val}
                            </strong>
                          </div>
                        ))}
                      </div>

                      <div className="text-slate-500 text-[8.32px] font-mono mt-4 uppercase">
                        MEMBER SINCE {b.since}
                      </div>

                      <div className="self-stretch flex gap-2 mt-4 pt-3 border-t border-white/5">
                        <button
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
                          className="flex-1 py-1.5 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-mono text-[9px] font-bold hover:bg-cyan-400 hover:text-black uppercase cursor-pointer transition rounded-sm"
                        >
                          PROMOTE
                        </button>
                        <button
                          onClick={() => {
                            setBrokersList((prev: any[]) => prev.filter((item) => item.id !== b.id));
                            notify(`Banned operator ${b.name} from directory.`);
                          }}
                          className="flex-1 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[9px] font-bold hover:bg-red-500 hover:text-white uppercase cursor-pointer transition rounded-sm"
                        >
                          BAN USER
                        </button>
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
