// ─── Primitive Types ──────────────────────────────────────────────────────────

export type Role = "gamer" | "creator" | "shop" | "admin";
export type Rank = "Gold" | "Platinum" | "Diamond" | "Master" | "Challenger";
export type View =
  | "overview"
  | "market"
  | "matching"
  | "profile"
  | "community"
  | "admin"
  | "checkout"
  | "notifications"
  | "clan"
  | "signin"
  | "signup";

// ─── Entity Types ─────────────────────────────────────────────────────────────

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  content: string;
  time: string;
  unread: boolean;
  color: string;
};

export type User = {
  id: string;
  role: Role;
  name: string;
  game: string;
  rank: Rank;
  goal: string;
  premium: boolean;
  trustScore: number;
};

export type Post = {
  id: string;
  authorId: string;
  type: string;
  content: string;
  likes: number;
  comments: string[];
  sponsored: boolean;
  game?: string;
  authorName?: string;
  clanTag?: string;
  time?: string;
};

export type Sponsor = {
  id: string;
  shop: string;
  title: string;
  price: number;
  status: string;
};

export type Transaction = {
  id: string;
  user: string;
  item: string;
  amount: number;
  method: string;
  time: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  desc: string;
};

export type Clan = {
  id: string;
  name: string;
  tag: string;
  tier: "ELITE" | "ALPHA" | "BETA" | "GAMMA";
  members: number;
  rating: number;
  wins: number;
  founded: string;
  region: "Global" | "NA/EU" | "EU" | "AS" | "SEA" | "NA";
  desc: string;
  games: string[];
  requirement: string;
  status: "INVITE ONLY" | "OPEN";
};

export type Listing = {
  id: string;
  title: string;
  server: string;
  badge: string;
  code: string;
  wins: string;
  skins: string;
  level: string;
  sold: string;
  trust: string;
  price: number;
  accent: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  desc: string;
  buyerRoles: Role[];
};

export type Incident = {
  id: string;
  severity: string;
  type: string;
  desc: string;
  status: string;
  color: string;
};

export type Broker = {
  id: string;
  initials: string;
  name: string;
  trust: string;
  trades: string;
  volume: string;
  disputes: number;
  since: string;
  verified: boolean;
};

// ─── Tournament Types ─────────────────────────────────────────────────────────

export type BracketMatch = {
  t1: string;
  s1: string;
  t2: string;
  s2: string;
  isLive?: boolean;
};

export type TournamentBracket = {
  quarter: BracketMatch[];
  semi: BracketMatch[];
  finals: BracketMatch[];
} | null;

export type Tournament = {
  id: string;
  status: "LIVE" | "OPEN" | "UPCOMING";
  mode: string;
  title: string;
  game: string;
  prize: string;
  timer: string;
  teams: string;
  format: string;
  startsIn: string;
  bracket: TournamentBracket;
  entryFee: number;
};

// ─── App State ────────────────────────────────────────────────────────────────

export type AppState = {
  currentUserId: string;
  cart: CartItem | null;
  users: User[];
  posts: Post[];
  sponsors: Sponsor[];
  transactions: Transaction[];
  notifications: NotificationItem[];
};
