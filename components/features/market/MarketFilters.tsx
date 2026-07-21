import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MarketFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  priceMin: string;
  setPriceMin: (val: string) => void;
  priceMax: string;
  setPriceMax: (val: string) => void;
  trustSort: "none" | "desc" | "asc";
  setTrustSort: (val: "none" | "desc" | "asc") => void;
  gameFilter: string;
  setGameFilter: (val: string) => void;
}

export function MarketFilters({
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
}: MarketFiltersProps) {
  return (
    <div className="w-full flex flex-col gap-4 font-mono select-none">
      {/* Search and Price Input Row */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-white/5 pb-4">
        {/* Search Input Box */}
        <div className="flex-1 min-w-[280px] h-10 relative">
          <Search className="size-3.5 left-[13.5px] top-[13px] absolute text-slate-500" />
          <input
            type="text"
            placeholder="Search game, rank, seller node..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-cyan-950/10 border border-cyan-400/25 text-slate-200 text-xs transition placeholder-slate-500/50 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,246,255,0.2)] focus:outline-none"
          />
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-4 flex-wrap text-xs">
          {/* Price Range Fields */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">PRICE:</span>
            <input
              type="text"
              placeholder="MIN"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-20 h-10 px-2 bg-cyan-950/15 border border-cyan-400/20 text-center text-slate-200 text-xs placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
            <span className="text-slate-700 font-bold">-</span>
            <input
              type="text"
              placeholder="MAX"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-20 h-10 px-2 bg-cyan-950/15 border border-cyan-400/20 text-center text-slate-200 text-xs placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Trust Rating Filter Trigger */}
          <button
            onClick={() => {
              setTrustSort(
                trustSort === "none" ? "desc" : trustSort === "desc" ? "asc" : "none"
              );
            }}
            className="h-10 px-4 bg-cyan-950/15 border border-cyan-400/20 hover:border-cyan-400/50 flex justify-start items-center gap-2 transition cursor-pointer text-cyan-400"
          >
            <SlidersHorizontal className="size-3" />
            <span className="text-[9px] font-black tracking-widest uppercase">TRUST RATING</span>
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      </div>

      {/* Game Filters Toolbar */}
      <div className="flex gap-2.5 flex-wrap">
        {["ALL", "Freefire", "Arena of Valor"].map((g) => {
          const active = gameFilter === g;
          return (
            <button
              key={g}
              onClick={() => setGameFilter(g)}
              className={`h-7 px-3.5 py-[5px] border text-[9px] font-black uppercase tracking-widest inline-flex justify-center items-center transition duration-300 cursor-pointer ${
                active
                  ? "bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.3)]"
                  : "border-cyan-400/20 text-slate-500 hover:border-slate-400 hover:text-slate-300"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
}
