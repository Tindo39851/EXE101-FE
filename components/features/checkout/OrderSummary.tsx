import React from "react";
import type { CartItem } from "@/lib/types";
import { listings } from "@/lib/data/listings";
import { money } from "@/lib/data/constants";

interface OrderSummaryProps {
  cart: CartItem | null;
  lastPurchased: CartItem | null;
}

export function OrderSummary({ cart, lastPurchased }: OrderSummaryProps) {
  const activeCartItem = cart || lastPurchased;
  if (!activeCartItem) return null;

  // Attempt to match with listings data
  const matchedListing = listings.find((l) => l.id === activeCartItem.id);
  const code = matchedListing?.code || "GT";
  const title = matchedListing?.title || activeCartItem.name;
  const badge = matchedListing?.badge || "PREMIUM";
  const server = matchedListing?.server.split("·")[0]?.trim() || "GLOBAL NODE";
  const seller = matchedListing?.server.split("·")[1]?.trim() || "GAMETRUST // ESCROW";
  const rating = matchedListing?.trust || "10.0";
  const soldCount = matchedListing?.sold || "12";

  const price = activeCartItem.price;
  const fee = activeCartItem.kind === "tournament" ? 0 : price * 0.025;
  const total = price + fee;

  return (
    <div className="w-96 shrink-0 flex flex-col justify-start items-start font-mono select-none">
      <div className="self-stretch p-6 bg-slate-950/85 border border-cyan-400/20 flex flex-col justify-start items-start w-full relative hover:shadow-[0_0_20px_rgba(0,246,255,0.1)] transition-all duration-300">
        {/* Top visual glow bar */}
        <div className="absolute left-[1px] right-[1px] top-[1px] h-[3px] bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(0,246,255,0.5)]" />

        <span className="text-cyan-400 text-[10px] font-black tracking-widest mt-4 uppercase">
          ORDER SUMMARY
        </span>

        {/* Thumbnail Preview Box */}
        <div className="self-stretch mt-5">
          <div className="p-3.5 bg-cyan-400/[0.02] border border-cyan-400/10 flex justify-start items-center gap-3.5">
            <div className="size-10 shrink-0 bg-cyan-400/5 border border-cyan-400/20 flex justify-center items-center text-cyan-400 text-xs font-black">
              {code}
            </div>
            <div>
              <h5 className="text-slate-200 text-xs font-black uppercase leading-none truncate max-w-[200px]">
                {title}
              </h5>
              <p className="text-slate-500 text-[8px] font-bold mt-1.5 uppercase leading-none">
                {badge} · {server}
              </p>
            </div>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="self-stretch mt-5 flex flex-col">
          <div className="py-2 border-b border-white/5 flex justify-between items-center text-xs">
            <span className="text-slate-500 text-[9px] font-bold uppercase">LISTING PRICE</span>
            <span className="text-slate-200 font-bold">{money.format(price)}</span>
          </div>

          <div className="py-2 border-b border-white/5 flex justify-between items-center text-xs">
            <span className="text-slate-500 text-[9px] font-bold uppercase">
              {activeCartItem.kind === "tournament" ? "TOURNAMENT SERVICE FEE" : "ESCROW FEE (2.5%)"}
            </span>
            <span className="text-slate-200 font-bold">{money.format(fee)}</span>
          </div>

          <div className="pt-3.5 pb-2 flex justify-between items-center text-xs">
            <span className="text-slate-200 text-xs font-black uppercase">GRAND TOTAL</span>
            <span className="text-fuchsia-500 text-base font-black tracking-wide">
              {money.format(total)}
            </span>
          </div>
        </div>

        {/* Security checklist safeguards */}
        <div className="self-stretch mt-5 flex flex-col gap-2.5 text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">🛡️</span>
            <span>Escrow Protected Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>256-bit Encrypted Handshake</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            <span>15–30 min average handoff</span>
          </div>
        </div>

        {/* Seller Info segment */}
        <div className="self-stretch mt-6 pt-5 border-t border-white/5 w-full">
          <div className="p-3.5 bg-yellow-400/[0.01] border border-yellow-400/10 flex flex-col items-start w-full">
            <span className="text-slate-500 text-[8px] font-bold uppercase">SELLER NODE</span>
            <div className="flex items-center gap-2.5 mt-2">
              <div className="size-7 bg-yellow-400/10 border border-yellow-400/35 flex justify-center items-center text-yellow-400 text-[9px] font-black">
                {seller.charAt(0)}
              </div>
              <div>
                <strong className="text-slate-200 text-[10px] font-black block uppercase leading-none">
                  {seller}
                </strong>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-yellow-400 text-[7.5px] font-bold uppercase leading-none">
                    ★ {rating}/10 · {soldCount} COMPLETED DEALS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
