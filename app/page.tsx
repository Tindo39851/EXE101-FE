"use client";

import React from "react";
import { Bell } from "lucide-react";
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

function MainContent() {
  const stateVal = useAppStateInternal();
  const {
    view,
    setView,
    state,
    currentUser,
    isLoggedIn,
    setIsLoggedIn,
    switchRole,
    notify,
    toast,
    hydrated
  } = stateVal;

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-black text-cyan-400 font-mono flex justify-center items-center select-none uppercase tracking-widest">
        INITIALIZING CORE SECURITY ENVIRONMENT...
      </div>
    );
  }

  return (
    <AppStateContext.Provider value={stateVal}>
      <div className="min-h-screen bg-black text-slate-100 flex flex-col font-mono selection:bg-cyan-500/30">
        
        {/* Sticky Header Nav */}
        <header className="sticky top-0 z-40 grid min-h-13 grid-cols-[240px_1fr_210px] items-center border-b border-cyan-300/40 bg-slate-950/95 px-12 py-2 uppercase shadow-[0_1px_18px_rgba(0,246,255,.18)] max-lg:grid-cols-1 max-lg:gap-3 max-lg:px-5">
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div
                  onClick={() => setView("profile")}
                  className="relative grid size-9 place-items-center border-2 border-cyan-300 text-cyan-300 shadow-cyan after:absolute after:-right-2 after:-top-1 after:size-2 after:rounded-full after:bg-fuchsia-500 after:shadow-magenta cursor-pointer hover:opacity-85 select-none font-bold"
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span
                    onClick={() => setView("profile")}
                    className="text-[10px] font-black tracking-[.18em] text-cyan-300 cursor-pointer hover:underline uppercase leading-none"
                  >
                    {currentUser.name.toUpperCase()}
                  </span>
                  <span
                    onClick={() => {
                      setIsLoggedIn(false);
                      setView("signin");
                      notify("Logged out from GAMETRUST.");
                    }}
                    className="text-[8px] text-fuchsia-400 font-mono tracking-widest cursor-pointer hover:underline mt-1.5 uppercase"
                  >
                    [ SIGN OUT ]
                  </span>
                </div>
              </>
            ) : (
              <button
                onClick={() => setView("signin")}
                className="text-cyan-400 text-[10.40px] font-semibold font-mono tracking-widest uppercase hover:underline cursor-pointer border-none bg-transparent p-0"
              >
                SIGN IN / SIGN UP
              </button>
            )}
          </div>

          <nav className="flex flex-wrap justify-center gap-3 select-none">
            {[
              ["overview", "Home"],
              ["market", "Marketplace"],
              ["matching", "Tournament"],
              ["clan", "Clan"],
              ["community", "Social Feed"],
              ["admin", "Trust Dashboard"],
              ["checkout", "Checkout"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setView(id as any)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-mono bg-transparent border-none cursor-pointer transition-all ${
                  view === id
                    ? "text-cyan-300 drop-shadow-[0_0_6px_#00ffff] font-bold"
                    : "text-slate-500 hover:text-slate-350"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4 max-lg:justify-start">
            <span className="text-[10px] text-slate-500 select-none">9.9K</span>
            <div className="grid size-9 rotate-45 place-items-center border border-cyan-300 text-[9px] text-cyan-300 shadow-cyan select-none">
              <span className="-rotate-45">GT</span>
            </div>
            <button
              onClick={() => setView("notifications")}
              className="relative hover:opacity-80 p-1 flex items-center justify-center cursor-pointer border-none bg-transparent"
            >
              <Bell className="size-4 text-cyan-300" />
              {state.notifications?.some((n) => n.unread) && (
                <span className="absolute top-[2px] right-[2px] size-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,1)]"></span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Views Rendering inside Main Tag */}
        <main className="mx-auto w-[min(1260px,calc(100vw-72px))] py-8 max-lg:w-[calc(100%-28px)] flex-1">
          {view === "overview" && <OverviewView />}
          {view === "market" && <MarketView />}
          {view === "matching" && <TournamentView />}
          {view === "clan" && <ClanView />}
          {view === "community" && <CommunityView />}
          {view === "admin" && <AdminView />}
          {view === "checkout" && <CheckoutView />}
          {view === "notifications" && <NotificationsView />}
          {view === "signin" && <SignInView />}
          {view === "signup" && <SignUpView />}
          {view === "profile" && <ProfileView />}
        </main>

        {/* Fixed Demo Access Role Selector */}
        <aside className="fixed bottom-6 right-6 z-40 grid w-64 gap-3 border border-cyan-300/50 bg-slate-950/95 p-4 shadow-cyan max-lg:static max-lg:m-4 max-lg:w-auto select-none">
          <label className="text-[10px] uppercase tracking-[.22em] text-cyan-300">
            Demo Access Role
          </label>
          <select
            className="p-3 bg-slate-900 border border-cyan-300/40 text-cyan-400 text-xs font-mono focus:outline-none focus:border-cyan-300"
            value={currentUser.role}
            onChange={(event) => switchRole(event.target.value as Role)}
          >
            <option value="gamer">Gamer</option>
            <option value="creator">Creator</option>
            <option value="shop">Shop</option>
            <option value="admin">Admin</option>
          </select>
        </aside>

        {/* Global Toast Alert */}
        <div
          className={`fixed bottom-40 right-6 z-50 max-w-sm border border-cyan-300/50 bg-slate-950/95 p-4 text-cyan-300 shadow-cyan transition-all duration-350 select-none ${
            toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
          }`}
          role="status"
        >
          {toast}
        </div>

      </div>
    </AppStateContext.Provider>
  );
}

export default function Home() {
  return <MainContent />;
}
