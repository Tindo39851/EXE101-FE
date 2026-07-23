import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gameTrustApi } from "@/lib/api/gametrust";
import { mapUser } from "@/lib/api/mappers";
import type { Rank } from "@/lib/types";

export function useUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => mapUser(await gameTrustApi.users.me()),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (draft: {
      name: string;
      game: string;
      rank: Rank;
      goal: string;
    }) =>
      mapUser(
        await gameTrustApi.users.updateProfile({
          fullName: draft.name,
          gameProfile: {
            mainGame: draft.game,
            rank: draft.rank,
            goal: draft.goal,
            preferredRole: "Flex",
            onlineTime: "Evening",
            favoriteGames: [draft.game],
          },
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "me"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
