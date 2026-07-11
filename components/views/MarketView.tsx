import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { plans, listings } from "@/lib/data/listings";
import { money } from "@/lib/data/constants";

export function MarketView() {
  const {
    setView,
    state,
    searchQuery,
    setSearchQuery,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    trustSort,
    setTrustSort,
    gameFilter,
    setGameFilter,
    filteredListings,
    currentUser,
    buyCart
  } = useAppState();

  return (
    <section className="flex flex-col gap-6 bg-black p-0">
      {/* Back Button */}
      <button
        onClick={() => setView("overview")}
        className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left cursor-pointer"
      >
        ← BACK TO HOME
      </button>

      {/* Marketplace Banner */}
      <div className="relative bg-gray-950/95 border-b border-cyan-400/20 py-8 px-6 flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-stretch">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-cyan-400 shadow-[0px_0px_8px_rgba(0,255,255,1)]"></div>
            <span className="text-cyan-400 text-[9.9px] font-mono tracking-widest font-semibold uppercase">MKT_00 // ACCOUNT EXCHANGE</span>
          </div>
          <h3 className="text-slate-200 text-3xl font-extrabold font-mono tracking-widest uppercase">
            MARKETPLACE
          </h3>
        </div>
        <button
          onClick={() => setView("checkout")}
          className="px-3.5 py-1.5 bg-fuchsia-500/10 outline outline-1 outline-offset-[-1px] outline-fuchsia-500/30 text-fuchsia-500 text-[10px] font-mono tracking-wider font-bold hover:bg-fuchsia-500/20 transition uppercase cursor-pointer"
        >
          VIEW CART {state.cart ? "(1)" : "(EMPTY)"}
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-white/5 pb-4">
        <div className="flex-1 min-w-[280px] h-10 relative">
          <Search className="size-3.5 left-[13.5px] top-[13px] absolute text-slate-500" />
          <input
            type="text"
            placeholder="Search game, rank, seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-3.5 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 text-slate-200 text-xs font-mono placeholder-slate-500/50 focus:outline-cyan-400/50 transition"
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[9.6px] font-mono uppercase">PRICE:</span>
            <input
              type="text"
              placeholder="MIN"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-20 h-10 px-2.5 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-center text-slate-200 text-xs font-mono placeholder-slate-500 focus:outline-cyan-400/50"
            />
            <input
              type="text"
              placeholder="MAX"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-20 h-10 px-2.5 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-center text-slate-200 text-xs font-mono placeholder-slate-500 focus:outline-cyan-400/50"
            />
          </div>

          <button
            onClick={() => {
              setTrustSort(
                trustSort === "none" ? "desc" : trustSort === "desc" ? "asc" : "none"
              );
            }}
            className="h-10 px-4 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/30 flex justify-start items-center gap-2 hover:bg-cyan-400/10 transition cursor-pointer"
          >
            <SlidersHorizontal className="size-3 text-cyan-400" />
            <span className="text-cyan-400 text-[9.9px] font-mono tracking-wide uppercase">TRUST SCORE</span>
            <ArrowUpDown className="size-3 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Game tags */}
      <div className="flex gap-2.5 flex-wrap">
        {["ALL", "Freefire", "Arena of Valor"].map((g) => {
          const active = gameFilter === g;
          return (
            <button
              key={g}
              onClick={() => setGameFilter(g)}
              className={`h-6 px-3 py-[4.80px] outline outline-1 outline-offset-[-1px] text-[9.6px] font-mono uppercase tracking-wide inline-flex justify-center items-center transition cursor-pointer ${
                active
                  ? "bg-cyan-400/10 outline-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                  : "outline-cyan-400/20 text-slate-500 hover:bg-cyan-400/5 hover:text-slate-300"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Items count bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <div className="text-slate-500 text-[10.4px] font-mono">
          SHOWING <span className="text-cyan-400">{filteredListings.length}</span> / {listings.length} LISTINGS
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(0,255,136,1)]"></span>
          <span className="text-emerald-400 text-[9.6px] font-mono uppercase">LIVE LISTINGS</span>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-4 gap-5 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-gray-950/95 border border-cyan-400/20 flex flex-col justify-start items-start relative hover:border-cyan-400/40 transition"
          >
            {/* Top color glow line */}
            <div
              className="absolute left-[1px] right-[1px] top-[1px] h-[3px]"
              style={{
                backgroundColor: item.accent,
                boxShadow: `0 0 8px ${item.accent}`
              }}
            />

            {/* Header info */}
            <div className="self-stretch flex justify-between items-start pt-3">
              <div>
                <h4 className="text-slate-200 text-sm font-bold font-mono tracking-wide uppercase">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[9.6px] font-mono mt-0.5 uppercase">
                  {item.server}
                </p>
              </div>
              <div className="px-2 py-0.5 bg-yellow-400/10 outline outline-1 outline-offset-[-1px] outline-yellow-400/30 text-yellow-400 text-[9.6px] font-mono font-semibold">
                ⭐ {parseFloat(item.trust).toFixed(1)}
              </div>
            </div>

            {/* Center graphic box */}
            <div className="self-stretch h-24 mt-4 relative bg-cyan-400/[0.02] outline outline-1 outline-white/5 flex justify-center items-center overflow-hidden">
              <span className="text-slate-800/10 text-3xl font-black font-mono tracking-widest uppercase select-none">
                {item.code}
              </span>
              <span className="absolute left-[7.4px] top-[7.4px] px-1.5 py-[2px] bg-slate-900/60 border border-white/10 text-[8.3px] font-mono text-slate-300">
                {item.badge}
              </span>
              <span className="absolute right-[7.4px] top-[7.4px] text-slate-500 text-[8.3px] font-mono uppercase">
                LVL {item.level}
              </span>
            </div>

            {/* Numeric specs grid */}
            <div className="self-stretch grid grid-cols-4 gap-1 mt-4 text-center">
              <div className="p-1">
                <span className="text-slate-500 text-[7.7px] font-mono uppercase tracking-wider block">WINS</span>
                <strong className="text-slate-200 text-xs font-bold font-mono block mt-0.5">{item.wins}</strong>
              </div>
              <div className="p-1">
                <span className="text-slate-500 text-[7.7px] font-mono uppercase tracking-wider block">SKINS</span>
                <strong className="text-slate-200 text-xs font-bold font-mono block mt-0.5">{item.skins}</strong>
              </div>
              <div className="p-1">
                <span className="text-slate-500 text-[7.7px] font-mono uppercase tracking-wider block">LVL</span>
                <strong className="text-slate-200 text-xs font-bold font-mono block mt-0.5">{item.level}</strong>
              </div>
              <div className="p-1">
                <span className="text-slate-500 text-[7.7px] font-mono uppercase tracking-wider block">SOLD</span>
                <strong className="text-slate-200 text-xs font-bold font-mono block mt-0.5">{item.sold}</strong>
              </div>
            </div>

            {/* Trust indicator text */}
            <div className="self-stretch mt-3.5 flex justify-start items-center gap-1.5 text-slate-500 text-[8.8px] font-mono border-t border-white/5 pt-3">
              <span>🛡️</span>
              <span>TRUST SCORE: {item.trust}</span>
            </div>

            {/* Bottom purchase options */}
            <div className="self-stretch mt-4 flex justify-between items-center gap-2">
              <div className="px-3 py-1.5 bg-fuchsia-500/[0.03] outline outline-1 outline-offset-[-1px] outline-fuchsia-500/25 flex flex-col items-start shrink-0">
                <span className="text-fuchsia-500 text-[7px] font-mono font-semibold uppercase tracking-wider">ESCROW PROTECTED</span>
                <span className="text-fuchsia-500 text-sm font-extrabold font-mono mt-0.5">
                  {money.format(item.price)}
                </span>
              </div>

              <button
                onClick={() => buyCart({ id: item.id, name: `${item.title} account (${item.badge})`, price: item.price, desc: `Escrow protected account, trust score ${item.trust}, server ${item.server}.` })}
                className="px-3.5 py-1.5 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/40 text-cyan-400 text-[9.3px] font-bold font-mono tracking-wider hover:bg-cyan-400/10 transition uppercase cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Upgrades Section */}
      <div className="mt-12 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-fuchsia-500 shadow-[0px_0px_8px_rgba(255,0,255,1)]"></div>
          <span className="text-fuchsia-500 text-[9.9px] font-mono tracking-widest font-semibold uppercase">REVENUE_01 // B2B UPGRADES</span>
        </div>
        <h3 className="text-slate-200 text-2xl font-extrabold font-mono tracking-widest uppercase">
          PLATFORM UPGRADES
        </h3>
        
        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 mt-2">
          {plans.map((plan) => {
            const allowed = plan.buyerRoles.includes(currentUser.role);
            return (
              <div
                key={plan.id}
                className="p-6 bg-gray-950/95 border border-fuchsia-500/20 flex flex-col justify-between items-start hover:border-fuchsia-500/40 transition relative"
              >
                <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.6)]"></div>
                <div>
                  <span className="text-slate-500 text-[8px] font-mono tracking-wider uppercase">REVENUE STREAM</span>
                  <h4 className="text-slate-200 text-lg font-bold font-mono uppercase mt-1">
                    {plan.name}
                  </h4>
                  <p className="text-slate-400 text-xs mt-2.5 leading-5 min-h-[40px]">
                    {plan.desc}
                  </p>
                </div>
                <div className="w-full mt-4 flex items-end justify-between">
                  <span className="text-fuchsia-400 text-xl font-black font-mono">
                    {money.format(plan.price)}
                  </span>
                  <button
                    disabled={!allowed}
                    onClick={() => buyCart({ id: plan.id, name: plan.name, price: plan.price, desc: plan.desc })}
                    className={`px-3.5 py-1.5 outline outline-1 outline-offset-[-1px] text-[9.3px] font-bold font-mono tracking-wider uppercase transition ${
                      allowed
                        ? "outline-cyan-400/40 text-cyan-400 hover:bg-cyan-400/5 cursor-pointer"
                        : "outline-white/5 text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {allowed ? "SELECT PACKAGE" : "ROLE LOCKED"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default MarketView;
