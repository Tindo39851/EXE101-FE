import type { Clan } from "@/lib/types";

export const clans: Clan[] = [
  {
    id: "c1", name: "PHANTOM SYNDICATE", tag: "PSY", tier: "ELITE",
    members: 847, rating: 9842, wins: 412, founded: "2019", region: "Global",
    desc: "Oldest and most decorated clan on GameTrust. Elite traders and tournament champions across all major titles.",
    games: ["Valorant", "CS2", "LoL"], requirement: "Trust Score 9.5+", status: "INVITE ONLY",
  },
  {
    id: "c2", name: "NEON WOLVES", tag: "NW", tier: "ELITE",
    members: 634, rating: 9711, wins: 387, founded: "2020", region: "SEA",
    desc: "Aggressive tournament guild dominating FreeFire and Valorant SEA brackets. Highly active community.",
    games: ["FreeFire", "Valorant"], requirement: "Trust Score 9.2+", status: "INVITE ONLY",
  },
  {
    id: "c3", name: "DARK VECTOR", tag: "DVX", tier: "ALPHA",
    members: 512, rating: 9580, wins: 341, founded: "2021", region: "NA/EU",
    desc: "Tactical squad focused on competitive league play and secure high-value trading operations.",
    games: ["CS2", "LoL"], requirement: "Trust Score 9.0+", status: "INVITE ONLY",
  },
  {
    id: "c4", name: "GRID REAPERS", tag: "GR", tier: "ALPHA",
    members: 423, rating: 9402, wins: 298, founded: "2021", region: "EU",
    desc: "Fast-rising Alpha tier clan with major presence in regional amateur tournaments.",
    games: ["Valorant", "CS2"], requirement: "Trust Score 8.8+", status: "OPEN",
  },
  {
    id: "c5", name: "CYBER UNIT 7", tag: "CU7", tier: "BETA",
    members: 388, rating: 9261, wins: 254, founded: "2022", region: "Global",
    desc: "A rising force across casual and competitive circuits. Open recruitment with strong mentorship culture.",
    games: ["Fortnite", "Rocket League"], requirement: "Trust Score 7.5+", status: "OPEN",
  },
  {
    id: "c6", name: "VOID PROTOCOL", tag: "VP", tier: "BETA",
    members: 301, rating: 9104, wins: 211, founded: "2022", region: "Global",
    desc: "Cryptic network of gamers collaborating across timezone boundaries. Heavy focus on security.",
    games: ["Valorant", "CS2"], requirement: "Trust Score 8.5+", status: "INVITE ONLY",
  },
  {
    id: "c7", name: "NEON SERPENTS", tag: "NS", tier: "BETA",
    members: 278, rating: 8940, wins: 189, founded: "2023", region: "NA",
    desc: "Laidback yet skilled guild enjoying casual team matching and internal trust rating boosts.",
    games: ["FreeFire", "Valorant"], requirement: "Trust Score 8.0+", status: "OPEN",
  },
  {
    id: "c8", name: "IRON CIRCUIT", tag: "IC", tier: "GAMMA",
    members: 244, rating: 8812, wins: 162, founded: "2023", region: "Global",
    desc: "Starter friendly clan for newly registered GameTrust members. Cooperative rank pushing.",
    games: ["Valorant", "LoL"], requirement: "Trust Score 7.5+", status: "OPEN",
  },
];
