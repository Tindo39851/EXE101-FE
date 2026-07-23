import React from "react";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/data/constants";

interface PaymentStepProps {
  price: number;
  isTournament?: boolean;
  isProcessing: boolean;
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentStep({
  price,
  isTournament = false,
  isProcessing,
  onBack,
  onComplete,
}: PaymentStepProps) {
  const fee = isTournament ? 0 : price * 0.025;
  const total = price + fee;

  return (
    <div className="self-stretch flex flex-col justify-start items-start font-mono select-none w-full">
      <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">
        STEP 2 - VNPAY PAYMENT GATEWAY
      </span>

      <div className="self-stretch mt-5 border border-cyan-400/35 bg-slate-950/85 p-6">
        <div className="flex items-start gap-4">
          <div className="size-11 shrink-0 border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center">
            <ShieldCheck className="size-5 text-cyan-300" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-100">
              VNPAY SANDBOX
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-400 font-sans">
              You will be redirected to VNPAY to select a bank, card, or QR
              payment method. GameTrust never receives or stores banking
              credentials.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-px bg-cyan-400/15">
          <div className="bg-slate-950 px-4 py-3">
            <span className="block text-[8px] font-bold text-slate-500">
              PAYMENT PROVIDER
            </span>
            <strong className="mt-1 block text-xs text-cyan-300">VNPAY</strong>
          </div>
          <div className="bg-slate-950 px-4 py-3 text-right">
            <span className="block text-[8px] font-bold text-slate-500">
              AMOUNT
            </span>
            <strong className="mt-1 block text-xs text-fuchsia-400">
              {money.format(total)}
            </strong>
          </div>
        </div>
      </div>

      <div className="self-stretch pt-5 flex items-center gap-4 w-full">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 text-[10px] font-black tracking-widest"
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          BACK
        </Button>

        <Button
          variant="magenta"
          disabled={isProcessing}
          onClick={onComplete}
          className="flex-1 text-[10px] font-black tracking-widest"
        >
          {isProcessing ? (
            "CREATING VNPAY TRANSACTION..."
          ) : (
            <>
              CONTINUE TO VNPAY
              <ExternalLink className="ml-2 size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
