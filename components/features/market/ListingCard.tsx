import React from "react";
import type { Listing } from "@/lib/types";
import { money } from "@/lib/data/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ListingCardProps {
  item: Listing;
  onBuy: (item: Listing) => void;
}

export function ListingCard({ item, onBuy }: ListingCardProps) {
  const trustScoreNum = parseFloat(item.trust);
  const isHighTrust = trustScoreNum >= 9.5;

  return (
    <div className="group cyber-card-glass cyber-corners p-5 flex flex-col justify-start items-start relative transition-all duration-300 font-mono select-none hover:shadow-[0_0_25px_rgba(0,246,255,0.2)]">
      {/* Top accent glow line */}
      <div
        className="absolute left-[1px] right-[1px] top-[1px] h-[3px] transition-all duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: item.accent,
          boxShadow: `0 0 10px ${item.accent}`,
        }}
      />

      {/* Header Info */}
      <div className="self-stretch flex justify-between items-start pt-3">
        <div>
          <h4 className="text-slate-100 text-xs font-black tracking-wide uppercase leading-tight group-hover:text-cyan-300 transition-colors">
            {item.title}
          </h4>
          <p className="text-slate-500 text-[9px] mt-0.5 uppercase tracking-wider font-bold">
            {item.server}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant="upcoming" className="text-[8px] px-1.5 py-0">
            ★ {trustScoreNum.toFixed(1)}
          </Badge>
        </div>
      </div>

      {/* Center visual layout box */}
      <div className="self-stretch h-24 mt-4 relative bg-cyan-400/[0.02] border border-white/5 flex justify-center items-center overflow-hidden transition-all duration-300 group-hover:bg-cyan-400/[0.05] cyber-scanline">
        {/* Large code backdrop */}
        <span className="text-slate-900/40 text-4xl font-black tracking-widest uppercase transition-all duration-300 group-hover:scale-105 group-hover:text-slate-900/60">
          {item.code}
        </span>
        
        {/* Badge in top left */}
        <span className="absolute left-2.5 top-2.5">
          <Badge variant={isHighTrust ? "success" : "default"} className="text-[7.5px] px-1">
            {item.badge}
          </Badge>
        </span>
        
        {/* Level top right */}
        <span className="absolute right-2.5 top-2.5 text-slate-500 text-[8px] font-bold tracking-wider">
          LVL {item.level}
        </span>
      </div>

      {/* Stats specs grid */}
      <div className="self-stretch grid grid-cols-4 gap-1 mt-4 text-center">
        <div className="py-1 bg-white/[0.01] border border-white/5">
          <span className="text-slate-500 text-[7px] font-bold tracking-wider uppercase block">WINS</span>
          <strong className="text-slate-200 text-[10.5px] font-black block mt-0.5">{item.wins}</strong>
        </div>
        <div className="py-1 bg-white/[0.01] border border-white/5">
          <span className="text-slate-500 text-[7px] font-bold tracking-wider uppercase block">SKINS</span>
          <strong className="text-slate-200 text-[10.5px] font-black block mt-0.5">{item.skins}</strong>
        </div>
        <div className="py-1 bg-white/[0.01] border border-white/5">
          <span className="text-slate-500 text-[7px] font-bold tracking-wider uppercase block">LVL</span>
          <strong className="text-slate-200 text-[10.5px] font-black block mt-0.5">{item.level}</strong>
        </div>
        <div className="py-1 bg-white/[0.01] border border-white/5">
          <span className="text-slate-500 text-[7px] font-bold tracking-wider uppercase block">SOLD</span>
          <strong className="text-slate-200 text-[10.5px] font-black block mt-0.5">{item.sold}</strong>
        </div>
      </div>

      {/* Security info */}
      <div className="self-stretch mt-3.5 flex justify-start items-center gap-1.5 text-slate-500 text-[8px] font-bold border-t border-white/5 pt-3 tracking-widest uppercase">
        <span>🛡️</span>
        <span>TRUST RATIO: {item.trust}</span>
      </div>

      {/* Buy Button Row */}
      <div className="self-stretch mt-4 flex justify-between items-center gap-2">
        <div className="px-2.5 py-1 bg-fuchsia-500/[0.03] border border-fuchsia-500/20 flex flex-col items-start shrink-0">
          <span className="text-fuchsia-500 text-[6.5px] font-black tracking-widest uppercase leading-none">ESCROW SAFE</span>
          <span className="text-fuchsia-400 text-xs font-black mt-0.5">
            {money.format(item.price)}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onBuy(item)}
          className="border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-400/10 text-[9px] font-bold tracking-wider"
        >
          BUY NOW
        </Button>
      </div>
    </div>
  );
}
