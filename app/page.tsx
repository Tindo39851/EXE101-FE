"use client";

import React, { useState, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AppStateContext, useAppStateInternal } from "@/hooks/use-app-state";
import type { Role } from "@/lib/types";

// Import view components
import { OverviewView } from "@/components/views/OverviewView";
import { MarketView } from "@/components/views/MarketView";
import { TournamentView } from "@/components/views/TournamentView";
import { ClanView } from "@/components/views/ClanView";
import { CommunityView } from "@/components/views/CommunityView";
import { AdminView } from "@/components/views/AdminView";
import { CheckoutView } from "@/components/views/CheckoutView";
import { NotificationsView } from "@/components/views/NotificationsView";
import { SignInView } from "@/components/views/SignInView";
import { SignUpView } from "@/components/views/SignUpView";
import { ProfileView } from "@/components/views/ProfileView";
import { Toast } from "@/components/shared/Toast";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

// View transition variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

function MainContent() {
  const stateVal = useAppStateInternal();
  const [showDemoPanel, setShowDemoPanel] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    view,
    setView,
    state,
    currentUser,
    isLoggedIn,
    logout,
    switchRole,
    notify,
    toast,
    hydrated,
  } = stateVal;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [view]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-black text-cyan-400 font-mono flex justify-center items-center select-none uppercase tracking-[0.35em]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          INITIALIZING CORE SECURITY ENVIRONMENT...
        </motion.span>
      </div>
    );
  }

  const navItems: [string, string][] = [
    ["overview", "Home"],
    ["market", "Marketplace"],
    ["matching", "Tournament"],
    ["clan", "Clan Hub"],
    ["community", "Social Feed"],
    ["admin", "Trust Dashboard"],
    ["checkout", "Checkout"],
  ];

  const viewMap: Record<string, React.ReactElement> = {
    overview: <OverviewView />,
    market: <MarketView />,
    matching: <TournamentView />,
    clan: <ClanView />,
    community: <CommunityView />,
    admin: <AdminView />,
    checkout: <CheckoutView />,
    notifications: <NotificationsView />,
    signin: <SignInView />,
    signup: <SignUpView />,
    profile: <ProfileView />,
  };

  return (
    <AppStateContext.Provider value={stateVal}>
      {/* Ambient background orbs */}
      <div className="ambient-orbs" aria-hidden="true" />

      <div className="min-h-screen text-slate-100 flex flex-col font-mono selection:bg-cyan-500/30 overflow-x-hidden relative z-10">

        {/* ── Header ── */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/90 border-b border-cyan-400/20 px-8 py-3 flex items-center justify-between select-none">
          {/* Logo / Identity */}
          <div className="flex items-center gap-4 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <motion.div
                  onClick={() => setView("profile")}
                  className="relative size-9 flex justify-center items-center border border-cyan-400/60 text-cyan-300 cursor-pointer font-black text-xs"
                  whileHover={{ scale: 1.05, borderColor: "rgba(0,246,255,0.9)" }}
                  transition={{ duration: 0.15 }}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                  <span className="absolute -top-1 -right-1 size-1.5 bg-fuchsia-500 rounded-sm animate-dot-breathe" />
                </motion.div>
                <div className="flex flex-col">
                  <span
                    onClick={() => setView("profile")}
                    className="text-[10px] font-black tracking-widest text-cyan-400 cursor-pointer hover:text-cyan-300 uppercase leading-none transition-colors"
                  >
                    {currentUser.name}
                  </span>
                  <span
                    onClick={() => {
                      logout();
                    }}
                    className="text-[7.5px] text-fuchsia-400 font-bold tracking-widest cursor-pointer hover:text-fuchsia-300 mt-1 leading-none transition-colors"
                  >
                    [ SIGN OUT ]
                  </span>
                </div>
              </div>
            ) : (
              <motion.button
                onClick={() => setView("signin")}
                className="text-cyan-400 text-[10px] font-black tracking-widest uppercase cursor-pointer border-none bg-transparent p-0"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                SIGN IN →
              </motion.button>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="flex items-center gap-0.5 max-lg:hidden">
            {navItems.map(([id, label]) => {
              const active = view === id;
              return (
                <button
                  key={id}
                  onClick={() => setView(id as any)}
                  className={`relative px-4 py-2.5 text-[10px] tracking-widest uppercase font-bold bg-transparent border-none cursor-pointer transition-colors duration-200 ${
                    active ? "text-cyan-300" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {label}
                  {/* Animated underline indicator */}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400"
                      style={{ boxShadow: "0 0 6px rgba(0,246,255,0.7)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              onClick={() => setView("notifications")}
              aria-label="Open notifications"
              className="relative p-2 border border-cyan-400/15 hover:border-cyan-400/40 flex items-center justify-center cursor-pointer transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="size-3.5 text-cyan-300" />
              {state.notifications?.some((n) => n.unread) && (
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-fuchsia-500 animate-dot-breathe" />
              )}
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden p-2 border border-cyan-400/15 hover:border-cyan-400/40 flex items-center justify-center cursor-pointer text-cyan-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
            </button>
          </div>
        </header>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden w-full bg-slate-950/95 border-b border-cyan-400/20 overflow-hidden z-30"
            >
              <div className="py-3 px-6 flex flex-col gap-1">
                {navItems.map(([id, label]) => {
                  const active = view === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setView(id as any)}
                      className={`w-full py-2.5 text-left text-[10px] tracking-widest uppercase font-bold px-3 border-l-2 transition-all ${
                        active
                          ? "border-cyan-400 text-cyan-300 bg-cyan-400/5"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main content with view transitions */}
        <main className="w-full max-w-[1280px] mx-auto py-8 px-6 flex-1">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                {viewMap[view] ?? null}
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>

        {/* Demo Panel */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 max-lg:static max-lg:m-6 max-lg:items-stretch">
          <AnimatePresence mode="wait">
            {showDemoPanel ? (
              <motion.aside
                key="panel"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-64 max-lg:w-full bg-slate-950/95 border border-cyan-400/30 p-4 flex flex-col gap-3.5 backdrop-blur-md"
                style={{ boxShadow: "0 0 24px rgba(0,246,255,0.12)" }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                    DEMO ACCESS ROLE
                  </span>
                  <button
                    onClick={() => setShowDemoPanel(false)}
                    className="text-slate-500 hover:text-cyan-400 text-[9px] font-bold border-none bg-transparent cursor-pointer uppercase transition-colors"
                  >
                    [ CLOSE ]
                  </button>
                </div>

                <select
                  className="w-full h-10 px-3 text-cyan-300 text-xs"
                  value={currentUser.role}
                  onChange={(e) => switchRole(e.target.value as Role)}
                >
                  <option value="gamer" className="bg-slate-950">Gamer (B2C Buyer)</option>
                  <option value="creator" className="bg-slate-950">Creator (B2C Seller)</option>
                  <option value="shop" className="bg-slate-950">Shop Merchant (B2B)</option>
                </select>

                <button
                  onClick={() => {
                    window.localStorage.removeItem("gametrust-next-mvp-state");
                    window.location.reload();
                  }}
                  className="w-full py-2 bg-red-950/20 border border-red-500/20 hover:border-red-500/60 hover:bg-red-500/10 text-red-400 text-[8.5px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
                >
                  [ RESET DEMO DATA ]
                </button>
              </motion.aside>
            ) : (
              <motion.button
                key="toggle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDemoPanel(true)}
                className="py-2.5 px-4 bg-slate-950/90 border border-cyan-400/25 hover:border-cyan-400/60 text-cyan-300 text-[9px] font-black tracking-widest uppercase cursor-pointer transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🛠️ DEMO PANEL
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Global Toast */}
        <Toast message={toast} isVisible={!!toast} onDismiss={() => notify("")} />
      </div>
    </AppStateContext.Provider>
  );
}

export default function Home() {
  return <MainContent />;
}
