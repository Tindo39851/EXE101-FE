export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ApiRole = "GAMER" | "CREATOR" | "SELLER";
export type ApiTournamentStatus =
  | "UPCOMING"
  | "OPEN"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED";
export type ApiPostType =
  | "TRADE"
  | "TOURNAMENT"
  | "ALERT"
  | "LISTING"
  | "RECRUIT"
  | "ACHIEVEMENT"
  | "HIGHLIGHT";

export interface GameProfileDto {
  mainGame?: string;
  rank?: string;
  goal?: string;
  preferredRole?: string;
  onlineTime?: string;
  favoriteGames?: string[];
}

export interface UserDto {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: ApiRole;
  premium: boolean;
  verified: boolean;
  trustScore: number;
  gameProfile?: GameProfileDto;
  createdAt?: string;
}

export interface AuthDto {
  token: string;
  user: UserDto;
}

export interface MatchDto {
  userId: string;
  username: string;
  mainGame: string;
  rank: string;
  goal: string;
  trustScore: number;
  matchScore: number;
}

export interface BracketMatchDto {
  round: string;
  seed: number;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  live: boolean;
}

export interface TournamentDto {
  id: string;
  title: string;
  game: string;
  status: ApiTournamentStatus;
  mode: string;
  format: string;
  teamSize: number;
  maxTeams: number;
  registeredTeams: number;
  entryFee: number;
  prizePool: number;
  startsAt?: string;
  organizerId?: string;
  description?: string;
  bracket?: BracketMatchDto[];
}

export interface TeamDto {
  id: string;
  tournamentId: string;
  name: string;
  captainId: string;
  memberIds: string[];
}

export interface RegistrationDto {
  id: string;
  tournamentId: string;
  userId: string;
  teamId: string;
  status:
    | "PENDING_PAYMENT"
    | "REGISTERED"
    | "WAITLISTED"
    | "REJECTED"
    | "CANCELLED";
  smurfScore: number;
  smurfRiskLevel: string;
  paymentId?: string;
  paymentUrl?: string;
}

export interface ClanDto {
  id: string;
  name: string;
  tag: string;
  tier: string;
  region: string;
  description?: string;
  games: string[];
  requirement: string;
  status: "OPEN" | "INVITE_ONLY";
  wins: number;
  rating: number;
  members: number;
  joined: boolean;
}

export interface ListingDto {
  id: string;
  sellerId?: string;
  title: string;
  game: string;
  server?: string;
  rankBadge?: string;
  description?: string;
  price: number;
  trustScore: number;
  active: boolean;
  createdAt?: string;
}

export interface PostDto {
  id: string;
  authorId?: string;
  authorName?: string;
  type: ApiPostType;
  content: string;
  game?: string;
  clanTag?: string;
  likes: number;
  comments: string[];
  sponsored: boolean;
  createdAt?: string;
}

export interface NotificationDto {
  id: string;
  type: string;
  title: string;
  content: string;
  unread: boolean;
  createdAt?: string;
}

export interface PaymentDto {
  id: string;
  purpose:
    | "TOURNAMENT_ENTRY"
    | "PREMIUM_PLAN"
    | "SHOP_PACKAGE"
    | "MARKETPLACE_ORDER";
  referenceId: string;
  amount: number;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "EXPIRED";
  provider: string;
  transactionRef: string;
  paymentUrl: string;
}
