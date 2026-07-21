import { useQuery } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/adapters/mock";

export function useTournaments() {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: () => mockApi.tournaments.list(),
  });
}
