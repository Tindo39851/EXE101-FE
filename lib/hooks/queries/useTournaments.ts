import { useQuery } from "@tanstack/react-query";
import { gameTrustApi } from "@/lib/api/gametrust";
import { mapTournament } from "@/lib/api/mappers";

export function useTournaments() {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () =>
      (await gameTrustApi.tournaments.list()).map(mapTournament),
  });
}
