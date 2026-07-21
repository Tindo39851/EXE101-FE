import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/data/constants";

interface PaymentStepProps {
  selectedPayment: "card" | "crypto" | "escrow";
  setSelectedPayment: (val: "card" | "crypto" | "escrow") => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  expiryDate: string;
  setExpiryDate: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (val: boolean) => void;
  showCvv: boolean;
  setShowCvv: (val: boolean) => void;
  price: number;
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentStep({
  selectedPayment,
  setSelectedPayment,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  agreedToTerms,
  setAgreedToTerms,
  showCvv,
  setShowCvv,
  price,
  onBack,
  onComplete,
}: PaymentStepProps) {
  const total = price * 1.025;

  return (
    <div className="self-stretch flex flex-col justify-start items-start font-mono select-none w-full">
      <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">
        STEP 2 — SELECT PAYMENT INSTRUMENT
      </span>

      {/* Payment Options Row */}
      <div className="self-stretch pt-5 flex flex-col gap-3.5 w-full">
        {/* Credit Card option */}
        <div
          onClick={() => setSelectedPayment("card")}
          className={`w-full p-4 flex items-center justify-between border transition-all duration-300 cursor-pointer ${
            selectedPayment === "card"
              ? "bg-cyan-400/5 border-cyan-400 shadow-[0_0_12px_rgba(0,246,255,0.1)]"
              : "bg-slate-950/80 border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-lg">💳</span>
            <span className={`text-[10px] font-bold tracking-widest ${selectedPayment === "card" ? "text-cyan-400" : "text-slate-500"}`}>
              CREDIT / DEBIT CARD
            </span>
          </div>
          <div className={`size-4 rounded-full border flex justify-center items-center ${selectedPayment === "card" ? "border-cyan-400" : "border-white/20"}`}>
            {selectedPayment === "card" && <div className="size-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ffff]" />}
          </div>
        </div>

        {/* Crypto option */}
        <div
          onClick={() => setSelectedPayment("crypto")}
          className={`w-full p-4 flex items-center justify-between border transition-all duration-300 cursor-pointer ${
            selectedPayment === "crypto"
              ? "bg-cyan-400/5 border-cyan-400 shadow-[0_0_12px_rgba(0,246,255,0.1)]"
              : "bg-slate-950/80 border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-lg">🪙</span>
            <span className={`text-[10px] font-bold tracking-widest ${selectedPayment === "crypto" ? "text-cyan-400" : "text-slate-500"}`}>
              CRYPTO TRANSFER (USDT/BTC/ETH)
            </span>
          </div>
          <div className={`size-4 rounded-full border flex justify-center items-center ${selectedPayment === "crypto" ? "border-cyan-400" : "border-white/20"}`}>
            {selectedPayment === "crypto" && <div className="size-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ffff]" />}
          </div>
        </div>

        {/* Escrow wallet option */}
        <div
          onClick={() => setSelectedPayment("escrow")}
          className={`w-full p-4 flex items-center justify-between border transition-all duration-300 cursor-pointer ${
            selectedPayment === "escrow"
              ? "bg-cyan-400/5 border-cyan-400 shadow-[0_0_12px_rgba(0,246,255,0.1)]"
              : "bg-slate-950/80 border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-lg">💼</span>
            <span className={`text-[10px] font-bold tracking-widest ${selectedPayment === "escrow" ? "text-cyan-400" : "text-slate-500"}`}>
              ESCROW WALLET BALANCE
            </span>
          </div>
          <div className={`size-4 rounded-full border flex justify-center items-center ${selectedPayment === "escrow" ? "border-cyan-400" : "border-white/20"}`}>
            {selectedPayment === "escrow" && <div className="size-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ffff]" />}
          </div>
        </div>
      </div>

      {/* Selected Option forms */}
      <div className="self-stretch pt-6 w-full">
        {selectedPayment === "card" && (
          <div className="p-6 bg-slate-950/80 border border-cyan-400/20 flex flex-col gap-5 w-full">
            <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase">
              🔒 SECURED PCI-DSS INPUT CHANNEL
            </span>

            <Input
              label="CARD NUMBER"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <Input
              label="CARDHOLDER NAME"
              placeholder="NAME ON CARD"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="EXPIRY DATE"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <div className="relative w-full">
                <Input
                  label="CVV"
                  type={showCvv ? "text" : "password"}
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-3 top-8.5 text-slate-500 hover:text-cyan-400 text-[8px] font-bold border-none bg-transparent cursor-pointer"
                >
                  {showCvv ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedPayment === "crypto" && (
          <div className="p-7 bg-slate-950/85 border border-cyan-400/20 flex flex-col items-center gap-4 text-center w-full">
            <span className="text-2xl">🪙</span>
            <span className="text-cyan-400 text-[10px] font-black tracking-widest">
              USDT / BTC DEPOSIT CONTRACT
            </span>
            <p className="text-slate-400 text-[11px] leading-5 max-w-sm font-sans">
              Please transfer exactly <strong className="text-slate-200">${total.toFixed(2)}</strong> to the secure deposit gateway address below.
            </p>
            <input
              type="text"
              value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
              disabled
              className="w-full py-3 px-4 bg-cyan-950/20 border border-cyan-400/20 text-slate-350 text-xs font-mono text-center select-all cursor-pointer focus:border-cyan-400"
            />
            <small className="text-slate-650 text-[8px] font-bold tracking-widest">CLICK ADDRESS TO COPY</small>
          </div>
        )}

        {selectedPayment === "escrow" && (
          <div className="p-7 bg-slate-950/85 border border-cyan-400/20 flex flex-col items-center gap-4 text-center w-full">
            <span className="text-2xl">💼</span>
            <span className="text-cyan-400 text-[10px] font-black tracking-widest">
              ESCROW WALLET DEPOSIT
            </span>
            <p className="text-slate-400 text-[11px] leading-5 max-w-sm font-sans">
              Confirm deduction from your active verified broker balance: <strong className="text-emerald-400">$1,842.00</strong>.
            </p>
            <div className="py-2.5 px-6 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[9px] font-bold tracking-widest">
              FUNDS SUFFICIENT
            </div>
          </div>
        )}
      </div>

      {/* Terms agreement checkbox */}
      <div className="self-stretch pt-6 flex justify-start items-start gap-3 w-full">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          id="terms-checkbox"
          className="size-4 mt-0.5 accent-cyan-400 bg-slate-950 border border-cyan-400/20 rounded-sm cursor-pointer"
        />
        <label htmlFor="terms-checkbox" className="text-slate-400 text-xs font-semibold leading-relaxed cursor-pointer select-none">
          I agree to the <span className="text-cyan-400 hover:underline">GameTrust Escrow Policy</span>, and understand that funds are locked until credential handover is completely verified.
        </label>
      </div>

      {/* Controls */}
      <div className="self-stretch pt-5 flex items-center gap-4 w-full">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6 text-[10px] font-black tracking-widest"
        >
          ← BACK
        </Button>
        
        <Button
          variant="magenta"
          disabled={!agreedToTerms}
          onClick={onComplete}
          className="flex-1 text-[10px] font-black tracking-widest"
        >
          🔑 AUTHORIZE PAYMENT {money.format(total)}
        </Button>
      </div>
    </div>
  );
}
