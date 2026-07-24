import type {
  BracketMatchDto,
  ClanDto,
  ListingDto,
  MatchDto,
  NotificationDto,
  PostDto,
  TournamentDto,
  UserDto,
} from "@/lib/api/contracts";
import type {
  BracketMatch,
  Clan,
  Listing,
  NotificationItem,
  Post,
  Rank,
  Role,
  Tournament,
  TournamentBracket,
  User,
} from "@/lib/types";

const ranks: Rank[] = ["Gold", "Platinum", "Diamond", "Master", "Challenger"];

function roleFromApi(role: UserDto["role"]): Role {
  if (role === "CREATOR") return "creator";
  if (role === "SELLER") return "shop";
  return "gamer";
}

function rankFromApi(rank?: string): Rank {
  const found = ranks.find((item) => item.toLowerCase() === rank?.toLowerCase());
  return found ?? "Platinum";
}

function relativeTime(value?: string) {
  if (!value) return "Just now";
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    role: roleFromApi(dto.role),
    name: dto.fullName || dto.username,
    game: dto.gameProfile?.mainGame || "Arena Of Valor",
    rank: rankFromApi(dto.gameProfile?.rank),
    goal: dto.gameProfile?.goal || "Compete",
    premium: dto.premium,
    trustScore: dto.trustScore,
  };
}

export function mapMatch(dto: MatchDto): User & { matchScore: number } {
  return {
    id: dto.userId,
    username: dto.username,
    role: "gamer",
    name: dto.username,
    game: dto.mainGame,
    rank: rankFromApi(dto.rank),
    goal: dto.goal,
    premium: false,
    trustScore: dto.trustScore,
    matchScore: dto.matchScore,
  };
}

function toBracketMatch(match: BracketMatchDto): BracketMatch {
  return {
    t1: match.teamA || "TBD",
    s1: match.scoreA || "",
    t2: match.teamB || "TBD",
    s2: match.scoreB || "",
    isLive: match.live,
  };
}

function mapBracket(items?: BracketMatchDto[]): TournamentBracket {
  if (!items?.length) return null;
  const selectRound = (name: string) =>
    items
      .filter((item) => item.round?.toLowerCase().includes(name))
      .sort((a, b) => a.seed - b.seed)
      .map(toBracketMatch);
  return {
    quarter: selectRound("quarter"),
    semi: selectRound("semi"),
    finals: selectRound("final"),
  };
}

function startLabels(value?: string) {
  if (!value) return { startsIn: "TBA", timer: "--:--:--" };
  const delta = new Date(value).getTime() - Date.now();
  if (delta <= 0) return { startsIn: "Started", timer: "00:00:00" };
  const hours = Math.floor(delta / 3600000);
  const days = Math.floor(hours / 24);
  const minutes = Math.floor((delta % 3600000) / 60000);
  return {
    startsIn: days > 0 ? `${days}d ${hours % 24}h` : `${hours}h ${minutes}m`,
    timer: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`,
  };
}

export function mapTournament(dto: TournamentDto): Tournament {
  const start = startLabels(dto.startsAt);
  return {
    id: dto.id,
    status: dto.status,
    mode: dto.mode || `${dto.teamSize}v${dto.teamSize}`,
    title: dto.title,
    game: dto.game,
    prize: `${Number(dto.prizePool || 0).toLocaleString("vi-VN")} ₫`,
    timer: dto.status === "LIVE" ? "LIVE" : start.timer,
    teams: `${dto.registeredTeams}/${dto.maxTeams}`,
    format: dto.format || `${dto.teamSize}v${dto.teamSize}`,
    startsIn: start.startsIn,
    bracket: mapBracket(dto.bracket),
    entryFee: Number(dto.entryFee || 0),
  };
}

export function mapClan(dto: ClanDto): Clan {
  const tier = ["ELITE", "ALPHA", "BETA", "GAMMA"].includes(dto.tier)
    ? (dto.tier as Clan["tier"])
    : "BETA";
  return {
    id: dto.id,
    name: dto.name,
    tag: dto.tag,
    tier,
    members: dto.members,
    rating: dto.rating,
    wins: dto.wins,
    founded: "2024",
    region: dto.region as Clan["region"],
    desc: dto.description || "GameTrust community guild.",
    games: dto.games || [],
    requirement: dto.requirement || "Trust Score 7.5+",
    status: dto.status === "INVITE_ONLY" ? "INVITE ONLY" : "OPEN",
    joined: dto.joined,
  };
}

export function mapListing(dto: ListingDto): Listing {
  const game = dto.game || dto.title;
  const code = game.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "GT";
  const accent = game.toLowerCase().includes("free") ? "#ff6b1a" : "#c850f0";
  return {
    id: dto.id,
    title: game,
    server: `${dto.server || "GLOBAL"} · VERIFIED`,
    badge: dto.rankBadge || "Verified",
    code,
    wins: "—",
    skins: "—",
    level: "—",
    sold: "—",
    trust: `${Number(dto.trustScore || 0).toFixed(1)}/10`,
    price: Number(dto.price || 0),
    accent,
    description: dto.description,
  };
}

export function mapPost(dto: PostDto): Post {
  return {
    id: dto.id,
    authorId: dto.authorId || "",
    type: dto.type.toLowerCase(),
    content: dto.content,
    likes: dto.likes,
    comments: dto.comments || [],
    sponsored: dto.sponsored,
    game: dto.game,
    authorName: dto.authorName || "GameTrust user",
    clanTag: dto.clanTag,
    time: relativeTime(dto.createdAt),
  };
}

const notificationColors: Record<string, string> = {
  PAYMENT: "cyan",
  SECURITY: "orange",
  TOURNAMENT: "fuchsia",
  CLAN: "green",
  ACHIEVEMENT: "yellow",
  SYSTEM: "cyan",
};

export function mapNotification(dto: NotificationDto): NotificationItem {
  return {
    id: dto.id,
    type: dto.type.toLowerCase(),
    title: dto.title,
    content: dto.content,
    time: relativeTime(dto.createdAt),
    unread: dto.unread,
    color: notificationColors[dto.type] || "cyan",
  };
}
