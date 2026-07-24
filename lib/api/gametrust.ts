import { ApiException, apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  ApiPostType,
  ApiResponse,
  ApiRole,
  ApiTournamentStatus,
  AuthDto,
  ClanDto,
  GameProfileDto,
  ListingDto,
  MatchDto,
  NotificationDto,
  PaymentDto,
  PostDto,
  RegistrationDto,
  TeamDto,
  TournamentDto,
  UserDto,
} from "@/lib/api/contracts";

async function unwrap<T>(request: Promise<ApiResponse<T>>): Promise<T> {
  const response = await request;
  if (!response.success) {
    throw new ApiException(response.message || "The request was rejected.");
  }
  return response.data;
}

function query(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "ALL") search.set(key, value);
  });
  const value = search.toString();
  return value ? `?${value}` : "";
}

export const gameTrustApi = {
  auth: {
    signIn: (payload: { email: string; password: string }) =>
      unwrap(apiClient.post<ApiResponse<AuthDto>>(ENDPOINTS.auth.signIn, payload)),
    signUp: (payload: {
      email: string;
      password: string;
      username: string;
      fullName: string;
      role: ApiRole;
      gameProfile?: GameProfileDto;
    }) => unwrap(apiClient.post<ApiResponse<AuthDto>>(ENDPOINTS.auth.signUp, payload)),
  },
  users: {
    me: () => unwrap(apiClient.get<ApiResponse<UserDto>>(ENDPOINTS.users.me)),
    updateProfile: (payload: { fullName: string; gameProfile: GameProfileDto }) =>
      unwrap(apiClient.patch<ApiResponse<UserDto>>(ENDPOINTS.users.profile, payload)),
    matches: () =>
      unwrap(apiClient.get<ApiResponse<MatchDto[]>>(ENDPOINTS.users.matches)),
  },
  tournaments: {
    list: (filters: { status?: ApiTournamentStatus; game?: string } = {}) =>
      unwrap(
        apiClient.get<ApiResponse<TournamentDto[]>>(
          `${ENDPOINTS.tournaments.list}${query(filters)}`
        )
      ),
    detail: (id: string) =>
      unwrap(apiClient.get<ApiResponse<TournamentDto>>(ENDPOINTS.tournaments.detail(id))),
    create: (payload: {
      title: string;
      game: string;
      status?: ApiTournamentStatus;
      mode?: string;
      format?: string;
      teamSize: number;
      maxTeams: number;
      entryFee: number;
      prizePool: number;
      startsAt?: string;
      description?: string;
    }) => unwrap(apiClient.post<ApiResponse<TournamentDto>>(ENDPOINTS.tournaments.create, payload)),
    createTeam: (id: string, payload: { name: string; memberIds?: string[] }) =>
      unwrap(apiClient.post<ApiResponse<TeamDto>>(ENDPOINTS.tournaments.teams(id), payload)),
    teams: (id: string) =>
      unwrap(apiClient.get<ApiResponse<TeamDto[]>>(ENDPOINTS.tournaments.teams(id))),
    join: (
      id: string,
      payload?: { teamId?: string; teamName?: string; memberIds?: string[] }
    ) =>
      unwrap(apiClient.post<ApiResponse<RegistrationDto>>(ENDPOINTS.tournaments.join(id), payload)),
    myRegistrations: () =>
      unwrap(
        apiClient.get<ApiResponse<RegistrationDto[]>>(
          ENDPOINTS.tournaments.myRegistrations
        )
      ),
  },
  clans: {
    list: (filters: { tier?: string; region?: string } = {}) =>
      unwrap(
        apiClient.get<ApiResponse<ClanDto[]>>(
          `${ENDPOINTS.clans.list}${query(filters)}`
        )
      ),
    detail: (id: string) =>
      unwrap(apiClient.get<ApiResponse<ClanDto>>(ENDPOINTS.clans.detail(id))),
    create: (payload: {
      name: string;
      tag: string;
      tier?: string;
      region?: string;
      description?: string;
      games?: string[];
      requirement?: string;
      status?: "OPEN" | "INVITE_ONLY";
    }) => unwrap(apiClient.post<ApiResponse<ClanDto>>(ENDPOINTS.clans.create, payload)),
    join: (id: string) =>
      unwrap(apiClient.post<ApiResponse<ClanDto>>(ENDPOINTS.clans.join(id))),
    leave: (id: string) =>
      unwrap(apiClient.delete<ApiResponse<ClanDto>>(ENDPOINTS.clans.leave(id))),
  },
  listings: {
    list: (game?: string) =>
      unwrap(
        apiClient.get<ApiResponse<ListingDto[]>>(
          `${ENDPOINTS.listings.list}${query({ game })}`
        )
      ),
    mine: () =>
      unwrap(apiClient.get<ApiResponse<ListingDto[]>>(ENDPOINTS.listings.mine)),
    create: (payload: {
      title: string;
      game: string;
      server?: string;
      rankBadge?: string;
      description?: string;
      price: number;
    }) => unwrap(apiClient.post<ApiResponse<ListingDto>>(ENDPOINTS.listings.create, payload)),
  },
  posts: {
    list: (type?: ApiPostType) =>
      unwrap(
        apiClient.get<ApiResponse<PostDto[]>>(
          `${ENDPOINTS.posts.list}${query({ type })}`
        )
      ),
    create: (payload: {
      type?: ApiPostType;
      content: string;
      game?: string;
      clanTag?: string;
    }) => unwrap(apiClient.post<ApiResponse<PostDto>>(ENDPOINTS.posts.create, payload)),
    like: (id: string) =>
      unwrap(apiClient.post<ApiResponse<PostDto>>(ENDPOINTS.posts.like(id))),
    comment: (id: string, content: string) =>
      unwrap(
        apiClient.post<ApiResponse<PostDto>>(ENDPOINTS.posts.comments(id), {
          content,
        })
      ),
  },
  notifications: {
    list: () =>
      unwrap(apiClient.get<ApiResponse<NotificationDto[]>>(ENDPOINTS.notifications.list)),
    markRead: (id: string) =>
      unwrap(apiClient.patch<ApiResponse<null>>(ENDPOINTS.notifications.read(id))),
    markAllRead: () =>
      unwrap(apiClient.patch<ApiResponse<null>>(ENDPOINTS.notifications.readAll)),
    dismiss: (id: string) =>
      unwrap(apiClient.delete<ApiResponse<null>>(ENDPOINTS.notifications.dismiss(id))),
    clearAll: () =>
      unwrap(apiClient.delete<ApiResponse<null>>(ENDPOINTS.notifications.clearAll)),
  },
  payments: {
    create: (payload: {
      purpose: PaymentDto["purpose"];
      referenceId: string;
      amount: number;
      orderInfo?: string;
    }) => unwrap(apiClient.post<ApiResponse<PaymentDto>>(ENDPOINTS.payments.create, payload)),
    detail: (id: string) =>
      unwrap(apiClient.get<ApiResponse<PaymentDto>>(ENDPOINTS.payments.detail(id))),
    simulate: (id: string, action: "SUCCESS" | "CANCEL") =>
      unwrap(
        apiClient.post<ApiResponse<PaymentDto>>(
          ENDPOINTS.payments.simulate(id),
          { action },
        ),
      ),
  },
};
