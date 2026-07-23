"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, ReceiptText, XCircle } from "lucide-react";

type PaymentState = "processing" | "success" | "failed";

interface CallbackResponse {
  success?: boolean;
  message?: string;
  data?: {
    RspCode?: string;
    Message?: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export default function VnPayReturnPage() {
  const [state, setState] = useState<PaymentState>("processing");
  const [message, setMessage] = useState("Verifying transaction with VNPAY...");
  const [transactionRef, setTransactionRef] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const responseCode = params.get("vnp_ResponseCode");
    setTransactionRef(params.get("vnp_TxnRef") ?? "");

    if (!params.has("vnp_SecureHash") || !params.has("vnp_TxnRef")) {
      setState("failed");
      setMessage("VNPAY callback data is incomplete.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/payments/vnpay/return?${params.toString()}`,
          { method: "GET", cache: "no-store" },
        );
        const body = (await response.json()) as CallbackResponse;
        const verified =
          response.ok &&
          body.success === true &&
          body.data?.RspCode === "00" &&
          responseCode === "00";

        if (verified) {
          const rawState = window.localStorage.getItem(
            "gametrust-next-mvp-state",
          );
          if (rawState) {
            try {
              const storedState = JSON.parse(rawState);
              storedState.cart = null;
              window.localStorage.setItem(
                "gametrust-next-mvp-state",
                JSON.stringify(storedState),
              );
            } catch {
              window.localStorage.removeItem("gametrust-next-mvp-state");
            }
          }
          setState("success");
          setMessage("Your payment has been verified successfully.");
          return;
        }

        setState("failed");
        setMessage(body.data?.Message ?? body.message ?? "The transaction was not completed.");
      } catch {
        setState("failed");
        setMessage("Unable to reach the payment service. Please check the transaction again.");
      }
    };

    void verifyPayment();
  }, []);

  const status = {
    processing: {
      icon: <Loader2 className="size-12 animate-spin text-cyan-300" aria-hidden="true" />,
      label: "PROCESSING",
      color: "text-cyan-300",
    },
    success: {
      icon: <CheckCircle2 className="size-12 text-emerald-400" aria-hidden="true" />,
      label: "PAYMENT CONFIRMED",
      color: "text-emerald-400",
    },
    failed: {
      icon: <XCircle className="size-12 text-rose-400" aria-hidden="true" />,
      label: "PAYMENT FAILED",
      color: "text-rose-400",
    },
  }[state];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-slate-100 flex items-center justify-center">
      <section className="w-full max-w-xl border border-cyan-400/25 bg-black/35 p-7 sm:p-10">
        <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-5">
          <ReceiptText className="size-5 text-cyan-300" aria-hidden="true" />
          <span className="font-mono text-xs font-bold tracking-widest text-cyan-300">
            GAMETRUST / VNPAY
          </span>
        </div>

        <div className="flex min-h-64 flex-col items-center justify-center text-center">
          {status.icon}
          <h1 className={`mt-5 font-mono text-lg font-black tracking-widest ${status.color}`}>
            {status.label}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{message}</p>
          {transactionRef && (
            <p className="mt-5 font-mono text-xs text-slate-500">
              TRANSACTION: <span className="text-slate-300">{transactionRef}</span>
            </p>
          )}
        </div>

        {state !== "processing" && (
          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className="mt-8 flex h-11 w-full items-center justify-center gap-2 border border-cyan-400/40 bg-cyan-400/10 font-mono text-xs font-bold tracking-widest text-cyan-200 transition-colors hover:bg-cyan-400/15"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            RETURN TO GAMETRUST
          </button>
        )}
      </section>
    </main>
  );
}
