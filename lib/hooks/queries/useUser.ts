import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/lib/api/adapters/mock";

export function useUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => mockApi.auth.me(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draft: { name: string; game: string; rank: any; goal: string }) =>
      mockApi.auth.updateProfile(draft),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "me"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
