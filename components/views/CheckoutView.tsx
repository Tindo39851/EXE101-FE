import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { PageHeader } from "@/components/shared/PageHeader";
import { StepIndicator } from "@/components/ui/step-indicator";
import { OrderSummary } from "@/components/features/checkout/OrderSummary";
import { ReviewStep } from "@/components/features/checkout/ReviewStep";
import { PaymentStep } from "@/components/features/checkout/PaymentStep";
import { ConfirmStep } from "@/components/features/checkout/ConfirmStep";

export function CheckoutView() {
  const {
    state,
    setView,
    checkoutStep,
    setCheckoutStep,
    lastPurchased,
    completeCheckout,
    setLastPurchased,
    isBusy,
  } = useAppState();

  const activeCartItem = state.cart || lastPurchased;

  const checkoutSteps = [
    { label: "REVIEW" },
    { label: "PAYMENT" },
    { label: "CONFIRM" },
  ];

  return (
    <section className="flex flex-col bg-black p-0 font-mono select-none">
      {/* Header section with Step Progress */}
      <PageHeader
        code="CHKT_00 // SECURED ESCROW HANDSHAKE"
        title="Escrow Checkout"
        subtitle="Verification node active, PCI-DSS compliance validated"
        backText="BACK TO MARKETPLACE"
        onBack={() => setView("market")}
        action={
          <StepIndicator
            steps={checkoutSteps}
            currentStep={checkoutStep}
            className="border-none p-0"
          />
        }
      />

      {/* Main split viewport */}
      {!activeCartItem ? (
        <div className="py-20 text-center text-slate-500 font-bold uppercase border border-dashed border-cyan-400/20 mt-8">
          NO ACTIVE LISTING SELECTED. PLEASE PURCHASE AN ACCOUNT NODES FROM THE MARKETPLACE.
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_384px] gap-8 py-8 max-lg:grid-cols-1 w-full">
          {/* Left panel: dynamic steps content */}
          <div className="flex flex-col justify-start items-start gap-6 w-full">
            {checkoutStep === 1 && state.cart && (
              <ReviewStep
                cart={state.cart}
                onProceed={() => setCheckoutStep(2)}
              />
            )}

            {checkoutStep === 2 && state.cart && (
              <PaymentStep
                price={state.cart.price}
                isTournament={state.cart.kind === "tournament"}
                isProcessing={isBusy}
                onBack={() => setCheckoutStep(1)}
                onComplete={() => void completeCheckout()}
              />
            )}

            {checkoutStep === 3 && (
              <ConfirmStep
                lastPurchased={lastPurchased}
                onReturn={() => {
                  setCheckoutStep(1);
                  setLastPurchased(null);
                  setView("market");
                }}
              />
            )}
          </div>

          {/* Right panel: order summary details */}
          <OrderSummary cart={state.cart} lastPurchased={lastPurchased} />
        </div>
      )}
    </section>
  );
}

export default CheckoutView;
