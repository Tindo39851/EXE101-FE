"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";
import type { PaymentDto } from "@/lib/api/contracts";
import { gameTrustApi } from "@/lib/api/gametrust";
import { money } from "@/lib/data/constants";

type SimulatorState = "loading" | "ready" | "processing" | "success" | "cancelled" | "error";

function clearPersistedCart() {
  const rawState = window.localStorage.getItem("gametrust-next-mvp-state");
  if (!rawState) return;

  try {
    const storedState = JSON.parse(rawState);
    storedState.cart = null;
    window.localStorage.setItem("gametrust-next-mvp-state", JSON.stringify(storedState));
  } catch {
    window.localStorage.removeItem("gametrust-next-mvp-state");
  }
}

export default function MoMoSimulatorPage() {
  const [payment, setPayment] = useState<PaymentDto | null>(null);
  const [state, setState] = useState<SimulatorState>("loading");
  const [message, setMessage] = useState("Loading simulated MoMo payment...");

  useEffect(() => {
    const paymentId = new URLSearchParams(window.location.search).get("paymentId");
    if (!paymentId) {
      setState("error");
      setMessage("Missing payment ID.");
      return;
    }

    const loadPayment = async () => {
      try {
        const data = await gameTrustApi.payments.detail(paymentId);
        setPayment(data);
        if (data.status === "PAID") {
          setState("success");
          setMessage("This simulated payment has already been completed.");
        } else if (data.status === "CANCELLED") {
          setState("cancelled");
          setMessage("This simulated payment has been cancelled.");
        } else if (data.status !== "PENDING") {
          setState("error");
          setMessage(`This payment can no longer be processed (${data.status}).`);
        } else {
          setState("ready");
          setMessage("Choose a result to continue the local payment flow.");
        }
      } catch (error) {
        setState("error");
        setMessage(error instanceof Error ? error.message : "Unable to load this payment.");
      }
    };

    void loadPayment();
  }, []);

  const submitResult = async (action: "SUCCESS" | "CANCEL") => {
    if (!payment || state === "processing") return;
    setState("processing");
    setMessage(action === "SUCCESS" ? "Completing payment..." : "Cancelling payment...");

    try {
      const updated = await gameTrustApi.payments.simulate(payment.id, action);
      setPayment(updated);
      if (action === "SUCCESS") {
        clearPersistedCart();
        setState("success");
        setMessage("Payment completed. GameTrust has received the simulated MoMo result.");
      } else {
        setState("cancelled");
        setMessage("Payment cancelled. No paid benefits were applied.");
      }
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to process this payment.");
    }
  };

  const busy = state === "loading" || state === "processing";
  const status = {
    loading: {
      icon: <Loader2 className="size-11 animate-spin text-cyan-300" aria-hidden="true" />,
      label: "LOADING PAYMENT",
      color: "text-cyan-300",
    },
    ready: {
      icon: <WalletCards className="size-11 text-pink-400" aria-hidden="true" />,
      label: "MOMO PAYMENT SIMULATOR",
      color: "text-pink-400",
    },
    processing: {
      icon: <Loader2 className="size-11 animate-spin text-cyan-300" aria-hidden="true" />,
      label: "PROCESSING",
      color: "text-cyan-300",
    },
    success: {
      icon: <CheckCircle2 className="size-11 text-emerald-400" aria-hidden="true" />,
      label: "PAYMENT SUCCESSFUL",
      color: "text-emerald-400",
    },
    cancelled: {
      icon: <XCircle className="size-11 text-amber-400" aria-hidden="true" />,
      label: "PAYMENT CANCELLED",
      color: "text-amber-400",
    },
    error: {
      icon: <XCircle className="size-11 text-rose-400" aria-hidden="true" />,
      label: "PAYMENT ERROR",
      color: "text-rose-400",
    },
  }[state];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12 text-slate-100">
      <section className="w-full max-w-xl border border-pink-400/25 bg-black/35 p-7 sm:p-10">
        <div className="mb-7 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-pink-400" aria-hidden="true" />
            <span className="font-mono text-xs font-bold tracking-widest text-pink-300">
              GAMETRUST / LOCAL PAYMENT
            </span>
          </div>
          <span className="border border-amber-300/35 bg-amber-300/10 px-2 py-1 font-mono text-[10px] font-bold text-amber-200">
            TEST MODE
          </span>
        </div>

        <div className="flex min-h-56 flex-col items-center justify-center text-center">
          {status.icon}
          <h1 className={`mt-5 font-mono text-lg font-black tracking-widest ${status.color}`}>
            {status.label}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{message}</p>
        </div>

        {payment && (
          <dl className="mb-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-y border-white/10 py-5 text-sm">
            <dt className="text-slate-500">Provider</dt>
            <dd className="text-right font-mono text-slate-200">{payment.provider}</dd>
            <dt className="text-slate-500">Amount</dt>
            <dd className="text-right font-mono font-bold text-white">
              {money.format(payment.amount)}
            </dd>
            <dt className="text-slate-500">Order</dt>
            <dd className="truncate text-right font-mono text-xs text-slate-300">
              {payment.transactionRef}
            </dd>
            <dt className="text-slate-500">Status</dt>
            <dd className="text-right font-mono text-xs font-bold text-slate-200">
              {payment.status}
            </dd>
          </dl>
        )}

        {state === "ready" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => void submitResult("SUCCESS")}
              disabled={busy}
              className="flex h-11 items-center justify-center gap-2 bg-emerald-400 px-4 font-mono text-xs font-black tracking-wider text-slate-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCircle2 className="size-4" aria-hidden="true" />
              SIMULATE SUCCESS
            </button>
            <button
              type="button"
              onClick={() => void submitResult("CANCEL")}
              disabled={busy}
              className="flex h-11 items-center justify-center gap-2 border border-white/20 px-4 font-mono text-xs font-bold tracking-wider text-slate-300 transition-colors hover:border-rose-400/50 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <XCircle className="size-4" aria-hidden="true" />
              CANCEL PAYMENT
            </button>
          </div>
        )}

        {state !== "ready" && !busy && (
          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className="flex h-11 w-full items-center justify-center gap-2 border border-cyan-400/40 bg-cyan-400/10 font-mono text-xs font-bold tracking-widest text-cyan-200 transition-colors hover:bg-cyan-400/15"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            RETURN TO GAMETRUST
          </button>
        )}
      </section>
    </main>
  );
}
