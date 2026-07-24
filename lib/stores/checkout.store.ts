import { create } from "zustand";
import type { CartItem } from "@/lib/types";
import { useUIStore } from "./ui.store";
import { useAuthStore } from "./auth.store";

interface CheckoutState {
  cart: CartItem | null;
  lastPurchased: CartItem | null;
  checkoutStep: number;
  selectedPayment: "card" | "crypto" | "escrow";
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  agreedToTerms: boolean;
  showCvv: boolean;
  paymentMethod: string;

  setCart: (item: CartItem | null) => void;
  setLastPurchased: (item: CartItem | null) => void;
  setCheckoutStep: (step: number) => void;
  setSelectedPayment: (val: "card" | "crypto" | "escrow") => void;
  setCardNumber: (val: string) => void;
  setCardHolder: (val: string) => void;
  setExpiryDate: (val: string) => void;
  setCvv: (val: string) => void;
  setAgreedToTerms: (val: boolean) => void;
  setShowCvv: (val: boolean) => void;
  setPaymentMethod: (method: string) => void;

  buyCart: (item: CartItem) => void;
  completeCheckout: (onSuccess: (tx: any) => void) => void;
  resetCheckout: () => void;
}

const getInitialCart = (): CartItem | null => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.cart) return parsed.cart;
      } catch {
        // ignore
      }
    }
  }
  return null;
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  cart: getInitialCart(),
  lastPurchased: null,
  checkoutStep: 1,
  selectedPayment: "card",
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
  agreedToTerms: false,
  showCvv: false,
  paymentMethod: "MOMO",

  setCart: (cart) => {
    set({ cart });
    saveCart(cart);
  },
  setLastPurchased: (lastPurchased) => set({ lastPurchased }),
  setCheckoutStep: (checkoutStep) => set({ checkoutStep }),
  setSelectedPayment: (val) => {
    set({ selectedPayment: val, paymentMethod: "MOMO" });
  },
  setCardNumber: (cardNumber) => set({ cardNumber }),
  setCardHolder: (cardHolder) => set({ cardHolder }),
  setExpiryDate: (expiryDate) => set({ expiryDate }),
  setCvv: (cvv) => set({ cvv }),
  setAgreedToTerms: (agreedToTerms) => set({ agreedToTerms }),
  setShowCvv: (showCvv) => set({ showCvv }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

  buyCart: (item) => {
    set({
      cart: item,
      checkoutStep: 1,
      lastPurchased: null,
      agreedToTerms: false,
    });
    saveCart(item);
    useUIStore.getState().setView("checkout");
    useUIStore.getState().notify(`${item.name} added to escrow checkout.`);
  },

  completeCheckout: (onSuccess) => {
    const { cart, paymentMethod } = get();
    if (!cart) {
      useUIStore.getState().notify("Cart is empty.");
      return;
    }

    const currentUser = useAuthStore.getState().getCurrentUser();
    const newTx = {
      id: `t${Date.now()}`,
      user: currentUser.name,
      item: cart.name,
      amount: cart.price,
      method: paymentMethod,
      time: new Date().toLocaleString("en-US"),
    };

    set({
      lastPurchased: cart,
      cart: null,
      checkoutStep: 3,
    });
    saveCart(null);

    // Callback to append transaction and trigger logic
    onSuccess(newTx);
  },

  resetCheckout: () => {
    set({
      checkoutStep: 1,
      lastPurchased: null,
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      agreedToTerms: false,
      showCvv: false,
    });
  },
}));

function saveCart(cart: CartItem | null) {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state") || "{}";
    try {
      const parsed = JSON.parse(raw);
      parsed.cart = cart;
      window.localStorage.setItem("gametrust-next-mvp-state", JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }
}
