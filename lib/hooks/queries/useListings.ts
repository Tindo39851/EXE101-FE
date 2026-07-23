import { useQuery } from "@tanstack/react-query";
import { gameTrustApi } from "@/lib/api/gametrust";
import { mapListing } from "@/lib/api/mappers";

export function useListings() {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => (await gameTrustApi.listings.list()).map(mapListing),
  });
}
