"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/data/constants";
import { useAppState } from "@/hooks/use-app-state";
import { StaggerContainer, StaggerItem, AnimatedSection } from "@/components/shared/Motion";
import { useCountUp } from "@/hooks/useCountUp";

function StatCounter({
  value,
  label,
  color,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  label: string;
  color: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const count = useCountUp({ target: value, duration: 1600, decimals });
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <strong className={`block text-3xl font-black tabular-nums ${color}`}>
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
      </strong>
      <span className="text-[8.5px] uppercase tracking-widest text-slate-500 font-bold mt-1">
        {label}
      </span>
    </motion.div>
  );
}

export function OverviewView() {
  const { state, setView, revenue, premiumUsers, matches } = useAppState();

  const metrics = [
    [state.posts.length, "FEED POSTS"],
    [matches.length, "TEAM MATCHES"],
    [
      state.posts.filter((p) => p.sponsored).length + state.sponsors.length,
      "ADS / PINNED",
    ],
    [state.transactions.length, "TRANSACTIONS"],
  ];

  return (
    <section className="flex flex-col gap-12">
      {/* ── Hero ── */}
      <div className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-140px)] overflow-hidden">
        {/* Inner grid fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,246,255,0.04) 0%, transparent 80%)",
          }}
        />

        {/* Staggered hero content */}
        <StaggerContainer className="flex flex-col items-center gap-7 relative z-10">
          <StaggerItem>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400/70">
              Next generation gaming asset exchange
            </p>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-[clamp(56px,12vw,144px)] font-black leading-[0.85] uppercase tracking-tight">
              <span className="block text-slate-100" style={{ textShadow: "0 0 40px rgba(255,255,255,0.08)" }}>
                GAME
              </span>
              <span
                className="block text-cyan-400"
                style={{ textShadow: "0 0 30px rgba(0,246,255,0.4), 0 0 80px rgba(0,246,255,0.15)" }}
              >
                TRUST
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-slate-400 text-xs max-w-sm tracking-wider leading-relaxed font-sans">
              Trade game accounts, skins and items with zero counterparty risk
              using verifiable escrow smart handshakes.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="min-w-48 bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] font-black tracking-widest uppercase border-none transition-colors duration-200"
                  style={{ boxShadow: "0 0 20px rgba(0,246,255,0.25)" }}
                  onClick={() => setView("market")}
                >
                  Enter Market <ChevronRight className="ml-1 size-3.5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-48 border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-500/10 hover:border-fuchsia-400 text-[10px] font-black tracking-widest uppercase transition-all duration-200"
                  onClick={() => setView("matching")}
                >
                  Join Tournament
                </Button>
              </motion.div>
            </div>
          </StaggerItem>

          {/* Animated stats counters */}
          <StaggerItem>
            <div className="flex justify-center gap-16 mt-6">
              <StatCounter
                value={state.users.length}
                suffix="K"
                label="Active Users"
                color="text-yellow-400"
              />
              <StatCounter
                value={revenue / 1000}
                prefix="$"
                suffix="K"
                label="Escrow Volume"
                color="text-cyan-300"
                decimals={1}
              />
              <StatCounter
                value={premiumUsers}
                label="Premium Nodes"
                color="text-fuchsia-400"
              />
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Status ticker */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-around text-[8px] font-bold tracking-[0.2em] text-cyan-400/30 uppercase select-none max-md:hidden">
          <span>VERIFIED BROKERS: 347</span>
          <span>ACTIVE SIGNALS: 1,203</span>
          <span>DISPUTES RESOLVED: 8,441</span>
          <span>FRAUD RATE: 0.003%</span>
        </div>
      </div>

      {/* ── Info Cards ── */}
      <AnimatedSection>
        <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {/* Business loop */}
          <motion.div
            className="cyber-card cyber-corners p-6 relative"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0" />
            <p className="text-[8.5px] font-black tracking-widest text-cyan-400/60 uppercase mb-4">
              SECT_01 // BUSINESS LOOP
            </p>
            <div className="flex flex-wrap gap-2">
              {["Create Persona", "Publish Feed", "Match Squad", "Unlock Premium", "Track Revenue"].map(
                (step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-slate-600 text-[10px]">›</span>}
                    <span className="border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-cyan-400 text-[9px] font-bold tracking-wider uppercase">
                      {step}
                    </span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Prototype proof */}
          <motion.div
            className="cyber-card p-6 relative"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500 to-fuchsia-500/0" />
            <p className="text-[8.5px] font-black tracking-widest text-fuchsia-400/60 uppercase mb-4">
              SECT_02 // PROTOTYPE PROOF
            </p>
            <ul className="space-y-3 text-xs text-slate-400 font-sans leading-relaxed">
              {[
                "Role login switches user profiles and escrow privileges.",
                "Profile edits prompt trust score recalculation.",
                "Checkout logs transactions and updates platform revenue.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-fuchsia-500 mt-0.5 shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ── Metric Cards ── */}
      <AnimatedSection delay={0.1}>
        <StaggerContainer className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {metrics.map(([value, label]) => (
            <StaggerItem key={String(label)}>
              <div className="cyber-card p-5 flex flex-col gap-1">
                <strong className="text-2xl text-cyan-400 font-black tabular-nums">
                  {value}
                </strong>
                <span className="text-[8.5px] uppercase tracking-widest text-slate-500 font-bold">
                  {label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>
    </section>
  );
}

export default OverviewView;
