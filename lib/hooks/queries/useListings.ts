import { useQuery } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/adapters/mock";

export function useListings() {
  return useQuery({
    queryKey: ["listings"],
    queryFn: () => mockApi.listings.list(),
  });
}
