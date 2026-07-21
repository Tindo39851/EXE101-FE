import React from "react";
import type { CartItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ConfirmStepProps {
  lastPurchased: CartItem | null;
  onReturn: () => void;
}

export function ConfirmStep({ lastPurchased, onReturn }: ConfirmStepProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start font-mono select-none w-full">
      <span className="text-slate-500 text-[9px] font-bold tracking-widest">
        STEP 3 — CONFIRMATION SHIELD ACTIVE
      </span>

      <div className="self-stretch pt-5 w-full">
        <div className="p-7 bg-slate-950/85 border border-emerald-400/25 flex flex-col justify-start items-center gap-6 text-center w-full relative">
          <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-emerald-400 shadow-[0_0_8px_#34d399]" />

          <div className="size-16 rounded-full border-2 border-emerald-400 flex justify-center items-center text-emerald-400 text-3xl shadow-[0_0_12px_rgba(52,211,153,0.3)] animate-pulse">
            ✓
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-slate-200 text-sm font-black tracking-widest uppercase">
              TRANSACTION SECURED // ESCROW ACTIVE
            </h4>
            <p className="text-slate-500 text-xs mt-3.5 leading-relaxed max-w-md font-sans">
              Your payment for <strong className="text-slate-200 font-bold">{lastPurchased?.name}</strong> has been successfully deposited in the escrow node. The seller has been notified to hand over credentials. Handoff completes in 15–30 minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 w-full">
        <Button
          variant="magenta"
          onClick={onReturn}
          className="w-full text-[10px] font-black tracking-widest shadow-magenta"
        >
          RETURN TO MARKETPLACE
        </Button>
      </div>
    </div>
  );
}
