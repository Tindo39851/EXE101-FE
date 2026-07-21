import React from "react";
import type { CartItem } from "@/lib/types";
import { listings } from "@/lib/data/listings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReviewStepProps {
  cart: CartItem;
  onProceed: () => void;
}

export function ReviewStep({ cart, onProceed }: ReviewStepProps) {
  const matchedListing = listings.find((l) => l.id === cart.id);
  const code = matchedListing?.code || "GT";
  const title = matchedListing?.title || cart.name;
  const badge = matchedListing?.badge || "PREMIUM";
  const server = matchedListing?.server || "GAMETRUST // SECURE SYSTEM";
  const rating = matchedListing?.trust || "10.0";
  const wins = matchedListing?.wins || "—";
  const skins = matchedListing?.skins || "—";
  const level = matchedListing?.level || "—";

  return (
    <div className="self-stretch flex flex-col justify-start items-start font-mono select-none w-full">
      <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">
        STEP 1 — REVIEW SECURITY LISTING
      </span>

      <div className="self-stretch pt-5 w-full">
        {/* Inner Listing Card Details */}
        <div className="p-7 bg-slate-950/80 border border-orange-500/20 flex flex-col justify-start items-start w-full relative">
          <div className="absolute left-[1px] right-[1px] top-[1px] h-[3px] bg-orange-500 shadow-[0_0_8px_#ff6b1a]" />

          <div className="self-stretch pt-3 flex justify-start items-start gap-6 max-sm:flex-col">
            {/* Graphic Badge box */}
            <div className="size-28 shrink-0 relative bg-orange-500/5 border border-orange-500/25 flex justify-center items-center overflow-hidden">
              <span className="text-orange-500/15 text-4xl font-black">
                {code}
              </span>
              <div className="absolute bottom-2.5 left-2.5">
                <Badge variant="upcoming" className="text-[7.5px] px-1 border-orange-500/40 text-orange-500">
                  {badge}
                </Badge>
              </div>
            </div>

            {/* Attributes column */}
            <div className="flex-1 flex flex-col justify-start items-start">
              <h4 className="text-slate-100 text-lg font-black tracking-wide uppercase leading-tight">
                {title}
              </h4>
              <p className="text-slate-500 text-[9px] font-bold mt-1 uppercase tracking-wider">
                {server}
              </p>

              {/* Specifications row */}
              <div className="self-stretch pt-4 grid grid-cols-4 gap-2.5">
                <div className="p-2 bg-white/[0.01] border border-white/5 flex flex-col items-center">
                  <span className="text-slate-500 text-[7px] font-bold uppercase">RANK</span>
                  <strong className="text-slate-200 text-xs font-bold mt-1">{badge}</strong>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/5 flex flex-col items-center">
                  <span className="text-slate-500 text-[7px] font-bold uppercase">WINS</span>
                  <strong className="text-slate-200 text-xs font-bold mt-1">{wins}</strong>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/5 flex flex-col items-center">
                  <span className="text-slate-500 text-[7px] font-bold uppercase">SKINS</span>
                  <strong className="text-slate-200 text-xs font-bold mt-1">{skins}</strong>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/5 flex flex-col items-center">
                  <span className="text-slate-500 text-[7px] font-bold uppercase">LEVEL</span>
                  <strong className="text-slate-200 text-xs font-bold mt-1">{level}</strong>
                </div>
              </div>

              {/* Protection metadata row */}
              <div className="self-stretch pt-4.5 flex gap-4 flex-wrap">
                <div className="flex justify-start items-center gap-1.5">
                  <Badge variant="upcoming" className="text-[7.5px] px-1">
                    ★ TRUST {rating}/10
                  </Badge>
                </div>
                <div className="flex justify-start items-center gap-1.5">
                  <Badge variant="success" className="text-[7.5px] px-1">
                    ✓ VERIFIED SELLER
                  </Badge>
                </div>
                <div className="flex justify-start items-center gap-1.5">
                  <Badge variant="cyan" className="text-[7.5px] px-1">
                    🛡️ ESCROW SHIELDED
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="self-stretch mt-6 p-4 bg-cyan-950/10 border border-cyan-400/20 flex gap-4">
            <span className="text-cyan-400 text-base leading-none">🛡️</span>
            <div className="flex flex-col gap-1">
              <span className="text-cyan-400 text-[9px] font-black tracking-widest uppercase">
                ESCROW PROTECTION PROTOCOL
              </span>
              <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
                Your payment is held securely in the GameTrust escrow smart pool. Funds are only released to the seller once you log in and confirm control. Auto-dispute system guarantees resolution within 24h.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="pt-6">
        <Button
          variant="default"
          onClick={onProceed}
          className="px-8 text-[10px] font-black tracking-widest"
        >
          PROCEED TO PAYMENT &gt;
        </Button>
      </div>
    </div>
  );
}
