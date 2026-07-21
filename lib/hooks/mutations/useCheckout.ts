import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/adapters/mock";
import type { Transaction } from "@/lib/types";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tx: Transaction) => mockApi.transactions.create(tx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
