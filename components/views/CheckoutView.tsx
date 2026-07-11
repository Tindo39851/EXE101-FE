import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { listings } from "@/lib/data/listings";
import { money } from "@/lib/data/constants";

export function CheckoutView() {
  const {
    state,
    setView,
    checkoutStep,
    setCheckoutStep,
    lastPurchased,
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
    completeCheckout,
    paymentMethod,
    setLastPurchased
  } = useAppState();

  const activeCartItem = state.cart || lastPurchased;

  return (
    <section className="flex flex-col bg-black p-0">
      {/* Steps Progress Bar */}
      <div className="relative bg-gray-950/95 border-b border-cyan-400/20 flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch flex flex-col justify-start items-center">
          <div className="w-[1100px] max-w-[1100px] px-8 pt-8 pb-6 flex flex-col justify-start items-start">
            <div className="h-4 inline-flex justify-start items-center gap-2">
              <button
                onClick={() => setView("market")}
                className="text-center justify-start text-cyan-400 text-[10.40px] font-mono leading-4 tracking-wider hover:underline uppercase cursor-pointer border-none bg-transparent"
              >
                ← BACK TO MARKETPLACE
              </button>
            </div>
            
            <div className="w-[1036px] h-16 pt-8 pb-1 inline-flex justify-start items-center flex-wrap gap-y-4">
              {/* Step 1 */}
              <div className="flex justify-start items-center">
                <div className="flex justify-start items-center gap-2">
                  {checkoutStep > 1 ? (
                    <div className="size-7 bg-emerald-400/15 outline outline-1 outline-offset-[-1px] outline-emerald-400 flex justify-center items-center font-mono text-emerald-400 shadow-[0_0_8px_rgba(0,255,136,0.3)]">
                      <span className="text-[10px] font-bold">✓</span>
                    </div>
                  ) : (
                    <div className={`size-7 flex justify-center items-center font-mono ${
                      checkoutStep === 1
                        ? "bg-cyan-400/10 outline outline-1 outline-offset-[-1px] outline-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                        : "bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/10 text-slate-650"
                    }`}>
                      <span className="text-[8.80px] font-normal leading-3">1</span>
                    </div>
                  )}
                  <div className={`flex flex-col justify-start items-start font-mono ${
                    checkoutStep === 1 ? "text-cyan-400" : checkoutStep > 1 ? "text-emerald-400" : "text-slate-650"
                  }`}>
                    <span className="text-[9.28px] font-normal leading-3 tracking-wide uppercase">REVIEW</span>
                  </div>
                </div>
                <div className="px-3 flex justify-start items-start">
                  <div className={`w-14 h-px ${checkoutStep > 1 ? "bg-emerald-400" : "bg-white/10"}`}></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex justify-start items-center">
                <div className="flex justify-start items-center gap-2">
                  {checkoutStep > 2 ? (
                    <div className="size-7 bg-emerald-400/15 outline outline-1 outline-offset-[-1px] outline-emerald-400 flex justify-center items-center font-mono text-emerald-400 shadow-[0_0_8px_rgba(0,255,136,0.3)]">
                      <span className="text-[10px] font-bold">✓</span>
                    </div>
                  ) : (
                    <div className={`size-7 flex justify-center items-center font-mono ${
                      checkoutStep === 2
                        ? "bg-cyan-400/10 outline outline-1 outline-offset-[-1px] outline-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                        : "bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/10 text-slate-600"
                    }`}>
                      <span className="text-[8.80px] font-normal leading-3">2</span>
                    </div>
                  )}
                  <div className={`flex flex-col justify-start items-start font-mono ${
                    checkoutStep === 2 ? "text-cyan-400" : checkoutStep > 2 ? "text-emerald-400" : "text-slate-600"
                  }`}>
                    <span className="text-[9.28px] font-normal leading-3 tracking-wide uppercase">PAYMENT</span>
                  </div>
                </div>
                <div className="px-3 flex justify-start items-start">
                  <div className={`w-14 h-px ${checkoutStep > 2 ? "bg-emerald-400" : "bg-white/10"}`}></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex justify-start items-center gap-2">
                <div className={`size-7 flex justify-center items-center font-mono ${
                  checkoutStep === 3
                    ? "bg-cyan-400/10 outline outline-1 outline-offset-[-1px] outline-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                    : "bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/10 text-slate-650"
                }`}>
                  <span className="text-[8.80px] font-normal leading-3">3</span>
                </div>
                <div className={`flex flex-col justify-start items-start font-mono ${
                  checkoutStep === 3 ? "text-cyan-400" : "text-slate-650"
                }`}>
                  <span className="text-[9.28px] font-normal leading-3 tracking-wide uppercase">CONFIRM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split workspace */}
      {!state.cart && !lastPurchased ? (
        <div className="py-20 text-center text-slate-500 font-mono uppercase">
          NO ACTIVE ITEM SELECTED. PLEASE CHOOSE A PLAN OR AN ACCOUNT FROM THE MARKETPLACE.
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_384px] gap-8 py-10 max-lg:grid-cols-1 w-[1100px] max-w-[1100px] px-8 mx-auto">
          
          {/* Left Column (Forms & Details) */}
          <div className="flex flex-col justify-start items-start gap-6">
            {checkoutStep === 1 && (
              <div className="self-stretch flex flex-col justify-start items-start">
                <span className="text-slate-500 text-[9.60px] font-mono tracking-widest uppercase">STEP 1 — REVIEW LISTING</span>
                
                {state.cart && (
                  <div className="self-stretch pt-5">
                    {/* Inner Card */}
                    <div className="p-7 bg-gray-950/95 outline outline-1 outline-offset-[-1px] outline-orange-500/20 flex flex-col justify-start items-start">
                      <div className="self-stretch h-[3px] bg-orange-500 shadow-[0px_0px_10px_0px_rgba(255,107,26,1.00)]"></div>
                      
                      <div className="self-stretch pt-6 flex justify-start items-start gap-6 max-sm:flex-col">
                        {/* Thumbnail Box */}
                        <div className="size-28 shrink-0 relative bg-orange-500/5 outline outline-1 outline-offset-[-1px] outline-orange-500/20 flex justify-center items-center overflow-hidden select-none">
                          <span className="text-orange-500/20 text-4xl font-black font-mono tracking-widest uppercase">
                            {listings.find(l => l.id === state.cart?.id)?.code || "GT"}
                          </span>
                          <div className="px-1.5 py-[1.60px] left-[7.39px] top-[83.42px] absolute bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[8px] font-mono uppercase">
                            {listings.find(l => l.id === state.cart?.id)?.badge || "ELITE"}
                          </div>
                        </div>

                        {/* Listing Details */}
                        <div className="flex-1 flex flex-col justify-start items-start">
                          <h4 className="text-slate-200 text-lg font-extrabold font-mono tracking-wide uppercase">
                            {listings.find(l => l.id === state.cart?.id)?.title || state.cart.name}
                          </h4>
                          <p className="text-slate-500 text-[9.92px] font-mono mt-1 uppercase">
                            {listings.find(l => l.id === state.cart?.id)?.server || "GAMETRUST // SYSTEM"}
                          </p>

                          {/* Specs Row */}
                          <div className="self-stretch pt-3.5 grid grid-cols-4 gap-2.5">
                            <div className="p-2 bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                              <span className="text-slate-500 text-[7.36px] font-mono uppercase">RANK</span>
                              <strong className="text-slate-200 text-xs font-bold font-mono mt-[3.20px]">
                                {listings.find(l => l.id === state.cart?.id)?.badge || "PREMIUM"}
                              </strong>
                            </div>
                            <div className="p-2 bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                              <span className="text-slate-500 text-[7.36px] font-mono uppercase">WINS</span>
                              <strong className="text-slate-200 text-xs font-bold font-mono mt-[3.20px]">
                                {listings.find(l => l.id === state.cart?.id)?.wins || "—"}
                              </strong>
                            </div>
                            <div className="p-2 bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                              <span className="text-slate-500 text-[7.36px] font-mono uppercase">SKINS</span>
                              <strong className="text-slate-200 text-xs font-bold font-mono mt-[3.20px]">
                                {listings.find(l => l.id === state.cart?.id)?.skins || "—"}
                              </strong>
                            </div>
                            <div className="p-2 bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/5 flex flex-col items-center">
                              <span className="text-slate-500 text-[7.36px] font-mono uppercase">LEVEL</span>
                              <strong className="text-slate-200 text-xs font-bold font-mono mt-[3.20px]">
                                {listings.find(l => l.id === state.cart?.id)?.level || "—"}
                              </strong>
                            </div>
                          </div>

                          {/* Security Badges */}
                          <div className="self-stretch pt-4 flex gap-4 flex-wrap">
                            <div className="flex justify-start items-center gap-1.5">
                              <div className="size-2.5 bg-yellow-400/20 outline outline-1 outline-offset-[-0.46px] outline-yellow-400/50 flex items-center justify-center">
                                <span className="text-yellow-400 text-[7px]">★</span>
                              </div>
                              <span className="text-yellow-400 text-[9.28px] font-mono uppercase">
                                TRUST {listings.find(l => l.id === state.cart?.id)?.trust || "10.0/10"}
                              </span>
                            </div>

                            <div className="flex justify-start items-center gap-1.5">
                              <div className="size-2.5 bg-emerald-400/20 outline outline-1 outline-offset-[-0.46px] outline-emerald-400/50 flex items-center justify-center">
                                <span className="text-emerald-400 text-[7px]">✓</span>
                              </div>
                              <span className="text-emerald-400 text-[9.28px] font-mono uppercase">VERIFIED SELLER</span>
                            </div>

                            <div className="flex justify-start items-center gap-1.5">
                              <div className="size-2.5 bg-cyan-400/20 outline outline-1 outline-offset-[-0.46px] outline-cyan-400/50 flex items-center justify-center">
                                <span className="text-cyan-400 text-[7px]">🛡️</span>
                              </div>
                              <span className="text-cyan-400 text-[9.28px] font-mono uppercase">ESCROW PROTECTED</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Escrow Explained Box */}
                      <div className="self-stretch mt-6 p-5 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex gap-4">
                        <span className="text-cyan-400 text-lg leading-4">🛡️</span>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-cyan-400 text-[9.60px] font-mono tracking-wide uppercase">ESCROW PROTECTION EXPLAINED</span>
                          <p className="text-slate-400 text-sm font-sans leading-5">
                            Your payment is held in escrow until you confirm receipt of account credentials. If anything goes wrong, GameTrust's dispute team resolves the case — funds released or returned within 24h.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="h-11 px-12 bg-cyan-400 shadow-[0px_0px_20px_0px_rgba(0,255,255,0.40)] shadow-[0px_0px_8px_0px_rgba(0,255,255,1.00)] text-black text-xs font-bold font-mono tracking-widest hover:bg-cyan-300 transition inline-flex justify-center items-center gap-3 uppercase cursor-pointer border-none"
                  >
                    PROCEED TO PAYMENT &gt;
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="self-stretch flex flex-col justify-start items-start w-full">
                <span className="text-slate-500 text-[9.60px] font-mono tracking-widest uppercase">STEP 2 — SELECT PAYMENT METHOD</span>
                
                {/* Payment options stack */}
                <div className="self-stretch pt-5 flex flex-col gap-3.5">
                  
                  {/* Option 1: Card */}
                  <div
                    onClick={() => setSelectedPayment("card")}
                    className={`w-full p-4 flex items-center justify-between border transition cursor-pointer ${
                      selectedPayment === "card"
                        ? "bg-cyan-400/[0.03] border-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.13)]"
                        : "bg-gray-950/80 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9.5 h-9.5 flex justify-center items-center border ${
                        selectedPayment === "card" ? "bg-cyan-400/5 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.2)]" : "border-white/10 text-slate-500"
                      }`}>
                        💳
                      </div>
                      <span className={`text-[10.40px] font-mono tracking-wider font-semibold ${
                        selectedPayment === "card" ? "text-cyan-400" : "text-slate-500"
                      }`}>
                        CREDIT / DEBIT CARD
                      </span>
                    </div>
                    <div className={`size-4 rounded-full border flex justify-center items-center ${
                      selectedPayment === "card" ? "border-cyan-400" : "border-white/20"
                    }`}>
                      {selectedPayment === "card" && <div className="size-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ffff]"></div>}
                    </div>
                  </div>

                  {/* Option 2: Crypto */}
                  <div
                    onClick={() => setSelectedPayment("crypto")}
                    className={`w-full p-4 flex items-center justify-between border transition cursor-pointer ${
                      selectedPayment === "crypto"
                        ? "bg-cyan-400/[0.03] border-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.13)]"
                        : "bg-gray-950/80 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9.5 h-9.5 flex justify-center items-center border ${
                        selectedPayment === "crypto" ? "bg-cyan-400/5 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.2)]" : "border-white/10 text-slate-500"
                      }`}>
                        🪙
                      </div>
                      <span className={`text-[10.40px] font-mono tracking-wider font-semibold ${
                        selectedPayment === "crypto" ? "text-cyan-400" : "text-slate-500"
                      }`}>
                        CRYPTO (USDT/BTC/ETH)
                      </span>
                    </div>
                    <div className={`size-4 rounded-full border flex justify-center items-center ${
                      selectedPayment === "crypto" ? "border-cyan-400" : "border-white/20"
                    }`}>
                      {selectedPayment === "crypto" && <div className="size-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ffff]"></div>}
                    </div>
                  </div>

                  {/* Option 3: Escrow Wallet */}
                  <div
                    onClick={() => setSelectedPayment("escrow")}
                    className={`w-full p-4 flex items-center justify-between border transition cursor-pointer ${
                      selectedPayment === "escrow"
                        ? "bg-cyan-400/[0.03] border-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.13)]"
                        : "bg-gray-950/80 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9.5 h-9.5 flex justify-center items-center border ${
                        selectedPayment === "escrow" ? "bg-cyan-400/5 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.2)]" : "border-white/10 text-slate-500"
                      }`}>
                        💼
                      </div>
                      <span className={`text-[10.40px] font-mono tracking-wider font-semibold ${
                        selectedPayment === "escrow" ? "text-cyan-400" : "text-slate-500"
                      }`}>
                        ESCROW WALLET BALANCE
                      </span>
                    </div>
                    <div className={`size-4 rounded-full border flex justify-center items-center ${
                      selectedPayment === "escrow" ? "border-cyan-400" : "border-white/20"
                    }`}>
                      {selectedPayment === "escrow" && <div className="size-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ffff]"></div>}
                    </div>
                  </div>

                </div>

                {/* Payment fields form details */}
                <div className="self-stretch pt-7">
                  {selectedPayment === "card" && (
                    <div className="p-7 bg-gray-950/95 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-start gap-5 w-full">
                      <div className="flex justify-start items-center gap-2">
                        <span className="text-cyan-400 text-sm">🔒</span>
                        <span className="text-cyan-400 text-[9.92px] font-mono uppercase tracking-widest">
                          SECURE CARD DETAILS
                        </span>
                      </div>

                      <div className="w-full flex flex-col justify-start items-start">
                        <label className="text-slate-500 text-[8.80px] font-mono tracking-wider uppercase mb-1.5">
                          CARD NUMBER
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full h-11.5 px-4 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-200 text-xs font-mono placeholder-slate-500/50 focus:outline-cyan-400/40 transition-all"
                        />
                      </div>

                      <div className="w-full flex flex-col justify-start items-start mt-2">
                        <label className="text-slate-500 text-[8.80px] font-mono tracking-wider uppercase mb-1.5">
                          CARDHOLDER NAME
                        </label>
                        <input
                          type="text"
                          placeholder="NAME ON CARD"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full h-11 px-4 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-200 text-xs font-mono placeholder-slate-500/50 focus:outline-cyan-400/40 transition-all"
                        />
                      </div>

                      <div className="w-full grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col justify-start items-start">
                          <label className="text-slate-500 text-[8.80px] font-mono tracking-wider uppercase mb-1.5">
                            EXPIRY DATE
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full h-11.5 px-4 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-200 text-xs font-mono placeholder-slate-500/50 focus:outline-cyan-400/40 transition-all"
                          />
                        </div>

                        <div className="flex flex-col justify-start items-start">
                          <label className="text-slate-500 text-[8.80px] font-mono tracking-wider uppercase mb-1.5">
                            CVV
                          </label>
                          <div className="relative w-full">
                            <input
                              type={showCvv ? "text" : "password"}
                              placeholder="•••"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full h-11.5 pl-4 pr-10 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-200 text-xs font-mono placeholder-slate-500/50 focus:outline-cyan-400/40 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCvv(!showCvv)}
                              className="absolute right-3.5 top-[14px] text-slate-500 hover:text-slate-350 select-none text-[8px] font-mono cursor-pointer border-none bg-transparent"
                            >
                              {showCvv ? "HIDE" : "SHOW"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayment === "crypto" && (
                    <div className="p-7 bg-gray-950/95 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-center gap-4 text-center w-full">
                      <span className="text-2xl">🪙</span>
                      <h5 className="text-cyan-400 text-xs font-mono font-bold uppercase">SEND USDT / BTC / ETH</h5>
                      <p className="text-slate-400 text-xs leading-5 max-w-sm">
                        Please transfer exactly <strong className="text-slate-200">${((state.cart?.price ?? lastPurchased?.price ?? 0) * 1.025).toFixed(2)}</strong> to the secure deposit address below.
                      </p>
                      <input
                        type="text"
                        value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                        disabled
                        className="w-full py-3 px-4 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-300 text-xs font-mono text-center select-all"
                      />
                      <small className="text-slate-650 text-[9px] font-mono">CLICK ADDRESS TO COPY</small>
                    </div>
                  )}

                  {selectedPayment === "escrow" && (
                    <div className="p-7 bg-gray-950/95 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-center gap-4 text-center w-full">
                      <span className="text-2xl">💼</span>
                      <h5 className="text-cyan-400 text-xs font-mono font-bold uppercase">PAY WITH ESCROW WALLET</h5>
                      <p className="text-slate-400 text-xs leading-5 max-w-sm">
                        Confirm purchase using your available platform balance: <strong className="text-emerald-400">$1,842.00</strong>.
                      </p>
                      <div className="py-2.5 px-6 bg-emerald-400/5 outline outline-1 outline-offset-[-1px] outline-emerald-400/30 text-emerald-400 text-xs font-mono uppercase">
                        FUNDS SUFFICIENT
                      </div>
                    </div>
                  )}
                </div>

                {/* Agreement terms check row */}
                <div className="self-stretch pt-6 flex justify-start items-start gap-3">
                  <div className="pt-[2px]">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      id="escrow-terms-checkbox"
                      className="size-4 bg-transparent border border-cyan-400/30 text-cyan-400 rounded-sm focus:ring-0 focus:ring-offset-0 cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <label htmlFor="escrow-terms-checkbox" className="text-slate-400 text-[12.80px] font-semibold font-mono leading-5 cursor-pointer select-none">
                    I agree to the <span className="text-cyan-400 hover:underline">Escrow Terms</span>, <span className="text-cyan-400 hover:underline">Purchase Policy</span>, and understand that funds are held in escrow until account handoff is confirmed.
                  </label>
                </div>

                {/* Button Action Bar */}
                <div className="self-stretch h-[64px] pt-5 justify-start items-start gap-4 inline-flex">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="px-[28px] py-[13.60px] outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-500 hover:text-slate-350 text-[9.92px] font-mono uppercase tracking-wide transition cursor-pointer"
                  >
                    ← BACK
                  </button>
                  <button
                    disabled={!agreedToTerms}
                    onClick={completeCheckout}
                    className={`flex-1 py-[13.60px] justify-center items-center gap-3 inline-flex transition-all duration-300 font-bold font-mono text-[11.52px] tracking-[2.30px] uppercase ${
                      agreedToTerms
                        ? "bg-fuchsia-500/20 outline outline-1 outline-offset-[-1px] outline-fuchsia-500 text-fuchsia-400 shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:bg-fuchsia-500 hover:text-white cursor-pointer"
                        : "bg-white/5 outline outline-1 outline-offset-[-1px] outline-white/10 text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    🔑 PAY {money.format((state.cart?.price ?? lastPurchased?.price ?? 0) * 1.025)}
                  </button>
                </div>

              </div>
            )}

            {checkoutStep === 3 && (
              <div className="self-stretch flex flex-col justify-start items-start">
                <span className="text-slate-500 text-[9.60px] font-mono tracking-widest uppercase">STEP 3 — CONFIRMATION</span>
                
                <div className="self-stretch pt-5">
                  <div className="p-7 bg-gray-950/95 outline outline-1 outline-offset-[-1px] outline-emerald-400/20 flex flex-col justify-start items-center gap-6 text-center w-full">
                    <div className="self-stretch h-[2px] bg-emerald-400 shadow-[0_0_8px_rgba(0,255,136,0.6)]"></div>
                    
                    <div className="size-16 rounded-full border-2 border-emerald-400 flex justify-center items-center text-emerald-400 text-3xl shadow-[0_0_12px_rgba(0,255,136,0.3)] animate-pulse">
                      ✓
                    </div>

                    <div className="flex flex-col items-center">
                      <h4 className="text-slate-200 text-lg font-bold font-mono uppercase">
                        TRANSACTION SECURED // ESCROW ACTIVE
                      </h4>
                      <p className="text-slate-400 text-xs mt-3.5 leading-5 max-w-md">
                        Your payment for <strong className="text-slate-200">{lastPurchased?.name}</strong> has been successfully deposited in holding. Credentials will be released within 15–30 minutes after verify check.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setCheckoutStep(1);
                      setLastPurchased(null);
                      setView("market");
                    }}
                    className="h-11 px-12 bg-fuchsia-500 shadow-[0px_0px_20px_0px_rgba(255,0,255,0.40)] shadow-[0px_0px_8px_0px_rgba(255,0,255,1.00)] text-white text-xs font-bold font-mono tracking-widest hover:bg-fuchsia-450 transition inline-flex justify-center items-center gap-3 uppercase cursor-pointer border-none"
                  >
                    RETURN TO MARKETPLACE
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Order Summary Card) */}
          <div className="w-96 shrink-0 flex flex-col justify-start items-start">
            <div className="self-stretch p-6 bg-gray-950/95 border border-cyan-400/20 flex flex-col justify-start items-start w-full relative">
              {/* Top color glow line */}
              <div className="absolute left-[1px] right-[1px] top-[1px] h-[3px] bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0px_0px_10px_rgba(0,255,255,0.5)]"></div>
              
              <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest mt-4 uppercase">
                ORDER SUMMARY
              </span>

              {/* Logo/Name preview box */}
              <div className="self-stretch mt-5">
                <div className="p-3.5 bg-orange-500/[0.02] border border-orange-500/10 flex justify-start items-center gap-3.5">
                  <div className="size-10 shrink-0 bg-orange-500/5 outline outline-1 outline-offset-[-1px] outline-orange-500/20 flex justify-center items-center text-orange-500 text-xs font-black font-mono">
                    {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.code || "GT"}
                  </div>
                  <div>
                    <h5 className="text-slate-200 text-xs font-bold font-mono uppercase leading-none">
                      {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.title || state.cart?.name || lastPurchased?.name}
                    </h5>
                    <p className="text-slate-500 text-[8.32px] font-mono mt-1.5 uppercase leading-none">
                      {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.badge || "ELITE"} · {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.server.split("·")[0]?.trim() || "SEA"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cost rows */}
              <div className="self-stretch mt-5 flex flex-col">
                <div className="py-2 border-b border-white/5 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 text-[9.28px] uppercase">LISTING PRICE</span>
                  <span className="text-slate-200">
                    {money.format(state.cart?.price ?? lastPurchased?.price ?? 0)}
                  </span>
                </div>
                
                <div className="py-2 border-b border-white/5 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 text-[9.28px] uppercase">ESCROW FEE (2.5%)</span>
                  <span className="text-slate-200">
                    {money.format((state.cart?.price ?? lastPurchased?.price ?? 0) * 0.025)}
                  </span>
                </div>

                <div className="pt-3.5 pb-2 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-200 text-xs font-bold uppercase">TOTAL</span>
                  <span className="text-fuchsia-500 text-base font-extrabold">
                    {money.format((state.cart?.price ?? lastPurchased?.price ?? 0) * 1.025)}
                  </span>
                </div>
              </div>

              {/* Safeguards column */}
              <div className="self-stretch mt-5 flex flex-col gap-2 font-mono text-[8.64px] text-slate-500">
                <div className="flex items-center gap-2.5">
                  <span className="text-cyan-400">🛡️</span>
                  <span>Escrow Protected Payment</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>256-bit Encrypted Transfer</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-yellow-400">★</span>
                  <span>15–30 min Account Handoff</span>
                </div>
              </div>

              {/* Seller information card */}
              <div className="self-stretch mt-6 pt-5 border-t border-white/5 w-full">
                <div className="p-3.5 bg-yellow-400/[0.01] border border-yellow-400/10 flex flex-col items-start w-full">
                  <span className="text-slate-500 text-[8.32px] font-mono uppercase">SELLER</span>
                  <div className="flex items-center gap-2.5 mt-2">
                    <div className="size-7 bg-yellow-400/10 outline outline-1 outline-offset-[-1px] outline-yellow-400/30 flex justify-center items-center text-yellow-400 text-[9.60px] font-black font-mono">
                      {(listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.server.split("·")[1]?.trim() || "AXIOM_V").charAt(0)}
                    </div>
                    <div>
                      <strong className="text-slate-200 text-[10.40px] font-bold font-mono block uppercase leading-none">
                        {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.server.split("·")[1]?.trim() || "AXIOM_V"}
                      </strong>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-yellow-400 text-[8px] font-mono uppercase leading-none">
                          ★ {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.trust || "9.8/10"} · {listings.find(l => l.id === (state.cart?.id || lastPurchased?.id))?.sold || "42"} SOLD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}
    </section>
  );
}
export default CheckoutView;
