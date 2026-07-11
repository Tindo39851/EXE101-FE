import type { Tournament } from "@/lib/types";

export const initialTournaments: Tournament[] = [
  {
    id: "t1", status: "LIVE", mode: "4v4 Double Elim",
    title: "NEON CIRCUIT OPEN", game: "Freefire",
    prize: "$50,000", timer: "02:14:29", teams: "128", format: "4v4", startsIn: "—",
    bracket: {
      quarter: [
        { t1: "PHANTOM SYNDICATE", s1: "2", t2: "NEON WOLVES", s2: "0" },
        { t1: "DARK VECTOR", s1: "1", t2: "GRID REAPERS", s2: "2" },
        { t1: "CYBER UNIT 7", s1: "1", t2: "VOID PROTOCOL", s2: "2" },
        { t1: "NEON SERPENTS", s1: "LIVE", t2: "IRON CIRCUIT", s2: "", isLive: true },
      ],
      semi: [
        { t1: "PHANTOM SYNDICATE", s1: "", t2: "GRID REAPERS", s2: "" },
        { t1: "VOID PROTOCOL", s1: "", t2: "TBD", s2: "" },
      ],
      finals: [{ t1: "TBD", s1: "", t2: "TBD", s2: "" }],
    },
    entryFee: 15,
  },
  {
    id: "t2", status: "OPEN", mode: "5v5 Single Elim",
    title: "DARKBYTE INVITATIONAL", game: "Arena of Valor",
    prize: "$25,000", timer: "08:41:03", teams: "64", format: "5v5", startsIn: "08h 41m",
    bracket: {
      quarter: [
        { t1: "TEAM SOLOMON", s1: "", t2: "VORTEX Esports", s2: "" },
        { t1: "ALPHA SQUAD", s1: "", t2: "BETA NINJAS", s2: "" },
        { t1: "NEXUS CLAN", s1: "", t2: "OMEGA WING", s2: "" },
        { t1: "ASTRAL GATE", s1: "", t2: "VOID CALLERS", s2: "" },
      ],
      semi: [
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
      ],
      finals: [{ t1: "TBD", s1: "", t2: "TBD", s2: "" }],
    },
    entryFee: 10,
  },
  {
    id: "t3", status: "OPEN", mode: "Squad Battle",
    title: "PHANTOM LEAGUE S3", game: "Freefire",
    prize: "$100,000", timer: "23:05:47", teams: "256", format: "Squads", startsIn: "23h 05m",
    bracket: {
      quarter: [
        { t1: "REBEL FORCE", s1: "", t2: "SHADOW OPS", s2: "" },
        { t1: "CYPHER GRID", s1: "", t2: "DATABYTE", s2: "" },
        { t1: "OVERCLOCK", s1: "", t2: "UNDERGROUND", s2: "" },
        { t1: "NEON GHOSTS", s1: "", t2: "PHANTOM V", s2: "" },
      ],
      semi: [
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
      ],
      finals: [{ t1: "TBD", s1: "", t2: "TBD", s2: "" }],
    },
    entryFee: 20,
  },
  {
    id: "t4", status: "LIVE", mode: "5v5 Swiss",
    title: "VALOR GRID MASTERS", game: "Arena of Valor",
    prize: "$15,000", timer: "01:59:16", teams: "32", format: "5v5", startsIn: "—",
    bracket: {
      quarter: [
        { t1: "TITAN CLAN", s1: "2", t2: "ROGUE ONE", s2: "1" },
        { t1: "APEX SQUAD", s1: "LIVE", t2: "VECTOR FIVE", s2: "", isLive: true },
        { t1: "VALOR REAPERS", s1: "", t2: "SHADOW CLAW", s2: "" },
        { t1: "BLITZ FORCE", s1: "", t2: "ECHO SIX", s2: "" },
      ],
      semi: [
        { t1: "TITAN CLAN", s1: "", t2: "TBD", s2: "" },
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
      ],
      finals: [{ t1: "TBD", s1: "", t2: "TBD", s2: "" }],
    },
    entryFee: 5,
  },
  {
    id: "t5", status: "UPCOMING", mode: "Solos / Squads",
    title: "FREEFIRE CHAMPIONS CUP", game: "Freefire",
    prize: "$30,000", timer: "47:12:01", teams: "512", format: "Squads", startsIn: "2d 23h",
    bracket: null,
    entryFee: 8,
  },
  {
    id: "t6", status: "UPCOMING", mode: "5v5 GSL Groups",
    title: "AOV SYNDICATE WARS", game: "Arena of Valor",
    prize: "$200,000", timer: "71:59:56", teams: "16", format: "5v5", startsIn: "3d",
    bracket: null,
    entryFee: 50,
  },
  {
    id: "t7", status: "OPEN", mode: "Duo Clash",
    title: "FREEFIRE BLITZ SERIES", game: "Freefire",
    prize: "$12,000", timer: "04:30:07", teams: "128", format: "2v2", startsIn: "04h 30m",
    bracket: {
      quarter: [
        { t1: "DUO ONE", s1: "", t2: "DUO TWO", s2: "" },
        { t1: "DUO THREE", s1: "", t2: "DUO FOUR", s2: "" },
        { t1: "DUO FIVE", s1: "", t2: "DUO SIX", s2: "" },
        { t1: "DUO SEVEN", s1: "", t2: "DUO EIGHT", s2: "" },
      ],
      semi: [
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
      ],
      finals: [{ t1: "TBD", s1: "", t2: "TBD", s2: "" }],
    },
    entryFee: 4,
  },
  {
    id: "t8", status: "OPEN", mode: "5v5 Round Robin",
    title: "AOV BATTLEGROUND CUP", game: "Arena of Valor",
    prize: "$8,000", timer: "18:22:40", teams: "32", format: "5v5", startsIn: "18h 22m",
    bracket: {
      quarter: [
        { t1: "BG ONE", s1: "", t2: "BG TWO", s2: "" },
        { t1: "BG THREE", s1: "", t2: "BG FOUR", s2: "" },
        { t1: "BG FIVE", s1: "", t2: "BG SIX", s2: "" },
        { t1: "BG SEVEN", s1: "", t2: "BG EIGHT", s2: "" },
      ],
      semi: [
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
        { t1: "TBD", s1: "", t2: "TBD", s2: "" },
      ],
      finals: [{ t1: "TBD", s1: "", t2: "TBD", s2: "" }],
    },
    entryFee: 2,
  },
];
