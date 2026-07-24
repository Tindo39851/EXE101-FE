import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameTrustApi } from "@/lib/api/gametrust";
import type { PaymentDto } from "@/lib/api/contracts";

interface CheckoutPayload {
  purpose: PaymentDto["purpose"];
  referenceId: string;
  amount: number;
  orderInfo?: string;
}

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutPayload) =>
      gameTrustApi.payments.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
